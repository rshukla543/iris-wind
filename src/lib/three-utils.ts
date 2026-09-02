import * as THREE from 'three';

export const CHAPTER_COLORS = [
  new THREE.Color('#5B111E'), 
  new THREE.Color('#A94718'), 
  new THREE.Color('#B98227'), 
  new THREE.Color('#285248'), 
  new THREE.Color('#18576B'), 
  new THREE.Color('#30245F'), 
  new THREE.Color('#67428D'), 
] as const;

export const BASE_COLORS = {
  void: new THREE.Color('#070608'),
  obsidian: new THREE.Color('#101012'),
  charcoal: new THREE.Color('#191719'),
  ivory: new THREE.Color('#F1ECE4'),
  warmMist: new THREE.Color('#D5CEC3'),
} as const;

export function createPetalGeometry(petalCount: number, radius: number, depth: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(petalCount * 3 * 3);
  const uvs = new Float32Array(petalCount * 2 * 3);
  const indices = new Uint16Array(petalCount * 3);

  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const nextAngle = ((i + 1) % petalCount) / petalCount * Math.PI * 2;
    
    const x1 = Math.cos(angle) * radius;
    const y1 = Math.sin(angle) * radius;
    const x2 = Math.cos(nextAngle) * radius;
    const y2 = Math.sin(nextAngle) * radius;
    const cx = 0;
    const cy = 0;
    const midAngle = angle + (nextAngle - angle) * 0.5;
    const mx = Math.cos(midAngle) * radius * 1.3;
    const my = Math.sin(midAngle) * radius * 1.3;

    const baseIndex = i * 9;
    positions[baseIndex] = cx;
    positions[baseIndex + 1] = cy;
    positions[baseIndex + 2] = 0;
    positions[baseIndex + 3] = x1;
    positions[baseIndex + 4] = y1;
    positions[baseIndex + 5] = 0;
    positions[baseIndex + 6] = mx;
    positions[baseIndex + 7] = my;
    positions[baseIndex + 8] = depth * (Math.random() * 0.5 + 0.5);

    uvs[i * 6] = 0.5;
    uvs[i * 6 + 1] = 0.5;
    uvs[i * 6 + 2] = 0;
    uvs[i * 6 + 3] = 0;
    uvs[i * 6 + 4] = 1;
    uvs[i * 6 + 5] = 0;

    indices[i * 3] = i * 3;
    indices[i * 3 + 1] = i * 3 + 1;
    indices[i * 3 + 2] = i * 3 + 2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();

  return geometry;
}

export function createParticleGeometry(count: number, radius: number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const speeds = new Float32Array(count);
  const angles = new Float32Array(count);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.5) * radius;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 0.5;
    sizes[i] = Math.random() * 2 + 0.5;
    alphas[i] = Math.random() * 0.5 + 0.1;
    speeds[i] = Math.random() * 0.0005 + 0.0001;
    angles[i] = angle;
    radii[i] = r;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
  geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('baseAngle', new THREE.BufferAttribute(angles, 1));
  geometry.setAttribute('baseRadius', new THREE.BufferAttribute(radii, 1));

  return geometry;
}

export function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, t);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}