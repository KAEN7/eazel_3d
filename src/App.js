import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { three } from "./lib/three";

function App() {
	useEffect(() => {
		three("canvas_container");
	}, []);

	return (
		<div>
			<canvas id="canvas_container"></canvas>
		</div>
	);
}

export default App;
