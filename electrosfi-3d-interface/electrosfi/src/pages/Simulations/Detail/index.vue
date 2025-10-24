<template>
  <v-container v-if="production" class="animate__animated animate__fadeInUp">
    <DetailsProductHeader :create_date="create_date" :production="production" />
    <v-divider class="my-2"></v-divider>
    <p class="text-caption mb-2">Graphic Results</p>
    <v-row>
      <v-col
        v-for="chart in production.charts"
        cols="12"
        md="6"
        :key="chart._id"
      >
        <DetailsChartCard :chart="chart" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="text-caption mb-0">Sources</p>
        <DetailsSourceCard
          v-for="source in production.SourcesList"
          :key="source._id"
          :source="source"
        />
      </v-col>
      <v-col>
        <p class="text-caption mb-0">Geometries</p>
        <DetailsGeometryCard
          v-for="geometry in production.GeometryList"
          :key="geometry._id"
          :geometry="geometry"
        />
      </v-col>
    </v-row>
  </v-container>
  <div class="containerLoading" v-else>
    <v-row justify="center" align="center" class="fill-height">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </div>
</template>
<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import DetailsSourceCard from "@/components/DetailsSourceCard";
import DetailsGeometryCard from "@/components/DetailsGeometryCard";
import DetailsProductHeader from "@/components/DetailsProductHeader";
import DetailsChartCard from "@/components/DetailsChartCard";
export default {
  name: "SimulationDetails",
  data: () => ({
    production: null,
    _id: null,
    create_date: null
  }),
  components: {
    DetailsGeometryCard,
    DetailsSourceCard,
    DetailsProductHeader,
    DetailsChartCard
  },
  methods: {
    fireError: message => {
      Swal.fire({ title: "An error occurred", text: message });
    },
    searchProductionFromSimulation: async function() {
      try {
        const { simulationID, productionID } = this.$route.params;
        const url = `/${simulationID}/productions/${productionID}`;
        const { data } = await api.get(url);

        if (await data.error) throw new Error(await data.message);
        this.production = JSON.parse(await data.productions[0].content);
        this._id = await data.productions[0]._id;
        this.create_date = await data.productions[0].create_date;
        this.setPageInfo();
      } catch (err) {
        this.fireError(err.message);
      }
    },
    setPageInfo: function() {
      document.title = this.production.title + " - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute("content", this.production.title.description);
    }
  },
  mounted() {
    this.searchProductionFromSimulation();
  }
};
</script>
<style>
.containerLoading {
  height: 100%;
}
</style>
