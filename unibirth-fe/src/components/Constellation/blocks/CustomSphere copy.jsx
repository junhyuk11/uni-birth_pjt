import React, { useLayoutEffect, useRef } from "react";
import { BufferGeometry, MeshBasicMaterial, Object3D } from "three";
import * as THREE from "three";

function createCustomSphere(radius = 1, widthSegments = 8, heightSegments = 6) {
  const geometry = new BufferGeometry();
  const vertices = [];
  const indices = [];

  // Constructing vertices and indices
  for (let lat = 0; lat <= heightSegments; lat++) {
    const theta = (lat * Math.PI) / heightSegments;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let lon = 0; lon <= widthSegments; lon++) {
      const phi = (lon * 2 * Math.PI) / widthSegments;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = cosPhi * sinTheta;
      const y = cosTheta;
      const z = sinPhi * sinTheta;

      vertices.push(radius * x, radius * y, radius * z);

      if (lat < heightSegments && lon < widthSegments) {
        const first = lat * (widthSegments + 1) + lon;
        const second = first + widthSegments + 1;

        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
  }

  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );

  return geometry;
}

// function CustomSphere(props) {
//   const stars = [];

//   for (let i = 0; i < 5000; i++) {
//     const radius = 0.1; // 별의 반지름
//     const distance = 50; // 별이 중심으로부터 떨어져 있는 거리

//     const theta = Math.random() * Math.PI * 2;
//     const phi = Math.random() * Math.PI;

//     const x = distance * Math.sin(phi) * Math.cos(theta);
//     const y = distance * Math.cos(phi);
//     const z = distance * Math.sin(phi) * Math.sin(theta);

//     const geometry = createCustomSphere(radius, 8, 6); // 별의 지오메트리
//     const material = new MeshBasicMaterial({ color: "white" }); // 별의 재질

//     stars.push(
//       <mesh
//         key={i}
//         geometry={geometry}
//         material={material}
//         position={new Vector3(x, y, z)}
//       />,
//     );
//   }

//   return <>{stars}</>;
// }

// export default CustomSphere;

function Stars() {
  const meshRef = useRef();
  const dummy = new Object3D();
  const numStars = 5000;
  const startTime = performance.now();

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    for (let i = 0; i < numStars; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = 50 * Math.sin(phi) * Math.cos(theta);
      const y = 50 * Math.cos(phi);
      const z = 50 * Math.sin(phi) * Math.sin(theta);

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    const endTime = performance.now();
    console.log(`Render time: ${endTime - startTime} ms`);

    mesh.instanceMatrix.needsUpdate = true;
    console.log(mesh);
  }, []);
  const geometry = createCustomSphere(0.1, 8, 6);
  const material = new MeshBasicMaterial({ color: "white" });

  return <instancedMesh ref={meshRef} args={[geometry, material, numStars]} />;
}

export default Stars;
