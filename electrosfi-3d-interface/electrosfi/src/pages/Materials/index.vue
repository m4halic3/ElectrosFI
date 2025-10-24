<template>
  <v-container class="mt-10">
    <v-row>
      <v-col>
        <p class="text-h4">Your Materials</p>
        <p class="subtitle">
          Edit, Share and View materials that was created and used at the
          simulations
        </p>
      </v-col>
    </v-row>
    <v-row v-if="materials.length < 1" justify="center">
      <v-col cols="4 text-center">
        <img
          src="/img/illustrations/folder.svg"
          width="120"
          class="mb-3"
          alt=""
        />
        <p>You no have materials</p>
        <v-btn to="/simulator" class="mt-2" large link color="primary">
          Create a Material in Your simulations
        </v-btn>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col md="4" lg="3" v-for="material in materials" :key="material.id">
          <v-card
            :style="
              `background: linear-gradient(180deg, rgba(0,0,0,.5) -90%, ${material.color} 100%);`
            "
            min-height="200px"
            max-height="500px"
            :color="material.color"
          >
            <v-card-title class="white--text">{{
              material.title
            }}</v-card-title>
            <v-card-text>
              <p class="white--text">{{ material.description }}</p>
              <p class="white--text">
                <b>Refraction Index:</b> {{ material.refraction_index }}
              </p>
              <v-card-actions>
                <v-row>
                  <v-col>
                    <v-btn
                      block
                      elevation="0"
                      color="transparent"
                      dark
                      @click="deleteMaterial(material._id)"
                    >
                      <v-icon left>mdi-delete</v-icon> Delete
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
        <v-dialog max-width="400" v-model="deleteModal">
          <v-card>
            <v-card-title>Do you wont delete this material?</v-card-title>
            <v-card-text>
              <v-card-actions>
                <v-btn link @click="confirmDeleteModal">Yes</v-btn>
                <v-btn color="primary" @click="deleteModal = false">No</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import materials from "@/services/materials.js";
import { mapGetters } from "vuex";
export default {
  name: "Materials",
  data: () => ({
    materials: [],
    editedIndex: null,
    dialog: false,
    loading: true,
    deleteModal: false,
    currentMaterial: ""
  }),
  watch: {
    editedIndex: function() {
      this.dialog = !this.dialog;
    }
  },
  mounted: function() {
    this.getData();
    this.setPageInfo();
  },
  computed: {
    ...mapGetters("simulator", ["author"])
  },
  methods: {
    setPageInfo: function() {
      document.title = "Your materials - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute(
          "content",
          "Simulate and edit photonic tools online - ElectrosFI"
        );
    },
    deleteMaterial: function(content) {
      this.currentMaterial = content;
      this.deleteModal = true;
    },
    confirmDeleteModal: async function() {
      const self = this;
      await materials.delete(this.currentMaterial).then(response => {
        if (response.statusText == "OK") {
          self.currentMaterial = "";
          self.deleteModal = false;
          self.getData();
        }
      });
    },
    getData: async function() {
      const self = this;
      await materials.get().then(response => {
        this.materials = response.data;
        var simulacoesLocais = [];
        response.data.forEach(element => {
          if (element.author == self.author) {
            simulacoesLocais.push(element);
          }
        });
        this.materials = simulacoesLocais;
        this.loading = false;
      });
    }
  }
};
</script>
<style>
#loading {
  height: 100vh;
}
</style>
