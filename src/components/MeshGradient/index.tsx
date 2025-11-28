'use client';

/**
 * MeshGradient 组件
 * 基于 React-Mesh-Gradient (https://github.com/JohnnyLeek1/React-Mesh-Gradient) 修改
 * 原作者: Johnny Leek
 *
 * 使用 Three.JS 和 React Three Fiber 渲染 WebGL mesh gradient
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

// Vertex Shader - 包含 Simplex 3D Noise
const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vColor;
const int MAX_COLORS = 5;
uniform vec3 uColor[MAX_COLORS];

// Simplex 3D Noise by Ian McEwan, Ashima Arts
vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
    vec2 base = uv * vec2(3., 4.);

    float tilt = -0.5 * uv.y;
    float incline = uv.x * 0.1;
    float offset = incline * mix(-.25, 0.25, uv.y);

    float noise = snoise(vec3(base.x + time * 3., base.y, time * 10.));
    noise = max(0., noise);

    vec3 pos = vec3(position.x, position.y, position.z + noise * 0.1 + tilt + incline + offset);

    vColor = uColor[MAX_COLORS - 1];

    for(int i = 0; i < MAX_COLORS - 1; i++) {
        float flow = 5. + float(i) * 0.3;
        float speed = 8. + float(i) * 0.3;
        float seed = 1. + float(i) * 4.;

        vec2 frequency = vec2(0.3, 0.4);

        float noiseFloor = 0.2;
        float noiseCeil = 0.4 + float(i) * 0.07;

        float noise = smoothstep(noiseFloor, noiseCeil, snoise(vec3(base.x * frequency.x + time * flow, base.y * frequency.y, time * speed + seed)));

        vColor = mix(vColor, uColor[i], noise);
    }

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1.0);
}
`;

interface MeshGradientCoreProps {
  colors: string[];
  speed?: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
}

/**
 * 核心 Mesh Gradient 渲染组件
 */
function MeshGradientCore({
  colors,
  speed = 0.01,
  backgroundColor = '#000000',
  backgroundOpacity = 1.0,
}: MeshGradientCoreProps) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null!);
  const renderer = useThree(state => state.gl);
  const [time, setTime] = useState(0);

  // 确保有5个颜色（组件需要正好5个）
  const colorPalette = useMemo(() => {
    const safeColors = [...colors];
    while (safeColors.length < 5) {
      safeColors.push(safeColors[safeColors.length - 1] || '#000000');
    }
    return safeColors.slice(0, 5).map(color => new THREE.Color(color));
  }, [colors]);

  useEffect(() => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(backgroundColor, backgroundOpacity);

    return () => {
      // 清理
    };
  }, [renderer, backgroundColor, backgroundOpacity]);

  useFrame((_, delta) => {
    setTime(prev => prev + speed * delta);
  });

  return (
    <mesh position={new THREE.Vector3(0, 0, 0)}>
      <planeGeometry args={[1, 1, 300, 300]} />
      <shaderMaterial
        ref={shaderRef}
        side={THREE.DoubleSide}
        uniforms={{
          time: { value: time },
          uColor: { value: colorPalette },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export interface MeshGradientProps {
  /** 颜色数组（3-5个颜色，hex 格式） */
  colors: string[];
  /** 动画速度 0-1 */
  speed?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 背景透明度 */
  backgroundOpacity?: number;
  /** 容器类名 */
  className?: string;
  /** 容器样式 */
  style?: React.CSSProperties;
}

/**
 * MeshGradient 渲染器组件
 * 用于渲染 Three.js mesh gradient 效果
 */
const MeshGradient: React.FC<MeshGradientProps> = ({
  colors,
  speed = 0.01,
  backgroundColor = '#000000',
  backgroundOpacity = 1.0,
  className = '',
  style,
}) => {
  return (
    <div className={className} style={{ width: '100%', height: '100%', ...style }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerspectiveCamera
          makeDefault
          manual
          position={new THREE.Vector3(0, 0, 0.5)}
          near={0.001}
          far={1000}
        />
        <MeshGradientCore
          colors={colors}
          speed={speed}
          backgroundColor={backgroundColor}
          backgroundOpacity={backgroundOpacity}
        />
      </Canvas>
    </div>
  );
};

export default MeshGradient;
