import { Canvas,useLoader } from '@react-three/fiber'
import { DefaultXRController, XR, createXRStore,useXRInputSourceStateContext } from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, Clone } from '@react-three/drei';
import "./index.css"

const store = createXRStore({
  layers:false,
  hand:{rayPointer:{rayModel:{color:"red"}}},
});

export default function App() {
  return <>
    <button  onClick={() =>store.enterVR() }>Enter VR</button>
    <Canvas  >
      <XR  store={store}>
        <ambientLight intensity={1} />
        <directionalLight color="white" position={[0, 1, 0]} />
        <Floor/>
        <Targets />
      </XR>
    </Canvas>
  </>
}


function Floor(){
  const model = useLoader(GLTFLoader,"spacestation.glb")
  return <mesh position={[0,0.5,0]} >
            <primitive  object={model.scene} />
          </mesh>
}

function Box(){
  const [red, setRed] = useState(false); 
  return <mesh scale={[0.2,0.2,0.2]}  onClick={() => setRed(!red)} position={[0, 1.1, 1]}>
            <boxGeometry   />
            <meshBasicMaterial color={red ? 'red' : 'green'} />
        </mesh>
}

function Target({scale=0.2,side=0.5,height=2}){
  const model = useLoader(GLTFLoader,"target.glb")
  return <mesh scale={[scale,scale,scale]} position={[side,height,-2]} >
            <primitive  object={model.scene} />
          </mesh>
}

function Targets({amount=[1,2,3,4],}){
  const model = useLoader(GLTFLoader,"target.glb")

  return <>
            {
              amount.map(function(value,index){
                    return <Clone  object={model.scene} scale={[0.2,0.2,0.2]} position={[-index/2,(2+Math.random() ),-2]} />
              })
            }
  </>
}