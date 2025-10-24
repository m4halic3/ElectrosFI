<template>
  <div id="PreviewSimulationModal">
    <v-dialog v-model="viewSimulationLocal" max-width="600" scrollable>
      <v-card color="background-dark">
        <v-card-title>
          <v-img src="/img/illustrations/in_progress.svg" alt=""></v-img>
          <h2 class="text-center mx-auto mt-5">
            Your simulations is complete
          </h2>
          <p class="text-center mx-auto">
            When complete, a notification will alert you
          </p>
        </v-card-title>
        <v-card-text class="pt-1">
          <v-row>
            <v-col cols="6">
              <v-btn
                block
                color="secondary"
                @click="setViewSimulation(false)"
                dense
                large
                >Continue here</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                block
                color="primary"
                dense
                large
                target="_blank"
                :to="(is3d ? '/simulations3d/' : '/simulations/') + this.id"
                >View Results</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PreviewSimulationModal",
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions("simulator", ["setViewSimulation", "openPlotOptions"]),
    redirectToResults() {
      this.setViewSimulation(false);
      this.openPlotOptions(false);
      this.$router.push(``);
    }
  },
  watch: {},
  computed: {
    ...mapGetters("simulator", [
      "view_simulation",
      "id",
      "scene_simulation",
      "scene_design",
      "movie",
      "id",
      "author"
    ]),
    movieLocal: function() {
      return (
        "https://electrosfi.itp.ifsp.edu.br/meep/video/" +
        this.author +
        "/" +
        this.id +
        "/" +
        this.movie.replace(/\s/g, "%20")
      );
    },
    viewSimulationLocal: {
      get() {
        return this.view_simulation;
      },
      set(val) {
        this.setViewSimulation(val);
      }
    }
  },
  mounted: function() {}
};
</script>
