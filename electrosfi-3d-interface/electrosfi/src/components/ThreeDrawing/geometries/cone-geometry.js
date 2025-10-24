import * as THREE from "three";

export default class ConeGeometry {
  constructor(color,  x, y) {
    this.geometry = new THREE.ConeGeometry(
      x,
      y,
      1 * 1000
    );
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
