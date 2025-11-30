import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ThemeStyle } from '../../config/themes';
import styles from './index.module.css';

interface DotMatrixConfig {
  gap: number;
  dotSize: number;
  speed: number;
  noiseScale: number;
  threshold: number;
  mouseRadius: number;
}

interface ThemeColors {
  background: string;
  primaryParticle: string;
  secondaryParticle: string;
  accentParticle: string;
}

interface ThreeJSCanvasProps {
  themeColors: ThemeColors;
  themeStyle: ThemeStyle;
}

class DotMatrix {
  private container: HTMLElement;
  private config: DotMatrixConfig;
  private clock: THREE.Clock;
  private mouse: THREE.Vector2;
  private mouseSmooth: THREE.Vector2;
  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private material: THREE.ShaderMaterial;
  private points: THREE.Points;
  private animationId: number;
  private themeColors: ThemeColors;

  constructor(container: HTMLElement, initialThemeColors: ThemeColors) {
    this.container = container;
    this.themeColors = initialThemeColors;

    this.config = {
      gap: 8, // 保持原有间距
      dotSize: 4.5,
      speed: 0.3,
      noiseScale: 2.8,
      threshold: 0.15,
      mouseRadius: 120,
    };

    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(-10000, -10000);
    this.mouseSmooth = new THREE.Vector2(-10000, -10000);

    this.init();
    this.createDotMatrix();
    this.setupEventListeners();
    this.animate();
  }

