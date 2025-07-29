// Import Three.js modules
import * as THREE from 'three';

// Make THREE available globally
window.THREE = THREE;

// Global variables for 3D scene
let scene, camera, renderer, hackerLabGroup, hackerFigure;
let rgbLight1, rgbLight2, rgbLight3, mainLight;

// Function to update robot visor message
function updateVisorMessage(message) {
    if (hackerFigure && hackerFigure.userData && hackerFigure.userData.visor) {
        const visor = hackerFigure.userData.visor;
        if (visor.userData && visor.userData.drawFunction) {
            // Use the enhanced drawing function
            visor.userData.drawFunction(message);
            visor.userData.texture.needsUpdate = true;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Mukul\'s Portfolio...');
    
    // Initialize all components
    try {
        // Initialize the 3D hacker lab scene
        init3DHackerLab();
        
        // Contact Form Handler
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.querySelector('.btn-text');
        const btnLoader = document.querySelector('.btn-loader');
        const formMessage = document.getElementById('form-message');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Show loading state
                submitBtn.disabled = true;
                btnText.textContent = 'Sending...';
                btnLoader.classList.remove('hidden');
                formMessage.className = 'form-message';
                formMessage.textContent = '';
                
                try {
                    // Get reCAPTCHA response
                    const recaptchaResponse = grecaptcha.getResponse();
                    if (!recaptchaResponse) {
                        throw new Error('Please complete the reCAPTCHA verification');
                    }
                    
                    // Get form data
                    const formData = new FormData(contactForm);
                    formData.append('g-recaptcha-response', recaptchaResponse);
                    
                    // Submit form
                    const response = await fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams(formData).toString()
                    });
                    
                    if (response.ok) {
                        // Success
                        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formMessage.className = 'form-message success';
                        contactForm.reset();
                        grecaptcha.reset();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    formMessage.textContent = error.message || 'There was an error sending your message. Please try again later.';
                    formMessage.className = 'form-message error';
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    btnLoader.classList.add('hidden');
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
        
        initSmoothScrolling();
        initAnimations();
        initTypingEffect();
        initScrollRotation();
        initCounterAnimations();
        initNeuralNetwork();
        initExpertiseAnimations();
    } catch (error) {
        console.error('❌ Error during initialization:', error);
        // Try to initialize 3D scene again as fallback
        setTimeout(() => {
            try {
                init3DHackerLab();
            } catch (e) {
                console.error('❌ Fallback 3D initialization failed:', e);
            }
        }, 1000);
    }
    
    console.log('✅ Portfolio initialized successfully!');
    
    // Initialize assistant section animations
    initAssistantAnimations();
    
    // Force trigger counter animations after a delay
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        console.log('Found stat numbers:', statNumbers.length);
        statNumbers.forEach((counter, index) => {
            console.log(`Counter ${index}:`, counter.getAttribute('data-target'));
            if (!counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }, 2000);
});

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrix-rain');
    if (!matrixContainer) {
        console.error('Matrix rain container not found');
        return;
    }
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random() * 0.5 + 0.1;
        
        matrixContainer.appendChild(char);
        
        // Remove char after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }
    
    // Create matrix chars periodically
    setInterval(createMatrixChar, 100);
}

