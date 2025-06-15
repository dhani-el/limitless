import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'


const store = createXRStore({

});

export default function App() {
  const [red, setRed] = useState(false);




  return <>
    <button  onClick={() =>store.enterVR() }>Enter VR</button>
    <Canvas  >
      <XR   store={store}>

        <mesh  pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
          <boxGeometry />
          <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>

        <mesh rotateZ={90} >
          <planeGeometry  scale={[5,10]} />
          <meshBasicMaterial color={"white"} />
        </mesh>
      </XR>
    </Canvas>
  </>
}
