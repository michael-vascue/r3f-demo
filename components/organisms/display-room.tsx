import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from 'react'
import { Frame, Dome, Camera } from '..'
import { getMaxWidth } from '../../utils'
import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'
import '@google/model-viewer'

export const DisplayRoom = (): JSX.Element => {
  const [items, setItems] = useState([])
  const [itemSize, setItemSize] = useState(6)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const itemHeight = 1.2
  const itemWidth = 1
  const itemCenter = items.length / 2
  const radius = itemCenter
  const margin = 0.3
  const semicircleRadian = Math.PI / items.length
  const maxItemOnLine = getMaxWidth(items.length)
  let currentIndex = 0
  let y = items.length < 5 ? 0 : items.length / maxItemOnLine / 2

  useEffect(() => {
    const newItems = Array.from(Array(itemSize).keys()).map((_, index) => ({
      name: `Spacesuit ${index}`,
      url: '/spacesuit.png',
      model: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    }))

    setItems(newItems)
  }, [itemSize])

  const frames = () =>
    items.map((item, index) => {
      if (index !== 0 && index % maxItemOnLine === 0) {
        y -= itemHeight + margin
        currentIndex = 1
      } else {
        currentIndex++
      }

      const radianInterval = (currentIndex / items.length) * Math.PI
      let rotateY = 0
      let x = Math.cos(radianInterval + currentIndex) * radius
      let z = radius

      if (items.length >= 3) {
        rotateY = (itemCenter - currentIndex) * semicircleRadian
        x = Math.cos(radianInterval) * radius 
        z = Math.sin(radianInterval) * radius 
      }

      return (
        <Frame
          height={itemHeight}
          width={itemWidth}
          key={index.toString()}
          position={[x, y, z]}
          url={item.url}
          content={item.name}
          rotation={[0, rotateY, 0]}
          onClick={() => {
            setSelectedItem(item)
            setShowDialog(true)
          }}
        />
      )
    })

  return (
    <>
      <Canvas style={{ width: `100%`, height: '100vh' }}>
        <Camera
          position={[1, 0, 0]}
          near={0.1}
          zoom={1}
          fov={100}
        />
        <ambientLight intensity={1} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={`loading`}>
          <Dome url="/bg01.webp" />
          {frames()}
        </Suspense>
        <Html position={[0, -1, 0]}>
          <input
            type="range"
            min="2"
            max="100"
            value={itemSize}
            onChange={(event) => setItemSize(+event.target.value)}
          />
        </Html>
        <OrbitControls />
      </Canvas>

      <Dialog
        isOpen={showDialog}
        aria-label="model"
        onDismiss={() => setShowDialog(false)}
        style={{ width: '100vw', height: '100vh', margin: '0', padding: '0', backgroundColor: 'transparent' }}
      >
        <button className="close-button" onClick={() => setShowDialog(false)}>
          <span aria-hidden>×</span>
        </button>
        <model-viewer
          style={{ height: '100%', width: '100%' }}
          auto-rotate={true}
          autoplay={true}
          camera-controls={true}
          environment-intensity="2"
          exposure="2"
          neutral
          shadow-intensity={1}
          src={selectedItem?.model}
          stage-light-intensity="3"
        />
      </Dialog>
    </>
  )
}
