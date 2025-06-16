import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'
import { DoubleSide } from 'three';


const store = createXRStore({

});

export default function App() {

  return <>
    <button  onClick={() =>store.enterVR() }>Enter VR</button>
    <Canvas  >
      <XR   store={store}>
        <Box/>
        <Floor/>
      </XR>
    </Canvas>
  </>
}


function Floor(){
  return  <mesh position={[0,-1,0]} rotation={[Math.PI / 2, 0, 0]} scale={[8,8,8]} >
            <planeGeometry  />
            <meshBasicMaterial color="white" side={DoubleSide} />
          </mesh>
}

function Box(){
  const [red, setRed] = useState(false); 
  return <mesh scale={[0.2,0.2,0.2]} pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1.3, 6]}>
            <boxGeometry   />
            <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
}