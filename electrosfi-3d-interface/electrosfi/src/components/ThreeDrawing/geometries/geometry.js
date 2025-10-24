export default class Geometry {
  constructor(geometry, material, mesh, shape) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = mesh;
    this.shape = shape;
    this.id = mesh.uuid;

    this.mesh.castShadow = true;

    /*
    this.edges = new THREE.EdgesGeometry(this.geometry);
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000f0 });
    this.wireframe = new THREE.LineSegments(this.edges, this.lineMaterial);
    this.mesh.add(this.wireframe);
  
    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.attach(mesh);
    transformControls.setMode("scale");
    scene.add(transformControls);

    */
  }

  setDims(x, y, z) {
    this.mesh.scale.x = x;
    this.mesh.scale.y = y;
    this.mesh.scale.z = z;
  }

  setPositions(x, y, z) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  setColor(color) {
    this.mesh.material.color.set(color);
  }
}