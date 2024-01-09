import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import dado1 from '../images/1.png'
import dado2 from '../images/2.png'
import dado3 from '../images/3.png'
import dado4 from '../images/4.png'
import dado5 from '../images/5.png'
import dado6 from '../images/6.png'

// Criação do cenário

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#dado")
})

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

document.querySelector("#dado").style.width = "100%"

document.querySelector("#dado").style.maxHeight = "90svh"

const scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
    50, // fov
    window.innerWidth / window.innerHeight, // aspect
    0.1, // near
    1000, // fear
)

// Adicionando OrbitControls, para permitir controlar o cenário com o mouse
const orbit = new OrbitControls(camera, renderer.domElement)

// TextureLoader
const textureLoader = new THREE.TextureLoader();

const textures = [
    textureLoader.load(dado1),
    textureLoader.load(dado2),
    textureLoader.load(dado3),
    textureLoader.load(dado4),
    textureLoader.load(dado5),
    textureLoader.load(dado6)
];

const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 6); // Specify 6 faces

const materials = [];
for (let i = 0; i < 6; i++) {
    materials.push(new THREE.MeshBasicMaterial({ map: textures[i] }));
}

const box = new THREE.Mesh(boxGeometry, materials);

scene.add(box);
box.position.set(0, 1, 0);
camera.lookAt(new THREE.Vector3(0, 1, 0))
box.castShadow = true;

// Posicionando a camera e dando update no OrbitControls
camera.position.set(3, 5, 0)
orbit.update()
orbit.enabled = false

function animate(x, y, z, i) {
  
    // Round each rotation to the nearest multiple of 90 degrees only after 100 rotations
    if (i >= 100) {
      box.rotation.x = Math.round(box.rotation.x / (Math.PI / 2)) * (Math.PI / 2) + x;
      box.rotation.y = Math.round(box.rotation.y / (Math.PI / 2)) * (Math.PI / 2) + y;
      box.rotation.z = Math.round(box.rotation.z / (Math.PI / 2)) * (Math.PI / 2) + z;
      camera.position.set(0, 5, 0)
      camera.lookAt(new THREE.Vector3(0, 0, 0))
    } else {
      camera.position.set(3, 5, 0)
      box.rotation.x += x;
      box.rotation.y += y;
      box.rotation.z += z;
    }
  
    renderer.render(scene, camera);
  }

const botao = document.querySelector('button');

botao.addEventListener('click', iniciarAnimacao);
let canSpin = true

function iniciarAnimacao() {

    if (canSpin) {
        canSpin = false
        camera.position.set(3, 5, 0)
        camera.lookAt(new THREE.Vector3(0, 1, 0))

        let i = 0;
        let x = (Math.round(Math.random()) / 10)+0.10
        let y = (Math.round(Math.random()) / 10)+0.10
        let z = (Math.round(Math.random()) / 10)+0.10
        let interval = setInterval(() => {
            if (i <= 100) {
                animate(x, y, z, i)
                i++
            } else {
                canSpin = true
                clearInterval(interval)
            }
        }, 25)
    }
}

setTimeout(() => {

    renderer.render(scene, camera)

}, 1500)