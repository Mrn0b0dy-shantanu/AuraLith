import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

export const NeuralNetworkPhase = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const signalsRef = useRef<THREE.InstancedMesh>(null);

  const { nodes, connections } = useMemo(() => {
    const layers = [4, 8, 12, 8, 4];
    const layerSpacing = 3.2;
    const nodeSpacing = 1.0;

    const nodes: THREE.Vector3[] = [];
    const layerOffsets: number[] = [];
    let nodeIndex = 0;

    layers.forEach((count, layerIdx) => {
      layerOffsets.push(nodeIndex);
      const x = (layerIdx - (layers.length - 1) / 2) * layerSpacing;
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * nodeSpacing;
        const z = (Math.random() - 0.5) * 0.5; 
        nodes.push(new THREE.Vector3(x, y, z));
        nodeIndex++;
      }
    });

    const connections: {
      start: number;
      end: number;
      startVec: THREE.Vector3;
      endVec: THREE.Vector3;
    }[] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = layerOffsets[l];
      const currentLayerCount = layers[l];
      const nextLayerStart = layerOffsets[l + 1];
      const nextLayerCount = layers[l + 1];

      for (let i = 0; i < currentLayerCount; i++) {
        for (let j = 0; j < nextLayerCount; j++) {
          
          const yDist = Math.abs(
            i - (currentLayerCount - 1) / 2 - (j - (nextLayerCount - 1) / 2),
          );
          if (yDist <= 2.5 || Math.random() > 0.8) {
            const startIdx = currentLayerStart + i;
            const endIdx = nextLayerStart + j;
            connections.push({
              start: startIdx,
              end: endIdx,
              startVec: nodes[startIdx],
              endVec: nodes[endIdx],
            });
          }
        }
      }
    }
    return { nodes, connections };
  }, []);

  const linePositions = useMemo(() => {
    const positions = new Float32Array(connections.length * 6);
    connections.forEach((conn, i) => {
      positions[i * 6] = conn.startVec.x;
      positions[i * 6 + 1] = conn.startVec.y;
      positions[i * 6 + 2] = conn.startVec.z;
      positions[i * 6 + 3] = conn.endVec.x;
      positions[i * 6 + 4] = conn.endVec.y;
      positions[i * 6 + 5] = conn.endVec.z;
    });
    return positions;
  }, [connections]);

  const lineColors = useMemo(() => {
    const colors = new Float32Array(connections.length * 6);
    const base = new THREE.Color("#312e81");
    for (let i = 0; i < connections.length * 2; i++) {
      colors[i * 3] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;
    }
    return colors;
  }, [connections]);

  const connectionEnergy = useMemo(
    () => new Float32Array(connections.length),
    [connections],
  );
  const nodeEnergy = useMemo(() => new Float32Array(nodes.length), [nodes]);

  const signalCount = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const signalData = useMemo(() => {
    return Array.from({ length: signalCount }).map(() => ({
      connectionIndex: Math.floor(Math.random() * connections.length),
      progress: Math.random(),
      speed: 0.2 + Math.random() * 0.4, 
    }));
  }, [connections.length]);

  useFrame((state, delta) => {
    const offset = scroll.offset;
    const isActive = offset >= 0.45 && offset < 0.7;

    if (groupRef.current) {
      const targetScale = isActive ? 0.8 : 0.001;
      const targetZ = isActive ? 0 : 30; 
      const targetX = isActive ? 3 : 0; 

      groupRef.current.scale.setScalar(
        THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 15, delta),
      );
      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        targetZ,
        12,
        delta,
      );
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetX,
        12,
        delta,
      );

      groupRef.current.visible = groupRef.current.scale.x > 0.01;
      if (!groupRef.current.visible) return;

      const targetOpacity = 1;

      let currentOpacity = 0;

      
      for (let i = 0; i < connections.length; i++) {
        connectionEnergy[i] = Math.max(0, connectionEnergy[i] - delta * 1.5);
      }
      for (let i = 0; i < nodes.length; i++) {
        nodeEnergy[i] = Math.max(0, nodeEnergy[i] - delta * 2);
      }

      if (signalsRef.current) {
        const mat = signalsRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          targetOpacity * 0.9,
          0.1,
        ); 

        signalData.forEach((data, i) => {
          data.progress += data.speed * delta;

          
          connectionEnergy[data.connectionIndex] = Math.min(
            1,
            connectionEnergy[data.connectionIndex] + delta * 3,
          ); 

          if (data.progress >= 1) {
            data.progress = 0;
            const currentConn = connections[data.connectionIndex];

            
            nodeEnergy[currentConn.end] = 0.5; 

            const possibleNextIndices: number[] = [];
            connections.forEach((c, idx) => {
              if (c.start === currentConn.end) {
                possibleNextIndices.push(idx);
              }
            });

            if (possibleNextIndices.length > 0) {
              data.connectionIndex =
                possibleNextIndices[
                  Math.floor(Math.random() * possibleNextIndices.length)
                ];
            } else {
              data.connectionIndex = Math.floor(
                Math.random() * connections.length,
              );
            }
          }

          const conn = connections[data.connectionIndex];

          
          const easeProgress = (1 - Math.cos(data.progress * Math.PI)) / 2;
          dummy.position.lerpVectors(conn.startVec, conn.endVec, easeProgress);

          const direction = new THREE.Vector3()
            .subVectors(conn.endVec, conn.startVec)
            .normalize();
          dummy.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction,
          );
          dummy.scale.setScalar(0.8); 

          dummy.updateMatrix();
          signalsRef.current!.setMatrixAt(i, dummy.matrix);
        });
        signalsRef.current.instanceMatrix.needsUpdate = true;
      }

      if (linesRef.current) {
        const mat = linesRef.current.material as THREE.LineBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          targetOpacity * 0.4,
          0.1,
        ); 
        currentOpacity = Math.max(currentOpacity, mat.opacity);

        const colorAttr = linesRef.current.geometry.attributes
          .color as THREE.BufferAttribute;
        if (colorAttr) {
          const base = new THREE.Color("#1e1b4b");
          const active = new THREE.Color("#6d28d9");
          const tempColor = new THREE.Color();

          for (let i = 0; i < connections.length; i++) {
            tempColor.copy(base).lerp(active, connectionEnergy[i] * 0.6); 

            colorAttr.array[i * 6] = tempColor.r;
            colorAttr.array[i * 6 + 1] = tempColor.g;
            colorAttr.array[i * 6 + 2] = tempColor.b;

            colorAttr.array[i * 6 + 3] = tempColor.r;
            colorAttr.array[i * 6 + 4] = tempColor.g;
            colorAttr.array[i * 6 + 5] = tempColor.b;
          }
          colorAttr.needsUpdate = true;
        }
      }

      if (nodesRef.current) {
        const mat = nodesRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = THREE.MathUtils.lerp(
          mat.opacity,
          targetOpacity * 0.6,
          0.1,
        ); 

        nodes.forEach((node, i) => {
          dummy.position.copy(node);
          const basePulse =
            1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.03; 
          const energyPulse = nodeEnergy[i] * 0.3; 
          dummy.scale.setScalar(basePulse + energyPulse);
          dummy.updateMatrix();
          nodesRef.current!.setMatrixAt(i, dummy.matrix);
        });
        nodesRef.current.instanceMatrix.needsUpdate = true;
      }

      groupRef.current.visible = targetOpacity > 0.01 || currentOpacity > 0.01;
    }
  });

  return (
    <group ref={groupRef} scale={0.001} visible={false}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      <instancedMesh
        ref={signalsRef}
        args={[undefined, undefined, signalCount]}
      >
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial
          color="#6d28d9"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
};
