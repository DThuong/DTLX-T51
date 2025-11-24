import React, { useEffect, useRef, useState } from 'react';
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

  const carRef = useRef<THREE.Object3D | null>(null);
  const materialsRef = useRef<MaterialsRef>({
    body: null,
    details: null,
    glass: null
  });

  useEffect(() => {
    if (!containerRef.current) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    // let grid: THREE.GridHelper;
    const wheels: THREE.Object3D[] = [];
    let animationId = 0;
    let showroom: THREE.Object3D | null = null;
    let pmremGenerator: THREE.PMREMGenerator | null = null;

    function init() {
      const container = containerRef.current!;
      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
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

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxDistance = 30;
      controls.maxPolarAngle = THREE.MathUtils.degToRad(80);
      controls.target.set(0, 0.6, 0);
      controls.update();

      // PMREM generator (for HDR/EXR -> envMap)
      pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      // Grid helper (subtle)
      // grid = new THREE.GridHelper(40, 40);
      // grid.material.opacity = 0.08;
      // (grid.material as THREE.Material).transparent = true;
      // scene.add(grid);

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

      // Optionally load an EXR/HDRI environment (uncomment + change path if you have one)

      const exrLoader = new EXRLoader();
      exrLoader.setDataType(THREE.FloatType);
      exrLoader.load('/textures/hdri/my-sky.exr', (tex) => { 
        const envMap = pmremGenerator!.fromEquirectangular(tex).texture;
        scene.environment = envMap; // Gán làm môi trường
        scene.background = envMap; // Gán làm nền
        tex.dispose();
      });

      // Load showroom GLB (if available)
      const loader = new GLTFLoader();
      loader.load(
        '/models/city_scene.glb',
        (gltf) => {
          showroom = gltf.scene;
          showroom.position.set(0, 0, 0);
          showroom.scale.set(1, 1, 1);
          showroom.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              m.castShadow = false;
              m.receiveShadow = true;
              // prefer sRGB for color textures
              if ((m.material as any)?.map) {
                (m.material as any).map.colorSpace = THREE.SRGBColorSpace;
              }
            }
          });
          scene.add(showroom);
        },
        undefined,
        (err) => {
          console.warn('Showroom load failed (ok if you don\'t have it):', err);
        }
      );

      // Materials for car (kept reactive via materialsRef)
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

      // Load car (with Draco if needed)
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/jsm/libs/draco/gltf/'); // ensure decoder exists at public path if using Draco

      const carLoader = new GLTFLoader();
      carLoader.setDRACOLoader(dracoLoader);

      carLoader.load(
        '/models/gltf/ferrari.glb',
        (gltf) => {
          // some GLTF have gltf.scene as container; choose first child if it's the actual mesh
          const carModel = (gltf.scene.children.length > 0 ? gltf.scene.children[0] : gltf.scene) as THREE.Object3D;
          carRef.current = carModel;

          // compute bbox & place car on ground (so bottom sits at y=0)
          const box = new THREE.Box3().setFromObject(carModel);
          const minY = box.min.y;
          carModel.position.y = -minY;

          // enable shadows and assign materials where possible
          carModel.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const m = child as THREE.Mesh;
              m.castShadow = true;
              m.receiveShadow = true;
              // if part names match, assign custom materials
              if (m.name.toLowerCase().includes('body')) {
                m.material = bodyMaterial;
              } else if (m.name.toLowerCase().includes('rim') || m.name.toLowerCase().includes('trim')) {
                m.material = detailsMaterial;
              } else if (m.name.toLowerCase().includes('glass')) {
                m.material = glassMaterial;
              } else {
                // ensure envMap intensity for other materials
                const mat: any = m.material;
                if (mat) {
                  mat.envMapIntensity = mat.envMapIntensity ?? 1.0;
                  if ((mat.map as THREE.Texture)?.colorSpace === undefined && (mat.map as THREE.Texture)) {
                    // Sửa lỗi: Áp dụng colorSpace mới cho map texture
                    (mat.map as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
                  }
                }
              }
            }
          });

          // optional shadow decal (simple)
          const shadowTex = new THREE.TextureLoader().load('/models/gltf/ferrari_ao.png');
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

      // Animation
      function animate() {
        animationId = requestAnimationFrame(animate);
        controls.update();

        const t = -performance.now() / 1000;
        for (let i = 0; i < wheels.length; i++) {
          wheels[i].rotation.x = t * Math.PI * 2;
        }

        // subtle grid parallax
        // grid.position.z = -(t % 1);

        // auto-rotate car
        if (carRef.current) {
          carRef.current.rotation.y += 0.004;
        }

        renderer.render(scene, camera);
      }

      animate();

      // Handle resize
      function onWindowResize() {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
      window.addEventListener('resize', onWindowResize);

      // Cleanup
      const cleanup = () => {
        window.removeEventListener('resize', onWindowResize);
        cancelAnimationFrame(animationId);
        // dispose renderer and pmrem
        renderer.dispose();
        controls.dispose();
        dracoLoader.dispose();
        if (pmremGenerator) pmremGenerator.dispose();
        // remove canvas
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };

      // attach cleanup to outer scope
      (init as any).cleanup = cleanup;
    }

    // run init
    init();

    // return cleanup from useEffect
    return () => {
      // @ts-ignore
      if ((init as any).cleanup) (init as any).cleanup();
    };
  }, []); // run once

  // update materials when colors change
  useEffect(() => {
    if (materialsRef.current.body) {
      materialsRef.current.body.color.set(bodyColor);
    }
  }, [bodyColor]);

  useEffect(() => {
    if (materialsRef.current.details) {
      materialsRef.current.details.color.set(detailsColor);
    }
  }, [detailsColor]);

  useEffect(() => {
    if (materialsRef.current.glass) {
      materialsRef.current.glass.color.set(glassColor);
    }
  }, [glassColor]);

  return (
    <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '40%',
          zIndex: 10,
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.55)',
          padding: '16px',
          borderRadius: 8,
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>Thay đổi kiểu dáng xe</h3>
        <div className='gap-4' style={{ display: 'flex',alignItems: 'center', justifyContent: 'space-around', gap: 10 }}>
          <div className='w-8 text-sm '>
            <label style={{ display: 'block', marginBottom: 6 }}>Body</label>
            <input style={{cursor: 'pointer'}} type="color" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} />
          </div>
          <div className='w-8 '>
            <label style={{ display: 'block', marginBottom: 6 }}>Details</label>
            <input style={{cursor: 'pointer'}} type="color" value={detailsColor} onChange={(e) => setDetailsColor(e.target.value)} />
          </div>
          <div className='w-8 '>
            <label style={{ display: 'block', marginBottom: 6 }}>Glass</label>
            <input style={{cursor: 'pointer'}} type="color" value={glassColor} onChange={(e) => setGlassColor(e.target.value)} />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#111'
        }}
      />

      <div
  style={{
    position: 'absolute',
    top: '50%', // Đặt ở giữa màn hình theo chiều dọc
    left: '20%', // Đặt ở giữa màn hình theo chiều ngang
    transform: 'translate(-50%, -50%)', // Dịch chuyển ngược lại 50% kích thước của nó để căn giữa hoàn toàn
    zIndex: 10,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)', // Tăng độ mờ lên 0.75 để dễ đọc
    padding: '30px 40px', // Tăng padding
    borderRadius: 12,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center', // Căn giữa nội dung
    maxWidth: '30%', // Đảm bảo responsive trên mobile
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
  }}
