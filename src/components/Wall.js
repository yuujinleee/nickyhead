import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Wall = () => {
  const ref = useRef();

  useFrame(({ camera }) => {
    // Move mesh to be flush with camera
    ref.current.position.copy(camera.position);
    ref.current.quaternion.copy(camera.quaternion);
    // Apply offset
    ref.current.translateZ(-7);
  });

  return (
    <mesh
      ref={ref}
      // receiveShadow
      // position={[0, -1, -5]}
      // rotation={[0, 0.25, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshPhongMaterial attach="material" color="#0e0e0e" shininess="20" />
    </mesh>
  );
};

export default Wall;
