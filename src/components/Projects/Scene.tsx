import {
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  Text3D,
  CameraControls,
  Sky,
  Html,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';

export const Scene = () => {
  const [text3dFontSize, setText3dFontSize] = useState(0.4);
  const [active, setActive] = useState('');
  // const model = useGLTF("./model/1.glb");
  const eshopTexture = useTexture('./textures/eshop.png');
  const cyposTexture = useTexture('./textures/cypos.png');
  const takeTexture = useTexture('./textures/take.png');
  const eshopMeshPortalRef: any = useRef();
  const cyposMeshPortalRef: any = useRef();
  const takeMeshPortalRef: any = useRef();
  let cameraControlsRef = useRef<CameraControls>(null); // Correctly typed ref

  let xPosRef = useRef(0);
  let direction = useRef('right' as 'left' | 'right');
  let enabledCameraRotation = useRef(false);

  useFrame((_, delta) => {
    if (enabledCameraRotation.current) {
      const max = 1;
      const min = -1;
      if (direction.current === 'right') {
        xPosRef.current += delta * 0.1;
        if (xPosRef.current >= max) {
          direction.current = 'left';
        }
      } else if (direction.current === 'left') {
        xPosRef.current -= delta * 0.1;
        if (xPosRef.current <= min) {
          direction.current = 'right';
        }
      }
      cameraControlsRef.current!.setLookAt(xPosRef.current, 0, 5, 0, 0, 0, true);
    }
    easing.damp(eshopMeshPortalRef.current, 'blend', active === 'eshop' ? 1 : 0, 0.1, delta);
    easing.damp(cyposMeshPortalRef.current, 'blend', active === 'cypos' ? 1 : 0, 0.1, delta);
    easing.damp(takeMeshPortalRef.current, 'blend', active === 'take' ? 1 : 0, 0.1, delta);
  });

  useEffect(() => {
    if (active === 'take') {
      cameraControlsRef.current!.setLookAt(0, 0, 3, 0, 0, 0, true);
      enabledCameraRotation.current = false;
    } else if (active === 'eshop') {
      cameraControlsRef.current!.setLookAt(-4, 0, 3, -4, 0, 0, true);
      enabledCameraRotation.current = false;
    } else if (active === 'cypos') {
      cameraControlsRef.current!.setLookAt(4, 0, 3, 4, 0, 0, true);
      enabledCameraRotation.current = false;
    } else if (active === '') {
      enabledCameraRotation.current = true;
    }
  }, [active]);

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer';
    setText3dFontSize(0.41);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    setText3dFontSize(0.4);
  };

  const handleStart = () => {
    enabledCameraRotation.current = false;
  };

  const handleEnd = () => {
    enabledCameraRotation.current = true;
  };

  return (
    <>
      <CameraControls ref={cameraControlsRef} maxDistance={10} minDistance={3} />
      <OrbitControls
        enabled={active === ''}
        onStart={handleStart} // When mouse interaction starts
        onEnd={handleEnd} // When mouse interaction ends
      />

      <RoundedBox args={[3, 4, 0.1]} position={[-5, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={eshopMeshPortalRef}>
          {active !== 'eshop' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='yellow'>
              Eshop
            </Text>
          )}
          {active === 'eshop' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={text3dFontSize}
              letterSpacing={0.1}
              bevelEnabled
              bevelSegments={20}
              position={[0, 0, 0]}
              onDoubleClick={(e) => {
                e.stopPropagation();
                window.open('https://eshop.geef.cc');
              }}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh
            onDoubleClick={(e) => {
              e.stopPropagation();
              setActive((prev) => (prev === 'eshop' ? '' : 'eshop'));
            }}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={eshopTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

      <RoundedBox args={[3, 4, 0.1]} position={[0, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={takeMeshPortalRef}>
          {active !== 'take' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='orange'>
              Take
            </Text>
          )}
          {active === 'take' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={text3dFontSize}
              letterSpacing={-0.01}
              bevelEnabled
              bevelSegments={20}
              position={[-0.5, -0.3, 0]}
              onDoubleClick={(e) => {
                e.stopPropagation();
                window.open('https://take.geef.cc');
              }}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh
            onDoubleClick={(e) => {
              e.stopPropagation();
              setActive((prev) => (prev === 'take' ? '' : 'take'));
            }}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={takeTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>

      <RoundedBox args={[3, 4, 0.1]} position={[5, 0, 0]} radius={0.1}>
        <MeshPortalMaterial ref={cyposMeshPortalRef}>
          {active !== 'cypos' && (
            <Text font='./fonts/bold.ttf' position={[0, 1.5, 0]} fontSize={0.6} color='purple'>
              Cypos
            </Text>
          )}
          {active === 'cypos' && (
            <Text3D
              font='./fonts/2.json'
              height={0.1}
              size={text3dFontSize}
              letterSpacing={-0.01}
              bevelEnabled
              bevelSegments={20}
              position={[-1.5, -0.2, 0]}
              onDoubleClick={(e) => {
                e.stopPropagation();
                window.open('https://www.cypossystems.com.cy');
              }}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              Enter
              <meshNormalMaterial />
            </Text3D>
          )}

          <mesh
            onDoubleClick={(e) => {
              e.stopPropagation();
              setActive((prev) => (prev === 'cypos' ? '' : 'cypos'));
            }}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={cyposTexture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
      <Sky sunPosition={[2.8, -0.1, -4.3]} distance={1000} rayleigh={5} />
    </>
  );
};
