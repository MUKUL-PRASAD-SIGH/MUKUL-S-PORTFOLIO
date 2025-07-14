// Simple 3D Lab Scene
window.initLabScene = function() {
    console.log('initLabScene called');
    // Create scene
    console.log('Creating scene...');
    const scene = new THREE.Scene();
    const container = document.getElementById('lab-container');
    if (!container) {
        console.error('Lab container not found');
        return null;
    }
    console.log('Container found:', container);
    
    // Debug log
    console.log('Initializing lab scene...');
    console.log('THREE:', THREE);
    
    // Camera
    console.log('Creating camera...');
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    console.log('Camera created at position:', camera.position);
    
    // Renderer
    console.log('Creating renderer...');
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: true // For better debugging
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    console.log('Appending renderer to container...');
    container.appendChild(renderer.domElement);
    console.log('Renderer appended, canvas:', renderer.domElement);
    
    // Add a simple cube to test
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Simple animation
    let frameCount = 0;
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        
        // Debug: Log first few frames
        if (frameCount < 5) {
            console.log(`Frame ${frameCount} rendered`);
            frameCount++;
        }
    }
    
    // Start animation
    animate();
    console.log('Lab scene initialized');
    
    // Cleanup function
    return function() {
        console.log('Cleaning up lab scene');
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
    };
}
