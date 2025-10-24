<template>
  <v-expansion-panel
    v-if="typeof geometryData !== 'undefined' && geometryData.class === 'flux'"
  >
    <v-expansion-panel-header>Output</v-expansion-panel-header>
    <v-expansion-panel-content>
      <section class="item-body">
        <ModalFluxSettings />
      </section>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ModalFluxSettings from "@/components/ModalFluxSettings";
export default {
  data() {
    return {};
  },
  props: {},
  components: {
    ModalFluxSettings,
  },
  name: "FluxParameters",
  methods: {
    ...mapActions("simulator", [
      "setCurrentGeometryWaveLength",
      "setCurrentGeometryWaveWidth",
      "setCurrentGeometryWaveSize",
      "setCurrentGeometryFrequency",
      "setCurrentGeometryIntegrated",
    ]),
  },
  computed: {
    ...mapGetters("simulator", ["geometryData"]),
    contentGeometrWaveLength: {
      get() {
        return this.geometryData.waveLength;
      },
      set(value) {
        this.setCurrentGeometryWaveLength(Number(value));
      },
    },
    contentGeometrWaveWidth: {
      get() {
        return this.geometryData.waveWidth;
      },
      set(value) {
        this.setCurrentGeometryWaveWidth(Number(value));
      },
    },
    contentGeometrWaveSizeX: {
      get() {
        return this.geometryData.waveSize[0];
      },
      set(value) {
        this.setCurrentGeometryWaveSize([
          Number(value),
          this.geometryData.waveSize[1],
        ]);
      },
    },
    contentGeometrWaveSizeY: {
      get() {
        return this.geometryData.waveSize[1];
      },
      set(value) {
        this.setCurrentGeometryWaveSize([
          this.geometryData.waveSize[0],
          Number(value),
        ]);
      },
    },
    contentGeometrFrequency: {
      get() {
        return this.geometryData.frequency;
      },
      set(value) {
        this.setCurrentGeometryFrequency(Number(value));
      },
    },
    contentGeometrIntegrated: {
      get() {
        return this.geometryData.integrated;
      },
      set(value) {
        this.setCurrentGeometryIntegrated(value ? 1 : 0);
      },
    },
  },
};
</script>