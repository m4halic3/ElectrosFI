import * as THREE from "three";

export default class CylinderGeometry {

  constructor(color, x, y) {
    this.geometry = new THREE.CylinderGeometry(
      x,
      x,
      y,
      1 * 1000
    );
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
