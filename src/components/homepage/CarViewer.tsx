import { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

interface MaterialsRef {
  body: THREE.MeshPhysicalMaterial | null;
  details: THREE.MeshStandardMaterial | null;
  glass: THREE.MeshPhysicalMaterial | null;
}

const CarViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bodyColor, setBodyColor] = useState<string>('#ff0000');
  const [detailsColor, setDetailsColor] = useState<string>('#ffffff');
  const [glassColor, setGlassColor] = useState<string>('#ffffff');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const carRef = useRef<THREE.Object3D | null>(null);
  const materialsRef = useRef<MaterialsRef>({
    body: null,
    details: null,
    glass: null
  });

  // Debounce function cho color changes
  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Memoize debounced color setters
  const debouncedSetBodyColor = useMemo(
    () => debounce((color: string) => {
      if (materialsRef.current.body) {
        materialsRef.current.body.color.set(color);
        materialsRef.current.body.needsUpdate = true;
      }
    }, 100),
    []
  );

  const debouncedSetDetailsColor = useMemo(
    () => debounce((color: string) => {
      if (materialsRef.current.details) {
        materialsRef.current.details.color.set(color);
        materialsRef.current.details.needsUpdate = true;
      }
    }, 100),
    []
  );

  const debouncedSetGlassColor = useMemo(
    () => debounce((color: string) => {
      if (materialsRef.current.glass) {
        materialsRef.current.glass.color.set(color);
        materialsRef.current.glass.needsUpdate = true;
      }
    }, 100),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    const wheels: THREE.Object3D[] = [];
    let animationId = 0;
    let showroom: THREE.Object3D | null = null;
    let pmremGenerator: THREE.PMREMGenerator | null = null;
    let isComponentMounted = true;

    // Loading Manager để track progress
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (_url,loaded, total) => {
      const progress = (loaded / total) * 100;
      if (isComponentMounted) {
        setLoadingProgress(Math.round(progress));
      }
    };
    loadingManager.onLoad = () => {
      if (isComponentMounted) {
        setIsLoading(false);
      }
    };

    function init() {
      const container = containerRef.current!;
      
      // Renderer với tối ưu hóa
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        powerPreference: "high-performance", // Tối ưu performance
        stencil: false, // Tắt stencil buffer nếu không dùng
        depth: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Giới hạn pixel ratio
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);
      scene.fog = new THREE.Fog(0x111111, 20, 60);

      // Camera
      camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        200
      );
      camera.position.set(6, 3.5, 6);

      // Controls với damping
      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxDistance = 30;
      controls.maxPolarAngle = THREE.MathUtils.degToRad(80);
      controls.target.set(0, 0.6, 0);
      controls.enableDamping = true; // Thêm damping cho smooth hơn
      controls.dampingFactor = 0.05;
      controls.update();

      // PMREM generator
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.4);
      hemi.position.set(0, 50, 0);
      scene.add(hemi);

      const dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(8, 12, 6);
      dir.castShadow = true;
      dir.shadow.mapSize.width = 2048;
      dir.shadow.mapSize.height = 2048;
      dir.shadow.camera.near = 0.5;
      dir.shadow.camera.far = 100;
      const d = 30;
      (dir.shadow.camera as THREE.OrthographicCamera).left = -d;
      (dir.shadow.camera as THREE.OrthographicCamera).right = d;
      (dir.shadow.camera as THREE.OrthographicCamera).top = d;
      (dir.shadow.camera as THREE.OrthographicCamera).bottom = -d;
      dir.shadow.bias = -0.0005;
      scene.add(dir);

      const fill = new THREE.DirectionalLight(0xffffff, 0.25);
      fill.position.set(-6, 4, -6);
      scene.add(fill);

      // Materials với shared instances
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: bodyColor,
        metalness: 1.0,
        roughness: 0.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03
      });
      const detailsMaterial = new THREE.MeshStandardMaterial({
        color: detailsColor,
        metalness: 1.0,
        roughness: 0.4
      });
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: glassColor,
        metalness: 0.25,
        roughness: 0,
        transmission: 1.0
      });
      materialsRef.current = { body: bodyMaterial, details: detailsMaterial, glass: glassMaterial };

      // Lazy load EXR environment (chỉ load khi cần)
      setTimeout(() => {
        if (!isComponentMounted) return;
        const exrLoader = new EXRLoader(loadingManager);
        exrLoader.setDataType(THREE.FloatType);
        exrLoader.load(
          '/textures/hdri/my-sky.exr', 
          (tex) => { 
            if (!isComponentMounted) return;
            const envMap = pmremGenerator!.fromEquirectangular(tex).texture;
            scene.environment = envMap;
            scene.background = envMap;
            tex.dispose();
          },
          undefined,
          (err) => console.warn('EXR load failed:', err)
        );
      }, 500); // Delay load EXR

      // Lazy load showroom (load sau)
      setTimeout(() => {
        if (!isComponentMounted) return;
        const loader = new GLTFLoader(loadingManager);
        loader.load(
          '/models/city_scene.glb',
          (gltf) => {
            if (!isComponentMounted) return;
            showroom = gltf.scene;
            showroom.position.set(0, 0, 0);
            showroom.scale.set(1, 1, 1);
            showroom.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh;
                m.castShadow = false;
                m.receiveShadow = true;
                // Optimize textures
                if ((m.material as any)?.map) {
                  const map = (m.material as any).map;
                  map.colorSpace = THREE.SRGBColorSpace;
                  map.generateMipmaps = true;
                  map.minFilter = THREE.LinearMipmapLinearFilter;
                }
              }
            });
            scene.add(showroom);
          },
          undefined,
          (err) => console.warn('Showroom load failed:', err)
        );
      }, 1000); // Delay load showroom

      // Load car model (priority)
      const dracoLoader = new DRACOLoader(loadingManager);
      dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/');
      dracoLoader.preload(); // Preload decoder

      const carLoader = new GLTFLoader(loadingManager);
      carLoader.setDRACOLoader(dracoLoader);

      carLoader.load(
        '/models/gltf/ferrari.glb',
        (gltf) => {
          if (!isComponentMounted) return;
          
          const carModel = (gltf.scene.children.length > 0 ? gltf.scene.children[0] : gltf.scene) as THREE.Object3D;
          carRef.current = carModel;

          const box = new THREE.Box3().setFromObject(carModel);
          const minY = box.min.y;
          carModel.position.y = -minY;

          carModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              m.castShadow = true;
              m.receiveShadow = true;
              
              // Frustum culling optimization
              m.frustumCulled = true;

              if (m.name.toLowerCase().includes('body')) {
                m.material = bodyMaterial;
              } else if (m.name.toLowerCase().includes('rim') || m.name.toLowerCase().includes('trim')) {
                m.material = detailsMaterial;
              } else if (m.name.toLowerCase().includes('glass')) {
                m.material = glassMaterial;
              } else {
                const mat: any = m.material;
                if (mat) {
                  mat.envMapIntensity = mat.envMapIntensity ?? 1.0;
                  if (mat.map) {
                    // Optimize texture
                    mat.map.colorSpace = THREE.SRGBColorSpace;
                    mat.map.generateMipmaps = true;
                    mat.map.minFilter = THREE.LinearMipmapLinearFilter;
                  }
                }
              }
            }
          });

          // Shadow decal
          const shadowTex = new THREE.TextureLoader(loadingManager).load('/models/gltf/ferrari_ao.png');
          shadowTex.generateMipmaps = false; // AO không cần mipmaps
          
          const shadowMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
            new THREE.MeshBasicMaterial({
              map: shadowTex,
              blending: THREE.MultiplyBlending,
              toneMapped: false,
              transparent: true,
              premultipliedAlpha: true
            })
          );
          shadowMesh.rotation.x = -Math.PI / 2;
          shadowMesh.renderOrder = 2;
          carModel.add(shadowMesh);

          scene.add(carModel);
        },
        undefined,
        (err) => console.error('Error loading car:', err)
      );

      // Animation với RAF optimization
      let lastTime = performance.now();
      const targetFPS = 60;
      const frameInterval = 1000 / targetFPS;

      function animate() {
        animationId = requestAnimationFrame(animate);
        
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;

        // Throttle rendering để stable FPS
        if (deltaTime < frameInterval) {
          return;
        }
        lastTime = currentTime - (deltaTime % frameInterval);

        controls.update();

        const t = -currentTime / 1000;
        for (let i = 0; i < wheels.length; i++) {
          wheels[i].rotation.x = t * Math.PI * 2;
        }

        // Auto-rotate car (chỉ khi không interact)
        if (carRef.current && !controls.enabled) {
          carRef.current.rotation.y += 0.004;
        }

        renderer.render(scene, camera);
      }

      animate();

      // Debounced resize handler
      let resizeTimeout: ReturnType<typeof setTimeout>;
      function onWindowResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (!container) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        }, 250);
      }
      window.addEventListener('resize', onWindowResize);

      // Cleanup function
      const cleanup = () => {
        isComponentMounted = false;
        window.removeEventListener('resize', onWindowResize);
        clearTimeout(resizeTimeout);
        cancelAnimationFrame(animationId);
        
        // Dispose all resources
        scene.traverse((object) => {
          if ((object as THREE.Mesh).isMesh) {
            const mesh = object as THREE.Mesh;
            mesh.geometry?.dispose();
            
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(mat => mat.dispose());
            } else if (mesh.material) {
              mesh.material.dispose();
            }
          }
        });

        // Dispose materials
        bodyMaterial.dispose();
        detailsMaterial.dispose();
        glassMaterial.dispose();

        renderer.dispose();
        controls.dispose();
        dracoLoader.dispose();
        if (pmremGenerator) pmremGenerator.dispose();
        
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };

      (init as any).cleanup = cleanup;
    }

    init();

    return () => {
      if ((init as any).cleanup) (init as any).cleanup();
    };
  }, []);

  // Update colors với debounce
  useEffect(() => {
    debouncedSetBodyColor(bodyColor);
  }, [bodyColor, debouncedSetBodyColor]);

  useEffect(() => {
    debouncedSetDetailsColor(detailsColor);
  }, [detailsColor, debouncedSetDetailsColor]);

  useEffect(() => {
    debouncedSetGlassColor(glassColor);
  }, [glassColor, debouncedSetGlassColor]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          padding: '20px'
        }}>
          <div style={{
            width: '80%',
            maxWidth: '300px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              backgroundColor: '#00ccff',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
            Đang tải mô hình 3D... {loadingProgress}%
          </p>
        </div>
      )}

      {/* 3D Container */}
      <div ref={containerRef} style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#111'
      }} />

      {/* Color Picker Panel - Responsive */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '12px 16px',
        borderRadius: 8,
        fontFamily: 'Arial, sans-serif',
        width: 'calc(100% - 20px)',
        maxWidth: '400px'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          color: '#fff', 
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          Thay đổi màu xe
        </h3>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-around', 
          gap: 8 
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}>Body</label>
            <input 
              style={{ 
                cursor: 'pointer', 
                width: '40px', 
                height: '40px',
                border: '2px solid #fff',
                borderRadius: '4px'
              }} 
              type="color" 
              value={bodyColor} 
              onChange={(e) => setBodyColor(e.target.value)} 
            />
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}>Details</label>
            <input 
              style={{ 
                cursor: 'pointer', 
                width: '40px', 
                height: '40px',
                border: '2px solid #fff',
                borderRadius: '4px'
              }} 
              type="color" 
              value={detailsColor} 
              onChange={(e) => setDetailsColor(e.target.value)} 
            />
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 6, 
              fontSize: '0.75rem',
              whiteSpace: 'nowrap'
            }}>Glass</label>
            <input 
              style={{ 
                cursor: 'pointer', 
                width: '40px', 
                height: '40px',
                border: '2px solid #fff',
                borderRadius: '4px'
              }} 
              type="color" 
              value={glassColor} 
              onChange={(e) => setGlassColor(e.target.value)} 
            />
          </div>
        </div>
      </div>

      {/* Welcome Panel - Responsive */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: '#ffffff',
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: '20px',
        borderRadius: 12,
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        width: 'calc(100% - 40px)',
        maxWidth: '600px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
      }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', 
          fontWeight: 'bold', 
          color: '#fff' 
        }}>
          WELCOME TO TUẤN LONG
        </h1>
        <h2 style={{ 
          margin: '0 0 12px 0', 
          fontSize: 'clamp(1rem, 4vw, 1.8rem)', 
          fontWeight: '900', 
          color: '#00ccff', 
          lineHeight: '1.3' 
        }}>
          TRUNG TÂM ĐÀO TẠO LÁI XE CHẤT LƯỢNG CAO
        </h2>
        <p style={{ 
          margin: '0 0 20px 0', 
          fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', 
          lineHeight: '1.5',
          display: window.innerWidth < 480 ? 'none' : 'block'
        }}>
          Học lái xe ô tô B1, B2, C1 tại Tuấn Long uy tín, thi nhanh có bằng sớm, giáo viên tận tâm, hỗ trợ đưa đón.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '10px 20px',
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            color: '#ffffff',
            border: '2px solid #ffffff',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap'
          }}>
            XEM THÊM
          </button>
          <button style={{
            padding: '10px 20px',
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            fontWeight: 'bold',
            backgroundColor: '#00ccff',
            color: '#000000',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 2px 10px rgba(0, 204, 255, 0.5)',
            whiteSpace: 'nowrap'
          }}>
            ĐĂNG KÝ NGAY
          </button>
        </div>
      </div>

      {/* CSS cho responsive hover effects */}
      <style>{`
        @media (max-width: 768px) {
          button:active {
            transform: scale(0.95);
          }
        }
        @media (min-width: 769px) {
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 204, 255, 0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default CarViewer;