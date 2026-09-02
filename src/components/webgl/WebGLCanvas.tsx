'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import { CHAPTER_COLORS, BASE_COLORS, createPetalGeometry, createParticleGeometry } from '@/lib/three-utils';

const PETAL_COUNT = 12;
const PARTICLE_COUNT = isMobile() ? 800 : 2000;

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

interface WebGLCanvasProps {
  scrollProgress: number;
  chapterIndex: number;
  isLoaded: boolean;
}

function PetalGeometry({ scrollProgress, chapterIndex, isLoaded }: { scrollProgress: number; chapterIndex: number; isLoaded: boolean }) {
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const geometry = createPetalGeometry(PETAL_COUNT, 1.5, 0.3);
    geometryRef.current = geometry;

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uChapterProgress: { value: 0 },
        uColorA: { value: BASE_COLORS.void },
        uColorB: { value: CHAPTER_COLORS[0] },
        uIntensity: { value: isLoaded ? 1 : 0 },
        uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDepth;
        uniform float uTime;
        uniform float uScrollProgress;
        
        void main() {
          vUv = uv;
          vDepth = position.z;
          vec3 pos = position;
          
          float breathe = sin(uTime * 0.3 + position.x * 2.0 + position.y * 2.0) * 0.02;
          pos.z += breathe * 10.0;
          
          float rotate = uScrollProgress * 0.5;
          float c = cos(rotate);
          float s = sin(rotate);
          mat2 rot = mat2(c, -s, s, c);
          pos.xy = rot * pos.xy;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDepth;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uChapterProgress;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uIntensity;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float petalShape = smoothstep(1.0, 0.0, dist);
          
          float pulse = sin(uTime * 0.5 + vDepth * 5.0) * 0.15 + 0.85;
          vec3 color = mix(uColorA, uColorB, uChapterProgress * 0.5 + 0.5);
          
          float alpha = petalShape * pulse * uIntensity * 0.15;
          alpha *= smoothstep(0.2, 1.0, uScrollProgress);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.z = -2;
    meshRef.current = mesh;
  }, [viewport.width, viewport.height]);

  useFrame((_state, delta) => {
    if (!materialRef.current || !meshRef.current) return;
    
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    
    const targetChapter = Math.min(chapterIndex, CHAPTER_COLORS.length - 1);
    const chapterProgress = (scrollProgress * (CHAPTER_COLORS.length - 1)) % 1;
    materialRef.current.uniforms.uChapterProgress.value = chapterProgress;
    
    const colorA = BASE_COLORS.void;
    const colorB = CHAPTER_COLORS[targetChapter];
    materialRef.current.uniforms.uColorA.value = colorA;
    materialRef.current.uniforms.uColorB.value = colorB;
    
    materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uIntensity.value,
      isLoaded ? 1 : 0,
      0.05
    );
    
    meshRef.current.rotation.z += delta * 0.02;
  });

  return meshRef.current ? <primitive object={meshRef.current} /> : null;
}

function Particles({ scrollProgress, isLoaded }: { scrollProgress: number; isLoaded: boolean }) {
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const geometry = createParticleGeometry(PARTICLE_COUNT, 3);
    geometryRef.current = geometry;

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uIntensity: { value: isLoaded ? 1 : 0 },
        uColor: { value: BASE_COLORS.warmMist },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float speed;
        attribute float baseAngle;
        attribute float baseRadius;
        varying float vAlpha;
        varying float vSize;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uIntensity;
        
        void main() {
          vAlpha = alpha;
          vSize = size;
          
          vec3 pos = position;
          
          float angle = baseAngle + uTime * speed * 100.0;
          float radius = baseRadius + sin(uTime * 0.5 + baseAngle * 10.0) * 0.1;
          
          pos.x = cos(angle) * radius;
          pos.y = sin(angle) * radius;
          
          pos.z += sin(uTime * 0.3 + baseAngle * 5.0) * 0.2;
          
          float fadeIn = smoothstep(0.0, 0.3, uScrollProgress);
          float scale = mix(0.1, 1.0, fadeIn) * uIntensity;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = vSize * (300.0 / -mvPosition.z) * scale;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vSize;
        uniform vec3 uColor;
        uniform float uIntensity;
        
        void main() {
          float dist = length(gl_PointCoord - 0.5) * 2.0;
          float circle = smoothstep(1.0, 0.0, dist);
          
          float alpha = circle * vAlpha * uIntensity * 0.4;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    points.rotation.x = -Math.PI / 2;
    points.position.z = -1;
    pointsRef.current = points;
  }, []);

  useFrame((_state, delta) => {
    if (!materialRef.current) return;
    
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uIntensity.value,
      isLoaded ? 1 : 0,
      0.03
    );
  });

  return pointsRef.current ? <primitive object={pointsRef.current} /> : null;
}

