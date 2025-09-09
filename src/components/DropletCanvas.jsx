import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
attribute vec3 position;
varying vec2 vTexCoord;

void main() {
    vTexCoord = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

const int TRAIL_LENGTH = 15;
const float EPS = 1e-4;
const int ITR = 16;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointerTrail[TRAIL_LENGTH];

varying vec2 vTexCoord;

// Random 3D noise
float rnd3D(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453123);
}
float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    float a000 = rnd3D(i);
    float a100 = rnd3D(i + vec3(1.0,0.0,0.0));
    float a010 = rnd3D(i + vec3(0.0,1.0,0.0));
    float a110 = rnd3D(i + vec3(1.0,1.0,0.0));
    float a001 = rnd3D(i + vec3(0.0,0.0,1.0));
    float a101 = rnd3D(i + vec3(1.0,0.0,1.0));
    float a011 = rnd3D(i + vec3(0.0,1.0,1.0));
    float a111 = rnd3D(i + vec3(1.0,1.0,1.0));
    vec3 u = f*f*(3.0-2.0*f);
    float k0=a000; float k1=a100-a000; float k2=a010-a000; float k3=a001-a000;
    float k4=a000-a100-a010+a110; float k5=a000-a010-a001+a011; float k6=a000-a100-a001+a101; float k7=-a000+a100+a010-a110+a001-a101-a011+a111;
    return k0+k1*u.x+k2*u.y+k3*u.z+k4*u.x*u.y+k5*u.y*u.z+k6*u.z*u.x+k7*u.x*u.y*u.z;
}

// Camera
vec3 origin = vec3(0.0,0.0,1.0);
vec3 lookAt = vec3(0.0,0.0,0.0);
vec3 cDir = normalize(lookAt-origin);
vec3 cUp = vec3(0.0,1.0,0.0);
vec3 cSide = cross(cDir,cUp);

float smoothMin(float d1,float d2,float k){return -log(exp(-k*d1)+exp(-k*d2))/k;}
vec3 translate(vec3 p,vec3 t){return p-t;}
float sdSphere(vec3 p,float s){return length(p)-s;}

float map(vec3 p){
    float baseRadius=0.008;
    float radius=baseRadius*float(TRAIL_LENGTH);
    float k=7.0;
    float d=1e5;
    for(int i=0;i<TRAIL_LENGTH;i++){
        vec2 pointerTrail=uPointerTrail[i]*uResolution/min(uResolution.x,uResolution.y);
        float sphere=sdSphere(translate(p,vec3(pointerTrail,0.0)),radius-baseRadius*float(i));
        d=smoothMin(d,sphere,k);
    }
    float sphere=sdSphere(translate(p,vec3(1.0,-0.25,0.0)),0.55);
    d=smoothMin(d,sphere,k);
    return d;
}

vec3 generateNormal(vec3 p){
    return normalize(vec3(
        map(p+vec3(EPS,0.0,0.0))-map(p+vec3(-EPS,0.0,0.0)),
        map(p+vec3(0.0,EPS,0.0))-map(p+vec3(0.0,-EPS,0.0)),
        map(p+vec3(0.0,0.0,EPS))-map(p+vec3(0.0,0.0,-EPS))
    ));
}

vec3 dropletColor(vec3 normal, vec3 rayDir){
    vec3 reflectDir=reflect(rayDir,normal);
    float noisePosTime=noise3D(reflectDir*2.0+uTime);
    float noiseNegTime=noise3D(reflectDir*2.0-uTime);
    vec3 _color0=vec3(0.1765,0.1255,0.2275)*noisePosTime;
    vec3 _color1=vec3(0.4118,0.4118,0.4157)*noiseNegTime;
    return (_color0+_color1)*2.3;
}

void main(){
    vec2 p=(gl_FragCoord.xy*2.0-uResolution)/min(uResolution.x,uResolution.y);
    vec3 ray=origin+cSide*p.x+cUp*p.y;
    vec3 rayDir=cDir;
    float dist=0.0;
    for(int i=0;i<ITR;i++){
        dist=map(ray);
        ray+=rayDir*dist;
        if(dist<EPS) break;
    }
    vec3 color=vec3(0.0);
    if(dist<EPS){
        vec3 normal=generateNormal(ray);
        color=dropletColor(normal,rayDir);
    }
    gl_FragColor=vec4(pow(color,vec3(7.0)),1.0);
}
`;

const DropletCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const trailLength = 15;
    const trailArray = Array(trailLength)
      .fill()
      .map(() => new THREE.Vector2(0.5, 0.5));

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uPointerTrail: { value: trailArray },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0.5, 0.5);

    const handlePointerMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();

      // Smooth trailing
      for (let i = trailArray.length - 1; i > 0; i--) {
        trailArray[i].lerp(trailArray[i - 1], 0.2);
      }
      trailArray[0].lerp(mouse, 0.3);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} className="w-full h-screen" />;
};

export default DropletCanvas;
