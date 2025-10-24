<template>
  <v-expansion-panel v-if="typeof geometryData !== 'undefined' && geometryData.class === 'geometry'">
    <v-expansion-panel-header>Fill</v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
        <p class="text-caption">
          Put a geometric fill in this geometry. The material properties for the
          geometric Fill will be configured.
        </p>
        <v-btn
          color="primary"
          block
          large
          link
          @click="set_showMiniCanvas(true)"
        >
          Add Fill
        </v-btn>
      </div>
    </v-expansion-panel-content>
    <MiniCanvasDialog />
  </v-expansion-panel>
</template>
<script>
//Right Nav Simulator Fill
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Fill",
  components: {
    MiniCanvasDialog: () => import("@/components/MiniCanvasDialog"),
  },
  computed:{
    ...mapGetters("simulator", ["geometryData"])
  },
  data: () => ({
    showFillOptions: true,
  }),
  methods: {
    ...mapActions("simulator", ["set_showMiniCanvas"]),
    // @vuese
    // Used to manually clear the form
    showFillOptionsDialog: function () {
      this.showFillOptions = true;
    },
  },
};
</script>
<style>
#stageAddFill {
  background: white;
}
</style>