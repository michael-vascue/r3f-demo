import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Camera, Dome } from '..'
import { CardDialog, CardWall } from '../molecules'
import { useCardDialog } from '../../hooks'

export const DisplayRoom = (): JSX.Element => {
  const { setShowDialog, showDialog, setSelectedCard } = useCardDialog()
  
  return (
    <>
      <Canvas style={{ width: `100%`, height: '100vh' }}>
        <Camera fov={20} position={[1, 0, 0]} />
        <directionalLight position={[-60, 10, 5]} color="#1a1a1a" />

        <ambientLight color="#fbfbfb" />
        <Suspense fallback={null}>
          <Dome url="/planet.png" />
          <CardWall
            count={10}
            radius={1}
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            setSelectedCard={setSelectedCard}
          />
        </Suspense>
      </Canvas>

      <CardDialog />
    </>
  )
}
