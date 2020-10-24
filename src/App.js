import React, { useRef, useState } from 'react'
import './App.css';

import { Canvas, useFrame } from 'react-three-fiber'
import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei'

import {useSpring, animated} from 'react-spring/three'

softShadows()

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null)
  useFrame(() => { mesh.current.rotation.x = mesh.current.rotation.y += 0.01 })

  const [expand, setExpand] = useState(false)

  const props = useSpring({
    scale: expand? [1.4,1.4,1.4]:[1,1,1]
  })

  return (
    <animated.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial speed={speed} factor={0.5} attach='material' color={color} />

    </animated.mesh>
  )

}




function App() {


  return (
    <>
      <Canvas shadowMap colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={.3} />
        <directionalLight
          castShadow
          position={[0, 10, 10]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}

        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
        </group>

        <SpinningMesh speed={1.5} position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue' />
        <SpinningMesh speed={3} position={[-2, 1, -5]} color='pink' />
        <SpinningMesh speed={3} position={[5, 1, -2]} color='pink' />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
