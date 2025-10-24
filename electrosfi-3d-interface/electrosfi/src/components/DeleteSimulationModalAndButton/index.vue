<template>
  <span>
    <v-btn
      :loading="loadingDelete && simulation._id == currentSimulation"
      :aria-selected="deleteModal"
      @click="openDeleteModal(simulation._id)"
      elevation="0"
      class="ma-1"
      x-small
    >
      <v-icon left x-small>mdi-delete</v-icon>
      Delete
    </v-btn>
    <v-dialog v-model="deleteModal" max-width="400">
      <v-card>
        <v-img src="/img/illustrations/question.svg"></v-img>
        <v-card-title
          ><h3 class="text-center">
            Delete this simulation?
          </h3></v-card-title
        >
        <v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-row dense>
              <v-col>
                <v-btn
                  block
                  x-large
                  @click="deleteModal = false"
                  color="primary"
                >
                  <v-icon left>mdi-close</v-icon> Cancel</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  :loading="loadingDelete"
                  color="red darken-4"
                  dark
                  x-large
                  block
                  @click="handleDeleteSimulation"
                >
                  <v-icon left>mdi-delete</v-icon> Confirm</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import simulator3d from "@/services/simulator3d";
export default {
  name: "DeleteSimulationModalAndButton",
  data: () => ({
    deleteModal: false,
    loadingDelete: false
  }),
  props: {
    simulation: { type: Object, default: Object },
    production: { type: Boolean, default: false },
    productionID: { type: String, default: "" }
  },
  methods: {
    openDeleteModal: function(simulacao) {
      this.currentSimulation = simulacao;
      this.deleteModal = true;
    },
    redirectToDashboard() {
      this.$router.push("/dashboard");
    },
    redirectToSimulation() {
      this.$router.go(`/simulations/${this.currentSimulation}`);
    },
    deleteSimulation: function() {
      try {
        this.loadingDelete = true;
        api
          .delete(this.currentSimulation)
          .then(() => {
            this.currentSimulation = "";
            this.$emit("deleted");
          })
          .then(() => {
            this.loadingDelete = false;
            this.deleteModal = false;
            this.redirectToDashboard();
          });
      } catch (err) {
        Swal.fire({ title: "An error occurred", text: err.message });
      }
    },
    delete3dSimulation: function() {
      try {
        this.loadingDelete = true;
        simulator3d
          .delete(this.currentSimulation)
          .then(() => {
            this.currentSimulation = "";
            this.$emit("deleted");
          })
          .then(() => {
            this.loadingDelete = false;
            this.deleteModal = false;
            this.redirectToDashboard();
          });
      } catch (err) {
        Swal.fire({ title: "An error occurred", text: err.message });
      }
    },
    deleteProduction: function() {
      try {
        this.loadingDelete = true;
        const url = `${this.currentSimulation}/productions/${this.productionID}`;
        api
          .delete(url)
          .then(({ data }) => {
            if (data.error) throw new Error(data.message);
            this.currentSimulation = "";
            this.$emit("deleted");
          })
          .catch(err => {
            Swal.fire({ title: "An error occurred", text: err.message });
          });
      } catch (err) {
        Swal.fire({ title: "An error occurred", text: err.message });
      } finally {
        this.deleteModal = false;
      }
    },

    handleDeleteSimulation: function() {
      if (this.production) {
        this.deleteProduction();
      } else {
        this.deleteSimulation();
        this.delete3dSimulation();
      }
    }
  }
};
</script>
