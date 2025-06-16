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
  return  <mesh position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]} scale={[6,6,6]} >
            <planeGeometry  />
            <meshBasicMaterial color="red" side={DoubleSide} />
          </mesh>
}

function Box(){
  const [red, setRed] = useState(false); 
  return <mesh  pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry  scale={[1,1,1]} />
            <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
}