'use client';

import classes from './projects.module.scss';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../../components/Projects/Scene';
import { Suspense, useEffect } from 'react';

import * as THREE from 'three';
import { Text } from '@react-three/drei';

// import { Grid } from '@react-three/drei';

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
        // shadows
        // gl={{ antialias: true, alpha: true }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 100
          // position: [0, 3, 5]
        }}
      >
        <Suspense
          fallback={
            <>
              <Text
                fontSize={0.4}
                color='black'
                position-y={0.5}
                position-z={0}
                rotation-x={0}
                maxWidth={3}
                textAlign='center'
              >
                Loading...
              </Text>
            </>
          }
        >
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// import { useControls, button, buttonGroup } from 'leva';
// const { sunPosition } = useControls('sky', { sunPosition: [2.8, -0.1, -4.3] });
{
  /* <axesHelper /> */
}
{
  /* <OrbitControls /> */
}
{
  /* */
}
{
  /* <Grid /> */
}
{
  /* <Perf position="top-left" /> */
}
{
  /* <PerspectiveCamera makeDefault position={[0, 10, 5]} ref={cameraRef} />  */
}
{
  /* <gridHelper args={[40, 40, 0xff0000, 'cyan']} /> */
}
// import { OrbitControls, Sky, CameraControls } from '@react-three/drei';
// const cameraRef: React.Ref<PerspectiveCameraType> | undefined = useRef(null);
// const position = new THREE.Vector3(v[0], v[1], v[2]);
// const positionPlus = new THREE.Vector3(v[0], v[1] + 5, v[2] + 15);
// cameraRef.current.position.copy(positionPlus);
// cameraRef.current.lookAt(position);
// useHelper(lightRef, THREE.DirectionalLightHelper);
// const { DEG2RAD } = THREE.MathUtils;
// const nineteen = 45 * DEG2RAD;
// useControls('Camera Controls', {
//   horizontalRotation: buttonGroup({
//     label: 'Horizontal R',
//     opts: {
//       'Sun Position': () => (cubeRef.current!.rotation.y = Math.PI * 0.25)
//     }
//   })
// });
