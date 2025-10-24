<template>
  <v-expansion-panel
    v-if="typeof geometryData !== 'undefined' && geometryData.class === 'geometry'"
    class="dimensionsGeometry"
  >
    <v-expansion-panel-header>Dimensions</v-expansion-panel-header>
    <v-expansion-panel-content>
      <section class="item-body">
        <v-col>
          <v-row dense>
            <v-col
              v-if="geometryData.shape === 'sphere' || geometryData.class === 'source'"
              cols="6"
            >
              <v-text-field
                v-model="contentGeometrRadius"
                outlined
                dense
                label="Radius"
                color="primary"
                type="number"
              />
            </v-col>
            <v-col 
              v-if="geometryData.class !== 'source' && geometryData.shape !== 'sphere'"
              cols="6"
            >
              <v-text-field
                v-model="contentGeometrWidth"
                outlined
                dense
                label="Width"
                color="primary"
                type="number"
              />
            </v-col>
            <v-col
              v-if="geometryData.class !== 'source' && geometryData.shape !== 'sphere'"
              cols="6"
            >
              <v-text-field
                v-model="contentGeometrHeight"
                outlined
                dense
                label="Height"
                color="primary"
                type="number"
              />
            </v-col>
            <v-col
              v-if="geometryData.class !== 'source' && is3d && geometryData.shape !== 'sphere'"
              cols="6"
            >
              <v-text-field
                v-model="contentGeometrDepth"
                outlined
                dense
                label="Depth"
                color="primary"
                type="number"
              />
            </v-col>
            <!-- <v-col cols="12" v-if="geometryData.class !== 'source'">
              <v-switch
                class="mt-0 pt-0"
                color="primary"
                dense
                label="Vincular altura e largura"
                value="red"
                hide-details
              ></v-switch>
            </v-col> -->
          </v-row>
        </v-col>
      </section>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "GeometryProperties",
  mounted(){
  }, 
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("simulator", ["geometryData", "dimensions"]),
    contentGeometrRadius: {
      get() {
        return Number(this.geometryData.radius.toFixed(3));
      },
      set(value) {
        this.setCurrentGeometryRadius(Number(value));
      },
    },
    contentGeometrWidth: {
      get() {
        return Number(this.geometryData.width.toFixed(3)) / (!this.is3d ? this.dimensions.relationship.x : 1);
      },
      set(value) {
        this.setCurrentGeometrySizeWidth(Number(value * (!this.is3d ? this.dimensions.relationship.x : 1)));
      },
    },
    contentGeometrHeight: { 
      get() {
        return Number(this.geometryData.height.toFixed(3)) / (!this.is3d ? this.dimensions.relationship.y : 1);
      },
      set(value) {
        this.setCurrentGeometrySizeHeight(Number(value * (!this.is3d ? this.dimensions.relationship.y : 1))) ;
      },
    },
    contentGeometrDepth: {
      get() {
        return Number(this.geometryData.depth.toFixed(3) / (!this.is3d ? this.dimensions.relationship.z : 1));
      },
      set(value) {
        this.setCurrentGeometrySizeDepth(Number(value * (!this.is3d ? this.dimensions.relationship.z : 1))) ;
      }
    }
  },
  methods: {
    ...mapActions("simulator", [
      "setCurrentGeometryRadius",
      "setCurrentGeometrySizeWidth",
      "setCurrentGeometrySizeHeight",
      "setCurrentGeometrySizeDepth"
    ]),
  },
};
</script>