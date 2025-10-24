<template>
  <div id="RightNavSimulator" class="theme-background">
    <v-tabs v-model="tab" flat fixed-tabs active-class="active" center-active>
      <v-tab
        :class="selectedToken === '' ? 'active' : ''"
        @click="setSelectedTokenAction('')"
      >
        Cell
      </v-tab>
      <v-tab
        :disabled="
          typeof geometryData == 'undefined' ||
            geometryData.class !== 'geometry'
        "
      >
        Geometry
      </v-tab>
      <v-tab
        :disabled="
          typeof geometryData == 'undefined' || geometryData.class !== 'source'
        "
      >
        Sources
      </v-tab>
      <v-tab
        :disabled="
          typeof geometryData == 'undefined' || geometryData.class !== 'flux'
        "
      >
        Flux
      </v-tab>
    </v-tabs>
    <v-expansion-panels multiple accordion :value="[0, 1, 2, 3, 4]" mandatory>
      <CellProperties />
      <Dimensions :is3d="is3d"/>
      <Position :is3d="is3d"/>
      <FluxParameters />
      <SourceProperties />
      <Material />
      <Fill />
    </v-expansion-panels>
    <PlotOptions :is3d="is3d"/>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "",
  components: {
    FluxParameters: () =>
      import("@/components/RightNavSimulatorFluxParameters"),
    CellProperties: () =>
      import("@/components/RightNavSimulatorCellProperties"),
    Dimensions: () => import("@/components/RightNavSimulatorDimensions"),
    Position: () => import("@/components/RightNavSimulatorPosition"),
    SourceProperties: () =>
      import("@/components/RightNavSimulatorSourceProperties"),
    Material: () => import("@/components/RightNavSimulatorMaterial"),
    PlotOptions: () => import("@/components/RunSimulationPlotOptions"),
    Fill: () => import("@/components/RightNavSimulatorFill")
  },
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tab: 0
    };
  },
  computed: {
    ...mapGetters("simulator", ["geometryData", "selectedToken"])
  },
  watch: {
    geometryData: function() {
      if (typeof this.geometryData === "undefined") {
        this.tab = 0;
        return;
      }

      if (this.geometryData.class == "geometry") {
        this.tab = 1;
      } else if (this.geometryData.class == "source") {
        this.tab = 2;
      } else if (this.geometryData.class == "") {
        this.tab = 0;
      }
    }
  },
  methods: {
    ...mapActions("simulator", ["setSelectedTokenAction"])
  }
};
</script>
<style lang="scss">
@import "./syles.scss";
</style>
