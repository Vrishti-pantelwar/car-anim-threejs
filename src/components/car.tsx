import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Car = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.NEXT_PUBLIC_WEB_URL + "/models/car/scene.gltf"
  );

  useFrame((state) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0] as Mesh;
    group.children[0].rotation.x = t * 2;
    group.children[2].rotation.x = t * 2;
    group.children[4].rotation.x = t * 2;
    group.children[6].rotation.x = t * 2;
  });

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.0355, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 100;
      }
    });
  }, [gltf]);
  return <primitive object={gltf.scene} />;
};
