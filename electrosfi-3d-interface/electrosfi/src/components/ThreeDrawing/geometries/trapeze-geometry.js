import * as THREE from "three";

export default class TrapezeGeometry {
  constructor(color, x, y, z) {
    const shape = new THREE.Shape();
    x /= 2;
    y /= 2;

    shape.moveTo(-x, -y);
    shape.lineTo(x, -y);
    shape.lineTo(x - x / 4, y);
    shape.lineTo(-x - -x / 4, y);
    shape.lineTo(-x, -y);

    const extrudeSettings = {
      steps: 2,
      depth: z,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelSegments: 0,
    };

    this.geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    this.material = new THREE.MeshPhongMaterial({ color: color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
