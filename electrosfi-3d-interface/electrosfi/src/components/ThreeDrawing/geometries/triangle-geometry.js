import * as THREE from "three";
import Geometry from "./geometry";

export default class TriangleGeometry extends Geometry{
  constructor(color, dimensions, positions) {
    const shape = "triangle"
    const { width, height, depth } = dimensions;


    const shapeGeometry = new THREE.Shape();
    shapeGeometry.moveTo(0, height / 2);
    shapeGeometry.lineTo(width / 2, -height / 2);
    shapeGeometry.lineTo(-width / 2, -height / 2);
    shapeGeometry.lineTo(0, height / 2);

    const extrudeSettings = {
      steps: 2,
      depth: depth,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelSegments: 0,
    };

    const geometry = new THREE.ExtrudeGeometry(shapeGeometry, extrudeSettings);
    const material = new THREE.MeshPhongMaterial({ 
      ...color,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);

    const { x, y, z } = positions;
    
    super(geometry, material, mesh, shape);
    this.setPositions(x, y, z);
  }
}
