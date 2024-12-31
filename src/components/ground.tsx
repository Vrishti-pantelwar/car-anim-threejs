import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { RepeatWrapping, Texture, TextureLoader, Vector2 } from "three";

export const Ground = () => {
  const [normal, roughness] = useLoader(TextureLoader, [
    process.env.NEXT_PUBLIC_WEB_URL + "/textures/terrain-normal.jpg",
    process.env.NEXT_PUBLIC_WEB_URL + "/textures/terrain-roughness.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
    });
  }, [normal, roughness]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.04;
    normal.offset.set(0, t);
    roughness.offset.set(0, t);
  });

  return (
    <mesh rotation={[-Math.PI * 0.5, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={new Vector2(0.15, 0.15)}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
};
