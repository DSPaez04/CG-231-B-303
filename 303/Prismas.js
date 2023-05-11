

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 35;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);



const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1); //Luz 
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);


  function poligono(nlados, ladoigual) {
    const vertices = [];
    const ang = 2*Math.PI/nlados;
    for (let i =0; i <= nlados; i++) {
        let x = ladoigual * Math.cos(i * ang);
        let y = ladoigual * Math.sin(i * ang);
        vertices[i] = new THREE.Vector3(x, y, 0);
    }
    return vertices;
}
function crearGeometria2D(nlados, ladoigual) {
  const vertices = poligono(nlados, ladoigual);

  // Crea un nuevo objeto Shape
  const shape = new THREE.Shape();

  // Establece el primer vértice del shape
  shape.moveTo(vertices[0].x, vertices[0].y);

  // Une los vértices para formar el contorno del shape
  for (let i = 1; i <= nlados; i++) {
    shape.lineTo(vertices[i].x, vertices[i].y);
  }

  // Crea una geometría 2D a partir del shape
  var extrudeSettings={
    depth: 10,
    bevelEnabled: false,
  }
  const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

  return geometry;
}


const geometria2 = crearGeometria2D(4, 2); // Ejemplo con hexágono regular de lado igual a 2
const material2 = new THREE.MeshPhongMaterial({ color: 0xffffff });
var x=10
var y=0
var z=0
const poli = new THREE.Mesh(geometria2, material2);
geometria2.translate(x,y,z)
scene.add(poli);

const geometria3 = crearGeometria2D(6, 2); // Ejemplo con hexágono regular de lado igual a 2
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
ang=-190;
const poli2 = new THREE.Mesh(geometria3, material);
geometria3.translate(5,0,0)
geometria3.rotateX(ang)
scene.add(poli2);

function dospoli(){
  //for(let i=0; i<=1;i++){
    const geometria2D = crearGeometria2D(10, 2); // Ejemplo con hexágono regular de lado igual a 2
const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
const poli = new THREE.Mesh(geometria2D, material);
geometria2D.rotateY(-45)
scene.add(poli);
 // }
}
dospoli();

/*const vertices = poligono(6, 2); // Ejemplo con hexágono regular de lado igual a 2

// Crea una geometría de Three.js utilizando los vértices
const geometry = new THREE.BufferGeometry().setFromPoints(vertices);

// Crea un material para la geometría
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Crea una línea utilizando la geometría y el material
const poli = new THREE.Mesh(geometry, material);

// Agrega la línea a la escena
scene.add(poli);*/


  


//Renderizado de la animación
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();


