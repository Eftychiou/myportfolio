'use client';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../_components/Scene';
import { useEffect } from 'react';

import * as THREE from 'three';

export const ProjectsClientWrapper = () => {
  useEffect(() => {
    const manager = new THREE.LoadingManager();

    manager.onLoad = () => {
      console.log('On Progress');
    };
  });

  return (
    <Canvas
      // shadows // enable shadows
      gl={{ antialias: true, alpha: true }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 100
      }}
    >
      <Scene />
    </Canvas>
  );
};
