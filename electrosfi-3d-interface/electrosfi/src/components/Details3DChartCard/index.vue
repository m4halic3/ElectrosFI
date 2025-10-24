<template>
  <v-card class="simulation-image">
    <v-img 
      :src="imageUrl"
    />
  </v-card>
</template>
<script>
import ngsolve from "@/services/ngsolve";
import Swal from "sweetalert2";
export default {
  name: "DetailsChartCard",
  props: {
    simulationType: String
  },
  data() {
    return {
      imageUrl: null
    }
  },
  methods: {
    async getImage() {
      const { simulationID, productionID } = this.$route.params;
      try {
          const response = await ngsolve.get(`/simulate/${simulationID}/${productionID}/${this.simulationType}`, {
            responseType: 'blob',
          });

          this.imageUrl = URL.createObjectURL(new Blob([response.data]));
        } catch (err) {
          Swal.fire(err.message)
        }
    }
  },
  mounted() {
    this.getImage();
  },
};
</script>
<style>

.simulation-image {
  padding: 2.5rem;
  margin: 1rem 0;
}
</style>
