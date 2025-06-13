import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'

const store = createXRStore();

export default function App() {
  const [red, setRed] = useState(false);
  const buttonRef = useRef(null);

  useEffect(function(){
    // if (buttonRef.current != null) {
    //   buttonRef.current?.click?.()
    // }

  },[])

  return <>
    <button ref={buttonRef} onClick={() =>store.enterVR() }>Enter AR</button>
    <Canvas onLoad={()=>{store.enterVR()}} >
      <XR store={store}>
        <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
          <boxGeometry />
          <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
      </XR>
    </Canvas>
  </>
}
