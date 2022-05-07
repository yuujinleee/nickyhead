import { useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";

export default function Rig() {
  const controls = useThree((state) => state.controls);

  const [clientMouse, setClientMouse] = useState({
    x: 0,
    y: 0
  });

  let windowX = window.innerWidth;
  let windowY = window.innerHeight;

  window.addEventListener("mousemove", (mouse) => {
    setClientMouse({
      x: (mouse.x / windowX) * 2 - 1, //-1~1
      y: -(mouse.y / windowY) * 2 + 1
    });
  });
  //-0.44
  useFrame(() => {
    controls?.setAzimuthalAngle(0.2 - clientMouse.x / 2);
    controls?.setPolarAngle(Math.PI / 2 + clientMouse.y / 6);
  });
  return null;
}
