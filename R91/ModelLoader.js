//A loader library of 3D models, using THREE.JS.

//Initial container
//TODO: Get container parameters
function InitContainer() {
    let container = document.createElement('div');
    //var container = document.getElementById('SubFrame');
    //Comment this line if use 'SubFrame'
    document.body.appendChild(container);
    return container
}

//Initial scene
function InitScene() {
    let scene = new THREE.Scene();
    return scene;
}

//Initial horizontal plane
function InitPlaneH(scene) {
    let planeGeometry = new THREE.PlaneGeometry(900, 580);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let planeH = new THREE.Mesh(planeGeometry, planeMaterial);
    planeH.rotation.x = -0.5 * Math.PI;
    planeH.position.set(0, 0, -100);
    planeH.receiveShadow = true;
    scene.add(planeH);
}

//Initial vertical plane
function InitPlaneV(scene) {
    let planeGeometry = new THREE.PlaneGeometry(900, 580);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    let planeV = new THREE.Mesh(planeGeometry, planeMaterial);
    planeV.rotation.x = 0;
    planeV.position.set(0, planeV.geometry.parameters.height / 2, 0);
    planeV.receiveShadow = true;
    scene.add(planeV);
}

//Load texture
function LoadTexture(imgPath) {
    let texture = new THREE.TextureLoader().load(imgPath);
    return material = new THREE.MeshLambertMaterial({map: texture});
}

//Initial object mesh with texture
//TODO: Material dictionary parameter
function InitObj(scene, objPath, objPosition, objRotation, material) {
    let objMesh = null;
    let onProgress = function (xhr) {
    };
    let onError = function (xhr) {
    };
    let loader = new THREE.OBJLoader();
    loader.load(objPath, function (object) {
        object.traverse(function (child) {
            if (child.isMesh) {
                /*if (child.name === "Group36190") {
                    child.material = material;
                }*/
                child.material = material;
                child.castShadow = true;
            }
        });
        objMesh = object;
        objMesh.position.copy(objPosition);
        objMesh.rotation.copy(objRotation);
        scene.add(objMesh);
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
function InitAll(texturePath, objPath, width, height, objRotation, objPosition, cameraPosition, spotLightPosition,
                 ambientLightIntensity, spotLightIntensity) {
    let container = InitContainer();
    let scene = InitScene();
    InitPlaneH(scene);
    let material = LoadTexture(texturePath);
    InitObj(scene, objPath, objPosition, objRotation, material);
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