  private init() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.OrthographicCamera(
      0, width, 0, -height, -1, 1
    );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: false, // 禁用抗锯齿以提升性能
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: true,
    });
    this.renderer.setSize(width, height);
    // 限制像素比，特别是在移动设备上
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 使用主题背景色
    const bgColor = new THREE.Color(this.themeColors.background);
    this.renderer.setClearColor(bgColor, 1);

    this.container.appendChild(this.renderer.domElement);
  }

  private createDotMatrix() {
    if (this.points) {
      this.scene.remove(this.points);
      this.geometry?.dispose();
      this.material?.dispose();
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const gap = this.config.gap;

    const cols = Math.ceil(width / gap) + 1;
    const rows = Math.ceil(height / gap) + 1;
    const count = cols * rows;

    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    const randoms = new Float32Array(count);

    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i3 = index * 3;
        const i2 = index * 2;

        positions[i3] = col * gap;
        positions[i3 + 1] = -row * gap;
        positions[i3 + 2] = 0;

        uvs[i2] = col / cols;
        uvs[i2 + 1] = row / rows;

        randoms[index] = Math.random();

        index++;
      }
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    // 解析主题颜色
    const primaryColor = new THREE.Color(this.themeColors.primaryParticle);
    const secondaryColor = new THREE.Color(this.themeColors.secondaryParticle);
    const accentColor = new THREE.Color(this.themeColors.accentParticle);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uDotSize: { value: this.config.dotSize },
        uSpeed: { value: this.config.speed },
        uNoiseScale: { value: this.config.noiseScale },
        uThreshold: { value: this.config.threshold },
        uMouse: { value: this.mouseSmooth },
        uMouseRadius: { value: this.config.mouseRadius },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
        uPrimaryColor: { value: primaryColor },
        uSecondaryColor: { value: secondaryColor },
        uAccentColor: { value: accentColor },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uDotSize;
        uniform float uSpeed;
        uniform float uNoiseScale;
        uniform float uThreshold;
        uniform vec2 uMouse;
        uniform float uMouseRadius;
        uniform vec2 uResolution;
        uniform float uPixelRatio;

        attribute float aRandom;

        varying float vVisible;
        varying float vIsAccent;
        varying float vMouseHover;
        varying float vBrightness;

        // Simplex 3D Noise
        vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;

          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          float time = uTime * uSpeed;

          vec2 coord = uv * uNoiseScale;

          // 简化可见性计算，减少 noise 调用
          float visNoise1 = snoise(vec3(coord * 1.0, time * 0.5));
          float visNoise2 = snoise(vec3(coord * 2.0 + 50.0, time * 0.3));

          float visibility = visNoise1 * 0.6 + visNoise2 * 0.4;

          // 右下角更密集
          float densityBias = uv.x * 0.3 + uv.y * 0.2;
          visibility += densityBias;

          // 阈值判断
          float visible = smoothstep(uThreshold - 0.1, uThreshold + 0.2, visibility);

          // 添加随机性
          if (visible < 0.5 && aRandom > 0.75) {
            visible = 0.0;
          }

          vVisible = visible;
          vBrightness = smoothstep(uThreshold, uThreshold + 0.4, visibility);

          // 简化强调色计算
          float accentNoise = snoise(vec3(coord * 1.2 + 200.0, time * 0.4 + 10.0));
          vIsAccent = smoothstep(0.15, 0.45, accentNoise);

          // 鼠标交互
          vec2 pixelPos = vec2(position.x, -position.y);
          float distToMouse = distance(pixelPos, uMouse);
          vMouseHover = 1.0 - smoothstep(0.0, uMouseRadius, distToMouse);
          vMouseHover = pow(vMouseHover, 1.2);

          gl_PointSize = uDotSize * uPixelRatio;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uPrimaryColor;
        uniform vec3 uSecondaryColor;
        uniform vec3 uAccentColor;

        varying float vVisible;
        varying float vIsAccent;
        varying float vMouseHover;
        varying float vBrightness;

        void main() {
          if (vVisible < 0.1) discard;

          // 基础强调色
          float isAccent = vIsAccent;

          // 鼠标 hover：普通粒子变强调色
          if (vMouseHover > 0.0 && isAccent < 0.5) {
            isAccent = max(isAccent, vMouseHover * 0.8);
          }

          // 根据是否为强调色选择基础色
          vec3 baseColor = mix(uSecondaryColor, uAccentColor, isAccent);
          vec3 brightColor = mix(uPrimaryColor, uAccentColor * 1.2, isAccent);

          // 根据亮度混合
          vec3 color = mix(baseColor, brightColor, vBrightness * 0.7);

          // hover 增加亮度
          color += vMouseHover * uAccentColor * 0.3;

          // 透明度
          float alpha = vVisible * (0.4 + vBrightness * 0.4);

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  private setupEventListeners() {
    // 绑定方法以确保正确的 this 上下文
    this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mouseleave', this.onMouseLeave, { passive: true });

    // 处理 WebGL 上下文丢失
    this.renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }, false);

    this.renderer.domElement.addEventListener('webglcontextrestored', () => {
      this.init();
      this.createDotMatrix();
      this.animate();
    }, false);
  }

  private resizeTimer: NodeJS.Timeout | null = null;

  private onResize() {
    // 防抖处理，避免频繁重建几何体
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = setTimeout(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.right = width;
      this.camera.bottom = -height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      this.material.uniforms.uResolution.value.set(width, height);
      this.material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 1.5);

      this.createDotMatrix();
    }, 150); // 150ms 防抖延迟
  }

  private onMouseMove(event: MouseEvent) {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  private onMouseLeave() {
    this.mouse.x = -10000;
    this.mouse.y = -10000;
  }

  public updateTheme(themeColors: ThemeColors) {
    this.themeColors = themeColors;

    // 更新背景色
    const bgColor = new THREE.Color(themeColors.background);
    this.renderer.setClearColor(bgColor, 1);

    // 更新粒子颜色
    if (this.material) {
      this.material.uniforms.uPrimaryColor.value.set(themeColors.primaryParticle);
      this.material.uniforms.uSecondaryColor.value.set(themeColors.secondaryParticle);
      this.material.uniforms.uAccentColor.value.set(themeColors.accentParticle);
    }
  }

  private lastFrameTime = 0;
  private targetFPS = 30; // 限制帧率为 30 FPS
  private frameInterval = 1000 / this.targetFPS;

  private animate = (currentTime: number = 0) => {
    this.animationId = requestAnimationFrame(this.animate);

    // 帧率限制
    const deltaTime = currentTime - this.lastFrameTime;
    if (deltaTime < this.frameInterval) {
      return;
    }
    this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

    const elapsedTime = this.clock.getElapsedTime();

    // 降低鼠标平滑更新频率
    this.mouseSmooth.x += (this.mouse.x - this.mouseSmooth.x) * 0.05;
    this.mouseSmooth.y += (this.mouse.y - this.mouseSmooth.y) * 0.05;

    if (this.material) {
      this.material.uniforms.uTime.value = elapsedTime;
      this.material.uniforms.uMouse.value = this.mouseSmooth;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // 清理定时器
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseleave', this.onMouseLeave);

    // 清理 Three.js 资源
    this.geometry?.dispose();
    this.material?.dispose();

    // 清理 WebGL 上下文
    this.renderer?.forceContextLoss();
    this.renderer?.dispose();

    if (this.container && this.renderer?.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default function ThreeJSCanvas({ themeColors, themeStyle }: ThreeJSCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotMatrixRef = useRef<DotMatrix | null>(null);

  // 延迟初始化 Three.js，给页面其他内容优先加载
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current || dotMatrixRef.current) return;

      try {
        dotMatrixRef.current = new DotMatrix(containerRef.current, themeColors);
      } catch (error) {
        console.error('Failed to initialize Three.js:', error);
      }
    }, 100); // 延迟 100ms 初始化

    return () => {
      clearTimeout(timer);
      dotMatrixRef.current?.dispose();
      dotMatrixRef.current = null;
    };
  }, []);

  // 响应主题变化
  useEffect(() => {
    if (!dotMatrixRef.current) {
      console.log('dotMatrixRef.current is null, skipping theme update');
      return;
    }

    console.log('Updating theme colors:', themeColors);
    dotMatrixRef.current.updateTheme(themeColors);
  }, [themeColors]);

  return (
    <div className={`${styles.container} ${styles[themeStyle]}`}>
      <div ref={containerRef} className={styles.canvas} />
    </div>
  );
}