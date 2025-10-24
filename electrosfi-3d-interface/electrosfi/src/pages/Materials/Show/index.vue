<template>
  <v-container>
    <v-breadcrumbs :items="items" color="white" />
    <v-card>
      <v-row>
        <v-col md="12">
          <v-card-title>{{ simulation.title }}</v-card-title>
          <v-card-subtitle class="mt-1">
            <span class="text-subtitle-2">Created:</span>
            <br />
            <span>{{ Date(simulation.create_date) }}</span>
          </v-card-subtitle>
          <v-card-text>
            <span class="text-subtitle-2">Descrição:</span>
            <br />
            {{ simulation.description }}
            <p class="text-subtitle-2 mt-5">Productions</p>
            <v-row>
              <v-col cols="4">
                <v-img :src="simulation.scene_simulation"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/api.js";
export default {
  name: "ShowSimulation",
  data: () => ({
    simulation: {},
    items: [
      {
        text: "Início",
        disabled: false,
        to: "/dashboard",
      },
      {
        text: "",
        disabled: true,
      },
    ],
  }),
  mounted: function () {
    this.getSimulation();
  },
  methods: {
    getSimulation: async function () {
      await api.get("/" + this.$route.params.key).then((response) => {
        this.simulation = response.data;
      });
    },
  },
};
</script>