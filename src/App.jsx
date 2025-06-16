import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'


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
  return  <mesh  >
              <planeGeometry rotateX={-Math.PI / 2}  scale={[6,6]} />
              <meshBasicMaterial color={"white"} />
          </mesh>
}

function Box(){
  const [red, setRed] = useState(false); 
  return <mesh  pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
            <boxGeometry  scale={[1,1,1]} />
            <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
}