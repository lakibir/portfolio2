"use client";

import { Suspense, useMemo } from "react";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Torus, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

function ProfileImageCard({ imageSrc }: { imageSrc: string }) {
  const texture = useTexture(imageSrc);

  useMemo(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.6}>
      <group position={[0, 0.1, 1.25]} rotation={[0.15, 0.4, -0.06]}>
        <mesh>
          <planeGeometry args={[1.95, 2.45]} />
          <meshStandardMaterial color="#f47423" metalness={0.35} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.8, 2.3]} />
          <meshStandardMaterial map={texture} metalness={0.05} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene({ imageSrc }: { imageSrc: string }) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 4, 3]} intensity={3} />
      <Float speed={2} rotationIntensity={1.2} floatIntensity={2}>
        <Sphere args={[1.1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#f47423"
            roughness={0.08}
            metalness={0.18}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
      <Float speed={2.4} rotationIntensity={1.8} floatIntensity={3}>
        <Torus args={[1.9, 0.12, 24, 100]} rotation={[1.2, 0.5, 0.4]}>
          <meshStandardMaterial color="#f3ebe1" emissive="#f3ebe1" emissiveIntensity={0.18} />
        </Torus>
      </Float>
      <Suspense fallback={null}>
        <ProfileImageCard imageSrc={imageSrc} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.1} />
    </>
  );
}

export function HeroCanvas({ imageSrc }: { imageSrc: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 46 }} dpr={[1, 1.8]}>
      <Scene imageSrc={imageSrc} />
    </Canvas>
  );
}
