"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState, type MutableRefObject } from "react";
import { CameraRig } from "./camera-rig";
import { HeroScene } from "./hero-scene";
import { Particles } from "./particles";

type SceneCanvasProps = {
  scrollRef: MutableRefObject<number>;
  isMobile: boolean;
};

export default function SceneCanvas({ scrollRef, isMobile }: SceneCanvasProps) {
  const [degraded, setDegraded] = useState(false);
  const bloomEnabled = !isMobile && !degraded;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={degraded ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <PerformanceMonitor onDecline={() => setDegraded(true)} />

        <fog attach="fog" args={["#030306", 14, 32]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 4, 6]} intensity={120} color="#818cf8" />
        <pointLight position={[-6, -2, 4]} intensity={80} color="#a78bfa" />
        <pointLight position={[8, -3, 2]} intensity={55} color="#22d3ee" />
        <pointLight position={[0, -4, 6]} intensity={40} color="#6366f1" />
        <directionalLight position={[0, 6, 8]} intensity={0.9} color="#c7d2fe" />

        <CameraRig scrollRef={scrollRef} parallax={!isMobile} />
        <HeroScene scrollRef={scrollRef} isMobile={isMobile} />
        <Particles count={isMobile ? 450 : 1400} />

        {bloomEnabled && (
          <EffectComposer>
            <Bloom
              intensity={0.75}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