// 3D Hacker Lab Scene
function init3DHackerLab() {
    const container = document.getElementById('hacker-lab-3d');
    if (!container) {
        console.error('3D container not found');
        return;
    }
    
    console.log('🎮 Initializing 3D Hacker Lab...');
    
    try {
        // Scene setup
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000011, 15, 120);
    
        // Camera setup (positioned to show robot on chair in front of table)
        camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0.8, 3.5); // Slightly higher and further back
        camera.lookAt(0, 0.3, -2); // Look at the robot's upper body
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000011, 0.1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(renderer.domElement);
    
    // Create main group for rotation
    hackerLabGroup = new THREE.Group();
    
        // Enhanced Lighting Setup
        const ambientLight = new THREE.AmbientLight(0x001133, 0.6);
        scene.add(ambientLight);
        
        // Main overhead light (bluish)
        mainLight = new THREE.PointLight(0x0099ff, 8, 40);
        mainLight.position.set(0, 8, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);
    
    // RGB PC lighting
    rgbLight1 = new THREE.PointLight(0x0066ff, 3, 25);
    rgbLight1.position.set(3.5, 2, 1);
    scene.add(rgbLight1);
    
    rgbLight2 = new THREE.PointLight(0x6600ff, 2.5, 22);
    rgbLight2.position.set(-4, 3, -2);
    scene.add(rgbLight2);
    
    rgbLight3 = new THREE.PointLight(0x00ccff, 2.8, 24);
    rgbLight3.position.set(4, 4, 6);
    scene.add(rgbLight3);
    
    // Monitor glow
    const monitorLight = new THREE.PointLight(0x0099ff, 2, 15);
    monitorLight.position.set(0, 2, -1);
    scene.add(monitorLight);
    
    // Create desk
    function createDesk() {
        const deskGroup = new THREE.Group();
        
        // Desk surface
        const deskGeometry = new THREE.BoxGeometry(8, 0.2, 4);
        const deskMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 30
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.y = 0;
        desk.receiveShadow = true;
        deskGroup.add(desk);
        
        // Desk legs
        for (let i = 0; i < 4; i++) {
            const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2);
            const legMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            const x = i % 2 === 0 ? -3.5 : 3.5;
            const z = i < 2 ? -1.5 : 1.5;
            leg.position.set(x, -1, z);
            leg.castShadow = true;
            deskGroup.add(leg);
        }
        
        return deskGroup;
    }
    
    // Create gaming setup
    function createGamingSetup() {
        const setupGroup = new THREE.Group();
        
        // Main monitor
        const monitorGeometry = new THREE.BoxGeometry(3, 2, 0.2);
        const monitorMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            emissive: 0x001122,
            emissiveIntensity: 0.3,
            side: THREE.DoubleSide // Make the material visible from both sides
        });
        
        // Create monitor with HP logo on the back
        const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
        monitor.position.set(0, 1.5, -1.5);
        monitor.castShadow = true;
        setupGroup.add(monitor);
        
        // Add HP logo to the back of the monitor
        const hpLogoCanvas = document.createElement('canvas');
        hpLogoCanvas.width = 512;
        hpLogoCanvas.height = 512;
        const hpCtx = hpLogoCanvas.getContext('2d');
        
        // HP logo in blue gradient
        const hpGradient = hpCtx.createLinearGradient(0, 0, 512, 512);
        hpGradient.addColorStop(0, '#0096D6');
        hpGradient.addColorStop(1, '#00B4D8');
        hpCtx.fillStyle = hpGradient;
        hpCtx.font = 'bold 400px Arial';
        hpCtx.textAlign = 'center';
        hpCtx.textBaseline = 'middle';
        hpCtx.fillText('hp', 256, 256);
        
        const hpTexture = new THREE.CanvasTexture(hpLogoCanvas);
        const hpMaterial = new THREE.MeshPhongMaterial({
            map: hpTexture,
            emissive: 0x0096D6,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });
        
        // Position HP logo on the back of the monitor
        const hpLogo = new THREE.Mesh(
            new THREE.PlaneGeometry(2.6, 1.6),
            hpMaterial
        );
        hpLogo.position.set(0, 1.5, -1.51); // Slightly in front of the monitor back
        hpLogo.rotation.y = Math.PI; // Face the back
        setupGroup.add(hpLogo);
        
        // Kali Linux Screen with Neon Dragon Symbol
        const screenGeometry = new THREE.PlaneGeometry(2.8, 1.8);
        
        // Create canvas for Kali Linux screen with glowing effect
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 640;
        const ctx = canvas.getContext('2d');
        
        // Dark background with subtle gradient
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#0a0a12');
        bgGradient.addColorStop(1, '#000000');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Kali Linux dragon symbol with neon glow
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const size = Math.min(canvas.width, canvas.height) * 0.8;
        
        // Outer glow
        const outerGlow = ctx.createRadialGradient(0, 0, size * 0.4, 0, 0, size * 0.6);
        outerGlow.addColorStop(0, 'rgba(138, 43, 226, 0.7)'); // BlueViolet
        outerGlow.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();
        
        // Draw Kali dragon symbol (simplified)
        ctx.save();
        ctx.scale(1, 1.2);
        
        // Dragon head
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.3);
        ctx.bezierCurveTo(
            size * 0.2, -size * 0.4,
            size * 0.3, -size * 0.2,
            size * 0.2, 0
        );
        ctx.bezierCurveTo(
            size * 0.3, size * 0.2,
            size * 0.2, size * 0.4,
            0, size * 0.3
        );
        
        // Inner glow
        const innerGlow = ctx.createLinearGradient(0, -size * 0.5, 0, size * 0.5);
        innerGlow.addColorStop(0, '#8A2BE2'); // BlueViolet
        innerGlow.addColorStop(0.5, '#00BFFF'); // DeepSkyBlue
        innerGlow.addColorStop(1, '#7B68EE'); // MediumSlateBlue
        
        ctx.strokeStyle = innerGlow;
        ctx.lineWidth = size * 0.05;
        ctx.shadowColor = '#8A2BE2';
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
        
        // Add 'KALI' text below the symbol
        ctx.font = `bold ${size * 0.15}px 'Arial Black', sans-serif`;
        ctx.fillStyle = '#00FFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 10;
        ctx.fillText('KALI', 0, size * 0.4);
        
        ctx.restore(); // Restore to original state
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('KALI', canvas.width/2, canvas.height/2 - 40);
        ctx.fillText('LINUX', canvas.width/2, canvas.height/2 + 20);
        
        // Draw simplified dragon shape
        ctx.beginPath();
        ctx.fillStyle = '#00ccff';
        // Dragon head
        ctx.ellipse(canvas.width/2, canvas.height/2 - 80, 40, 30, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Dragon body
        ctx.beginPath();
        ctx.ellipse(canvas.width/2, canvas.height/2 - 40, 60, 20, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        // Terminal-like text
        ctx.fillStyle = '#00ff88';
        ctx.font = '12px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('root@kali:~# nmap -sS target', 20, canvas.height - 60);
        ctx.fillText('root@kali:~# sqlmap -u "url"', 20, canvas.height - 40);
        ctx.fillText('root@kali:~# hydra -l admin -P pass.txt', 20, canvas.height - 20);
        
        // Create texture from canvas
        const screenTexture = new THREE.CanvasTexture(canvas);
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            map: screenTexture,
            transparent: true,
            opacity: 0.9
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 1.5, -1.39);
        setupGroup.add(screen);
        
        // Screen glow effect
        const glowGeometry = new THREE.PlaneGeometry(3.0, 2.0);
        const glowMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x0099ff,
            transparent: true,
            opacity: 0.3
        });
        const screenGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        screenGlow.position.set(0, 1.5, -1.4);
        setupGroup.add(screenGlow);
        
        // Side monitors
        for (let i = 0; i < 2; i++) {
            const sideMonitorGeometry = new THREE.BoxGeometry(2, 1.5, 0.15);
            const sideMonitor = new THREE.Mesh(sideMonitorGeometry, monitorMaterial);
            const x = i === 0 ? -3 : 3;
            const rotation = i === 0 ? Math.PI / 8 : -Math.PI / 8;
            sideMonitor.position.set(x, 1.2, -1.2);
            sideMonitor.rotation.y = rotation;
            sideMonitor.castShadow = true;
            setupGroup.add(sideMonitor);
            
            // Side screens with code/terminal content
            const sideScreenGeometry = new THREE.PlaneGeometry(1.8, 1.3);
            
            // Create canvas for side screens
            const sideCanvas = document.createElement('canvas');
            sideCanvas.width = 256;
            sideCanvas.height = 192;
            const sideCtx = sideCanvas.getContext('2d');
            
            // Dark terminal background
            sideCtx.fillStyle = '#0a0a0a';
            sideCtx.fillRect(0, 0, sideCanvas.width, sideCanvas.height);
            
            // Terminal text
            sideCtx.fillStyle = '#00ccff';
            sideCtx.font = '10px monospace';
            sideCtx.textAlign = 'left';
            const terminalLines = [
                '$ python3 ai_model.py',
                '$ Training neural network...',
                '$ Epoch 1/100 - loss: 0.234',
                '$ Epoch 2/100 - loss: 0.198',
                '$ Model accuracy: 94.2%',
                '$ Saving checkpoint...',
                '$ ./exploit.py --target 192.168.1.1',
                '$ [+] Vulnerability found!',
                '$ [+] Shell access gained',
                '$ root@target:~#'
            ];
            
            terminalLines.forEach((line, index) => {
                sideCtx.fillText(line, 5, 15 + index * 12);
            });
            
            const sideTexture = new THREE.CanvasTexture(sideCanvas);
            const sideScreenMaterial = new THREE.MeshBasicMaterial({ 
                map: sideTexture,
                transparent: true,
                opacity: 0.8
            });
            const sideScreen = new THREE.Mesh(sideScreenGeometry, sideScreenMaterial);
            sideScreen.position.set(x, 1.2, -1.1);
            sideScreen.rotation.y = rotation;
            setupGroup.add(sideScreen);
        }
        
        return setupGroup;
    }
    
    // Create gaming PC
    function createGamingPC() {
        const pcGroup = new THREE.Group();
        
        // Main case
        const caseGeometry = new THREE.BoxGeometry(1, 2.5, 2);
        const caseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            shininess: 50
        });
        const pcCase = new THREE.Mesh(caseGeometry, caseMaterial);
        pcCase.position.set(3.5, 1.25, 1);
        pcCase.castShadow = true;
        pcGroup.add(pcCase);
        
        // Tempered glass panel
        const glassGeometry = new THREE.PlaneGeometry(2.3, 0.9);
        const glassMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.3,
            shininess: 100
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(4, 1.25, 1);
        glass.rotation.y = Math.PI / 2;
        pcGroup.add(glass);
        
        // Enhanced RGB fans (like reference image)
        pcGroup.fans = [];
        const fanColors = [0x0099ff, 0x6600ff, 0x00ccff];
        
        for (let i = 0; i < 6; i++) {
            const fanGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 12);
            const fanMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                emissive: fanColors[i % 3],
                emissiveIntensity: 0.8
            });
            const fan = new THREE.Mesh(fanGeometry, fanMaterial);
            const x = 3.5 + (i % 2) * 0.5 - 0.25;
            const y = 0.8 + Math.floor(i / 2) * 0.6;
            const z = 0.9;
            fan.position.set(x, y, z);
            fan.rotation.x = Math.PI / 2;
            pcGroup.add(fan);
            pcGroup.fans.push(fan);
            
            // Add fan blades
            for (let j = 0; j < 4; j++) {
                const bladeGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.4);
                const bladeMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x333333,
                    transparent: true,
                    opacity: 0.8
                });
                const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
                blade.position.set(0, 0, 0);
                blade.rotation.z = (j / 4) * Math.PI * 2;
                fan.add(blade);
            }
        }
        
        // Realistic GPU Design
        const gpuGroup = new THREE.Group();
        
        // Main GPU body (longer and more realistic proportions)
        const gpuBodyGeometry = new THREE.BoxGeometry(2.2, 0.6, 1.1);
        const gpuBodyMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 60
        });
        const gpuBody = new THREE.Mesh(gpuBodyGeometry, gpuBodyMaterial);
        gpuBody.position.set(0, 0, 0);
        gpuBody.castShadow = true;
        gpuGroup.add(gpuBody);
        
        // GPU Shroud/Cover
        const shroudGeometry = new THREE.BoxGeometry(2.1, 0.4, 1.0);
        const shroudMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x0066ff,
            emissiveIntensity: 0.3,
            shininess: 40
        });
        const shroud = new THREE.Mesh(shroudGeometry, shroudMaterial);
        shroud.position.set(0, 0.1, 0);
        gpuGroup.add(shroud);
        
        // GPU Fans (2 large fans like real GPUs)
        for (let i = 0; i < 2; i++) {
            const fanGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 12);
            const fanMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x333333,
                emissive: 0x0099ff,
                emissiveIntensity: 0.6
            });
            const fan = new THREE.Mesh(fanGeometry, fanMaterial);
            fan.position.set(-0.5 + i * 1, 0.35, 0);
            fan.rotation.x = Math.PI / 2;
            gpuGroup.add(fan);
            
            // Fan blades
            for (let j = 0; j < 6; j++) {
                const bladeGeometry = new THREE.BoxGeometry(0.25, 0.03, 0.6);
                const bladeMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x2a2a2a,
                    transparent: true,
                    opacity: 0.9
                });
                const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
                blade.rotation.z = (j / 6) * Math.PI * 2;
                fan.add(blade);
            }
            
            // Store fan reference for rotation
            if (!pcGroup.gpuFans) pcGroup.gpuFans = [];
            pcGroup.gpuFans.push(fan);
        }
        
        // GPU Backplate
        const backplateGeometry = new THREE.BoxGeometry(2.2, 0.6, 0.05);
        const backplateMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x0099ff,
            emissiveIntensity: 0.4,
            shininess: 70
        });
        const backplate = new THREE.Mesh(backplateGeometry, backplateMaterial);
        backplate.position.set(0, 0, -0.5);
        gpuGroup.add(backplate);
        
        // GPU RGB Logo/Brand area
        const logoGeometry = new THREE.PlaneGeometry(0.8, 0.2);
        const logoMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ccff,
            transparent: true,
            opacity: 0.9
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, 0.35, 0.51);
        gpuGroup.add(logo);
        
        // GPU Power connectors
        for (let i = 0; i < 2; i++) {
            const connectorGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.2);
            const connectorMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
            const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
            connector.position.set(0.8 - i * 0.4, 0.4, 0.4);
            gpuGroup.add(connector);
        }
        
        // Position the GPU group in the PC
        gpuGroup.position.set(3.5, 1.1, 1);
        pcGroup.add(gpuGroup);
        pcGroup.rgbStrip = logo; // For animation reference
        
        // RGB Disc Lights in front of GPU (like gaming setups)
        const rgbDiscGroup = new THREE.Group();
        
        for (let i = 0; i < 2; i++) {
            // Disc base
            const discGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 16);
            const discMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                shininess: 50
            });
            const disc = new THREE.Mesh(discGeometry, discMaterial);
            disc.position.set(2.5, 0.8 + i * 0.8, 1.8);
            disc.rotation.x = Math.PI / 2;
            disc.castShadow = true;
            rgbDiscGroup.add(disc);
            
            // RGB ring
            const ringGeometry = new THREE.RingGeometry(0.25, 0.35, 16);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x0099ff,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(2.5, 0.8 + i * 0.8, 1.81);
            ring.rotation.x = Math.PI / 2;
            rgbDiscGroup.add(ring);
            
            // Inner glow
            const glowGeometry = new THREE.CircleGeometry(0.3, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x00ccff,
                transparent: true,
                opacity: 0.4
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.set(2.5, 0.8 + i * 0.8, 1.82);
            glow.rotation.x = Math.PI / 2;
            rgbDiscGroup.add(glow);
            
            // Store references for animation
            if (!pcGroup.rgbDiscs) pcGroup.rgbDiscs = [];
            pcGroup.rgbDiscs.push({ ring, glow });
        }
        
        pcGroup.add(rgbDiscGroup);
        
        return pcGroup;
    }
    
    // Create Mukul's Robot - Enhanced robotic figure
    function createHackerFigure() {
        const robotGroup = new THREE.Group();
        
        // Gaming Chair (more detailed) - Position robot properly on chair
        const chairGroup = new THREE.Group();
        
        // Chair base with wheels
        const chairBaseGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.15);
        const chairBaseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 30
        });
        const chairBase = new THREE.Mesh(chairBaseGeometry, chairBaseMaterial);
        // Position chair in front of the table, facing the screen
        // Keyboard is at (-0.4, 0.16, 0.5), placing chair further back
        chairBase.position.set(0, -0.8, -2.0);
        chairBase.rotation.y = Math.PI; // Rotate 180 degrees to face the screen
        chairBase.castShadow = true;
        chairGroup.add(chairBase);
        
        // Chair wheels
        for (let i = 0; i < 5; i++) {
            const wheelGeometry = new THREE.SphereGeometry(0.08);
            const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            const angle = (i / 5) * Math.PI * 2;
            wheel.position.set(Math.cos(angle) * 0.7, -0.5, Math.sin(angle) * 0.7);
            chairGroup.add(wheel);
        }
        
        // Chair seat
        const seatGeometry = new THREE.BoxGeometry(1.1, 0.2, 1.1);
        const seatMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            shininess: 20
        });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.set(0, -0.1, 0);
        seat.castShadow = true;
        chairGroup.add(seat);
        
        // Chair back (gaming style)
        const chairBackGeometry = new THREE.BoxGeometry(1.3, 2, 0.15);
        const chairBackMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            shininess: 20
        });
        const chairBack = new THREE.Mesh(chairBackGeometry, chairBackMaterial);
        chairBack.position.set(0, 0.8, -0.5);
        chairBack.castShadow = true;
        chairGroup.add(chairBack);
        
        // Chair armrests
        for (let i = 0; i < 2; i++) {
            const armrestGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.8);
            const armrest = new THREE.Mesh(armrestGeometry, chairBaseMaterial);
            armrest.position.set(i === 0 ? -0.7 : 0.7, 0.2, 0);
            chairGroup.add(armrest);
        }
        
        robotGroup.add(chairGroup);
        
        // Add RGB lighting to chair
        const chairLight1 = new THREE.PointLight(0x00ffff, 1, 2);
        chairLight1.position.set(0.5, 0.2, 0.3);
        chairGroup.add(chairLight1);
        
        const chairLight2 = new THREE.PointLight(0xff00ff, 1, 2);
        chairLight2.position.set(-0.5, 0.2, 0.3);
        chairGroup.add(chairLight2);
        
        // Add animated glow to chair
        function animateChairGlow() {
            const time = Date.now() * 0.001;
            chairLight1.intensity = 0.5 + Math.sin(time * 2) * 0.5;
            chairLight2.intensity = 0.5 + Math.cos(time * 2) * 0.5;
            requestAnimationFrame(animateChairGlow);
        }
        animateChairGlow();
        
        // ENHANCED ROBOT TORSO (more detailed and metallic)
        const torsoGeometry = new THREE.BoxGeometry(1.1, 1.7, 0.9);
        const torsoMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            shininess: 100,
            emissive: 0x001133,
            emissiveIntensity: 0.3
        });
        const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    // Position the robot's torso on the chair seat
    // Chair seat is at y=-0.1, so we position the torso slightly above it
    torso.position.set(0, -0.05, 0.1); // Centered on seat, slightly back
    torso.castShadow = true;
    robotGroup.add(torso);
    
    // Add cooling vents to torso
    for (let i = 0; i < 4; i++) {
        const ventGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.02);
        const ventMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x111111,
            emissive: 0x003366,
            emissiveIntensity: 0.3
        });
        const vent = new THREE.Mesh(ventGeometry, ventMaterial);
        vent.position.set(0, 0.2 + (i * 0.3), 0.46);
        robotGroup.add(vent);
    }
    
    // Add shoulder pads
    const shoulderPadGeometry = new THREE.BoxGeometry(0.3, 0.15, 0.4);
    const shoulderPadMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 100,
        emissive: 0x003366,
        emissiveIntensity: 0.1
    });
    
    const leftShoulder = new THREE.Mesh(shoulderPadGeometry, shoulderPadMaterial);
    leftShoulder.position.set(-0.6, 1.3, 0);
    robotGroup.add(leftShoulder);
    
    const rightShoulder = new THREE.Mesh(shoulderPadGeometry, shoulderPadMaterial);
    rightShoulder.position.set(0.6, 1.3, 0);
    robotGroup.add(rightShoulder);
        
        // Torso armor plates with more detail
    const armorPlates = [
        { pos: [-0.4, 0.8, 0.46], size: [0.3, 0.6, 0.05], color: 0x1a1a1a, emissive: 0x0066ff, emissiveIntensity: 0.3 },
        { pos: [0.4, 0.8, 0.46], size: [0.3, 0.6, 0.05], color: 0x1a1a1a, emissive: 0x0066ff, emissiveIntensity: 0.3 },
        { 
            pos: [0, 0.3, 0.46], 
            size: [0.8, 0.4, 0.05], 
            color: 0x1a1a1a,
            emissive: 0x0099ff,
            emissiveIntensity: 0.2,
            detail: {
                type: 'hex',
                size: 0.1,
                count: 6
            }
        }
    ];
        
        armorPlates.forEach(plate => {
        const plateGeometry = new THREE.BoxGeometry(...plate.size);
        const plateMaterial = new THREE.MeshPhongMaterial({ 
            color: plate.color || 0x1a1a1a,
            emissive: plate.emissive || 0x0066ff,
            emissiveIntensity: plate.emissiveIntensity || 0.2,
            shininess: 120
        });
        const armorPlate = new THREE.Mesh(plateGeometry, plateMaterial);
        armorPlate.position.set(...plate.pos);
        robotGroup.add(armorPlate);
        
        // Add detail to center plate
        if (plate.detail && plate.detail.type === 'hex') {
            const hexGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6);
            const hexMaterial = new THREE.MeshPhongMaterial({
                color: 0x00ccff,
                emissive: 0x00aaff,
                emissiveIntensity: 0.5
            });
            
            for (let i = 0; i < plate.detail.count; i++) {
                const hex = new THREE.Mesh(hexGeometry, hexMaterial);
                const angle = (i / plate.detail.count) * Math.PI * 2;
                const radius = plate.detail.size * 1.5;
                hex.position.set(
                    plate.pos[0] + Math.cos(angle) * radius,
                    plate.pos[1] + Math.sin(angle) * radius * 0.6,
                    plate.pos[2] + 0.03
                );
                hex.rotation.x = Math.PI / 2;
                robotGroup.add(hex);
            }
        }
    });
    
    // Add animated power core
    const coreGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.8
    });
    const powerCore = new THREE.Mesh(coreGeometry, coreMaterial);
    powerCore.position.set(0, 0.8, 0.3);
    robotGroup.add(powerCore);
    
    // Animate power core
    function animateCore() {
        const time = Date.now() * 0.001;
        powerCore.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
        requestAnimationFrame(animateCore);
    }
    animateCore();
        
        // Enhanced Robot chest panel with "MUKUL ROBO" text
        const chestPanelGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.06);
        const chestPanelMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x0099ff,
            emissiveIntensity: 0.5,
            shininess: 100
        });
        const chestPanel = new THREE.Mesh(chestPanelGeometry, chestPanelMaterial);
        chestPanel.position.set(0, 0.8, 0.41);
        robotGroup.add(chestPanel);
        
        // Chest display screen with "MUKUL ROBO" text
        const chestScreenGeometry = new THREE.PlaneGeometry(0.5, 0.3);
        const chestCanvas = document.createElement('canvas');
        chestCanvas.width = 256;
        chestCanvas.height = 128;
        const chestCtx = chestCanvas.getContext('2d');
        
        // Draw chest display
        chestCtx.fillStyle = '#000011';
        chestCtx.fillRect(0, 0, chestCanvas.width, chestCanvas.height);
        chestCtx.fillStyle = '#00ccff';
        chestCtx.font = 'bold 16px "Courier New", monospace';
        chestCtx.textAlign = 'center';
        chestCtx.fillText('MUKUL', chestCanvas.width/2, chestCanvas.height/2 - 10);
        chestCtx.fillText('ROBO', chestCanvas.width/2, chestCanvas.height/2 + 15);
        
        const chestTexture = new THREE.CanvasTexture(chestCanvas);
        const chestScreenMaterial = new THREE.MeshBasicMaterial({ 
            map: chestTexture,
            transparent: true,
            opacity: 0.9
        });
        const chestScreen = new THREE.Mesh(chestScreenGeometry, chestScreenMaterial);
        chestScreen.position.set(0, 0.9, 0.42);
        robotGroup.add(chestScreen);
        
        // Robot status lights on chest (arranged around the screen)
        const lightPositions = [
            [-0.2, 1.1], [0.2, 1.1], [-0.2, 0.7], [0.2, 0.7]
        ];
        lightPositions.forEach((pos, i) => {
            const lightGeometry = new THREE.SphereGeometry(0.04);
            const lightMaterial = new THREE.MeshBasicMaterial({ 
                color: i % 2 === 0 ? 0x00ff00 : 0x0099ff,
                transparent: true,
                opacity: 0.9
            });
            const light = new THREE.Mesh(lightGeometry, lightMaterial);
            light.position.set(pos[0], pos[1], 0.43);
            robotGroup.add(light);
        });
        
        // ENHANCED ROBOT HEAD (more detailed helmet)
        const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const headMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 100,
            emissive: 0x001155,
            emissiveIntensity: 0.4
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.6, 0);
        head.castShadow = true;
        robotGroup.add(head);
        
        // Head details - side panels
        for (let i = 0; i < 2; i++) {
            const sidePanelGeometry = new THREE.BoxGeometry(0.15, 0.4, 0.6);
            const sidePanelMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x0a0a0a,
                emissive: 0x0066ff,
                emissiveIntensity: 0.3,
                shininess: 80
            });
            const sidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);
            sidePanel.position.set(i === 0 ? -0.35 : 0.35, 1.6, 0);
            robotGroup.add(sidePanel);
        }
        
        // Head crest/crown
        const crestGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.4);
        const crestMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0099ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.6,
            shininess: 100
        });
        const crest = new THREE.Mesh(crestGeometry, crestMaterial);
        crest.position.set(0, 1.9, 0);
        robotGroup.add(crest);
        
        // Enhanced Robot visor/face screen with emoji support
        const visorGeometry = new THREE.PlaneGeometry(0.7, 0.4);
        
        // Create canvas for visor display
        const visorCanvas = document.createElement('canvas');
        visorCanvas.width = 512;
        visorCanvas.height = 256;
        const visorCtx = visorCanvas.getContext('2d');
        
        // Enhanced visor display with animations and emojis
        function drawVisorContent(message) {
            // Clear with animated gradient background
            const time = Date.now() * 0.001;
            const gradient = visorCtx.createLinearGradient(0, 0, 0, visorCanvas.height);
            gradient.addColorStop(0, `hsl(${200 + Math.sin(time) * 20}, 80%, 15%)`);
            gradient.addColorStop(0.5, `hsl(${220 + Math.cos(time) * 15}, 70%, 10%)`);
            gradient.addColorStop(1, `hsl(${240 + Math.sin(time * 0.7) * 10}, 60%, 8%)`);
            visorCtx.fillStyle = gradient;
            visorCtx.fillRect(0, 0, visorCanvas.width, visorCanvas.height);
            
            // Animated border
            visorCtx.strokeStyle = `hsl(${180 + Math.sin(time * 2) * 30}, 90%, 60%)`;
            visorCtx.lineWidth = 6;
            visorCtx.strokeRect(3, 3, visorCanvas.width - 6, visorCanvas.height - 6);
            
            // Inner glow effect
            visorCtx.shadowColor = '#00ccff';
            visorCtx.shadowBlur = 15;
            
            // Draw text with better formatting
            const lines = message.split('\n');
            lines.forEach((line, index) => {
                // Check if line contains emoji
                const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(line);
                
                if (hasEmoji) {
                    // Larger font for emoji lines
                    visorCtx.font = 'bold 32px Arial';
                    visorCtx.fillStyle = '#ffff00';
                } else {
                    // Regular text
                    visorCtx.font = 'bold 20px "Courier New", monospace';
                    visorCtx.fillStyle = '#00ccff';
                }
                
                visorCtx.textAlign = 'center';
                const y = visorCanvas.height/2 + (index - lines.length/2 + 0.5) * 30;
                
                // Add text glow effect
                visorCtx.strokeStyle = visorCtx.fillStyle;
                visorCtx.lineWidth = 2;
                visorCtx.strokeText(line, visorCanvas.width/2, y);
                visorCtx.fillText(line, visorCanvas.width/2, y);
            });
            
            // Add animated scan lines effect
            visorCtx.strokeStyle = `rgba(0, 200, 255, ${0.2 + Math.sin(time * 3) * 0.1})`;
            visorCtx.lineWidth = 1;
            for (let i = 0; i < visorCanvas.height; i += 3) {
                const offset = Math.sin(time * 2 + i * 0.1) * 2;
                visorCtx.beginPath();
                visorCtx.moveTo(offset, i);
                visorCtx.lineTo(visorCanvas.width + offset, i);
                visorCtx.stroke();
            }
            
            // Add corner indicators
            const corners = [[20, 20], [visorCanvas.width-20, 20], [20, visorCanvas.height-20], [visorCanvas.width-20, visorCanvas.height-20]];
            visorCtx.fillStyle = '#00ff00';
            corners.forEach(([x, y]) => {
                visorCtx.fillRect(x-3, y-3, 6, 6);
            });
        }
        
        drawVisorContent('MUKUL ROBO\nONLINE');
        
        const visorTexture = new THREE.CanvasTexture(visorCanvas);
        const visorMaterial = new THREE.MeshBasicMaterial({ 
            map: visorTexture,
            transparent: true,
            opacity: 0.95
        });
        const visor = new THREE.Mesh(visorGeometry, visorMaterial);
        visor.position.set(0, 1.6, 0.41);
        visor.userData = { canvas: visorCanvas, context: visorCtx, texture: visorTexture, drawFunction: drawVisorContent };
        robotGroup.add(visor);
        
        // Robot eyes (LED indicators on sides of visor)
        for (let i = 0; i < 2; i++) {
            const eyeGeometry = new THREE.SphereGeometry(0.04);
            const eyeMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x00ffff,
                transparent: true,
                opacity: 0.9
            });
            const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            eye.position.set(i === 0 ? -0.25 : 0.25, 1.65, 0.42);
            robotGroup.add(eye);
        }
        
        // Robot antennas
        for (let i = 0; i < 2; i++) {
            const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
            const antennaMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x666666,
                emissive: 0x0099ff,
                emissiveIntensity: 0.4
            });
            const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
            antenna.position.set(i === 0 ? -0.2 : 0.2, 1.9, 0);
            robotGroup.add(antenna);
            
            // Antenna tip
            const tipGeometry = new THREE.SphereGeometry(0.04);
            const tipMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const tip = new THREE.Mesh(tipGeometry, tipMaterial);
            tip.position.set(i === 0 ? -0.2 : 0.2, 2.05, 0);
            robotGroup.add(tip);
        }
        
        // ENHANCED ROBOT ARMS (more mechanical details)
        const upperArmGeometry = new THREE.CylinderGeometry(0.09, 0.11, 0.9);
        const lowerArmGeometry = new THREE.CylinderGeometry(0.07, 0.09, 0.8);
        const armMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            shininess: 90,
            emissive: 0x001122,
            emissiveIntensity: 0.3
        });
        
        // Shoulder joints
        for (let i = 0; i < 2; i++) {
            const shoulderGeometry = new THREE.SphereGeometry(0.12);
            const shoulderMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                emissive: 0x0099ff,
                emissiveIntensity: 0.4,
                shininess: 100
            });
            const shoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
            shoulder.position.set(i === 0 ? -0.6 : 0.6, 1.2, 0);
            robotGroup.add(shoulder);
        }
        
        // Left arm system (positioned for typing - reaching forward to desk)
        const leftUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
        leftUpperArm.position.set(-0.7, 1.0, 0.2);
        leftUpperArm.rotation.z = Math.PI / 8;
        leftUpperArm.rotation.x = -Math.PI / 6;
        leftUpperArm.castShadow = true;
        robotGroup.add(leftUpperArm);
        
        const leftLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial);
        leftLowerArm.position.set(-0.9, 0.5, 0.6);
        leftLowerArm.rotation.z = Math.PI / 4;
        leftLowerArm.rotation.x = -Math.PI / 3;
        leftLowerArm.castShadow = true;
        robotGroup.add(leftLowerArm);
        
        // Right arm system (positioned for mouse - reaching forward to desk)
        const rightUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
        rightUpperArm.position.set(0.7, 1.0, 0.2);
        rightUpperArm.rotation.z = -Math.PI / 8;
        rightUpperArm.rotation.x = -Math.PI / 6;
        rightUpperArm.castShadow = true;
        robotGroup.add(rightUpperArm);
        
        const rightLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial);
        rightLowerArm.position.set(0.9, 0.5, 0.6);
        rightLowerArm.rotation.z = -Math.PI / 4;
        rightLowerArm.rotation.x = -Math.PI / 3;
        rightLowerArm.castShadow = true;
        robotGroup.add(rightLowerArm);
        
        // ENHANCED ROBOT HANDS (detailed mechanical claws)
        function createRobotHand(isLeft) {
            const handGroup = new THREE.Group();
            
            // Palm
            const palmGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.15);
            const palmMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x1a1a1a,
                shininess: 100,
                emissive: 0x0066ff,
                emissiveIntensity: 0.4
            });
            const palm = new THREE.Mesh(palmGeometry, palmMaterial);
            handGroup.add(palm);
            
            // Fingers (3 mechanical fingers)
            for (let i = 0; i < 3; i++) {
                const fingerGeometry = new THREE.BoxGeometry(0.03, 0.08, 0.1);
                const fingerMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x333333,
                    emissive: 0x0099ff,
                    emissiveIntensity: 0.2,
                    shininess: 80
                });
                const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
                finger.position.set(-0.05 + i * 0.05, 0, 0.08);
                handGroup.add(finger);
            }
            
            // Thumb
            const thumbGeometry = new THREE.BoxGeometry(0.03, 0.06, 0.08);
            const thumb = new THREE.Mesh(thumbGeometry, palmMaterial);
            thumb.position.set(isLeft ? 0.08 : -0.08, 0, 0.05);
            thumb.rotation.z = isLeft ? -Math.PI/4 : Math.PI/4;
            handGroup.add(thumb);
            
            return handGroup;
        }
        
        const leftHand = createRobotHand(true);
        leftHand.position.set(-0.8, 0.15, 0.8);
        leftHand.castShadow = true;
        robotGroup.add(leftHand);
        
        const rightHand = createRobotHand(false);
        rightHand.position.set(0.8, 0.15, 0.8);
        rightHand.castShadow = true;
        robotGroup.add(rightHand);
        
        // Robot legs (sitting position - properly positioned)
        const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 1.0);
        const legMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            shininess: 70,
            emissive: 0x001122,
            emissiveIntensity: 0.2
        });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.3, -0.4, 0.3);
        leftLeg.rotation.x = Math.PI / 2.5;
        leftLeg.castShadow = true;
        robotGroup.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.3, -0.4, 0.3);
        rightLeg.rotation.x = Math.PI / 2.5;
        rightLeg.castShadow = true;
        robotGroup.add(rightLeg);
        
        // "MUKUL'S ROBO" nameplate (prominent and animated)
        const nameGeometry = new THREE.PlaneGeometry(2.5, 0.5);
        const nameMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ccff,
            transparent: true,
            opacity: 0.95
        });
        const nameTag = new THREE.Mesh(nameGeometry, nameMaterial);
        nameTag.position.set(0, 3.2, 0);
        robotGroup.add(nameTag);
        
        // Robot aura/energy field
        const auraGeometry = new THREE.SphereGeometry(2.5);
        const auraMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x0099ff,
            transparent: true,
            opacity: 0.08,
            side: THREE.BackSide
        });
        const aura = new THREE.Mesh(auraGeometry, auraMaterial);
        aura.position.set(0, 0.8, 0);
        robotGroup.add(aura);
        
        // Store references for animations (using different variable names to avoid redeclaration)
        const leftLegRef = robotGroup.children.find(child => 
            child.position.x < 0 && child.geometry && child.geometry.type === 'CylinderGeometry'
        );
        const rightLegRef = robotGroup.children.find(child => 
            child.position.x > 0 && child.geometry && child.geometry.type === 'CylinderGeometry'
        );
        const leftEye = robotGroup.children.find(child => 
            child.position.x < 0 && child.position.z > 0.4 && child.geometry && child.geometry.type === 'SphereGeometry'
        );
        const rightEye = robotGroup.children.find(child => 
            child.position.x > 0 && child.position.z > 0.4 && child.geometry && child.geometry.type === 'SphereGeometry'
        );
        
        robotGroup.userData = { 
            torso, 
            head,
            leftUpperArm, 
            rightUpperArm,
            leftLowerArm,
            rightLowerArm,
            nameTag,
            aura,
            visor,
            chestPanel,
            leftLeg: leftLegRef,  // Using the new variable name
            rightLeg: rightLegRef, // Using the new variable name
            leftEye,
            rightEye
        };
        
        return robotGroup;
    }
    
    // Create keyboard and mouse
    function createPeripherals() {
        const peripheralGroup = new THREE.Group();
        
        // Enhanced Keyboard (mechanical RGB)
        const keyboardGeometry = new THREE.BoxGeometry(2.2, 0.12, 0.9);
        const keyboardMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x0099ff,
            emissiveIntensity: 0.4,
            shininess: 30
        });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(-0.4, 0.16, 0.5);
        keyboard.castShadow = true;
        peripheralGroup.add(keyboard);
        
        // Add individual keys with RGB
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 12; col++) {
                const keyGeometry = new THREE.BoxGeometry(0.12, 0.08, 0.12);
                const keyMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x1a1a1a,
                    emissive: 0x0066ff,
                    emissiveIntensity: 0.3
                });
                const key = new THREE.Mesh(keyGeometry, keyMaterial);
                key.position.set(
                    -0.4 + (col - 6) * 0.15,
                    0.22,
                    0.5 + (row - 1.5) * 0.15
                );
                peripheralGroup.add(key);
            }
        }
        
        // Enhanced Gaming Mouse
        const mouseGeometry = new THREE.BoxGeometry(0.25, 0.1, 0.35);
        const mouseMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x0099ff,
            emissiveIntensity: 0.5,
            shininess: 40
        });
        const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
        mouse.position.set(1.3, 0.15, 0.3);
        mouse.castShadow = true;
        peripheralGroup.add(mouse);
        
        // Mouse RGB strip
        const mouseRgbGeometry = new THREE.BoxGeometry(0.2, 0.02, 0.05);
        const mouseRgbMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ccff,
            transparent: true,
            opacity: 0.9
        });
        const mouseRgb = new THREE.Mesh(mouseRgbGeometry, mouseRgbMaterial);
        mouseRgb.position.set(1.3, 0.21, 0.3);
        peripheralGroup.add(mouseRgb);
        peripheralGroup.mouseRgb = mouseRgb;
        
        return peripheralGroup;
    }
    
    // Create floating "MUKUL" text
    function createFloatingText() {
        const textGroup = new THREE.Group();
        const letterMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x0099ff,
            emissive: 0x0099ff,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.95
        });
        
        // Create letters M-U-K-U-L
        const letters = [
            { char: 'M', x: -3 },
            { char: 'U', x: -1.5 },
            { char: 'K', x: 0 },
            { char: 'U', x: 1.5 },
            { char: 'L', x: 3 }
        ];
        
        letters.forEach((letter, letterIndex) => {
            const letterGeometry = new THREE.BoxGeometry(0.25, 1, 0.15);
            const letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
            letterMesh.position.set(letter.x, 5, -6);
            letterMesh.userData = { originalY: 5, index: letterIndex };
            textGroup.add(letterMesh);
        });
        
        return textGroup;
    }
    
    // Add all elements to the main group
    const desk = createDesk();
    const gamingSetup = createGamingSetup();
    const gamingPC = createGamingPC();
    hackerFigure = createHackerFigure(); // Make global for visor updates
    const peripherals = createPeripherals();
    const floatingText = createFloatingText();
    
        // Position robot properly - sitting on chair, facing monitors
        hackerFigure.position.set(0, 0, 1.5); // In front of monitors, behind desk
        hackerFigure.rotation.y = Math.PI; // Rotate 180 degrees to face the computer
        hackerFigure.scale.set(1.5, 1.5, 1.5); // Make robot larger for better visibility
    
    hackerLabGroup.add(desk);
    hackerLabGroup.add(gamingSetup);
    hackerLabGroup.add(gamingPC);
    hackerLabGroup.add(hackerFigure);
    hackerLabGroup.add(peripherals);
    hackerLabGroup.add(floatingText);
    
    // Add the main group to scene
    scene.add(hackerLabGroup);
    
    // Animation loop
    const clock = new THREE.Clock();
    
        function animate() {
            requestAnimationFrame(animate);
            
            if (!scene || !camera || !renderer) {
                return;
            }
            
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
        
        // Rotate PC fans
        if (gamingPC.fans) {
            gamingPC.fans.forEach(fan => {
                fan.rotation.z += delta * 8;
            });
        }
        
        // Rotate GPU fans
        if (gamingPC.gpuFans) {
            gamingPC.gpuFans.forEach(fan => {
                fan.rotation.z += delta * 12; // GPU fans spin faster
            });
        }
        
        // Enhanced RGB lighting animation (bluish theme)
        const blueHue = 0.6; // Blue base
        rgbLight1.color.setHSL(blueHue + Math.sin(time * 0.3) * 0.1, 0.8, 0.6);
        rgbLight2.color.setHSL(blueHue + Math.sin(time * 0.3 + Math.PI/3) * 0.15, 0.9, 0.7);
        rgbLight3.color.setHSL(blueHue + Math.sin(time * 0.3 + Math.PI*2/3) * 0.12, 0.85, 0.65);
        mainLight.intensity = 4 + Math.sin(time * 1.5) * 1.2;
        
        // Animate PC RGB components
        if (gamingPC.rgbStrip) {
            gamingPC.rgbStrip.material.color.setHSL(blueHue + Math.sin(time * 0.5) * 0.2, 0.9, 0.8);
        }
        if (peripherals.mouseRgb) {
            peripherals.mouseRgb.material.color.setHSL(blueHue + Math.sin(time * 0.7) * 0.15, 0.85, 0.75);
        }
        
        // Animate RGB disc lights
        if (gamingPC.rgbDiscs) {
            gamingPC.rgbDiscs.forEach((disc, index) => {
                const hue = blueHue + Math.sin(time * 0.8 + index * Math.PI) * 0.2;
                disc.ring.material.color.setHSL(hue, 0.9, 0.7);
                disc.glow.material.color.setHSL(hue, 0.8, 0.6);
                disc.glow.material.opacity = 0.4 + Math.sin(time * 2 + index * Math.PI) * 0.2;
            });
        }
        
        // Enhanced floating text animation
        floatingText.position.y = 5 + Math.sin(time * 0.4) * 0.6;
        floatingText.rotation.y = time * 0.06;
        
        // Individual letter animations
        floatingText.children.forEach((letter, letterIndex) => {
            if (letter.userData) {
                letter.position.y = letter.userData.originalY + Math.sin(time * 0.8 + letterIndex * 0.5) * 0.3;
                letter.rotation.z = Math.sin(time * 0.6 + letterIndex * 0.3) * 0.1;
            }
        });
        
        // Camera control for robot introduction
        const contactForm = document.getElementById('contact');
        const contactEnd = contactForm ? contactForm.offsetTop + contactForm.offsetHeight - 200 : document.documentElement.scrollHeight * 0.8;
        const scrollPosition = window.scrollY + window.innerHeight;
        const scrollPastContact = scrollPosition - contactEnd;
        
        // Two-phase animation: first show full robot, then zoom to face
        const robotStandDuration = 150; // pixels of scroll to show full robot (reduced from 300)
        const zoomDuration = 300; // pixels of scroll for zoom animation (reduced from 400)
        
        if (scrollPastContact > 0) {
            // Phase 1: Show full robot in frame
            if (scrollPastContact < robotStandDuration) {
                const progress = scrollPastContact / robotStandDuration;
                // Position camera to properly frame the robot
                camera.position.set(0, 1.2, 4);
                camera.lookAt(0, 1.0, 0);
            } 
            // Phase 2: Smooth zoom to face
            else if (scrollPastContact < robotStandDuration + zoomDuration) {
                const zoomProgress = (scrollPastContact - robotStandDuration) / zoomDuration;
                // Easing function for smooth zoom (more linear for consistent speed)
                const easeOutCubic = t => t * (2 - t);
                const easedProgress = easeOutCubic(zoomProgress);
                
                // Camera path for zooming to robot's face
                const startZ = 4.0;  // Starting distance
                const endZ = 2.5;    // Final distance (closer to robot)
                const currentZ = startZ + (endZ - startZ) * easedProgress;
                
                // Adjust height during zoom (start higher, end at face level)
                const startY = 1.2;
                const endY = 1.0;
                const currentY = startY + (endY - startY) * easedProgress;
                
                // Position camera and focus on robot's head area
                camera.position.set(0.1, currentY, currentZ); // Slight x-offset for better angle
                camera.lookAt(0, 1.0, 0);  // Look at robot's head level
                
                // Only show the introduction text when zoomed in
                if (zoomProgress > 0.8) {
                    // This will be handled by the existing visor message code
                }
            }
        } else {
            // Default camera movement - smooth orbit around the scene
            const cameraRadius = 10;
            const cameraHeight = 5;
            const orbitSpeed = 0.02;
            const orbitHeightVariation = 0.5;
            
            // Smoother, more controlled orbit
            camera.position.x = Math.cos(time * orbitSpeed) * cameraRadius;
            camera.position.y = cameraHeight + Math.sin(time * orbitSpeed * 0.7) * orbitHeightVariation;
            camera.position.z = Math.sin(time * orbitSpeed) * cameraRadius;
            camera.lookAt(0, 1.5, 0);
            
            // Store the default camera position for later use
            if (!window.defaultCameraPosition) {
                window.defaultCameraPosition = camera.position.clone();
            }
        }
        
        // Enhanced robot animations with scroll-based standing and introduction
        if (hackerFigure.userData.torso) {
            // Get scroll position relative to contact form end
            const contactForm = document.getElementById('contact');
            const contactEnd = contactForm ? contactForm.offsetTop + contactForm.offsetHeight : document.documentElement.scrollHeight * 0.85;
            const scrollPosition = window.scrollY + window.innerHeight;
            const scrollPercent = Math.min(Math.max((scrollPosition - contactEnd + 400) / 800, 0), 1);
            
            // Robot stands up, walks, and shows expressions when reaching contact form end
            const standProgress = scrollPercent; // Use scrollPercent for consistency
            if (standProgress > 0) { // When scrolled past contact form
                
                // Jumping animation - robot jumps from table when first standing up
                let standHeight, walkDistance;
                
                if (standProgress < 0.4) { // Extend jump duration to 40% of animation
                    // Initial jump from table
                    const jumpProgress = standProgress / 0.4;
                    // Higher jump with more pronounced curve
                    const jumpHeight = Math.sin(jumpProgress * Math.PI) * 3.5; // Increased height
                    standHeight = jumpHeight;
                    
                    // Move forward slightly during jump
                    walkDistance = jumpProgress * 0.5;
                    
                    // Add more dramatic rotation during jump
                    hackerFigure.rotation.z = Math.sin(jumpProgress * Math.PI * 2) * 0.3;
                    
                    // Add some bounce to the torso during jump
                    if (hackerFigure.userData.torso) {
                        hackerFigure.userData.torso.position.y = Math.sin(jumpProgress * Math.PI * 2) * 0.2;
                    }
                } else {
                    // After jump, continue with normal standing/walking
                    const walkProgress = (standProgress - 0.4) / 0.6;
                    standHeight = 1.5 * standProgress;
                    walkDistance = 0.5 + (walkProgress * 1.5); // Continue moving forward
                    
                    // Reset rotation and torso position after jump
                    hackerFigure.rotation.z = 0;
                    if (hackerFigure.userData.torso) {
                        hackerFigure.userData.torso.position.y = 0;
                    }
                }
                
                hackerFigure.position.y = standHeight;
                hackerFigure.position.z = 1.5 - walkDistance; // Move from 1.5 to -0.5
                
                // Walking leg animation
                if (standProgress > 0.3) {
                    const walkCycle = Math.sin(time * 8) * 0.3;
                    hackerFigure.userData.leftLeg.rotation.x = Math.PI/2.5 + walkCycle;
                    hackerFigure.userData.rightLeg.rotation.x = Math.PI/2.5 - walkCycle;
                    
                    // Subtle body sway while walking
                    hackerFigure.userData.torso.rotation.z = Math.sin(time * 4) * 0.05;
                }
                
                // Turn towards user (rotate from facing computer to facing user)
                let turnAngle;
                if (standProgress < 0.5) {
                    // First half of animation: complete the turn
                    turnAngle = (standProgress / 0.5) * Math.PI;
                } else {
                    // Second half: stay facing forward
                    turnAngle = Math.PI;
                }
                hackerFigure.rotation.y = Math.PI - turnAngle;
                
                // Raise arms in greeting (more dramatic)
                hackerFigure.userData.leftUpperArm.rotation.z = Math.PI/8 + standProgress * Math.PI/2.5;
                hackerFigure.userData.rightUpperArm.rotation.z = -Math.PI/8 - standProgress * Math.PI/2.5;
                hackerFigure.userData.leftUpperArm.rotation.x = -Math.PI/6 + standProgress * Math.PI/3;
                hackerFigure.userData.rightUpperArm.rotation.x = -Math.PI/6 + standProgress * Math.PI/3;
                
                // Straighten posture and add confident stance
                hackerFigure.userData.torso.rotation.x = -standProgress * Math.PI/12;
                hackerFigure.userData.head.rotation.x = standProgress * Math.PI/20;
                
                // Dynamic facial expressions and messages as robot walks and turns
                if (standProgress < 0.2) {
                    updateVisorMessage("<span style='color: #ff5555'>INITIALIZING...</span>");
                } else if (standProgress < 0.4) {
                    updateVisorMessage("<span style='color: #55ff55'>JUMPING OFF TABLE</span>");
                } else if (standProgress < 0.6) {
                    updateVisorMessage("<span style='color: #5555ff'>WALKING FORWARD</span>");
                } else if (standProgress < 0.8) {
                    updateVisorMessage("<span style='color: #ffff55'>TURNING TO FACE YOU</span>");
                } else {
                    // Final message when fully zoomed in - larger and more prominent
                    const introMessage = 
                        "<div style='text-align: center; padding: 10px;'>" +
                        "<div style='font-size: 1.8em; margin-bottom: 10px; color: #00ffff; text-shadow: 0 0 15px #00ffff;'>HELLO!</div>" +
                        "<div style='font-size: 1.4em; margin: 5px 0; color: #ff00ff; text-shadow: 0 0 12px #ff00ff;'>I AM MUKUL'S</div>" +
                        "<div style='font-size: 1.6em; margin: 5px 0; color: #ffff00; text-shadow: 0 0 14px #ffff00;'>AI ASSISTANT</div>" +
                        "<div style='font-size: 1.4em; margin: 5px 0; color: #00ff00; text-shadow: 0 0 12px #00ff00;'>WELCOME TO</div>" +
                        "<div style='font-size: 1.6em; margin-top: 5px; color: #ff00ff; text-shadow: 0 0 14px #ff00ff;'>HIS PORTFOLIO!</div>" +
                        "</div>";
                    updateVisorMessage(introMessage);
                }
                
                // Enhanced nameplate glow when standing with pulsing effect
                const namePulse = 0.5 + (Math.sin(time * 2) * 0.5 + 0.5) * 0.5; // Pulsing effect
                hackerFigure.userData.nameTag.material.opacity = namePulse;
                hackerFigure.userData.nameTag.scale.set(2.5 + standProgress * 0.5, 2.5 + standProgress * 0.5, 1);
                
                // Update name tag text when fully stood up
                if (standProgress > 0.9 && !hackerFigure.userData.hasIntroduced) {
                    hackerFigure.userData.nameTag.userData.text = 'MUKUL\'S AI ASSISTANT';
                    hackerFigure.userData.nameTag.userData.needsUpdate = true;
                    hackerFigure.userData.hasIntroduced = true;
                }
                
                // Intense aura when greeting
                hackerFigure.userData.aura.material.opacity = 0.2 + standProgress * 0.15;
                hackerFigure.userData.aura.scale.set(1 + standProgress * 0.3, 1 + standProgress * 0.3, 1 + standProgress * 0.3);
                
                // Make chest panel glow more when greeting
                hackerFigure.userData.chestPanel.material.emissiveIntensity = 0.8 + standProgress * 0.4;
                
                // Eye blinking animation for expressions
                if (hackerFigure.userData.leftEye && hackerFigure.userData.rightEye) {
                    const blinkCycle = Math.sin(time * 3);
                    if (blinkCycle > 0.8) {
                        hackerFigure.userData.leftEye.scale.y = 0.1;
                        hackerFigure.userData.rightEye.scale.y = 0.1;
                    } else {
                        hackerFigure.userData.leftEye.scale.y = 1;
                        hackerFigure.userData.rightEye.scale.y = 1;
                    }
                }
                
            } else {
                // Normal sitting animations
                hackerFigure.position.y = 0; // Reset robot position
                hackerFigure.userData.torso.rotation.y = Math.sin(time * 0.3) * 0.08;
                hackerFigure.userData.head.rotation.y = Math.sin(time * 0.4) * 0.12;
                
                // Typing animation (more robotic)
                hackerFigure.userData.leftUpperArm.rotation.x = -Math.PI/4 + Math.sin(time * 4) * 0.15;
                hackerFigure.userData.rightUpperArm.rotation.x = -Math.PI/4 + Math.sin(time * 4.5) * 0.12;
                
                // Reset all positions and rotations
                hackerFigure.position.z = 1.5; // Reset walking position
                hackerFigure.userData.leftUpperArm.rotation.z = Math.PI/8;
                hackerFigure.userData.rightUpperArm.rotation.z = -Math.PI/8;
                hackerFigure.userData.torso.rotation.x = 0;
                hackerFigure.userData.torso.rotation.z = 0;
                hackerFigure.userData.head.rotation.x = 0;
                
                // Reset leg positions
                if (hackerFigure.userData.leftLeg && hackerFigure.userData.rightLeg) {
                    hackerFigure.userData.leftLeg.rotation.x = Math.PI/2.5;
                    hackerFigure.userData.rightLeg.rotation.x = Math.PI/2.5;
                }
                
                hackerFigure.rotation.y = Math.PI; // Face computer
                
                // Normal visor
                updateVisorMessage("MUKUL ROBO\nONLINE");
                
                // Reset aura
                hackerFigure.userData.aura.scale.set(1, 1, 1);
                hackerFigure.userData.chestPanel.material.emissiveIntensity = 0.5;
            }
            
            // Robot nameplate with zoom effect based on scroll
            const zoomScale = 1 + scrollPercent * 0.8;
            if (scrollPercent <= 0.85) {
                hackerFigure.userData.nameTag.scale.set(zoomScale, zoomScale, 1);
            }
            hackerFigure.userData.nameTag.material.opacity = 0.95 + Math.sin(time * 2) * 0.05;
            
            // Robot aura pulsing
            if (scrollPercent <= 0.85) {
                hackerFigure.userData.aura.material.opacity = 0.08 + Math.sin(time * 1.2) * 0.04;
            }
            hackerFigure.userData.aura.rotation.y = time * 0.1;
            
            // Visor flickering
            hackerFigure.userData.visor.material.opacity = 0.8 + Math.sin(time * 6) * 0.2;
            
            // Chest panel pulsing
            hackerFigure.userData.chestPanel.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3;
        }
        
            renderer.render(scene, camera);
        }
    
        // Handle window resize
        function onWindowResize() {
            if (camera && renderer) {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
        }
        
        window.addEventListener('resize', onWindowResize);
    
        // Start animation
        animate();
        console.log('✅ 3D Hacker Lab initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing 3D scene:', error);
    }
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe skill categories and project cards
    document.querySelectorAll('.skill-category, .project-card').forEach(element => {
        observer.observe(element);
    });
}

