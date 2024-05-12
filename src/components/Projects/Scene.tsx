/* eslint-disable jsx-a11y/alt-text */
import { CylinderArgs, Physics, PlaneProps, usePlane, useBox, BoxProps, useTrimesh } from '@react-three/cannon';

import { Text3D, Text, Sky, Cloud } from '@react-three/drei';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh, Group } from 'three';
import Vehicle from './Vehicle';
import { useLoader } from '@react-three/fiber';

export const Scene = () => {
  const lightRef: React.Ref<any> = useRef(null!);
  const cyposTextRef: React.Ref<any> = useRef(null!);

  function Plane(props: PlaneProps) {
    const [ref] = usePlane(() => ({ material: 'ground', type: 'Static', ...props }), useRef<Group>(null));

    const diff = useLoader(THREE.TextureLoader, './forest/forrest_ground_01_diff_4k.jpg');
    const disp = useLoader(THREE.TextureLoader, './forest/forrest_ground_01_disp_4k.png');
    const rough = useLoader(THREE.TextureLoader, './forest/forrest_ground_01_rough_4k.jpg');

    const terrainSize = 5;
    const terrainLength = 10;
    const theXArray = Array.from({ length: terrainLength });
    const theYArray = Array.from({ length: terrainLength });

    return (
      <group ref={ref}>
        <Cloud speed={0.25} seed={1} scale={10} volume={5} color='hotpink' fade={-100} position={[-100, 50, -10]} />

        {theXArray.map((_, iX) =>
          theYArray.map((_, iY) => (
            <group key={`${iX}+${iY}`}>
              <mesh receiveShadow position-x={terrainSize * iX} position-y={terrainSize * iY}>
                <planeGeometry args={[terrainSize, terrainSize, 32]} />
                <meshStandardMaterial map={diff} displacementMap={disp} roughnessMap={rough} displacementScale={0.01} />
              </mesh>
              <mesh receiveShadow position-x={terrainSize * -iX} position-y={terrainSize * iY}>
                <planeGeometry args={[terrainSize, terrainSize, 32]} />
                <meshStandardMaterial map={diff} displacementMap={disp} roughnessMap={rough} displacementScale={0.01} />
              </mesh>
              <mesh receiveShadow position-x={terrainSize * iX} position-y={terrainSize * -iY}>
                <planeGeometry args={[terrainSize, terrainSize, 32]} />
                <meshStandardMaterial map={diff} displacementMap={disp} roughnessMap={rough} displacementScale={0.01} />
              </mesh>
              <mesh receiveShadow position-x={terrainSize * -iX} position-y={terrainSize * -iY}>
                <planeGeometry args={[terrainSize, terrainSize, 32]} />
                <meshStandardMaterial map={diff} displacementMap={disp} roughnessMap={rough} displacementScale={0.01} />
              </mesh>
            </group>
          ))
        )}
      </group>
    );
  }

  const WebsiteStop = (props: BoxProps & { imageSrc: string; link: string; label: string }) => {
    const texture = useLoader(THREE.TextureLoader, props.imageSrc); // Load texture
    const args: CylinderArgs = [10, 0.0001, 5, 1];
    const [ref] = useBox(
      () => ({
        mass: 0,
        args: [10, 20, 5],
        ...props
      }),
      useRef<Mesh>(null)
    );
    const { position } = props;
    const x = position?.[0]!;
    const y = position?.[1]!;
    const z = position?.[2]!;
    const thePosition = new THREE.Vector3(x, y, z);
    const body = document.querySelector('body')!;
    const textRef = useRef();

    return (
      <>
        <mesh ref={ref} castShadow>
          <boxGeometry args={args} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <Text
          ref={textRef}
          onClick={() => {
            window.open(props.link, '_blank');
          }}
          onPointerEnter={() => {
            body.style.cursor = 'pointer';
            if (textRef && textRef.current) {
              (textRef.current as any).color = 'red';
            }
          }}
          onPointerLeave={() => {
            body.style.cursor = 'auto';
            if (textRef && textRef.current) {
              (textRef.current as any).color = 'orange';
            }
          }}
          fontSize={0.4}
          color='orange'
          position={thePosition}
          position-y={0.5}
          position-z={-11}
          rotation-x={Math.PI / 0.27}
          maxWidth={3}
          textAlign='center'
        >
          Click To Enter
        </Text>
        <Text3D
          ref={cyposTextRef}
          font='./fonts/2.json'
          height={0.1}
          size={2}
          letterSpacing={0.1}
          bevelEnabled
          bevelSegments={20}
          position-x={x - 5}
          position-z={z - 4}
          position-y={y + 1}
        >
          {props.label}
          <meshNormalMaterial />
        </Text3D>
      </>
    );
  };

  const Ramp = (props: BoxProps) => {
    const args: any = [2, 2, 2];
    const [ref] = useBox(
      () => ({
        mass: 10,
        material: 'ring',
        args: args,
        position: [0, 10, -6],
        ...props
      }),
      useRef<Mesh>(null)
    );

    return (
      <mesh ref={ref} castShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color='red' />
      </mesh>
    );
  };

  const Wall = () => {
    const wallHeighlt = 10;
    const argsNorth: any = [94, wallHeighlt, 2, 1];
    const argsSouth: any = [94, wallHeighlt, 2, 1];
    const argsWest: any = [2, wallHeighlt, 82, 1];
    const argsEast: any = [2, wallHeighlt, 82, 1];
    const positionSouth: any = [0, 0.01, 40];
    const positionNorth: any = [0, 0.01, -40];
    const positionWest: any = [-46, 0, 0];
    const positionEast: any = [46, 0, 0];

    const [northRef] = useBox(
      () => ({
        mass: 0,
        args: argsNorth,
        position: positionNorth
      }),
      useRef<Mesh>(null)
    );
    const [southRef] = useBox(
      () => ({
        mass: 0,
        args: argsNorth,
        position: positionSouth
      }),
      useRef<Mesh>(null)
    );
    const [westRef] = useBox(
      () => ({
        mass: 0,
        args: argsWest,
        position: positionWest
      }),
      useRef<Mesh>(null)
    );
    const [eastRef] = useBox(
      () => ({
        mass: 0,
        args: argsEast,
        position: positionEast
      }),
      useRef<Mesh>(null)
    );

    return (
      <>
        <mesh ref={northRef} castShadow position={positionNorth}>
          <boxGeometry args={argsNorth} />
          <meshStandardMaterial color='green' />
        </mesh>
        <mesh ref={southRef} castShadow position={positionSouth}>
          <boxGeometry args={argsSouth} />
          <meshStandardMaterial color='green' />
        </mesh>
        <mesh ref={westRef} castShadow position={positionWest}>
          <boxGeometry args={argsWest} />
          <meshStandardMaterial color='green' />
        </mesh>
        <mesh ref={eastRef} castShadow position={positionEast}>
          <boxGeometry args={argsEast} />
          <meshStandardMaterial color='green' />
        </mesh>
      </>
    );
  };

  return (
    <>
      <Physics broadphase='SAP' defaultContactMaterial={{ contactEquationRelaxation: 4, friction: 1e-3 }} allowSleep>
        <Wall />
        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
        <Vehicle position={[0, 2, 30]} rotation={[0, -Math.PI / 0.93, 0]} angularVelocity={[0, 0.6, 0]} />
        {/* <Ramp /> */}
        <Text3D
          font='./fonts/2.json'
          height={0.1}
          size={4}
          letterSpacing={0.1}
          bevelEnabled
          bevelSegments={20}
          position-x={-10}
          position-z={-20}
          position-y={1}
        >
          Projects
          <meshNormalMaterial />
        </Text3D>

        <Text
          fontSize={2}
          color='white'
          position-y={0.01}
          position-z={22}
          rotation-x={Math.PI / -2}
          maxWidth={20}
          textAlign='center'
        >
          Navigate with w,s,a,d keys. Brake with Space. Scroll To Zoom In/Out
        </Text>
        <WebsiteStop
          position={[-15, 0.01, -10]}
          imageSrc='./images/cypos_image.png'
          userData={{ id: 'cypos' }}
          link='https://eshop.geef.cc/'
          label='Cypos'
        />
        <WebsiteStop
          position={[20, 0.01, -10]}
          imageSrc='./images/eshop_image.png'
          userData={{ id: 'eshop' }}
          link='https://www.cypossystems.com.cy/'
          label='Eshop'
        />
      </Physics>

      <Sky sunPosition={[2.8, -0.1, -4.3]} distance={1000} rayleigh={5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, -1]} ref={lightRef} intensity={2} castShadow />
    </>
  );
};
