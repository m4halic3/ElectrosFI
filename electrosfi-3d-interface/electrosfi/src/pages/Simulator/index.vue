<template>
  <span class="fill-height">
    <Loading :image="2" :loading="loading" />
    <div
      id="Drawing"
      class="Drawing"
      :class="loading ? 'fill-height' : 'simulator-container'"
    >
      <!-- <span v-if="!loading"> -->
      <MobileAlert v-if="1 < 1" />
      <NavbarDrawing v-if="!loading" />
      <multipane layout="vertical" class="resizer-content" v-if="!loading">
        <div class="multipane-content">
          <SideNavSimulator />
        </div>
        <multipane-resizer />
        <div class="multipane-content center">
          <div class="container-canvas">
            <v-stage
              :config="configKonva"
              :class="mode + ' ' + zoomAction"
              @wheel="ZOOM"
              v-if="!showMiniCanvas"
            >
              <v-layer>
                <v-rect
                  :config="{
                    token: 'main',
                    width: dimensions.width,
                    height: dimensions.height,
                    fill: cell.fill,
                    id: 'mainRect'
                  }"
                  @mousedown="mouseDownEvent"
                  @mousemove="MudarTamanhoDesenho"
                  @mouseup="FimDesenho"
                />
                <v-rect
                  v-for="(item, indice) in grid"
                  :key="indice"
                  :config="{ ...item, visible: gridVisible }"
                  @mousedown="mouseDownEvent"
                  @dragmove="handleDrag"
                  @mousemove="MudarTamanhoDesenho"
                  @mouseup="FimDesenho"
                />
                <v-regular-polygon
                  v-for="geometry in triangleGeometry"
                  :key="geometry.token"
                  :config="{
                    ...geometry,
                    draggable:
                      currentGeometry.x + currentGeometry.width >=
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false,
                    fill:
                      geometry.geometricFill.properties.image == ''
                        ? geometry.fill
                        : '',
                    fillPatternImage: geometry.geometricFill.properties.image,
                    fillPatternRepeat: 'repeat',
                    fillPatternScale: {
                      x:
                        (geometry.geometricFill.properties.width /
                          dimensions.relationship.x) *
                        1.5,
                      y:
                        (geometry.geometricFill.properties.height /
                          dimensions.relationship.y) *
                        1.5
                    }
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                  @click="setSelectedTokenAction(geometry.token)"
                />
                <v-circle
                  v-for="geometry in circleGeometry"
                  :key="geometry.token"
                  :config="{
                    ...geometry,
                    draggable:
                      currentGeometry.x + currentGeometry.width >=
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false,
                    fill:
                      geometry.geometricFill.properties.image == ''
                        ? geometry.fill
                        : '',
                    fillPatternImage: geometry.geometricFill.properties.image,
                    fillPatternRepeat: 'repeat',
                    fillPatternScale: {
                      x:
                        (geometry.geometricFill.properties.width /
                          dimensions.relationship.x) *
                        1.5,
                      y:
                        (geometry.geometricFill.properties.height /
                          dimensions.relationship.y) *
                        1.5
                    }
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                  @click="setSelectedTokenAction(geometry.token)"
                />
                <v-rect
                  v-for="geometry in blockGeometry"
                  :key="geometry.token"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                  @click="setSelectedTokenAction(geometry.token)"
                  :config="{
                    ...geometry,
                    draggable:
                      currentGeometry.x + currentGeometry.width >=
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false,
                    fill:
                      geometry.geometricFill.properties.image == ''
                        ? geometry.fill
                        : '',
                    fillPatternImage: geometry.geometricFill.properties.image,
                    fillPatternRepeat: 'repeat',
                    fillPatternScale: {
                      x:
                        (geometry.geometricFill.properties.width /
                          dimensions.relationship.x) *
                        1.5,
                      y:
                        (geometry.geometricFill.properties.height /
                          dimensions.relationship.y) *
                        1.5
                    }
                  }"
                />
                <v-circle
                  v-for="source in SourcesList"
                  :key="source.token"
                  :config="{
                    ...source,
                    draggable:
                      currentGeometry.x + currentGeometry.width >
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-circle
                  v-for="flux in FluxList"
                  :key="flux.token"
                  :config="{
                    ...flux,
                    visible: viewMode === 'flux' ? true : false,
                    draggable:
                      currentGeometry.x + currentGeometry.width >
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-circle
                  v-for="flux in FluxList"
                  :key="flux.token"
                  :config="{
                    ...flux,
                    ...flux.transmittance_normal_flux.center,
                    width: 3,
                    height: 3,
                    fill: '#FF00FF',
                    visible: viewMode === 'flux' ? true : false,
                    draggable:
                      currentGeometry.x + currentGeometry.width >
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-circle
                  v-for="flux in FluxList"
                  :key="flux.token"
                  :config="{
                    ...flux,
                    ...flux.transmittance_normal_flux.center,
                    fill: '#00FF00',
                    visible: viewMode === 'flux' ? true : false,
                    draggable:
                      currentGeometry.x + currentGeometry.width >
                        dimensions.width || currentGeometry.x <= 0
                        ? false
                        : currentGeometry.y + currentGeometry.height >=
                            dimensions.height || currentGeometry.y <= 0
                        ? false
                        : mode === 'transform' && mode !== 'handle'
                        ? true
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-transformer id="transformer" ref="transformer" />
              </v-layer>
            </v-stage>
          </div>
        </div>
        <div class="multipane-content right">
          <RightNavSimulator />
        </div>
      </multipane>
      <LoadingModal />
      <PreviewSimulationModal />
    </div>
  </span>
