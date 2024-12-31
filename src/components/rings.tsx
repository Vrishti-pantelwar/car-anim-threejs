import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Color, Mesh } from "three";

export const Rings = () => {
  const itemRef = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();
    for (let i = 0; i < itemRef.current.length; i++) {
      let mesh = itemRef.current[i];
      if (mesh) {
        // position rings
        // let z = (i - 7) * 3.5;
        let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
        mesh.position.set(0, 0, -z);

        //change size according to distance
        let dist = Math.abs(z);
        mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

        //fade with distance
        let colorScale = 1;
        if (dist > 2) {
          colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
        }
        colorScale *= 0.5;

        if (i % 2 == 1) {
          (mesh.material as any).emissive = new Color(
            6,
            0.15,
            0.7
          ).multiplyScalar(colorScale);
        } else {
          (mesh.material as any).emissive = new Color(
            0.1,
            0.7,
            3
          ).multiplyScalar(colorScale);
        }
      }
    }
  });
  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          key={i}
          ref={(el) => {
            itemRef.current[i] = el;
          }}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </>
  );
};
