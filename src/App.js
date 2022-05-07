import { Suspense } from "react";
import "./styles.css";
import styled from "styled-components";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NickyHead from "./components/NickyHead";
import Icons from "./components/Icons";
import Rig from "./components/Rig";
import Lights from "./components/Lights";
import Wall from "./components/Wall";

export default function App() {
  return (
    <Wrapper className="App">
      <Canvas className="canvas">
        <Lights />
        <Suspense fallback={null}>
          <NickyHead />
          <Icons />
        </Suspense>
        <Wall />
        <OrbitControls makeDefault enabled={false} />
        <Rig />
      </Canvas>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background: #0e1217;

  canvas {
    height: 100vh;
  }
  hero {
    position: absolute;
  }
`;
