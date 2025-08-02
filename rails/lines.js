import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setAnimationLoop( animate );

const camera = new THREE.PerspectiveCamera(135, window.innerWidth / window.innerHeight);
camera.position.set( 0, 0, 20 );
camera.lookAt( 0, 20, 20);

const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
const scene = new THREE.Scene();

function createMultipleParallelLines(r1, r2) {
  // Create points for multiple lines in a single geometry
  const points = [];
  
  // First line
  points.push(r1[0]);
  points.push(r1[1]);
  
  // Break between lines (this won't be rendered)
  // points.push(r1[1]);
  // points.push(r2[0]);
  
  // Second line
  points.push(r2[0]);
  points.push(r2[1]);
  
  // Create geometry from points
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  // Create line segments (only connects pairs of vertices)
  const lines = new THREE.LineSegments(geometry, material);
  
  // Add to scene
  scene.add(lines);
}

let r1 = [
  new THREE.Vector3(-7, 0, 0),
  new THREE.Vector3(-7, 2000, 0)
];

let r2 = [
  new THREE.Vector3(7, 0, 0),
  new THREE.Vector3(7, 2000, 0)
];

createMultipleParallelLines(r1, r2);

let r3 = [
  new THREE.Vector3(-21, 0, 0),
  new THREE.Vector3(-21, 2000, 0)
];

let r4 = [
  new THREE.Vector3(-14, 0, 0),
  new THREE.Vector3(-14, 2000, 0)
];

createMultipleParallelLines(r3, r4);




function animate() {
  // ends[0] -= 1;
  // ends[1] += 1;
  // line.geometry.attributes.position.setX(0, ends[0]);
  // line.geometry.attributes.position.setX(2, ends[1]);
  // line.geometry.attributes.position.needsUpdate = true;
  renderer.render( scene, camera );
}

// garbage
// const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
// const points = [];
// let ends = [-10, 10];
// points.push( new THREE.Vector3( ends[0], 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( ends[1], 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const line = new THREE.Line( geometry, material );

