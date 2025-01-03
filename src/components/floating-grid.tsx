import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export const FloatingGrid = () => {
  const diffuse = useLoader(
    TextureLoader,
    process.env.NEXT_PUBLIC_WEB_URL + "/textures/grid-texture.png"
  );

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  });

  return (
    <>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial
          color={[1, 1, 1]}
          map={diffuse}
          alphaMap={diffuse}
          transparent={true}
        />
      </mesh>
    </>
  );
};
