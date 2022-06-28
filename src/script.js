import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as dat from 'dat.gui'



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusKnotGeometry( 3, 0.4, 400, 50, 10, 5, 4);



// Materials

const mat = new THREE.Material({
    onpacity: 1,
    visible: 1,
    depthTest: true,
})


// Material metall

const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x000000,
    roughness: 0.1,
    metalness: 0.999,
    wireframe: false,
    flatShading: false,
    envMapIntensity: 1.0,
})

// Kontroller farge

gui.addColor(material, 'color')
    .onChange(() => {
        material.color.set(material.color)
    }) 


// Mesh

const sphere = new THREE.Mesh(geometry,material, mat)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
pointLight.intensity = 100

scene.add(pointLight)


const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.x = -2
pointLight2.position.y = -3
pointLight2.position.z = -4
pointLight2.intensity = 100

scene.add(pointLight2)


// Kontroller lys


gui.add(pointLight.position, 'y')
gui.add(pointLight.position, 'x')
gui.add(pointLight.position, 'z')
gui.add(pointLight, 'intensity')


// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10

scene.add(camera)

// Controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false;



// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//sRGBA Enconding
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

// Animate

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

