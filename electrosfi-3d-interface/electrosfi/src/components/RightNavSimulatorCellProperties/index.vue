<template>
  <v-expansion-panel v-if="selectedToken === ''" class="PlanProperties pa-0">
    <v-expansion-panel-header>Cell Properties</v-expansion-panel-header>
    <v-expansion-panel-content class="pa-0">
      <v-col cols="12" class="pa-0">
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="cellTitle"
              outlined
              placeholder="1"
              label="Title"
              hint="To find this simulation later"
              color="primary"
              type="text"
              dense
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cellDescription"
              outlined
              placeholder="1"
              label="Description"
              hint="To understand this simulation"
              color="primary"
              dense
              type="text"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="cellResolution"
              outlined
              dense
              placeholder="1"
              hint="Resolution of simulation"
              label="Resolution"
              color="primary"
              type="number"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="cellUntil"
              outlined
              placeholder="1"
              label="Until"
              dense
              hint="Time of simulation"
              color="primary"
              type="number"
            />
          </v-col>
          <v-row dense>
            <v-col cols="4">
              <v-text-field
                v-model="coordinatesX"
                outlined
                placeholder="1"
                dense
                label="X Axis Size"
                hint="First param to the Vector3 size"
                color="primary"
                type="number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="coordinatesY"
                outlined
                placeholder="1"
                dense
                label="Y Axis Size"
                hint="Second param to the Vector3 size"
                color="primary"
                type="number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="coordinatesZ"
                outlined
                placeholder="0"
                disabled
                dense
                label="Z Axis Size"
                hint="Third param to the Vector3 size"
                color="primary"
                type="number"
              />
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-text-field
              v-model="cellPMLThickness"
              outlined
              placeholder="1"
              label="Thickness"
              dense
              hint="Perfect Matched Layer Thickness"
              color="primary"
              type="number"
            />
          </v-col>
        </v-row>
        <v-btn block color="primary" @click="openPlotOptions(true)">
          Run Simulation
        </v-btn>
      </v-col>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CellProperties",
  computed: {
    ...mapGetters("simulator", [
      "selectedToken",
      "coordinates",
      "title",
      "description",
      "resolution",
      "until",
      "pmlThickness",
      "cell"
    ]),
    cellTitle: {
      get() {
        return this.title;
      },
      set(value) {
        this.setTitle(value);
      }
    },
    cellDescription: {
      get() {
        return this.description;
      },
      set(value) {
        this.setDescription(value);
      }
    },
    cellUntil: {
      get() {
        return this.until;
      },
      set(value) {
        this.setUntil(value);
      }
    },
    cellResolution: {
      get() {
        return this.resolution;
      },
      set(value) {
        this.setResolution(value);
      }
    },
    cellPMLThickness: {
      get() {
        return this.pmlThickness;
      },
      set(value) {
        this.setPMLThickness(Number(value));
      }
    },
    coordinatesX: {
      get() {
        return Number(this.coordinates.x);
      },
      set(value) {
        this.setCoordinates({
          y: Number(this.coordinates.y),
          z: Number(this.coordinates.z),
          x: Number(value)
        });
      }
    },
    coordinatesY: {
      get() {
        return Number(this.coordinates.y);
      },
      set(value) {
        this.setCoordinates({
          x: Number(this.coordinates.x),
          z: Number(this.coordinates.z),
          y: Number(value)
        });
      }
    },
    coordinatesZ: {
      get() {
        return Number(this.coordinates.z);
      },
      set(value) {
        this.setCoordinates({
          x: Number(this.coordinates.x),
          y: Number(this.coordinates.y),
          z: Number(value)
        });
      }
    }
  },
  methods: {
    ...mapActions("simulator", [
      "setPMLThickness",
      "setTitle",
      "setDescription",
      "setResolution",
      "setUntil",
      "setCoordinates",
      "openPlotOptions"
    ])
  }
};
</script>
