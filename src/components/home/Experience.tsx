import {
  useScroll,
  Float,
  Sparkles,
  MeshDistortMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { NeuralNetworkPhase } from "../NeuralNetworkPhase";

const TransmissionPhase = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const conduitRef = useRef<THREE.Mesh>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, -60),
      new THREE.Vector3(2, 1, -45),
      new THREE.Vector3(-2, -1, -30),
      new THREE.Vector3(1, 2, -15),
      new THREE.Vector3(0, 0, 0),
    ]);
  }, []);

  const packetCount = 150;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const packetData = useMemo(() => {
    return Array.from({ length: packetCount }).map(() => ({
      speed: 15 + Math.random() * 25,
      progress: Math.random(), // 0 to 1 along the curve
      radius: Math.random() * 1.2,
      angle: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((_, delta) => {
    const offset = scroll.offset;
    const isActive = offset >= 0.15 && offset < 0.45;

    if (groupRef.current) {
      const targetScale = isActive ? 1 : 0.001;
      const targetZ = isActive ? 10 : -30;

      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 15, delta),
      );
      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        targetZ,
        12,
        delta,
      );

      groupRef.current.visible = groupRef.current.scale.x > 0.01;

      if (!groupRef.current.visible) return;

      if (conduitRef.current) {
        const mat = conduitRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.15;
      }

      if (packetsRef.current) {
        const mat = packetsRef.current.material as THREE.PointsMaterial;
        mat.opacity = 0.9;

        packetData.forEach((data, i) => {
          data.progress += (data.speed * delta * 2) / 60;
          if (data.progress > 1) data.progress = 0;

          const point = curve.getPointAt(data.progress);
          const tangent = curve.getTangentAt(data.progress);

          const up = new THREE.Vector3(0, 1, 0);
          const axis = new THREE.Vector3()
            .crossVectors(up, tangent)
            .normalize();
          const radialOffset = new THREE.Vector3()
            .crossVectors(tangent, axis)
            .normalize();

          radialOffset
            .applyAxisAngle(tangent, data.angle)
            .multiplyScalar(data.radius);

          dummy.position.copy(point).add(radialOffset);
          dummy.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            tangent,
          );
          dummy.scale.set(0.1, 1 + data.speed * 0.1, 0.1);
          dummy.updateMatrix();
          packetsRef.current!.setMatrixAt(i, dummy.matrix);
        });
        packetsRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef} scale={0.001} visible={false}>
      <mesh ref={conduitRef}>
        <tubeGeometry args={[curve, 128, 1.8, 16, false]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0} />
      </mesh>
      <instancedMesh
        ref={packetsRef}
        args={[undefined, undefined, packetCount]}
      >
        <capsuleGeometry args={[0.02, 0.5, 4, 8]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
};

const DeconstructionPhase = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlesCount = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  const targetPositions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    const offset = scroll.offset;
    const isActive = offset >= 0.7 && offset < 0.8;

    if (groupRef.current && particlesRef.current) {
      const targetScale = isActive ? 1 : 0.001;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 15, delta),
      );

      groupRef.current.visible = groupRef.current.scale.x > 0.01;

      if (!groupRef.current.visible) return;

      const pMat = particlesRef.current.material as THREE.PointsMaterial;
      pMat.opacity = 0.8;

      particlesRef.current.rotation.y += delta * 0.1;
      particlesRef.current.rotation.x += delta * 0.05;

      const positionsAttr = particlesRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < particlesCount; i++) {
        positionsAttr.array[i * 3] = THREE.MathUtils.damp(
          positionsAttr.array[i * 3],
          isActive ? targetPositions[i * 3] : positions[i * 3],
          8,
          delta,
        );
        positionsAttr.array[i * 3 + 1] = THREE.MathUtils.damp(
          positionsAttr.array[i * 3 + 1],
          isActive ? targetPositions[i * 3 + 1] : positions[i * 3 + 1],
          8,
          delta,
        );
        positionsAttr.array[i * 3 + 2] = THREE.MathUtils.damp(
          positionsAttr.array[i * 3 + 2],
          isActive ? targetPositions[i * 3 + 2] : positions[i * 3 + 2],
          8,
          delta,
        );
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={0.001} visible={false}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#8b5cf6"
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const TransformationPhase = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreGlowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const offset = scroll.offset;
    const isActive = offset >= 0.8;

    if (groupRef.current && coreRef.current && coreGlowRef.current) {
      const targetScale = isActive ? 2.5 : 0.001;
      const targetDistort = isActive ? 0.1 : 1.5;

      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 12, delta),
      );

      groupRef.current.visible = groupRef.current.scale.x > 0.01;
      if (!groupRef.current.visible) return;

      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.y += delta * 0.3;

      const material = coreRef.current.material as any;
      material.opacity = 0.9;
      material.distort = THREE.MathUtils.damp(
        material.distort,
        targetDistort,
        8,
        delta,
      );
      material.color = new THREE.Color("#ffffff");

      const glowMat = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      glowMat.opacity = 0.15;
      glowMat.color = new THREE.Color("#ffffff");
    }
  });

  return (
    <group ref={groupRef} scale={0.001} visible={false}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={coreRef} position={[0, 0, 0]}>
          {/* Reduced detail from 32 to 12 to optimize MeshDistortMaterial performance */}
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial
            color="#22c55e"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={1.5}
            speed={3}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={coreGlowRef} position={[0, 0, -0.5]} scale={1.5}>
          {/* Reduced segments from 32/32 to 16/16 as this is just an additive glow */}
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#22c55e"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Float>
    </group>
  );
};

export function Experience() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={2.5} color="#8b5cf6" />
      <pointLight position={[10, -10, 10]} intensity={2.5} color="#22c55e" />
      <pointLight position={[0, 10, -10]} intensity={2} color="#8b5cf6" />

      <Sparkles
        count={100}
        scale={20}
        size={3}
        speed={0.5}
        opacity={0.15}
        color="#22c55e"
      />

      <TransmissionPhase />
      <NeuralNetworkPhase />
      <DeconstructionPhase />
      <TransformationPhase />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1.5}
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}
