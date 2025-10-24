<template>
  <v-container>
    <Loading :loading="loading" />
    <span v-if="!loading">
      <SimulationShowHeader :simulation="simulation" />
      <SimulationProductionsCard
        @updated="getSimulation"
        :simulation="simulation"
      />
      <SimulationGraphicCards :simulation="simulation" />
    </span>
  </v-container>
</template>
<script>
import api from "@/services/api.js";
import Loading from "@/components/Loading";
import Swal from "sweetalert2";
import SimulationGraphicCards from "@/components/SimulationGraphicCards";
import SimulationShowHeader from "@/components/SimulationShowHeader";
import SimulationProductionsCard from "@/components/SimulationProductionsCard";
export default {
  name: "ShowSimulation",
  components: {
    Loading,
    SimulationShowHeader,
    SimulationGraphicCards,
    SimulationProductionsCard
  },
  data: () => ({
    simulation: {},
    loading: true,
    charts: {},
    layout: {
      font: { size: 13 }
    },
    items: [
      {
        text: "Início",
        disabled: false,
        to: "/dashboard"
      },
      {
        text: "",
        disabled: true
      }
    ]
  }),
  created: async function() {
    await this.getSimulation();
    this.setPageInfo();
  },
  methods: {
    setPageInfo: function() {
      document.title = this.simulation.title + " - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute(
          "content",
          "Simulate and edit photonic tools online - ElectrosFI"
        );
    },
    getSimulation: async function() {
      try {
        const response = await api.get("/" + this.$route.params.key)
        this.simulation = response.data;
        this.loading = false;
    } catch (err) {
        Swal.fire({ title: "An Error Appears", text: err.message });
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>
