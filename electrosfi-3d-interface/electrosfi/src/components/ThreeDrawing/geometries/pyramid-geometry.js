import * as THREE from "three";

export default class PyramidGeometry {
   constructor(color, x, y) {
    this.geometry = new THREE.CylinderGeometry(
      0,
      x,
      y,
      4,
      1
    );
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
