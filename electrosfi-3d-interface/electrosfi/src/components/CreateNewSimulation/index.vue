<template>
  <div class="CreateNewSimulation">
    <template>
      <v-btn
        :loading="dialog"
        @click="dialog = true"
        elevation="0"
        class="elevation-0"
        color="primary"
        @onHover="textButton = 'New Simulation'"
      >
        <v-icon dark> {{ is3d ? "mdi-cube-outline" : "mdi-square-outline" }} </v-icon>
        {{ textButton }}
      </v-btn>
    </template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-center">
          <v-spacer></v-spacer>
          <v-img
            max-width="300"
            class="mb-3 mt-5 m-auto"
            src="/img/illustrations/files.svg"
          ></v-img>
          <v-spacer></v-spacer>
          <h2 class="text-center mx-auto">Create New Simulation</h2>
          <p class="mx-auto">This form is the start to you simulation view</p>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="title"
                outlined
                label="Title of Simulation"
              ></v-text-field>
              <v-text-field
                v-model="description"
                outlined
                label="Description of Simulation"
              ></v-text-field>
              <v-text-field
                outlined
                type="number"
                v-model="until"
                label="Until"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                outlined
                v-model="coordinates.x"
                label="x"
                type="number"
              ></v-text-field>
              <v-text-field
                outlined
                type="number"
                v-model="coordinates.y"
                label="y"
              ></v-text-field>
              <v-text-field
                outlined
                type="number"
                v-model="resolution"
                label="resolution"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row dense>
              <v-col>
                <v-btn x-large block @click="dialog = false">
                  <v-icon left>mdi-close</v-icon>
                  Cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn v-if="is3d"
                  x-large
                  block
                  :loading="loading"
                  color="primary"
                  @click="createNewSimulation3d"
                >
                
                  <v-icon left>mdi-plus</v-icon>
                  Create Simulation 3d
                </v-btn>
                <v-btn v-else
                  x-large
                  block
                  :loading="loading"
                  color="primary"
                  @click="createNewSimulation"
                >
                
                  <v-icon left>mdi-plus</v-icon>
                  Create Simulation
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import api from "@/services/api";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import simulator3d from "@/services/simulator3d";

export default {
  name: "CreateNewSimulation",
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    title: "Untitled simulation",
    description: "Untitled Simulation Description",
    coordinates: {
      x: 16,
      y: 16,
      z: 0
    },
    resolution: 10,
    geometries: [],
    sources: [],
    default_material: 1,
    loading: false,
    scene_design:
      "https://satemrj.com.br/site/wp-content/plugins/penci-soledad-amp/assets/images/no-thumb.jpg",
    scene_simulation:
      "https://satemrj.com.br/site/wp-content/plugins/penci-soledad-amp/assets/images/no-thumb.jpg",
    plotOptions: {
      until: 20
    },
    textButton: ""
  }),
  mounted() {
    console.log(this.author);
    
  },
  methods: {
    createNewSimulation: function() {
      this.loading = true;
      var {
        title,
        author,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        geometries,
        sources,
        coordinates,
        plotOptions
      } = this;

      // console.log({
      //   title,
      //   author,
      //   resolution,
      //   description,
      //   scene_design,
      //   scene_simulation,
      //   default_material,
      //   geometries,
      //   sources,
      //   coordinates,
      //   plotOptions
      // });

      api
        .post("/", {
          title,
          description,
          coordinates,
          resolution,
          geometries,
          sources,
          scene_design,
          scene_simulation,
          author,
          default_material,
          plotOptions,
          until: plotOptions.until
        })
        .then(({ data: { err, _id } }) => {
          if (err) {
            Swal.fire({ title: "An error Appears!", text: err });
            return;
          }

          this.$router.push("/simulator/" + _id);
        });
    },
    createNewSimulation3d: function() {
      this.loading = true;
      var {
        title,
        author,
        resolution,
        description,
        scene_design,
        scene_simulation,
        default_material,
        geometries,
        sources,
        // coordinates,
        // plotOptions
      } = this;

      // console.log({
      //   title,
      //   author,
      //   resolution,
      //   description,
      //   scene_design,
      //   scene_simulation,
      //   default_material,
      //   geometries,
      //   sources,
      //   // coordinates,
      //   // plotOptions
      // });

      simulator3d
        .post("/", {
          title,
          description,
          // coordinates,
          resolution,
          geometries,
          sources,
          scene_design,
          scene_simulation,
          author,
          default_material,
          // plotOptions,
          // until: plotOptions.until
        })
        .then(({ data: { err, _id } }) => {
          if (err) {
            Swal.fire({ title: "An error Appears!", text: err });
            return;
          }

          this.$router.push("/simulator3d/" + _id);
        });
    }
  },
  computed: {
    ...mapGetters("simulator", ["author"]),
    until: {
      get() {
        return this.plotOptions.until;
      },
      set(v) {
        this.plotOptions.until = v;
      }
    }
  }
};
</script>
<style>
.CreateNewSimulation {
  margin-right: 1rem;
}

</style>
