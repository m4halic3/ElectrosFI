<template>
  <v-expansion-panel
    v-if="
      typeof geometryData !== 'undefined' && geometryData.class === 'source'
    "
  >
    <v-expansion-panel-header>Source Properties</v-expansion-panel-header>
    <v-expansion-panel-content>
      <section class="item-body">
        <v-col>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrWaveLength"
                outlined
                dense
                type="number"
                label="WaveLength"
                color="primary"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrWaveWidth"
                outlined
                dense
                type="number"
                label="Wave Width"
                color="primary"
              />
            </v-col>
          </v-row>
          <div class="text-caption mb-2 mt-0">
            Wave Size:
          </div>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrWaveSizeX"
                outlined
                dense
                label="X"
                color="primary"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrWaveSizeY"
                outlined
                dense
                label="Y"
                color="primary"
              />
            </v-col>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="contentGeometrIntegrated"
                  dense
                  class="ma-0"
                  label="Is Integrated to PML Layer"
                />
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </section>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SourceProperties",
  methods: {
    ...mapActions("simulator", [
      "setCurrentGeometryWaveLength",
      "setCurrentGeometryWaveWidth",
      "setCurrentGeometryWaveSize",
      "setCurrentGeometryFrequency",
      "setCurrentGeometryIntegrated"
    ])
  },
  computed: {
    ...mapGetters("simulator", ["geometryData"]),
    contentGeometrWaveLength: {
      get() {
        return this.geometryData.waveLength;
      },
      set(value) {
        this.setCurrentGeometryWaveLength(Number(value));
      }
    },
    contentGeometrWaveWidth: {
      get() {
        return this.geometryData.waveWidth;
      },
      set(value) {
        this.setCurrentGeometryWaveWidth(Number(value));
      }
    },
    contentGeometrWaveSizeX: {
      get() {
        return this.geometryData.waveSize[0];
      },
      set(value) {
        this.setCurrentGeometryWaveSize([
          Number(value),
          this.geometryData.waveSize[1]
        ]);
      }
    },
    contentGeometrWaveSizeY: {
      get() {
        return this.geometryData.waveSize[1];
      },
      set(value) {
        this.setCurrentGeometryWaveSize([
          this.geometryData.waveSize[0],
          Number(value)
        ]);
      }
    },
    contentGeometrFrequency: {
      get() {
        return this.geometryData.frequency;
      },
      set(value) {
        this.setCurrentGeometryFrequency(Number(value));
      }
    },
    contentGeometrIntegrated: {
      get() {
        return this.geometryData.integrated;
      },
      set(value) {
        this.setCurrentGeometryIntegrated(value ? 1 : 0);
      }
    }
  }
};
</script>
