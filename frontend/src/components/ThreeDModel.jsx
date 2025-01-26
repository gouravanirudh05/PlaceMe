import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ThreeDModel = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModel;
