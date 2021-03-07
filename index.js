const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let gltfAsset;
scene.background = new THREE.Color( 0x424242 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
const light = new THREE.AmbientLight( 0x404040, 5); // soft white light
scene.add( light );

camera.position.z = 5;

// Instantiate a loader
const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
  // resource URL
  'src/blender-assets/planet.gltf',
  // called when the resource is loaded
  function ( gltf ) {
    gltfAsset = gltf.scene

    gltfAsset.scale.set(.13, .13, .13)
    scene.add( gltfAsset );
  },
  // called while loading is progressing
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  // called when loading has errors
  function ( error ) {
    console.log( 'An error happened' );
  }
);



const onWindowResize = () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

const animate = () => {
  requestAnimationFrame( animate );

  if (gltfAsset) {
    gltfAsset.rotation.x += 0.003;
    gltfAsset.rotation.y += 0.005;
  }

  renderer.render( scene, camera );
};

animate();
