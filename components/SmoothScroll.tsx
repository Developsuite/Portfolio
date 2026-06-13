"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,             // Slower interpolation for smoother heavier feel
        duration: 1.2,          // Longer scroll duration for buttery smoothness
        smoothWheel: true,      // Smooth mouse wheel
        syncTouch: false,       // Disable on touch to keep native momentum
        touchMultiplier: 2,     // Responsive touch scrolling
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
