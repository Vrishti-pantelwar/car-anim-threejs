import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { attach } from "@react-three/fiber/dist/declarations/src/core/utils";
import React from "react";
import { Ground } from "./ground";
import { Car } from "./car";
import { Rings } from "./rings";
import { Boxes } from "./boxes";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import { FloatingGrid } from "./floating-grid";

export const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={30} position={[3, 2, 3]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(textures) => (
          <>
            <Environment map={textures} /> <Car />
          </>
        )}
      </CubeCamera>
      <Rings />
      <Boxes />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={150}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={90}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <EffectComposer>
        {/* <DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        /> blur when far away */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.25}
        />

        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0005, 0.0012)}
          radialModulation={true} // or some appropriate value
          modulationOffset={1}
        />
      </EffectComposer>

      <Ground />
      <FloatingGrid />
    </>
  );
};
