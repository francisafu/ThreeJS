//A loader library of 3D models, using THREE.JS.

//Initial container
function InitContainer(id) {
    //let container = document.createElement('div');
    return document.getElementById(id);
    //Comment this line if use 'SubFrame'
    //document.body.appendChild(container);
}

//Initial scene
function InitScene() {
    return new THREE.Scene();
}

//Initial horizontal plane
function InitPlaneH(scene) {
    let planeGeometry = new THREE.PlaneGeometry(900, 900);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let planeH = new THREE.Mesh(planeGeometry, planeMaterial);
    planeH.rotation.x = -0.5 * Math.PI;
    planeH.position.set(0, 0, -100);
    planeH.receiveShadow = true;
    scene.add(planeH);
}

// Initial vertical plane
// function InitPlaneV(scene) {
//     let planeGeometry = new THREE.PlaneGeometry(900, 580);
//     let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
//     let planeV = new THREE.Mesh(planeGeometry, planeMaterial);
//     planeV.rotation.x = 0;
//     planeV.position.set(0, planeV.geometry.parameters.height / 2, 0);
//     planeV.receiveShadow = true;
//     scene.add(planeV);
// }

//Load texture
function LoadTexture(imgPath) {
    let texture = new THREE.TextureLoader().load(imgPath);
    return material = new THREE.MeshLambertMaterial({map: texture});
}

//Initial object mesh with texture
//TODO: OnProgress Function
function InitGLTF(scene, gltfPath, gltfPosition, gltfRotation, gltfScale, material) {
    let gltfMesh = null;
    let onProgress = function (xhr) {
    };
    let onError = function (xhr) {
        console.error(xhr)
    };
    let loader = new THREE.GLTFLoader();
    loader.load(gltfPath, function (gltf) {
        gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    if (child.isMesh) {
                        if (child.name === "Replaceable") {
                            child.material = material;
                        }
                        child.castShadow = true;

                    }
                }
            }
        );
        gltfMesh = gltf.scene;
        gltfMesh.position.copy(gltfPosition);
        gltfMesh.rotation.copy(gltfRotation);
        gltfMesh.scale.copy(gltfScale);
        scene.add(gltfMesh);
    }, onProgress, onError);
}

//Initial camera
function InitCamera(scene, windowWidth, windowHeight, cameraPosition) {
    let camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 2000);
    camera.position.copy(cameraPosition);
    camera.lookAt(scene.position);
    scene.add(camera);
    return camera;
}

//Initial ambient light
function InitAmbientLight(scene, ambientLightIntensity) {
    let ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = ambientLightIntensity;
    scene.add(ambientLight);
}

//Initial spot light
function InitSpotLight(scene, spotLightPosition, spotLightIntensity) {
    let spotLight = new THREE.SpotLight();
    spotLight.position.copy(spotLightPosition);
    spotLight.intensity = spotLightIntensity;
    spotLight.castShadow = true;
    spotLight.shadow.bias = 0.0001;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);
}

//Initial renderer
function InitRenderer(windowWidth, windowHeight, container) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowWidth, windowHeight);
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    return renderer;
}

//Initial All
function InitAll(id, texturePath, meshPath, width, height, meshRotation, meshPosition, meshScale, cameraPosition, spotLightPosition,
                 ambientLightIntensity, spotLightIntensity) {
    let container = InitContainer(id);
    let scene = InitScene();
    let regwp=/wallpaper.gltf$/;
    let regsf=/sofa.gltf$/;
    if(!regwp.test(meshPath)&&!regsf.test(meshPath)){
        InitPlaneH(scene);
    }
    let material = LoadTexture(texturePath);
    let scale = new THREE.Vector3(meshScale, meshScale, meshScale);
    InitGLTF(scene, meshPath, meshPosition, meshRotation, scale, material);
    let camera = InitCamera(scene, width, height, cameraPosition);
    InitAmbientLight(scene, ambientLightIntensity);
    InitSpotLight(scene, spotLightPosition, spotLightIntensity);
    let renderer = InitRenderer(width, height, container);
    Animate();

//Animate
    function Animate() {
        requestAnimationFrame(Animate);
        render();
    }

//Render
    function render() {
        renderer.render(scene, camera);
    }
}

