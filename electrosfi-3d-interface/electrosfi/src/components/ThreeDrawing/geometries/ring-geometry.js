import * as THREE from "three";

export default class RingGeometry {
  constructor(color) {
    const innerRadius = 1;
    const outerRadius = 2;

    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);

    shape.holes.push(holePath);

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: false,
    };

    this.geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    this.material = new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
