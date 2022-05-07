import React, { useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useSpring } from "@react-spring/core";
import { a, config } from "@react-spring/three";
import * as THREE from "three";

export default function Model(props) {
  const ref = useRef();

  const { nodes, materials } = useGLTF("/nickyHeadConverted5.gltf");
  const scale = 14;

  let factor = 0.09;
  materials.Material.color.r = factor; //was 0.0228
  materials.Material.color.g = factor;
  materials.Material.color.b = factor;
  materials.Material.metalness = 0.7; // was 0.4
  materials.Material.roughness = 0.4;

  const ref_thumbsup = useRef();
  const ref_thinking = useRef();

  const [hoverContact, setHoverContact] = useState(0);
  const [hoverDownload, setHoverDownload] = useState(0);

  // create a common spring that will be used later to interpolate other values
  const thumbsUp = useSpring({
    spring: hoverContact,
    config: config.gentle
  });
  const thumbsUpOpacity = useSpring({
    spring: hoverContact,
    config: { duration: 400, delay: 400 }
  });

  const thinking = useSpring({
    spring: hoverDownload,
    config: config.gentle
  });
  const thinkingOpacity = useSpring({
    spring: hoverDownload,
    config: { duration: 400, delay: 400 }
  });

  // for thumbsUp pose
  const x1 = thumbsUp.spring.to([0, 1], [0.5, 0]);
  const y1 = thumbsUp.spring.to([0, 1], [-4, 0]);
  const z1 = thumbsUp.spring.to([0, 1], [0.5, 0]);
  const opacity1 = thumbsUpOpacity.spring.to([0, 1], [0, 1]);

  // for thinking pose
  const x2 = thinking.spring.to([0, 1], [0.5, 0]);
  const y2 = thinking.spring.to([0, 1], [-4, 0]);
  const z2 = thinking.spring.to([0, 1], [0.5, 0]);
  const opacity2 = thinkingOpacity.spring.to([0, 1], [0, 1]);

  return (
    <>
      <Html>
        <button
          onPointerOver={() => setHoverContact(1)}
          onPointerOut={() => setHoverContact(0)}
        >
          Contact
        </button>
        <button
          onPointerOver={() => setHoverDownload(1)}
          onPointerOut={() => setHoverDownload(0)}
        >
          Download CV
        </button>
      </Html>
      <group {...props} position={[0, -1.5, 0]} rotation={[0, 0, 0]} ref={ref}>
        <mesh
          geometry={nodes.Geo_Head.geometry}
          material={materials.Material}
          scale={scale}
        >
          {/* <meshPhongMaterial color="#555555" depthTest="true" depthWrite="true" /> */}
        </mesh>
        <a.mesh
          ref={ref_thumbsup}
          geometry={nodes.Geo_Hand_ThumbsUp.geometry}
          // material={materials.Material}
          position-x={x1}
          position-y={y1}
          position-z={z1}
          scale={scale}
        >
          <a.meshPhongMaterial
            color="#333333"
            depthTest="true"
            depthWrite="true"
            transparent="true"
            opacity={opacity1}
          />
        </a.mesh>
        <a.mesh
          ref={ref_thinking}
          geometry={nodes.Geo_Hand_Thinking.geometry}
          // material={materials.Material}
          position-x={x2}
          position-y={y2}
          position-z={z2}
          scale={scale}
        >
          <a.meshPhongMaterial
            color="#333333"
            depthTest="true"
            depthWrite="true"
            transparent="true"
            opacity={opacity2}
          />
        </a.mesh>
      </group>
    </>
  );
}

useGLTF.preload("/nickyHeadConverted5.gltf");