// Typing effect for terminal
function initTypingEffect() {
    const cursor = document.querySelector('.typing-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
}

// Form handling
document.addEventListener('submit', function(e) {
    if (e.target.matches('form[name="contact"]')) {
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Reset after delay (Netlify will handle the actual submission)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1000);
    }
});

// Scroll-based 3D rotation with enhanced scaling
function initScrollRotation() {
    window.addEventListener('scroll', () => {
        if (hackerLabGroup) {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const rotationY = scrollPercent * Math.PI * 2; // Full 360 degree rotation
            
            hackerLabGroup.rotation.y = rotationY;
            
            // Add some vertical movement too
            hackerLabGroup.position.y = Math.sin(scrollPercent * Math.PI * 2) * 0.5;
            
            // Enhanced scale effect - Mukul grows bigger as you scroll
            const baseScale = 1;
            const maxScale = 2.5; // Maximum scale when fully scrolled
            const scale = baseScale + (scrollPercent * (maxScale - baseScale));
            hackerLabGroup.scale.set(scale, scale, scale);

            // Add some rotation on other axes for more dynamic effect
            hackerLabGroup.rotation.x = Math.sin(scrollPercent * Math.PI) * 0.2;
            hackerLabGroup.rotation.z = Math.cos(scrollPercent * Math.PI) * 0.1;
        }
    });
}

