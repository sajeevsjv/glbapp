import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// This component handles the loading and displaying of your GLB model
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function ModelViewer({ url }) {
  console.log("ModelViewer url:", url);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas gl={{ antialias: true }}>
        <ambientLight intensity={0.8} />
        <hemisphereLight skyColor="white" groundColor="gray" intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />

        <Model url={url} />

        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ModelViewer;
