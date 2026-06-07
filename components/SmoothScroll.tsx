"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,            // 0.08 is the sweet spot for responsiveness and smoothness without feeling "heavy"
        smoothWheel: true,     // Smooth mouse wheel
        syncTouch: false,      // Disable on touch to keep native momentum
        touchMultiplier: 2,    // Responsive touch scrolling
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
