<template>
  <div 
    ref="threeDrawing"
    class="threeDrawing"
    @click="clickEvent"
  />
</template>

<script>

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { mapActions, mapGetters } from 'vuex';
import BoxGeometry from './geometries/box-geometry';
import SphereGeometry from './geometries/sphere-geometry';
import TriangleGeometry from './geometries/triangle-geometry';
import md5 from 'js-md5';
import formatColor from '@/common/formatColor';

export default {
  name: 'ThreeDrawing',
  mounted() {
    this.init();
    this.renderScene();
  },
  // },
  // beforeDestroy() {
  //   window.removeEventListener('resize', this.onWindowResize);
  // },
  watch: {
    // selectedToken: function() {
    //   if (this.mode == "transform") {
    //     this.updateTransformer();
    //   }
    // },
    // viewMode: function() {
    //   this.updateTransformer();
    // },
    // mode: function() {
    //   this.updateTransformer();
    // },
    GeometryList: {
      handler() {
        this.renderScene();
      },
      deep: true
    },
    SourcesList: {
      handler() {
        this.renderScene();
      },
      deep: true
    },
  },
  methods: {
    init() {   
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xededed)
      this.camera = new THREE.PerspectiveCamera(75, 
        this.$refs.threeDrawing.offsetWidth /
        this.$refs.threeDrawing.offsetHeight);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setSize(
        this.$refs.threeDrawing.offsetWidth, 
        this.$refs.threeDrawing.offsetHeight
      );
      this.$refs.threeDrawing.appendChild(this.renderer.domElement);    
      this.camera.position.z = 10; 
      this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 5);
      this.directionalLight.position.set(9.9, 10, 10.1);
      this.directionalLight2.position.set(-9.9, -10, -10.1);
      //this.camera.add(this.directionalLight);
      this.scene.add(this.directionalLight,this.directionalLight2); 
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
      this.transformControls.setMode("scale");
      this.scene.add(this.transformControls);

      this.animate(); 
    },
    clearScene() {
      const filteredSceneChildren = this.scene.children.filter(child => {
        return !(child instanceof THREE.Mesh);
      });
      this.scene.children = filteredSceneChildren;
    },
    createTransformControls(){
      const geometries = this.scene.children.filter(child => {
        return (child instanceof THREE.Mesh);
      });
      geometries.map(geometry => {
        this.transformControls.attach(geometry.mesh);
      })
    },
    renderScene() {
      this.clearScene();
      this.loadGeometries();
      this.loadSources();
      this.updateState();
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    clickEvent() {            
      if (this.mode == "create") {
        this.addGeometry();
      } else if (this.mode == "sources") {  
        this.addSource();
      }
    },
    loadGeometries() {
      this.GeometryList.map(geometry => {
        let geo;
        const color = formatColor(geometry.fill);

        if (geometry.shape == "block") {         
          geo = new BoxGeometry(
            color, 
            { 
              width: geometry.width, 
              height: geometry.height, 
              depth: geometry.depth, 
            },
            {
              x: geometry.x,
              y: geometry.y,
              z: geometry.z
            }
          );
        }

        if (geometry.shape == "sphere") {
          geo = new SphereGeometry(
            color, 
            geometry.radius,
            {
              x: geometry.x,
              y: geometry.y,
              z: geometry.z
            }
          );
        }

        if (geometry.shape == "triangle") {
          geo = new TriangleGeometry(
            color,
            { 
              width: geometry.width, 
              height: geometry.height, 
              depth: geometry.depth, 
            },
            {
              x: geometry.x,
              y: geometry.y,
              z: geometry.z
            }
          );

        }

        this.scene.add(geo.mesh);
      });
    },
    loadSources() {
      this.SourcesList.map(source => {
        const color = formatColor(source.fill);
        const sourceGeometry = new SphereGeometry(
          color,
          0.2,
          {
            x: source.x,
            y: source.y,
            z: source.z
          }
        );

        this.scene.add(sourceGeometry.mesh);
      });
    },
    addGeometry(/*event*/) {
        let token = md5.hex(Date.now().toString());

        this.setCurrentGeometryAction({
            name: this.shape + " " + (this.GeometryList.length + 1),
            token: token,
            x: 0, 
            y: 0,
            z: 0, 
            fill: this.color,
            shape: this.shape,
            epsilon: 12,
            class: "geometry",
            width: 1,
            height: 1,
            depth: 1,
            materialId: 0,
            radius: 1,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            geometricFill: {
                properties: {
                    name: `Default ${this.shape + " " + (this.GeometryList.length + 1)}`,
                    width: 1,
                    height: 1,
                    depth: 1,
                    image: ''
                },
                elements: []
            },
            geometricFillPattern: []
        });

        // this.setDrawingStatusAction(true);
        this.GeometryListAppendAction(this.currentGeometry);
        
    },
    addSource() {
      const token = md5.hex(Date.now().toString());

      const name = "Source " + (this.SourcesList.length + 1);
      const fill = "#ff00000";

      const newSource = {
        name,
        fill,
        token,
        waveLenght: 0,
        waveWidth: 0,
        x: 0,
        y: 0,
        z: 0
      }

      this.SourcesListAppend(newSource);
      // console.log("aa",this.SourcesList);
    },
    ...mapActions("simulator", [
      "GeometryListAppendAction",
      "setGeometryList",
      "updateState",
      "setDrawingStatusAction",
      "setState",
      "setSelectedTokenAction",
      "setCurrentGeometryAction",
      "ZOOM",
      "keyPressAction",
      "keySolveAction",
      "GeometryListRemove",
      "setCurrentGeometryData",
      "setCurrentGeometrySizeWidth",
      "setCurrentGeometrySizeHeight",
      "setCurrentGeometrySizeDepth",
      "setCurrentGeometryRadius",
      "SourcesListAppend",
      "setCurrentGeometryPosX",
      "setCurrentGeometryPosY",
      // "FluxListAppend",
      "setCurrentGeometryRotation"
    ]),
  },
  computed: {
    ...mapGetters("simulator", [
      "id",
      "getCurrentScale",
      "GeometryList",
      "drawing",
      "currentGeometry",
      "mode",
      "zoomAction",
      "currentScale",
      "shape",
      "color",
      "gridVisible",
      "geometryData",
      "selectedToken",
      "SourcesList",
      "viewMode",
      "cell",
      "dimensions",
      "scene_simulation",
      "view_simulation",
      // "FluxList",
      "showMiniCanvas"
    ]),
  }
}


</script>

<style lang="scss">

.threeDrawing {
  width: 600px;
  height: 600px;
}

</style>