import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState } from 'react'

const store = createXRStore();

export default function App() {
  const [red, setRed] = useState(false)
  return <>
    <button onClick={() => store.enterVR()}>Enter AR</button>
    <Canvas>
      <XR store={store}>
        <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
          <boxGeometry />
          <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
      </XR>
    </Canvas>
  </>
}
