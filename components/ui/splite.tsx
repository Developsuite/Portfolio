'use client'

import { Suspense, lazy, useRef, useCallback, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /** When false, the Spline render loop is paused to free GPU/CPU */
  active?: boolean
}

export function SplineScene({ scene, className, active = true }: SplineSceneProps) {
  const splineRef = useRef<any>(null);
  const isActiveRef = useRef(active);

  // Keep ref in sync
  isActiveRef.current = active;

  // When the Spline app loads, reduce its internal render quality for better performance
  const onLoad = useCallback((splineApp: any) => {
    splineRef.current = splineApp;
    // Spline's internal renderer — lower pixel ratio to reduce GPU load
    if (splineApp?._renderer) {
      splineApp._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }
    // If we loaded while not active, immediately stop
    if (!isActiveRef.current) {
      try { splineApp.stop(); } catch (_) {}
    }
  }, []);

  // Pause/resume Spline render loop based on active prop
  useEffect(() => {
    const app = splineRef.current;
    if (!app) return;
    try {
      if (active) {
        app.play();
      } else {
        app.stop();
      }
    } catch (_) {
      // Spline API may not expose stop/play on all versions
    }
  }, [active]);

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
      />
    </Suspense>
  )
}
