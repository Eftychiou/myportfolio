'use client';

import classes from './projects.module.scss';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../../components/Projects/Scene';
import { useEffect } from 'react';

import * as THREE from 'three';

export default function Projects() {
  useEffect(() => {
    const manager = new THREE.LoadingManager();

    manager.onLoad = () => {
      console.log('On Progress');
    };
  });
  return (
    <div className={classes.page}>
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
    </div>
  );
}
