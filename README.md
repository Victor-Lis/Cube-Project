
# Cube-Project-ThreeJS

Esse é o um projeto utilizando ThreeJS, uma biblioteca que venho estudando pois acredito que agregue bastante em projetos no Front-End!

# Desafios

- Carregar uma imagem para cada lado do dado;
- Fazer o dado parar em um ângulo de 90°;
- Interagir com o botão no HTML.

Por final aprendi algumas coisas interessantes como: 

# Na prática

## Carregando lados do triângulo
```js
import * as THREE from 'three'

import dado1 from '../images/1.png'
import dado2 from '../images/2.png'
import dado3 from '../images/3.png'
import dado4 from '../images/4.png'
import dado5 from '../images/5.png'
import dado6 from '../images/6.png'

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
```

## Animação
A animação abaixo recebe x, y, z de maneira randômica, para sempre cair um aleatório.
O i é o index atual, similar ao i de um for(let i = 0; i < num; i++).
```js
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
```

## Interagindo com o HTML
HTML
```html
  <head>
    <script src="./JS/script.js" type="module" defer></script>
  </head>
  <body>
    <canvas id="dado" style="background-color: #000;"></canvas>   
    <button> Girar </button> 
  </body>
```

JS
```js
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
```

### Screenshots

Girando
![PrintGirando](https://github.com/Victor-Lis/Cube-Project/blob/master/src/images/PrintGirando.png)

Resultado Final
![Print1](https://github.com/Victor-Lis/Cube-Project/blob/master/src/images/Print1.png)

![Print2](https://github.com/Victor-Lis/Cube-Project/blob/master/src/images/Print1.png)

![Print3](https://github.com/Victor-Lis/Cube-Project/blob/master/src/images/Print1.png)

![Print4](https://github.com/Victor-Lis/Cube-Project/blob/master/src/images/Print1.png)

## Autores

- [@Victor-Lis](https://github.com/Victor-Lis)
