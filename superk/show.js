// This is a conceptual example.
// It DOES NOT extract data from your image.
// It assumes you have a way to generate or obtain 3D data points.

import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls for camera movement
// const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 20;

// 2. Create the cylinder geometry (representing the detector)
const radiusTop = 5;
const radiusBottom = 5;
const height = 15;
const radialSegments = 64; // More segments for a smoother cylinder
const heightSegments = 1;
const openEnded = false;
const thetaStart = 0;
const thetaLength = Math.PI * 2;

const cylinderGeometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength
);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, transparent: true, opacity: 0.1 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);

// 3. Simulate data points (THIS IS THE PART YOU'D NEED TO REPLACE WITH YOUR ACTUAL DATA)
// For demonstration, let's create some random points on the cylinder surface
const dataPoints = [];
const numberOfPoints = 5000;
const colorScale = (value) => {
    // A simplified color scale for demonstration (blue to red)
    const normalizedValue = Math.min(1, Math.max(0, value / 100)); // Assuming max value is 100
    return new THREE.Color(normalizedValue, 0, 1 - normalizedValue);
};

for (let i = 0; i < numberOfPoints; i++) {
    const y = (Math.random() - 0.5) * height; // Y-coordinate along the cylinder's height
    const angle = Math.random() * Math.PI * 2; // Angle around the cylinder

    // Calculate x and z coordinates on the cylinder's surface
    const x = radiusTop * Math.cos(angle);
    const z = radiusTop * Math.sin(angle);

    // Simulate some data value (e.g., charge)
    const value = Math.random() * 100;

    dataPoints.push({ position: new THREE.Vector3(x, y, z), value: value });
}



const canvas = document.getElementById('myCanvas');
const img = new Image();
img.crossOrigin = 'Anonymous'; // Important for CORS if image is from a different domain
img.src = 'src.jpg';

img.onload = () => {
// Set canvas dimensions to match the image
canvas.width = img.width;
canvas.height = img.height;

// Draw the image onto the canvas
ctx.drawImage(img, 0, 0);

// Extract data points from src.jpg
// iterate over the image data and push non-black, non-white points from the image into dataPoints
// We will need to recognize points which are larger than a single pixel and delineated by black or white pixels
for (let y=0; y < imageData.height; y++) {
    for (let x=0; x < imageData.width; x++) {
        // if x,y is not black or white, add it to dataPoints
        const index = (y * imageData.width + x) * 4; // RGBA format
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        const a = imageData.data[index + 3];    
        if (a > 0 && !(r === 0 && g === 0 && b === 0) && !(r === 255 && g === 255 && b === 255)) {
            // Not black or white, add to dataPoints
            const value = (r + g + b) / 3; // Example value based on RGB average
            const position = new THREE.Vector3(
                (x / imageData.width) * radiusTop * 2 - radiusTop, // Scale to cylinder width
                (y / imageData.height) * height - height / 2, // Scale to cylinder height
                0 // Z-coordinate remains zero for a flat cylinder
            );
            dataPoints.push({ position: position, value: value });
        }
    }
}   


// 4. Add data points to the scene
dataPoints.forEach(pointData => {
    const material = new THREE.MeshBasicMaterial({ color: colorScale(pointData.value) });
    const geometry = new THREE.SphereGeometry(0.05, 8, 8); // Small spheres for points
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pointData.position);
    scene.add(mesh);
});


// 5. Animation loop
function animate() {
    requestAnimationFrame(animate);
    // controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
