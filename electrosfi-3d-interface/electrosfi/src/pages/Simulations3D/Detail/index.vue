<template>
  <v-container v-if="production" class="animate__animated animate__fadeInUp">
    <DetailsProductHeader 
      :create_date="create_date" 
      :production="production" 
      :is3d="true" 
      :simulation="simulation"
    />
    <v-divider class="my-2"></v-divider>
    <p class="text-caption mb-2">Graphic Results</p>
    <v-row>
        <Details3DChartCard :simulationType="'2d'"/>
    </v-row>
    <v-row>
      <Details3DChartCard :simulationType="'3d'"/>
    </v-row>
      <v-row>
      <v-col>
        <p class="text-caption mb-0">Sources</p>
        <DetailsSourceCard
          v-for="source in simulation.sources"
          :key="source._id"
          :source="source"
          :is3d="true"
        />
      </v-col>
      <v-col>
        <p class="text-caption mb-0">Geometries</p>
        <DetailsGeometryCard
          v-for="geometry in simulation.geometries"
          :key="geometry._id"
          :geometry="geometry"
          :is3d="true"
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
import Swal from "sweetalert2";
import DetailsSourceCard from "@/components/DetailsSourceCard";
import DetailsGeometryCard from "@/components/DetailsGeometryCard";
import DetailsProductHeader from "@/components/DetailsProductHeader";
import Details3DChartCard from "@/components/Details3DChartCard";
import simulator3d from "@/services/simulator3d";
export default {
  name: "SimulationDetails",
  data: () => ({
    production: null,
    simulation: null,
    _id: null,
    create_date: null
  }),
  components: {
    DetailsGeometryCard,
    DetailsSourceCard,
    DetailsProductHeader,
    Details3DChartCard
  },
  methods: {
    fireError: message => {
      Swal.fire({ title: "An error occurred", text: message });
    },
    searchProductionFromSimulation: async function() {
      try {
        const { simulationID, productionID } = this.$route.params;
        const { data } = await simulator3d.get(simulationID);
        this.simulation = data;

        if (await data.error) throw new Error(await data.message);

        this.production = data.productions.find(
          production => production.content == productionID);

        this._id = await this.production._id;
        this.create_date = await this.production.create_date;

        await this.setPageInfo();
      } catch (err) {
        this.fireError(err.message);
      }
    },
    setPageInfo: function() {
      document.title = this.simulation.title + " - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute("content", this.simulation.title.description);
    }
  },
  mounted() {
    
    this.searchProductionFromSimulation();

  }
};
</script>
