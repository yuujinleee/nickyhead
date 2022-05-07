import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lights() {
  //x : left(-) right(+)
  //y : up(+) down(-)
  //z : close(+) far(-)
  const light1 = useRef();
  const light2 = useRef();
  const light3 = useRef();

  let intensity = 3;
  let angle = Math.PI / 9;

  let x = -1;
  let y = -1;
  let z = 4;
  let mul1 = 0.7; //speed related
  let mul2 = 3; //distance related

  let time = 0;
  useFrame(() => {
    // let time = clock.getDelta();
    time += 0.01;

    light1.current.position.x = Math.abs(Math.sin(time * mul1 * 3) * mul2) + x;
    light1.current.position.y = Math.abs(Math.cos(time * mul1 * 2) * mul2) + y;
    light1.current.position.z = Math.cos(time * mul1) * mul2 + z;

    light2.current.position.x = Math.abs(Math.cos(time * mul1 * 2) * mul2) + x;
    light2.current.position.y = Math.abs(Math.sin(time * mul1 * 2) * mul2) + y;
    light2.current.position.z = Math.sin(time * mul1) * mul2 + z;

    light3.current.position.x = Math.abs(Math.sin(time * mul1 * 2) * mul2) + x;
    light3.current.position.y = Math.abs(Math.cos(time * mul1 * 3) * mul2) + y;
    light3.current.position.z = Math.sin(time * mul1) * mul2 + z;
  });

  return (
    <>
      <pointLight
        ref={light1}
        color="#f70fff"
        intensity={intensity}
        position={[2, 0, 5]}
      />
      <pointLight
        ref={light2}
        color="#12d6df"
        intensity={intensity}
        position={[4, -2, 5]}
      />
      <pointLight
        ref={light3}
        color="#4a78e8"
        intensity={intensity}
        position={[0, -2, 5]}
      />
      <ambientLight color="white" intensity={0.1} />
    </>
  );
}
