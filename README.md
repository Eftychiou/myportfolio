// import { EffectComposer, Pixelation, Scanline, Vignette } from '@react-three/postprocessing';
// import { BlendFunction } from 'postprocessing';
{
/_ <EffectComposer> _/
}
{
/_ <Pixelation /> _/
}
{
/_ <Scanline /> _/
}

{
/_ <Vignette offset={0.2} darkness={1.3} eskil={false} blendFunction={BlendFunction.NORMAL} /> _/
}
{
/_ </EffectComposer> _/
}

<TransformControls
ref={transformRef}

        onChange={() => {
          console.log(boxRef?.current?.position);
        }}
      >
        <mesh  position={[7.72, -15.84,  4.17]}>
          <sphereGeometry args={[8, 50, 50]} />
          <MeshReflectorMaterial
            resolution={512}
            color='gray'
            blur={[1000, 1000]}
            mixBlur={1}
            mirror={1} // lower 0 higher 1
          />
        </mesh>
      </TransformControls>



          if (transformRef?.current && boxRef.current) {
      transformRef?.current.attach(boxRef.current);
    }


       {/* <gridHelper args={[40, 40, 0xff0000, 'cyan']} /> */}

{/_ <Sky sunPosition={[2.8, -0.1, -4.3]} distance={1000} rayleigh={2} /> _/}