>
  {/* Dòng chữ Welcome */}
  <h1 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
    WELCOME TO TUẤN LONG
  </h1>

  {/* Khẩu hiệu chính (Dòng chữ to) */}
  <h2 style={{ margin: '0 0 15px 0', fontSize: '2.5rem', fontWeight: '900', color: '#00ccff', lineHeight: '1.2' }}>
    TRUNG TÂM TUẤN LONG ĐÀO TẠO LÁI XE CHẤT LƯỢNG CAO
  </h2>

  {/* Dòng chữ nhỏ mô tả */}
  <p style={{ margin: '0 0 30px 0', fontSize: '1.1rem', lineHeight: '1.4' }}>
    Học lái xe ô tô B1, B2, C1 tại Tuấn Long uy tín, thi nhanh có bằng sớm, giáo viên tận tâm, hỗ trợ đưa đón.
  </p>

  {/* Hai nút hành động */}
  <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
    
    {/* Nút Xem thêm */}
    <button
      style={{
        padding: '12px 25px',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '2px solid #ffffff',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
      }}
      // Thêm sự kiện hover (nếu bạn đang dùng thư viện styling)
      // onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#000000'}
      // onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'}
    >
      XEM THÊM
    </button>
    
    {/* Nút Đăng ký ngay (Nổi bật) */}
    <button
      style={{
        padding: '12px 25px',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: '#00ccff', // Màu xanh nổi bật
        color: '#000000',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        boxShadow: '0 2px 10px rgba(0, 204, 255, 0.5)'
      }}
      // Thêm sự kiện hover (nếu bạn đang dùng thư viện styling)
      // onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'}
    >
      ĐĂNG KÝ NGAY
    </button>
  </div>
</div>
    </div>
  );
};

export default CarViewer;
