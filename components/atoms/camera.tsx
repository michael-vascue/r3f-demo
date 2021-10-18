import { PerspectiveCameraProps, useThree } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { PerspectiveCamera } from 'three'

export const Camera = (props: PerspectiveCameraProps): JSX.Element => {
  const cameraRef = useRef()
  const set = useThree(({ set }) => set)
  const size = useThree(({ size }) => size)

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const camera = cameraRef.current as PerspectiveCamera
      camera.aspect = size.width / size.height
      camera.updateProjectionMatrix()
    }
  }, [size, props])

  useLayoutEffect(() => {
    set({ camera: cameraRef.current })
  }, [])

  return <perspectiveCamera ref={cameraRef} {...props} />
}