</template>
<script>
import methods from "./js/methods";
import computed from "./js/computed";
import { Multipane, MultipaneResizer } from "vue-multipane";
import api from "@/services/api";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";

export default {
  name: "Simulator",
  components: {
    Loading,
    NavbarDrawing: () => import("@/components/Navbar"),
    SideNavSimulator: () => import("@/components/SideNavSimulator"),
    RightNavSimulator: () => import("@/components/RightNavSimulator"),
    LoadingModal: () => import("@/components/LoadingModal"),
    PreviewSimulationModal: () => import("@/components/PreviewSimulationModal"),
    multipane: Multipane,
    "multipane-resizer": MultipaneResizer
  },
  data() {
    return {
      loading: true,
      currentStart: {},
      circleGeometry: [],
      triangleGeometry: [],
      blockGeometry: [],
      grid: []
    };
  },
  computed,
  watch: {
    selectedToken: function() {
      if (this.mode == "transform") {
        this.updateTransformer();
      }
    },
    viewMode: function() {
      this.updateTransformer();
    },
    mode: function() {
      this.updateTransformer();
    },
    GeometryList: function() {
      this.circleGeometry = this.GeometryList.filter(
        val => val.shape == "sphere"
      );
      this.blockGeometry = this.GeometryList.filter(
        val => val.shape == "block"
      );
      this.triangleGeometry = this.GeometryList.filter(
        val => val.shape == "triangle"
      );
      this.updateState();
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyPressAction);
    document.removeEventListener("keyup", this.keySolveAction);
  },
  created: async function() {},
  mounted: async function() {
    this.init();
  },
  methods: {
    ...methods,
    setPageInfo: function() {
      document.title = "Simulator - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute(
          "content",
          "Simulate and edit photonic tools online - ElectrosFI"
        );
    },
    blockReload: function() {
      window.onbeforeunload = function() {
        return "";
      };
    },
    init: async function() {
      await api
        .get(this.$route.params.key)
        .then(response => {
          try {
            this.setState(response);
          } catch (err) {
            Swal.fire({
              title: "An error appears in your simulation!",
              text: err.message
            });
          }
        })
        .then(() => {
          setInterval(() => {
            this.loading = false;
          }, 500);
        });

      document.addEventListener("keydown", this.keyPressAction);
      document.addEventListener("keyup", this.keySolveAction);
      
      this.setKonvaStageAction(
        this.$refs.transformer
          ? this.$refs.transformer.getNode().getStage()
          : ""
      );

      this.setPageInfo();
    },
    geometryFrom: function() {
      var listaDeTodasAsGeometrias = [];
      return listaDeTodasAsGeometrias;
    },
    geometryInsideVerify: function() {
      return [];
    },
    constructGrid() {
      for (var x = 0; x < 600; x += 600 / 60) {
        for (var y = 0; y < 600; y += 600 / 60) {
          this.grid.push({
            x,
            y,
            width: 600 / 60,
            height: 600 / 60,
            stroke: "grey",
            strokeWidth: 0.01
          });
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
