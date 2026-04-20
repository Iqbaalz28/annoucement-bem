import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Floating particles that react to mouse ──
function ParticleField() {
  const count = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10 - 2,
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
        colorType: Math.random(), // 0-0.5 green, 0.5-0.8 gold, 0.8-1 light
      });
    }
    return arr;
  }, []);

  // Pre-compute colors
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      const color = new THREE.Color();
      if (p.colorType < 0.5) {
        color.setHSL(0.35, 0.5, 0.55); // Soft green
      } else if (p.colorType < 0.8) {
        color.setHSL(0.12, 0.7, 0.6); // Gold
      } else {
        color.setHSL(0.3, 0.3, 0.75); // Light sage
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    });
    return colors;
  }, [particles]);

  useFrame(({ clock, pointer }) => {
    mouseRef.current.x += (pointer.x * 2 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 2 - mouseRef.current.y) * 0.02;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const floatY = Math.sin(t * p.speed * 100 + p.offset) * 0.3;
      const floatX = Math.cos(t * p.speed * 80 + p.offset) * 0.2;
      dummy.position.set(
        p.x + floatX + mouseRef.current.x * 0.3,
        p.y + floatY + mouseRef.current.y * 0.3,
        p.z
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + p.offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#66BB6A" transparent opacity={0.35} />
    </instancedMesh>
  );
}

// ── Floating geometric shapes ──
function FloatingGeometry({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed * 0.5;
    meshRef.current.rotation.y = t * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.12}
        wireframe
      />
    </mesh>
  );
}

// ── Ambient glow ring ──
function GlowRing() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRef.current.rotation.z = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusGeometry args={[4, 0.02, 16, 100]} />
      <meshBasicMaterial color="#F9A825" transparent opacity={0.2} />
    </mesh>
  );
}

export default function Background3D() {
  return (
    <div className="background-3d">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#81C784" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#FFD54F" />

        <ParticleField />
        <GlowRing />

        <FloatingGeometry position={[-5, 3, -3]} color="#66BB6A" speed={0.4} />
        <FloatingGeometry position={[5, -2, -4]} color="#FFD54F" speed={0.3} />
        <FloatingGeometry position={[-3, -4, -2]} color="#81C784" speed={0.5} />
        <FloatingGeometry position={[4, 4, -5]} color="#A5D6A7" speed={0.35} />
        <FloatingGeometry position={[0, -5, -3]} color="#FFF176" speed={0.45} />
      </Canvas>
    </div>
  );
}
