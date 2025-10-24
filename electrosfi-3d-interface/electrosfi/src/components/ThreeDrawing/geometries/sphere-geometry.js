import * as THREE from "three";
import Geometry from "./geometry";

export default class SphereGeometry extends Geometry{
  constructor(color, radius, positions) {
    const shape = "circle";
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshPhongMaterial({ 
      ...color,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);

    super(geometry, material, mesh, shape);
    this.setPositions(positions.x, positions.y, positions.z);
  }
}
