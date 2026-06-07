'use client'

import { Suspense, lazy, useRef, useCallback } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const splineRef = useRef<any>(null);

  // When the Spline app loads, reduce its internal render quality for better performance
  const onLoad = useCallback((splineApp: any) => {
    splineRef.current = splineApp;
    // Spline's internal renderer — lower pixel ratio to reduce GPU load
    if (splineApp?._renderer) {
      splineApp._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }
  }, []);

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
