import * as THREE from "three";
import Geometry from "./geometry";

export default class BoxGeometry extends Geometry{
  constructor(color, dimensions, positions) {
    const shape = "block"
    const { width, height, depth } = dimensions;
    
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const { x, y, z } = positions;
    const material = new THREE.MeshPhongMaterial({ 
      ...color,
      transparent: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    super(geometry, material, mesh, shape);
    this.setPositions(x, y, z);
  }
}
