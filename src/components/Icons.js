import * as THREE from "three";
import React, { useRef, useState } from "react";
import { extend } from "@react-three/fiber";
import { Html, useTexture, shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

import svg1 from "../images/html5.svg";
import png1 from "../images/stripe.png";
import png2 from "../images/jest.png";

export default function Model() {
  const lefteye = useRef();
  const righteye = useRef();
  const [imageLoad, setImageLoad] = useState(png1);
  const imageArray = [png1, png2]; //need to convert each item into object too add svg and text add the same time

  // Set geometry for icon
  const geom = new THREE.PlaneGeometry(10, 10, 20, 20);

  // Set ShaderMaterial for icon
  let loader = new THREE.TextureLoader();
  // loader.setCrossOrigin("");
  // const texture = useTexture(png1);    //Another method using Drei

  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(1, 1);

  let disk = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/circle.png"
  );

  let texture = loader.load(imageLoad, function (texture) {
    texture.encoding = THREE.sRGBEncoding;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  const iconMaterial = new THREE.ShaderMaterial({
    vertexColors: THREE.VertexColors,
    uniforms: {
      visibility: {
        value: texture
      }, //mask image
      shape: {
        value: disk
      },
      size: { value: 0.028 },
      scale: {
        value: window.innerHeight / 2
      }
    },
    vertexShader: `
      uniform float scale;
      uniform float size;

      varying vec2 vUv;
      varying vec3 vColor;
      
      void main() {
        vUv = uv;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D visibility;
      uniform sampler2D shape;
      
      varying vec2 vUv;
      varying vec3 vColor;

      void main() {
        vec2 uv = vUv;
        vec4 v = texture2D(visibility, uv);
        if (length(v.rgb) > 1.0) discard;

        gl_FragColor = vec4( vColor, 1.0 );
        vec4 shapeData = texture2D( shape, gl_PointCoord );
        if (shapeData.a < 0.5) discard;
        gl_FragColor = gl_FragColor * shapeData;
      }
    `,
    blending: THREE.AdditiveBlending,
    // depthTest: false,
    transparent: true,
    extensions: { shaderTextureLOD: true }
  });

  // Change the texture of icon(eye)

  const [hover1, setHover1] = useState(0);

  extend({
    TestMaterial: shaderMaterial(
      {
        vertexColors: THREE.VertexColors,
        uniforms: {
          visibility: {
            value: texture
          },
          shape: {
            value: disk
          },
          size: { value: 0.025 },
          scale: {
            value: window.innerHeight / 2
          }
        },
        blending: THREE.AdditiveBlending,
        transparent: true,
        extensions: { shaderTextureLOD: true }
      },
      `
      uniform float scale;
      uniform float size;

      varying vec2 vUv;
      varying vec3 vColor;
      
      void main() {
        vUv = uv;
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
      glsl`
      uniform sampler2D visibility;
      uniform sampler2D shape;
      
      varying vec2 vUv;
      varying vec3 vColor;

      void main() {
        vec2 uv = vUv;
        vec4 v = texture2D(visibility, uv);
        if (length(v.rgb) > 1.0) discard;

        gl_FragColor = vec4( vColor, 1.0 );
        vec4 shapeData = texture2D( shape, gl_PointCoord );
        if (shapeData.a < 0.5) discard;
        gl_FragColor = gl_FragColor * shapeData;
      }
  `
    )
  });

  function hoverIconOn(valueimg) {
    lefteye.current.material.uniforms.visibility.value.needsUpdate = true;
    lefteye.current.material.dispose();
    lefteye.current.material.needsUpdate = true;
    setImageLoad(valueimg);
    console.log("Hovered");
  }
  // function hoverIconOff() {
  //   console.log("Unhovered");
  // }

  return (
    <>
      <Html position="absolute">
        <div>
          {imageArray.map((image, index) => {
            return (
              <img
                key={index}
                src={image}
                alt="svg1"
                width={50}
                onPointerOver={() => hoverIconOn(image)}
                // onPointerOver={() => setHover1(1)}
                // onPointerOut={() => setHover1(0)}
              />
            );
          })}
        </div>
      </Html>
      <points
        ref={lefteye}
        geometry={geom}
        material={iconMaterial}
        position={[0, 0.44, 1.88]}
        rotation={[0, 0.2, 0]}
        scale={0.05}
      >
        {/* <testMaterial /> */}
      </points>
      <points
        ref={righteye}
        geometry={geom}
        material={iconMaterial}
        position={[1.1, 0.43, 1.55]}
        rotation={[0, 0.4, 0]}
        scale={0.05}
      />
    </>
  );
}

// let disk = new THREE.TextureLoader().load(
//   "https://threejs.org/examples/textures/sprites/circle.png"
// );
// let loader = new THREE.TextureLoader();
// let texture = loader.load(png1, function (texture) {
//   texture.encoding = THREE.sRGBEncoding;
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
//   texture.repeat.set(1, 1);
// });

// extend({
//   TestMaterial: shaderMaterial(
//     {
//       vertexColors: THREE.VertexColors,
//       uniforms: {
//         visibility: {
//           value: texture
//         },
//         shape: {
//           value: disk
//         },
//         size: { value: 0.025 },
//         scale: {
//           value: window.innerHeight / 2
//         }
//       },
//       blending: THREE.AdditiveBlending,
//       transparent: true,
//       extensions: { shaderTextureLOD: true }
//     },
//     `
//       uniform float scale;
//       uniform float size;

//       varying vec2 vUv;
//       varying vec3 vColor;

//       void main() {
//         vUv = uv;
//         vColor = color;
//         vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//         gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
//         gl_Position = projectionMatrix * mvPosition;
//       }
//     `,
//     glsl`
//       uniform sampler2D visibility;
//       uniform sampler2D shape;

//       varying vec2 vUv;
//       varying vec3 vColor;

//       void main() {
//         vec2 uv = vUv;
//         vec4 v = texture2D(visibility, uv);
//         if (length(v.rgb) > 1.0) discard;

//         gl_FragColor = vec4( vColor, 1.0 );
//         vec4 shapeData = texture2D( shape, gl_PointCoord );
//         if (shapeData.a < 0.5) discard;
//         gl_FragColor = gl_FragColor * shapeData;
//       }
//   `
//   )
// });
