import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";

export const three = (name) => {
	const scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(5));
	scene.background = new THREE.Color("#c7ccc6");

	const webGL = {
		canvas: document.querySelector(`#${name}`),
		antialias: true,
		// alpha: true,
	};

	// RENDERER
	const renderer = new THREE.WebGLRenderer(webGL);
	// renderer.physicallyCorrectLights = true;

	// renderer.shadowMap.enabled = true;
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.setSize(window.innerWidth, window.innerHeight);

	// LIGHT
	const light = new THREE.PointLight("0xffff00", 0.5, 15, 1);
	light.position.set(5, 5, 5);
	scene.add(light);

	// CAMERA
	const camera = new THREE.PerspectiveCamera(
		25,
		window.innerWidth / window.innerHeight,
		0.1,
		10
	);
	camera.position.set(1, 1, 5);

	// document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;

	// LOADER
	const loader = new GLTFLoader();

	// basketball_hoop
	loader.load(
		`/gltf/basketball_hoop/scene.gltf`,
		(gltf) => {
			const model = gltf.scene;
			model.scale.set(0.001, 0.001, 0.001);
			model.position.set(-0.7, 0, 0);

			scene.add(gltf.scene);
		},
		(error) => {
			console.log(error);
		}
	);

	let step = 0;

	// basketball
	loader.load(
		`/gltf/basketball/scene.gltf`,
		(gltf) => {
			const model = gltf.scene;
			model.scale.set(0.01, 0.01, 0.01);
			// model.position.set(-1, 1, 1);

			function animate() {
				requestAnimationFrame(animate);

				step += 0.01;
				model.position.x = (1.5 / 2) * Math.cos(step);
				model.position.y = 1.5 * Math.abs(Math.sin(step));

				controls.update();

				render();

				stats.update();
			}

			animate();

			scene.add(gltf.scene);
		},
		(error) => {
			console.log(error);
		}
	);

	(() => {
		window.addEventListener("resize", onWindowResize, false);
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			render();
		}
	})();

	const stats = Stats();

	function render() {
		renderer.render(scene, camera);
	}
};
