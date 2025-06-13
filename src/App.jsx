import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'


const store = createXRStore();
export default function App() {
  const [red, setRed] = useState(false);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const xrRef = useRef(null);

useEffect(function(){
  if (canvasRef.current != null  && xrRef.current != null) {
    console.log("canvas has loaded");
    store.enterVR()
  }
},[canvasRef,xrRef])

  return <>
    <button ref={buttonRef} onClick={() =>store.enterVR() }>Enter VR</button>
    <Canvas  ref={canvasRef}  >
      <XR  store={store}>
        <mesh ref={xrRef} pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
          <boxGeometry />
          <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
      </XR>
    </Canvas>
  </>
}
