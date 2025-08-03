// Three.js 3D Scene
let scene, camera, renderer, cubes = [], spheres = [];

function initThreeJS() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('threejs-canvas'),
    alpha: true,
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Create floating 3D objects
  for (let i = 0; i < 15; i++) {
    // Cubes
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
      transparent: true,
      opacity: 0.7
    });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20
    );

    cube.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    cubes.push(cube);
    scene.add(cube);

    // Spheres
    const sphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.9, 0.7),
      transparent: true,
      opacity: 0.6,
      shininess: 100
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);

    sphere.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 35,
      (Math.random() - 0.5) * 25
    );

    spheres.push(sphere);
    scene.add(sphere);
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff6b6b, 1, 100);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);

  camera.position.z = 20;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Animate cubes
  cubes.forEach((cube, index) => {
    cube.rotation.x += 0.01 + index * 0.001;
    cube.rotation.y += 0.01 + index * 0.001;
    cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
  });

  // Animate spheres
  spheres.forEach((sphere, index) => {
    sphere.position.x += Math.sin(Date.now() * 0.002 + index) * 0.05;
    sphere.position.z += Math.cos(Date.now() * 0.002 + index) * 0.05;
    sphere.rotation.y += 0.015;
  });

  // Camera movement
  camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
  camera.position.y = Math.cos(Date.now() * 0.0007) * 3;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

// Floating elements
function createFloatingElements() {
  const container = document.getElementById('floatingElements');

  setInterval(() => {
    const element = document.createElement('div');
    element.className = 'floating-shape';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 8 + 6) + 's';
    element.style.width = element.style.height = (Math.random() * 15 + 10) + 'px';

    container.appendChild(element);

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 15000);
  }, 800);
}

// Celebration effect
function triggerCelebration() {
  // Create burst of particles
  for (let i = 0; i < 50; i++) {
    createParticle();
  }

  // Shake effect
  document.body.style.animation = 'shake 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);

  // Change 3D objects colors
  cubes.forEach(cube => {
    cube.material.color.setHSL(Math.random(), 1, 0.7);
  });

  spheres.forEach(sphere => {
    sphere.material.color.setHSL(Math.random(), 1, 0.8);
  });
}

function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '8px';
  particle.style.height = '8px';
  particle.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '100';

  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;
  particle.style.left = startX + 'px';
  particle.style.top = startY + 'px';

  document.body.appendChild(particle);

  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 300 + 200;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;

  let x = startX, y = startY;
  let opacity = 1;

  function animateParticle() {
    x += vx * 0.016;
    y += vy * 0.016 + 100 * 0.016; // gravity
    opacity -= 0.02;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.opacity = opacity;

    if (opacity > 0 && y < window.innerHeight + 100) {
      requestAnimationFrame(animateParticle);
    } else {
      document.body.removeChild(particle);
    }
  }

  animateParticle();
}

// Cursor trail effect
let trail = [];

document.addEventListener('mousemove', (e) => {
  trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

  if (trail.length > 20) trail.shift();

  if (Math.random() < 0.1) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#fff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '99';
    sparkle.style.animation = 'sparkleAnim 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 1000);
  }
});

// CSS for sparkle animation
const style = document.createElement('style');
style.textContent = `
            @keyframes sparkleAnim {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0);
                }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
document.head.appendChild(style);

// Initialize everything
window.addEventListener('load', () => {
  initThreeJS();
  createFloatingElements();
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Auto celebration after 5 seconds
setTimeout(() => {
  triggerCelebration();
}, 5000);