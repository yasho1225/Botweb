"use client";

import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import { MathUtils, type Group, type Mesh } from "three";

type HeroSceneProps = {
  scrollRef: MutableRefObject<number>;
  isMobile?: boolean;
};

/**
 * Brand centerpiece: a liquid-metal AI core wrapped in a holographic shell,
 * with neon orbit rings and chrome satellite nodes — the network of local
 * orgs around the tech. The system spins with scroll, drifts toward the
 * pointer (magnetic), and hands focus to the content as the page scrolls.
 */

const SATELLITES = [
  { radius: 1.9, speed: 0.42, phase: 0, tilt: 0.5, size: 0.13, color: "#e2e8f0", emissive: "#818cf8", intensity: 0.25 },
  { radius: 1.9, speed: 0.42, phase: Math.PI, tilt: 0.5, size: 0.09, color: "#22d3ee", emissive: "#22d3ee", intensity: 0.9 },
  { radius: 2.45, speed: -0.3, phase: 1.1, tilt: -0.35, size: 0.11, color: "#c4b5fd", emissive: "#a78bfa", intensity: 0.7 },
  { radius: 2.45, speed: -0.3, phase: 3.9, tilt: -0.35, size: 0.07, color: "#e2e8f0", emissive: "#c7d2fe", intensity: 0.4 },
];

function AICore({ scrollRef, isMobile }: { scrollRef: MutableRefObject<number>; isMobile: boolean }) {
  const system = useRef<Group>(null);
  const shell = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const satRefs = useRef<(Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const d = Math.min(delta, 0.05);

    if (system.current) {
      // Scroll-linked spin + slow idle rotation
      system.current.rotation.y = t * 0.06 + scroll * Math.PI * 1.4;

      // Magnetic attraction toward the pointer (desktop only)
      if (!isMobile) {
        const k = 1 - Math.exp(-2.4 * d);
        system.current.position.x = MathUtils.lerp(
          system.current.position.x,
          state.pointer.x * 0.45,
          k,
        );
        system.current.position.y = MathUtils.lerp(
          system.current.position.y,
          state.pointer.y * 0.3,
          k,
        );
      }
    }

    // Holographic shell counter-rotates
    if (shell.current) {
      shell.current.rotation.y = -t * 0.12;
      shell.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }

    // Rings precess slowly
    if (ringA.current) ringA.current.rotation.z = t * 0.1;
    if (ringB.current) ringB.current.rotation.z = -t * 0.08;

    // Satellites orbit with a gentle vertical bob
    SATELLITES.forEach((s, i) => {
      const m = satRefs.current[i];
      if (!m) return;
      const a = t * s.speed + s.phase;
      m.position.set(
        Math.cos(a) * s.radius,
        Math.sin(a) * s.radius * Math.sin(s.tilt) + Math.sin(t * 0.8 + s.phase) * 0.08,
        Math.sin(a) * s.radius * Math.cos(s.tilt),
      );
    });
  });

  return (
    <group ref={system}>
      {/* Liquid-metal core */}
      <mesh>
        <sphereGeometry args={[1.02, 64, 64]} />
        <MeshDistortMaterial
          color="#151527"
          metalness={0.95}
          roughness={0.1}
          emissive="#5b21b6"
          emissiveIntensity={0.65}
          distort={0.35}
          speed={1.8}
        />
      </mesh>

      {/* Holographic wireframe shell */}
      <mesh ref={shell} scale={1.42}>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Neon orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2 - 0.5, 0, 0]}>
        <torusGeometry args={[1.9, 0.018, 12, 96]} />
        <meshStandardMaterial
          color="#14141f"
          emissive="#818cf8"
          emissiveIntensity={2.2}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2 + 0.35, 0.2, 0]}>
        <torusGeometry args={[2.45, 0.014, 12, 96]} />
        <meshStandardMaterial
          color="#14141f"
          emissive="#22d3ee"
          emissiveIntensity={1.4}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Chrome satellite nodes — the orgs in orbit */}
      {SATELLITES.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            satRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[s.size, 24, 24]} />
          <meshStandardMaterial
            color={s.color}
            metalness={0.95}
            roughness={0.08}
            emissive={s.emissive}
            emissiveIntensity={s.intensity}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene({ scrollRef, isMobile = false }: HeroSceneProps) {
  const group = useRef<Group>(null);
  const viewport = useThree((s) => s.viewport);
  const scale = Math.min(1, viewport.width / 13);

  useFrame((state) => {
    if (!group.current) return;
    const scroll = scrollRef.current;
    // Move up faster so the 3D exits the viewport before mid-page sections
    group.current.position.y = scroll * 9;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    // Fade out as user scrolls past the hero (0–20% = full, 20–35% = fade)
    group.current.visible = scroll < 0.38;
  });

  return (
    <group ref={group} scale={scale}>
      <Environment preset="city" environmentIntensity={0.35} />

      {/* Ambient drifting motes */}
      <Sparkles
        count={isMobile ? 40 : 90}
        scale={[18, 11, 8]}
        size={1.6}
        speed={0.25}
        opacity={0.35}
        color="#a5b4fc"
      />

      {/* Brand centerpiece — offset right so it frames the headline */}
      <group position={isMobile ? [0, 3.4, -4.5] : [4.6, 0.9, -2.6]} scale={isMobile ? 0.7 : 1}>
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.7}>
          <AICore scrollRef={scrollRef} isMobile={isMobile} />
        </Float>
      </group>

      {/* Small chrome accent — lower right, below the orbit system */}
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={0.9}>
        <mesh position={[6.2, -3.2, -1.8]}>
          <octahedronGeometry args={[0.44]} />
          <meshStandardMaterial
            color="#c4b5fd"
            metalness={0.6}
            roughness={0.25}
            emissive="#7c3aed"
            emissiveIntensity={0.55}
            flatShading
          />
        </mesh>
      </Float>

      {/* Tiny torus — upper right corner accent */}
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh position={[7.5, 2.8, -4]}>
          <torusGeometry args={[0.35, 0.1, 12, 32]} />
          <meshStandardMaterial
            color="#14141f"
            metalness={0.95}
            roughness={0.12}
            emissive="#22d3ee"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}
