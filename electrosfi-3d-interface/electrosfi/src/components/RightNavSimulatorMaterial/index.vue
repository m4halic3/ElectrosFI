<template>
  <v-expansion-panel
    v-if="
      (typeof geometryData === 'undefined' && !expansion) ||
        (geometryData.class === 'geometry' && !expansion)
    "
  >
    <material-form />
    <v-expansion-panel-header>Material</v-expansion-panel-header>
    <v-expansion-panel-content>
      <material-box />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Material",
  components: {
    "material-box": () => import("@/components/material-box"),
    "material-form": () => import("@/components/material-form")
  },
  props: {
    expansion: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("simulator", ["geometryData", "cell"])
  }
};
</script>
