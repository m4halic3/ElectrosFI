<template>
  <v-card
    :to="(is3d ? '/simulations3d/' : '/simulations/') + simulation._id"
    class="cardSimulation"
    rounded
    max-height="350"
  >
    <v-card-title>{{ simulation.title }}</v-card-title>
    <v-card-text>
      <p v-text="simulation.description"></p>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              color="faded"
              :to="(is3d ? '/simulator3d/' : '/simulator/') + simulation._id"
              elevation="0"
            >
              <v-icon left>mdi-pencil</v-icon>
              Editar
            </v-btn>
          </template>
          <span>Edit on simulator</span>
        </v-tooltip>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "SimulationCard",
  props: {
    is3d: { type: Boolean, default: false },
    simulation: { type: Object, default: Object }
  }
};
</script>
<style lang="scss">
.cardSimulation {
  box-shadow: 0 5px 20px -4px #00000052 !important;
  transition: box-shadow 0.25s ease, filter 0.25s ease;
  &:hover {
    box-shadow: 0 3px 20px -6px #00000052 !important;
    filter: brightness(0.95);
  }
}
</style>