// Dynamic counter animations
function initCounterAnimations() {
    console.log('🔢 Initializing counter animations...');

    // Function to animate the dedication progress bar
    function animateDedicationProgress(progressBar, percentageElement, target) {
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
                
                // Add completion effect
                progressBar.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8)';
                setTimeout(() => {
                    progressBar.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.7)';
                }, 300);
            }
            
            // Update progress bar and percentage
            const progress = Math.min(Math.floor(current), 100);
            progressBar.style.width = `${progress}%`;
            percentageElement.textContent = `${progress}%`;
        }, 16);
    }
    
    // First try immediate animation
    setTimeout(() => {
        // Animate regular counters
        const statNumbers = document.querySelectorAll('.stat-number:not(.dedication-percentage)');
        console.log('Found stat numbers:', statNumbers.length);
        
        statNumbers.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            console.log(`Animating counter to ${target}`);
            
            if (!isNaN(target)) {
                animateCounter(counter);
            }
        });
        
        // Animate dedication progress bar
        const dedicationBar = document.querySelector('.dedication-bar');
        const dedicationPercentage = document.querySelector('.dedication-percentage');
        
        if (dedicationBar && dedicationPercentage) {
            const target = parseInt(dedicationBar.getAttribute('data-target'));
            console.log('Animating dedication progress bar to', target + '%');
            animateDedicationProgress(dedicationBar, dedicationPercentage, target);
        } else {
            console.warn('Dedication elements not found');
        }
    }, 500);
    
    // Then set up intersection observer for when section comes into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Stats section is visible, triggering animations');
                
                // Animate counters
                const statNumbers = entry.target.querySelectorAll('.stat-number:not(.dedication-percentage)');
                statNumbers.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
                
                // Animate dedication progress bar
                const dedicationBar = entry.target.querySelector('.dedication-bar');
                const dedicationPercentage = entry.target.querySelector('.dedication-percentage');
                
                if (dedicationBar && dedicationPercentage && !dedicationBar.classList.contains('animated')) {
                    dedicationBar.classList.add('animated');
                    const target = parseInt(dedicationBar.getAttribute('data-target'));
                    animateDedicationProgress(dedicationBar, dedicationPercentage, target);
                }
                
                // Unobserve after animation
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        console.log('Stats grid found, setting up observer');
        counterObserver.observe(statsGrid);
    } else {
        console.error('Stats grid not found!');
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    console.log(`🎯 Animating counter to ${target}`);
    
    if (!target || target === 0) {
        console.error('Invalid target:', target);
        return;
    }
    
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    // Immediately show that animation started
    counter.textContent = '1';
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
            
            // Add special formatting for percentage
            const statLabel = counter.parentElement.querySelector('.stat-label');
            if (statLabel && statLabel.textContent.includes('%')) {
                counter.textContent = current + '%';
            } else {
                counter.textContent = current + '+';
            }
            
            console.log(`✅ Counter animation completed: ${counter.textContent}`);
            
            // Add completion glow effect
            counter.style.animation = 'counterGlow 0.5s ease-in-out';
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Neural Network Background Animation
function initNeuralNetwork() {
    const neuralBg = document.querySelector('.neural-network-bg');
    if (!neuralBg) return;
    
    // Create neural nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 2 + 's';
        neuralBg.appendChild(node);
    }
    
    // Create neural connections
    const nodes = neuralBg.querySelectorAll('.neural-node');
    nodes.forEach((node1, index1) => {
        nodes.forEach((node2, index2) => {
            if (index1 !== index2 && Math.random() > 0.7) {
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                const rect1 = node1.getBoundingClientRect();
                const rect2 = node2.getBoundingClientRect();
                const bgRect = neuralBg.getBoundingClientRect();
                
                const x1 = (rect1.left - bgRect.left) / bgRect.width * 100;
                const y1 = (rect1.top - bgRect.top) / bgRect.height * 100;
                const x2 = (rect2.left - bgRect.left) / bgRect.width * 100;
                const y2 = (rect2.top - bgRect.top) / bgRect.height * 100;
                
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                connection.style.width = length + '%';
                connection.style.left = x1 + '%';
                connection.style.top = y1 + '%';
                connection.style.transform = `rotate(${angle}deg)`;
                connection.style.animationDelay = Math.random() * 3 + 's';
                
                neuralBg.appendChild(connection);
            }
        });
    });
}

