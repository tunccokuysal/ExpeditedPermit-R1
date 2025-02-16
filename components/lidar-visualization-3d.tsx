"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Points } from "@react-three/drei"
import type * as THREE from "three"

function PointCloud() {
  const pointsRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array | null>(null)

  useEffect(() => {
    const newPositions = new Float32Array(10000 * 3)
    for (let i = 0; i < newPositions.length; i += 3) {
      newPositions[i] = (Math.random() - 0.5) * 10
      newPositions[i + 1] = (Math.random() - 0.5) * 10
      newPositions[i + 2] = (Math.random() - 0.5) * 10
    }
    setPositions(newPositions)
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.001
      pointsRef.current.rotation.y += 0.002
    }
  })

  if (!positions) return null

  return (
    <Points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00ff00" sizeAttenuation={true} />
    </Points>
  )
}

export function LIDARVisualization3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <PointCloud />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

