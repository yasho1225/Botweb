"use client";

import { useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { MathUtils } from "three";

type CameraRigProps = {
  scrollRef: MutableRefObject<number>;
  parallax?: boolean;
};

/**
 * Mouse-based parallax + scroll-linked dolly. The camera drifts toward the
 * pointer and gently pulls back / tilts down as the page scrolls.
 */
export function CameraRig({ scrollRef, parallax = true }: CameraRigProps) {
  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    const px = parallax ? state.pointer.x : 0;
    const py = parallax ? state.pointer.y : 0;

    const targetX = px * 0.65;
    const targetY = -py * 0.4 - scroll * 2.2;
    const targetZ = 9 + scroll * 3.5;

    // Frame-rate independent lerp
    const t = 1 - Math.exp(-3.2 * Math.min(delta, 0.05));
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, t);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, t);
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, t);
    state.camera.lookAt(0, -scroll * 3, 0);
  });

  return null;
}
