"use client";
import * as React from "react";

import Image from "next/image";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CarShow } from "../components/car-show";

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <Suspense fallback={null}>
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Home;
