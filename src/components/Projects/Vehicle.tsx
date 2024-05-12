import type { BoxProps, Triplet, WheelInfoOptions } from '@react-three/cannon';
import { useBox, useRaycastVehicle } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Object3DEventMap, type Group, type Mesh, type PerspectiveCamera as PerspectiveCameraType } from 'three';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';

import { Chassis } from './Chassis';
import { useControls } from './use-controls';
import { Wheel } from './Wheel';
import * as THREE from 'three';
import { Car } from './Car';

export type VehicleProps = Required<Pick<BoxProps, 'angularVelocity' | 'position' | 'rotation'>> & {
  back?: number;
  force?: number;
  front?: number;
  height?: number;
  maxBrake?: number;
  radius?: number;
  steer?: number;
  width?: number;
};

function Vehicle({
  angularVelocity,
  back = -0.8,
  force = 2500,
  front = 1,
  height = -0.04,
  maxBrake = 250,
  position,
  radius = 0.7,
  rotation,
  steer = 0.5,
  width = 1.9
}: VehicleProps) {
  const wheels = [useRef<Group>(null), useRef<Group>(null), useRef<Group>(null), useRef<Group>(null)];

  const cameraControlsRef: React.Ref<CameraControls> = useRef(null);
  let mouseDownRef = useRef(false);

  const controls = useControls();

  const wheelInfo: WheelInfoOptions = {
    axleLocal: [-1, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 200,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius,
    suspensionRestLength: 0.3,
    suspensionStiffness: 500,
    useCustomSlidingRotationalSpeed: true
  };

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width / 2, height, front],
    isFrontWheel: true
  };
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width / 2, height, front],
    isFrontWheel: true
  };
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width / 2, height, back],
    isFrontWheel: false
  };
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width / 2, height, back],
    isFrontWheel: false
  };

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: [1.7, 1, 4],
      mass: 500,
      onCollide: (e) => {
        // console.log('bonk', e.body.userData)
      },
      position,
      rotation
    }),
    useRef<Mesh>(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels
    }),
    useRef<Group>(null)
  );

  useEffect(() => vehicleApi.sliding.subscribe((v) => {}), []);

  const handleCameraPosition = (v: Triplet): boolean => {
    const camera = cameraControlsRef.current!;

    const [x, y, z] = v;

    if (x > -20 && x < -8 && z < -2 && z > -8) {
      camera.setLookAt(-15, 4, -9.5, -15, 0.01, -10, true);
      return true;
    } else if (x > 15 && x < 25 && z < -2 && z > -8) {
      camera.setLookAt(20, 4, -9.5, 20, 0.01, -10, true);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const camera = cameraControlsRef.current!;
    let previousPosition: Triplet = [0, 0.1, 30.0];
    let initial = true;
    camera.maxDistance = 13;
    camera.minDistance = 5;
    camera.azimuthAngle = 45;

    chassisApi.position.subscribe((v) => {
      const mouseClicked = mouseDownRef.current;

      const [x, y, z] = v;

      if (!mouseClicked) {
        if (initial) {
          camera.setLookAt(x, y + 5, z + 10, x, y, z, true);
        }
      }

      const vehicleIsMoving =
        parseFloat(v[2].toFixed(2)) !== parseFloat(previousPosition[2].toFixed(2)) ||
        parseFloat(v[0].toFixed(2)) !== parseFloat(previousPosition[0].toFixed(2));

      const vehicleMoved = parseFloat(previousPosition[2].toFixed(2)) !== 30.0;

      previousPosition = v;

      if (!mouseClicked) {
        if (handleCameraPosition(v)) {
          return;
        }
        if (vehicleIsMoving && !initial) {
          camera.setLookAt(x, y + 5, z + 10, x, y, z, false);
        }
      }
      if (vehicleMoved) {
        initial = false;
      }
    });
  }, []);

  const onMouseDown = () => {
    mouseDownRef.current = true;
  };
  const onMouseUp = () => {
    mouseDownRef.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useFrame(() => {
    const { backward, brake, forward, left, reset, right } = controls.current;

    for (let e = 2; e < 4; e++) {
      vehicleApi.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2);
    }

    for (let s = 0; s < 2; s++) {
      vehicleApi.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s);
    }

    for (let b = 2; b < 4; b++) {
      vehicleApi.setBrake(brake ? maxBrake : 0, b);
    }

    if (reset) {
      chassisApi.position.set(...position);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(...angularVelocity);
      chassisApi.rotation.set(...rotation);
    }
  });

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <group ref={vehicle} position={[0, -0.4, 0]}>
        <Car ref={chassisBody} />
        <Wheel ref={wheels[0]} radius={radius} leftSide />
        <Wheel ref={wheels[1]} radius={radius} />
        <Wheel ref={wheels[2]} radius={radius} leftSide />
        <Wheel ref={wheels[3]} radius={radius} />
      </group>
    </>
  );
}

export default Vehicle;
