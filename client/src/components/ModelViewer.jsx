import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene, nodes, materials } = useGLTF(url);
  console.log("url", url);
  
  // Error handling for when nodes or materials are undefined
  if (!nodes || !materials) {
    return null;
  }
  
  // Check if nodes._rootJoint exists before rendering
  const hasSkeletalAnimation = nodes && nodes._rootJoint;
  
  return (
    <group dispose={null}>
      <group scale={0.01}>
        {hasSkeletalAnimation && <primitive object={nodes._rootJoint} />}
        
        {/* Conditionally render meshes if they exist */}
        {nodes.Object_6 && (
          <skinnedMesh 
            geometry={nodes.Object_6.geometry} 
            material={materials.model_1_submesh_0} 
            skeleton={nodes.Object_6.skeleton} 
          />
        )}
        {nodes.Object_8 && (
          <skinnedMesh 
            geometry={nodes.Object_8.geometry} 
            material={materials.model_1_submesh_1} 
            skeleton={nodes.Object_8.skeleton} 
          />
        )}
        {nodes.Object_10 && (
          <skinnedMesh 
            geometry={nodes.Object_10.geometry} 
            material={materials.model_1_submesh_2} 
            skeleton={nodes.Object_10.skeleton} 
          />
        )}
        {nodes.Object_12 && (
          <skinnedMesh 
            geometry={nodes.Object_12.geometry} 
            material={materials.model_1_submesh_3} 
            skeleton={nodes.Object_12.skeleton} 
          />
        )}
        {nodes.Object_14 && (
          <skinnedMesh 
            geometry={nodes.Object_14.geometry} 
            material={materials.model_1_submesh_4} 
            skeleton={nodes.Object_14.skeleton} 
          />
        )}
        {nodes.Object_16 && (
          <skinnedMesh 
            geometry={nodes.Object_16.geometry} 
            material={materials.model_1_submesh_5} 
            skeleton={nodes.Object_16.skeleton} 
          />
        )}
        {nodes.Object_18 && (
          <skinnedMesh 
            geometry={nodes.Object_18.geometry} 
            material={materials.model_1_submesh_6} 
            skeleton={nodes.Object_18.skeleton} 
          />
        )}
        {nodes.Object_20 && (
          <skinnedMesh 
            geometry={nodes.Object_20.geometry} 
            material={materials.model_2_submesh_0} 
            skeleton={nodes.Object_20.skeleton} 
          />
        )}
        {nodes.Object_22 && (
          <skinnedMesh 
            geometry={nodes.Object_22.geometry} 
            material={materials.model_3_submesh_0} 
            skeleton={nodes.Object_22.skeleton} 
          />
        )}
        {nodes.Object_24 && (
          <skinnedMesh 
            geometry={nodes.Object_24.geometry} 
            material={materials.model_4_submesh_0} 
            skeleton={nodes.Object_24.skeleton} 
          />
        )}
        {nodes.Object_26 && (
          <skinnedMesh 
            geometry={nodes.Object_26.geometry} 
            material={materials.model_5_submesh_0} 
            skeleton={nodes.Object_26.skeleton} 
          />
        )}
        {nodes.Object_28 && (
          <skinnedMesh 
            geometry={nodes.Object_28.geometry} 
            material={materials.model_6_submesh_0} 
            skeleton={nodes.Object_28.skeleton} 
          />
        )}
        {nodes.Object_30 && (
          <skinnedMesh 
            geometry={nodes.Object_30.geometry} 
            material={materials.model_7_submesh_0} 
            skeleton={nodes.Object_30.skeleton} 
          />
        )}
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('/path-to-your-default-model.glb');

const ModelViewer = ({ url}) => {
  // Error handling for url
  useEffect(() => {
    if (url) {
      useGLTF.preload(url);
    }
  }, [url]);

  return (
    <div className="w-full h-full">
      <Canvas className="bg-slate-500" style={{ height: 500, width: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={<DefaultFallback />}>
          {url ? <Model url={url} /> : <DefaultFallback />}
        </Suspense>
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
};

const DefaultFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
    
  </mesh>
);

export default ModelViewer;