/* eslint-disable no-console */
import { useState } from 'react'
import { useSpring, animated, config } from "@react-spring/three";
import { Html, useTexture } from '@react-three/drei';

export const Frame = ({ url, height, width, content, onClick, ...props}) => {
  const map = useTexture({ map: url })
  
  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.gentle
  });

  return (
    <animated.mesh
      {...props}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => { setActive(!active) }}
      onPointerOut={() => { setActive(!active) }}
    >
      {/* 3D */}
      <boxBufferGeometry attach="geometry" args={[width, height, 0.05]}/>

      {/* 2D */}
      {/* <planeGeometry attach="geometry" args={[1, 1]}/>  */}
      <meshStandardMaterial
        attach="material"
        {...map}
        transparent={false}
      />
      <Html position={[0, 1, 0]} center hidden={!active}>
        <div className="content" hidden={!active} style={{textAlign: 'center'}}>
          {content}
        </div>
      </Html>
    </animated.mesh>
  )
}

