import { useTexture, MeshPortalMaterial, RoundedBox, Text, Text3D, CameraControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';

export const Scene = () => {
  const [active, setActive] = useState('');
  // const model = useGLTF("./model/1.glb");
  const eshopTexture = useTexture('./textures/eshop.png');
  const cyposTexture = useTexture('./textures/cypos.png');
  const takeTexture = useTexture('./textures/take.png');
  const eshopMeshPortalRef: any = useRef();
  const cyposMeshPortalRef: any = useRef();
  const takeMeshPortalRef: any = useRef();
  const cameraControlsRef: any = useRef();

  useFrame((_, delta) => {
    easing.damp(eshopMeshPortalRef.current, 'blend', active === 'eshop' ? 1 : 0, 0.2, delta);
    easing.damp(cyposMeshPortalRef.current, 'blend', active === 'cypos' ? 1 : 0, 0.2, delta);
    easing.damp(takeMeshPortalRef.current, 'blend', active === 'take' ? 1 : 0, 0.2, delta);
  });

  useEffect(() => {
    if (active === 'take') {
      cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
    } else if (active === 'eshop') {
      cameraControlsRef.current.setLookAt(-4, 0, 3, -4, 0, 0, true);
    } else if (active === 'cypos') {
      cameraControlsRef.current.setLookAt(4, 0, 3, 4, 0, 0, true);
    } else if (active === '') {
      cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} maxDistance={10} minDistance={3} />

      <RoundedBox args={[3, 4, 0.1]} position={[-5, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={eshopMeshPortalRef}>
          {active !== 'eshop' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='red'>
              Eshop
            </Text>
          )}
          {active === 'eshop' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={0.4}
              letterSpacing={0.1}
              bevelEnabled
              bevelSegments={20}
              position={[0, 0, 0]}
              onDoubleClick={() => window.open('https://eshop.geef.cc')}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh onDoubleClick={() => setActive((prev) => (prev === 'eshop' ? '' : 'eshop'))}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={eshopTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

      <RoundedBox args={[3, 4, 0.1]} position={[0, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={takeMeshPortalRef}>
          {active !== 'take' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='red'>
              Take
            </Text>
          )}
          {active === 'take' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={0.4}
              letterSpacing={-0.01}
              bevelEnabled
              bevelSegments={20}
              position={[-0.5, -0.3, 0]}
              onDoubleClick={() => window.open('https://take.geef.cc')}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh onDoubleClick={() => setActive((prev) => (prev === 'take' ? '' : 'take'))}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={takeTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

      <RoundedBox args={[3, 4, 0.1]} position={[5, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={cyposMeshPortalRef}>
          {active !== 'cypos' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='red'>
              Cypos
            </Text>
          )}
          {active === 'cypos' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={0.4}
              letterSpacing={-0.01}
              bevelEnabled
              bevelSegments={20}
              position={[-1.5, -0.2, 0]}
              onDoubleClick={(e) => {
                window.open('https://www.cypossystems.com.cy');
              }}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh onDoubleClick={() => setActive((prev) => (prev === 'cypos' ? '' : 'cypos'))}>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={cyposTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
      <Sky sunPosition={[2.8, -0.1, -4.3]} distance={1000} rayleigh={5} />
    </>
  );
};