// Expertise Section Cascade Animations
function initExpertiseAnimations() {
    console.log('🎯 Initializing expertise animations...');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target;
                const delay = parseInt(category.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    category.classList.add('animate');
                    
                    // Animate progress bar with dynamic effects
                    const indicatorFill = category.querySelector('.indicator-fill');
                    const progress = indicatorFill.getAttribute('data-progress');
                    setTimeout(() => {
                        indicatorFill.style.width = progress + '%';
                        
                        // Add continuous flowing animation
                        indicatorFill.style.animation = 'indicatorFlow 2s linear infinite';
                        
                        // Add pulsing effect to the bar itself
                        const indicatorBar = category.querySelector('.indicator-bar');
                        indicatorBar.style.animation = 'barPulse 3s ease-in-out infinite';
                    }, 300);
                    
                    // Animate skill items with cascade effect
                    const skillItems = category.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        const itemDelay = parseInt(item.getAttribute('data-delay')) || 0;
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, itemDelay);
                    });
                }, delay);
                
                expertiseObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all expertise categories
    const expertiseCategories = document.querySelectorAll('.expertise-category');
    console.log(`Found ${expertiseCategories.length} expertise categories`);
    
    if (expertiseCategories.length === 0) {
        console.error('No expertise categories found! Check HTML structure.');
        return;
    }
    
    expertiseCategories.forEach((category, index) => {
        console.log(`Observing category ${index}:`, category);
        expertiseObserver.observe(category);
    });
    
    // Fallback: Show categories after 2 seconds if observer doesn't work
    setTimeout(() => {
        expertiseCategories.forEach(category => {
            if (!category.classList.contains('animate')) {
                console.log('Fallback: Showing expertise category');
                category.classList.add('animate');
                
                // Animate progress bar
                const indicatorFill = category.querySelector('.indicator-fill');
                if (indicatorFill) {
                    const progress = indicatorFill.getAttribute('data-progress');
                    indicatorFill.style.width = progress + '%';
                }
                
                // Show skill items
                const skillItems = category.querySelectorAll('.skill-item');
                skillItems.forEach(item => {
                    item.classList.add('animate');
                });
            }
        });
    }, 2000);
}

// Add CSS for counter glow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes counterGlow {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); filter: brightness(1.5); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Assistant Section - Just provides space for robot
function initAssistantAnimations() {
    // No animations needed - just space for the robot to be visible
    console.log('Assistant section ready for robot interaction');
}

console.log('🎯 Script loaded successfully!');