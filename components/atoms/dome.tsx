import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const Dome = (props) => {
  const map = useTexture({ map: props.url })
  
  return (
    <mesh
      {...props}
      scale={[- 1, 1, 1]}
    >
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} /> 
      <meshBasicMaterial
        attach="material"
        {...map}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

