<template>
  <v-dialog
    v-if="showMiniCanvasLocal"
    v-model="showMiniCanvasLocal"
    @click:outside="setCurrentMode('transform')"
    max-width="1100"
    @input="setCurrentMode('miniCanvas')"
  >
    <v-card>
      <v-card-title>
        <p class="text-h5">Add Fill</p>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <p class="text-subtitle-2">Cell Properties</p>
            <v-text-field
              dense
              outlined
              label="Cell Fill Pattern Name"
              class="mt-2"
              v-model="name"
            />
            <v-row dense>
              <v-col dense>
                <v-text-field
                  dense
                  outlined
                  label="Width (µm)"
                  type="number"
                  v-model="width"
                />
              </v-col>
              <v-col dense>
                <v-text-field
                  dense
                  outlined
                  label="Height (µm)"
                  type="number"
                  v-model="height"
                />
              </v-col>
            </v-row>
            <RightNavSimulatorMaterial :expansion="true" />
            <p class="text-subtitle mt-5">Geometry List</p>
            <v-simple-table
              height="200"
              v-if="geometryListDraggableContent.length > 0"
            >
              <template v-slot:default>
                <draggable v-model="geometryListDraggableContent" tag="tbody">
                  <tr
                    v-for="element in geometryListDraggableContent"
                    :key="element.token"
                    :class="
                      element.token == selectedInsideToken ? 'active' : ''
                    "
                    @click="setSelectedLocalTokenAction(element.token)"
                  >
                    <td>{{ element.name }}</td>
                    <td>
                      <v-btn
                        icon
                        link
                        @click="GeometricLocalListRemove(element.token)"
                      >
                        <v-icon small> mdi-delete </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </draggable>
              </template>
            </v-simple-table>
            <v-col v-else> Please create a new Geometry at the canvas </v-col>
          </v-col>
          <v-divider vertical />
          <v-col v-if="selectedGeometric[0]">
            <p class="text-subtitle-2">Geometry Properties</p>
            <v-text-field
              dense
              outlined
              label="Name of Geometry"
              class="mt-2"
              v-model="nameGeometry"
            />
            <v-row dense>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  label="Width (µm)"
                  type="number"
                  v-model="widthGeometry"
                />
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  label="Height (µm)"
                  v-model="heightGeometry"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  label="X (µm)"
                  v-model="xGeometry"
                />
              </v-col>
              <v-col>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  label="Y (µm)"
                  v-model="yGeometry"
                />
              </v-col>
            </v-row>
            <RightNavSimulatorMaterial :expansion="true" />
          </v-col>
          <v-col v-else>
            <p class="text-subtitle-2">Select a Geometry</p>
            <p class="text-caption">
              Please select or create a new geometry at the canvas.
            </p>
          </v-col>
          <v-divider vertical />
          <v-col cols="5">
            <v-menu
              bottom
              :close-on-content-click="false"
              :nudge-width="400"
              offset-y
              open-on-hover
              rounded="lg"
              class="elevation-6"
              min-width="100"
              max-width="300"
            >
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip dense bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      :color="mode == 'create' ? 'primary' : ''"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      Geometry
                      <v-icon>
                        {{
                          shape == "block"
                            ? "mdi-square"
                            : shape == "sphere"
                            ? "mdi-circle"
                            : "mdi-square"
                        }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Geometry</span>
                </v-tooltip>
              </template>
              <v-list dense>
                <v-list-item
                  dense
                  @click="setShapeOfCurrentGeometryState('block')"
                >
                  <v-list-item-action>
                    <v-icon>mdi-square</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Block</v-list-item-title>
                </v-list-item>
                <v-list-item
                  dense
                  @click="setShapeOfCurrentGeometryState('triangle')"
                >
                  <v-list-item-action>
                    <v-icon>mdi-triangle</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Triangle</v-list-item-title>
                </v-list-item>
                <v-list-item
                  dense
                  color="primary"
                  @click="setShapeOfCurrentGeometryState('sphere')"
                >
                  <v-list-item-action>
                    <v-icon>mdi-circle</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Circle</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-stage
              style="z-index: 999"
              :config="{
                width: 400,
                height: 400,
                fill: 'white'
              }"
            >
              <v-layer ref="mainRectRef">
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
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
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
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-rect
                  v-for="geometry in blockGeometry"
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
                        : false
                  }"
                  @transform="handleTransform"
                  @transformstart="handleTransformStart"
                  @dragmove="handleDrag"
                  @mousedown="mouseDownTransformEvent"
                />
                <v-transformer
                  id="transformerMiniCanvas"
                  ref="transformerMiniCanvas"
                />
              </v-layer>
            </v-stage>
            <v-row class="mr-3">
              <v-spacer> </v-spacer>
              <v-btn
                class="ma-3"
                large
                color=""
                @click="set_showMiniCanvas(false)"
                >Cancel</v-btn
              >
              <v-btn class="ma-3" large color="primary" @click="Preencher"
                >Preencher</v-btn
              >
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import methods from "./js/methods";
import computed from "./js/computed";
import draggable from "vuedraggable";
import RightNavSimulatorMaterial from "@/components/RightNavSimulatorMaterial";

/**
 * Constrói o modal de visualização e construção de geometrias periódicas
 */
export default {
  name: "MiniCanvas",
  mounted: function() {},
  data() {
    /**
     * @model
     */
    return {
      currentStart: {},
      grid: [],
      menu: "",
      attrs: ""
    };
  },
  computed: {
    ...computed
  },
  watch: {
    currentGeometryLocal: function() {
      //
    }
  },
  methods: {
    /**
     * Insert text at cursor position.
     *
     * @param {void}
     * @public
     */
    Preencher: function() {
      const self = this;
      this.$refs.mainRectRef.getNode().toImage({
        callback: function(el) {
          const image = new window.Image();
          image.onload = () => {
            self.setPropertiesGeometryFill(["image", image]);
          };
          image.src = el.src;
          self.set_showMiniCanvas(false);
        }
      });
    },
    /**
     * Adiciona borda à geometria selecionada
     *
     * @param {Object} objeto
     * @public
     */
    geometryBordered: function(objeto) {
      const content = {
        stroke: "#3eb772"
      };
      return Object.assign(content, objeto);
    },
    ...methods
  },
  components: {
    RightNavSimulatorMaterial,
    draggable
  }
};
</script>