function AtmosphericLight({ scrollProgress, chapterIndex, isLoaded }: { scrollProgress: number; chapterIndex: number; isLoaded: boolean }) {
  const lightRef = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const group = new THREE.Group();
    
    const radialGeometry = new THREE.RingGeometry(0.1, 2.5, 64);
    const radialMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uChapterProgress: { value: 0 },
        uColorA: { value: BASE_COLORS.void },
        uColorB: { value: CHAPTER_COLORS[0] },
        uIntensity: { value: isLoaded ? 1 : 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uChapterProgress;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uIntensity;
        
        void main() {
          float dist = length(vUv - 0.5) * 2.0;
          float ring = smoothstep(0.95, 1.0, dist) * smoothstep(0.3, 0.1, dist);
          
          float pulse = sin(uTime * 0.4) * 0.2 + 0.8;
          float breathe = sin(uTime * 0.2 + dist * 10.0) * 0.15 + 0.85;
          
          vec3 color = mix(uColorA, uColorB, uChapterProgress);
          float alpha = ring * pulse * breathe * uIntensity * 0.12;
          alpha *= smoothstep(0.1, 0.5, uScrollProgress);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    
    const radialMesh = new THREE.Mesh(radialGeometry, radialMaterial);
    radialMesh.rotation.x = -Math.PI / 2;
    radialMesh.position.z = -3;
    group.add(radialMesh);
    
    const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uChapterProgress: { value: 0 },
        uColorA: { value: BASE_COLORS.void },
        uColorB: { value: CHAPTER_COLORS[0] },
        uIntensity: { value: isLoaded ? 1 : 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uChapterProgress;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uIntensity;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          float pulse = sin(uTime * 0.3) * 0.15 + 0.85;
          vec3 color = mix(uColorA, uColorB, uChapterProgress);
          float alpha = fresnel * pulse * uIntensity * 0.08;
          alpha *= smoothstep(0.0, 0.4, uScrollProgress);
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.z = -2.5;
    group.add(glowMesh);
    
    lightRef.current = group;
  }, [viewport.width, viewport.height]);

  useFrame((_state, delta) => {
    if (!lightRef.current) return;
    
    const radialMesh = lightRef.current.children[0] as THREE.Mesh;
    const glowMesh = lightRef.current.children[1] as THREE.Mesh;
    
    const targetChapter = Math.min(chapterIndex, CHAPTER_COLORS.length - 1);
    const chapterProgress = (scrollProgress * (CHAPTER_COLORS.length - 1)) % 1;
    
    [radialMesh, glowMesh].forEach(mesh => {
      const material = mesh.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value += delta;
      material.uniforms.uScrollProgress.value = scrollProgress;
      material.uniforms.uChapterProgress.value = chapterProgress;
      
      const colorA = BASE_COLORS.void;
      const colorB = CHAPTER_COLORS[targetChapter];
      material.uniforms.uColorA.value = colorA;
      material.uniforms.uColorB.value = colorB;
      material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        material.uniforms.uIntensity.value,
        isLoaded ? 1 : 0,
        0.04
      );
    });
    
    lightRef.current.rotation.z += delta * 0.005;
  });

  return lightRef.current ? <primitive object={lightRef.current} /> : null;
}

