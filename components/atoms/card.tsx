import React, { useState } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import { Html, useCursor, useTexture } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const { PI, sin, cos } = Math

export interface CardInfo {
  url: string
  model: string
  name: string
}

interface CardProps extends GroupProps {
  initialPoint: number
  count: number
  radius: number
  yAxis: number
  info: { url: string; model: string; name: string }
  onClick: () => void
  showDialog: boolean
}

export const Card: React.FC<CardProps> = ({
  initialPoint,
  count,
  radius,
  yAxis: y,
  info,
  onClick,
  showDialog,
  ...props
}) => {
  const map = useTexture({ map: info.url })

  const cardHeight = (10 * radius) / 50
  const cardWidth = (10 * radius) / 50
  const rotateY = (initialPoint / count) * PI
  const x = radius * sin((initialPoint / count) * PI)
  const z = radius * cos((initialPoint / count) * PI)
  const cardPosition = new THREE.Vector3(x, y, z)

  const [active, setActive] = useState(false)
  const [zoom, setZoom] = useState(false)

  useCursor(active)

  useFrame((state) => {
    if (!showDialog) {
      setZoom(false)
    }

    if (zoom) {
      state.camera.lookAt(cardPosition) // TODO: animation (need to sync with useSpring)
    }
  })

  const { scale } = useSpring({
    scale: active ? 2 : 1,
    config: config.gentle,
  })

  return (
    <group {...props} position={[x, y, z]} rotation={[0, rotateY, 0]}>
      <animated.mesh
        scale={scale}
        onClick={() => {
          setZoom(true)
          onClick()
        }}
        onPointerOver={() => setActive(!active)}
        onPointerOut={() => {
          setActive(!active)
        }}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[cardWidth, cardHeight, 0.01]}
        />
        <meshStandardMaterial attach="material" {...map} transparent={true} />
      </animated.mesh>

      <Html position={[0, 0.22, 0]} center hidden={!active}>
        <div
          className="content"
          hidden={!active}
          style={{
            backgroundColor: '#333333',
            textAlign: 'center',
            color: '#ffffff',
            borderRadius: '3px',
            padding: '0.5rem 1.5rem',
          }}
        >
          {info.name}
        </div>
      </Html>
    </group>
  )
}
