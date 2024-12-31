import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Color, Mesh, Vector3 } from "three";

export const Box = ({ color }: { color: Color }) => {
  const initialPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    return v;
  };

  const box = useRef<Mesh | null>(null);
  const time = useRef(0);
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2) * 0.5 + 0.05);
  const [position, setPosition] = useState<Vector3>(initialPosition());

  const resetPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    setPosition(v);
  };

  useFrame((state, delta) => {
    time.current += delta * 1.2;
    let newZ = position.z - time.current;

    if (newZ < -10) {
      resetPosition();
      time.current = 0;
    }

    if (box.current) {
      box.current.position.set(position.x, position.y, newZ);
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    }
  });

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
};

export const Boxes = () => {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box
          key={i}
          color={
            i % 2 == 0 ? new Color(0.4, 0.1, 0.1) : new Color(0.05, 0.15, 0.4)
          }
        />
      ))}
    </>
  );
};
