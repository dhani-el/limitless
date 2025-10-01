import { Canvas,useFrame,useLoader } from '@react-three/fiber'
import { XR,VRButton,useXR,Controllers,Hands,useController} from '@react-three/xr'
import { useState,useEffect, useRef } from 'react'
import { DoubleSide } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, Clone,Line,OrbitControls } from '@react-three/drei';
import "./index.css"


export default function App() {

  return <>
    <VRButton/>
    <Canvas  >
      <XR>
        <Environment preset='warehouse' />
        <ambientLight intensity={1} />
        <directionalLight color="white" position={[0, 1, 0]} />
        {/* <Controllers/> */}
        <CustomController handedness={"left"}/>
        <CustomController handedness={"right"}/>
        <Hands/>
        <Floor/>
        <Targets />
        <OrbitControls/>
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

function CustomController({ handedness }) {
  const  controller  = useController(handedness); // "left" or "right"
  const model = useLoader(GLTFLoader,'blaster.glb'); // replace with your file
  const ref = useRef(null);

  useFrame(() => {
    if (controller && ref.current) {
      // Copy position & rotation from XR controller grip
      ref.current.position.copy(controller.grip.position)
      ref.current.quaternion.copy(controller.grip.quaternion)
    }
  })

  if (!controller) return null

  return (
    <Clone
      ref={ref}
      object={model.scene}
      position={controller.grip.position}
      quaternion={controller.grip.quaternion}
    />
  )
}