function DarkForm({ scrollProgress, isLoaded }: { scrollProgress: number; isLoaded: boolean }) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(0.8, 3);
    const positions = geometry.attributes.position.array as Float32Array;
    const displacement = new Float32Array(positions.length);
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      displacement[i] = x / len;
      displacement[i + 1] = y / len;
      displacement[i + 2] = z / len;
    }
    geometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));
    
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uIntensity: { value: isLoaded ? 1 : 0 },
        uColor: { value: new THREE.Color('#1a0a0f') },
      },
      vertexShader: `
        attribute vec3 displacement;
        varying vec3 vNormal;
        varying float vDisplacement;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uIntensity;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          float noise = sin(uTime * 0.2 + position.x * 3.0 + position.y * 3.0 + position.z * 3.0) * 0.15;
          float morph = smoothstep(0.0, 0.5, uScrollProgress) * uIntensity;
          vec3 newPos = position + displacement * noise * morph;
          vDisplacement = noise * morph;
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying float vDisplacement;
        uniform vec3 uColor;
        uniform float uIntensity;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.5);
          float alpha = fresnel * uIntensity * 0.4;
          alpha *= smoothstep(0.3, 0.8, uScrollProgress);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-1.5, 0, -2);
    meshRef.current = mesh;
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value += delta;
    material.uniforms.uScrollProgress.value = scrollProgress;
    material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      material.uniforms.uIntensity.value,
      isLoaded ? 1 : 0,
      0.05
    );
    meshRef.current.rotation.y += delta * 0.03;
    meshRef.current.rotation.x += delta * 0.02;
  });

  return meshRef.current ? <primitive object={meshRef.current} /> : null;
}

function LuminousForm({ scrollProgress, isLoaded }: { scrollProgress: number; isLoaded: boolean }) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const geometry = new THREE.IcosahedronGeometry(0.6, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: scrollProgress },
        uIntensity: { value: isLoaded ? 1 : 0 },
        uColor: { value: new THREE.Color('#D5CEC3') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uIntensity;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          float pulse = sin(uTime * 0.5) * 0.05 + 1.0;
          float morph = smoothstep(0.5, 1.0, uScrollProgress) * uIntensity;
          vec3 newPos = position * pulse * (1.0 + morph * 0.2);
          vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uColor;
        uniform float uIntensity;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
          float pulse = sin(vPosition.x * 5.0 + vPosition.y * 5.0) * 0.1 + 0.9;
          float alpha = fresnel * pulse * uIntensity * 0.3;
          alpha *= smoothstep(0.5, 1.0, uScrollProgress);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.5, 0.5, -2);
    meshRef.current = mesh;
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value += delta;
    material.uniforms.uScrollProgress.value = scrollProgress;
    material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      material.uniforms.uIntensity.value,
      isLoaded ? 1 : 0,
      0.05
    );
    meshRef.current.rotation.y -= delta * 0.04;
    meshRef.current.rotation.z += delta * 0.02;
  });

  return meshRef.current ? <primitive object={meshRef.current} /> : null;
}

function Scene({ scrollProgress, chapterIndex, isLoaded }: WebGLCanvasProps) {
  return (
    <>
      <color attach="background" args={['#070608']} />
      <fog attach="fog" args={['#070608', 5, 15]} />
      
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={50}
        near={0.1}
        far={100}
      />
      
      <AtmosphericLight scrollProgress={scrollProgress} chapterIndex={chapterIndex} isLoaded={isLoaded} />
      <PetalGeometry scrollProgress={scrollProgress} chapterIndex={chapterIndex} isLoaded={isLoaded} />
      <Particles scrollProgress={scrollProgress} isLoaded={isLoaded} />
      <DarkForm scrollProgress={scrollProgress} isLoaded={isLoaded} />
      <LuminousForm scrollProgress={scrollProgress} isLoaded={isLoaded} />
    </>
  );
}

export function WebGLCanvas({ scrollProgress, chapterIndex, isLoaded }: WebGLCanvasProps) {
  const isReducedMotion = useReducedMotion();
  
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 bg-void" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-root/30 via-obsidian to-void" />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} chapterIndex={chapterIndex} isLoaded={isLoaded} />
      </Suspense>
    </Canvas>
  );
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reduced;
}

import { useState } from 'react';