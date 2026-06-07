"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,              // Slightly faster interpolation = fewer frames of scroll animation = less time competing with 3D render loops
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
