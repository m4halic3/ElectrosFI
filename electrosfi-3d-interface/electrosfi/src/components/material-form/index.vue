<template>
  <div>
    <v-dialog v-model="materialFormLocal" max-width="600" scrollable>
      <v-card>
        <v-card-title class="headline">
          New Material
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p class="text-subtitle-1 pb-0 mb-1">
                Style
              </p>
              <p class="mt-0">
                Choose a colo to represent this material in the canvas.
              </p>
              <v-row>
                <v-col>
                  <p class="text-subtitle-1 mb-0 pb-0">
                    Description
                  </p>
                  <v-text-field
                    v-model="new_material.title"
                    label="Title"
                    hint="The title, to find this material"
                  />
                  <v-text-field
                    v-model="new_material.refraction_index"
                    label="Refractive Index"
                    hint="The epsilon of this material"
                    type="number"
                  />
                  <v-textarea
                    v-model="new_material.description"
                    name="input-7-1"
                    label="Description"
                    auto-grow
                    hint="Description of this material"
                    rows="1"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-color-picker v-model="new_material.color" />
            </v-col>
          </v-row>
          <v-row class="mt-0 pt-0">
            <v-col class="mt-0 pt-0 pb-0 mb-0">
              <p class="text-subtitle-1 pb-0 mb-0">
                Available
              </p>
              <v-row>
                <v-col cols="6">
                  <v-switch
                    v-model="new_material.public"
                    label="Public"
                    color="primary"
                  />
                  <p class="mt-0 pt-0 text-caption">
                    When leaving your material public, another's users will can
                    find and read about him
                  </p>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    v-model="new_material.reutilizable"
                    label="Reusable"
                    color="primary"
                  />
                  <p class="mt-0 pt-0 text-caption">
                    When you mark your material as reusable, another's users
                    will can use in they canvas scenes.
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="" text @click="setMaterialForm(false)">
            Cancel
          </v-btn>
          <v-btn color="primary" large @click="submitMaterialForm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import materials from "@/services/materials";
import firebase from "firebase";
export default {
  name: "MaterialForm",
  data: () => ({
    dialog: true,
    colors: "",
    new_material: {
      title: "",
      refraction_index: "",
      color: "",
      author: "",
      description: "",
      reutilizable: true,
      public: false
    }
  }),
  computed: {
    ...mapGetters("simulator", ["materialForm"]),
    materialFormLocal: {
      get() {
        return this.materialForm;
      },
      set(val) {
        this.setMaterialForm(val);
      }
    }
  },
  watch: {
    materialForm() {
      this.new_material = {
        title: "",
        refraction_index: "",
        color: "",
        author: "",
        description: "",
        reutilizable: true,
        public: false
      };
    }
  },
  methods: {
    ...mapActions("simulator", ["setMaterialForm", "setUserMaterials"]),
    submitMaterialForm: async function() {
      this.new_material.author = firebase.auth().currentUser.uid;
      try {
        this.new_material = {
          ...this.new_material,
          refraction_index: Number(this.new_material.refraction_index)
        };

        materials.post("/", this.new_material).then(() => {
          this.setMaterialForm(false);
          try {
            materials
              .get("/", {
                params: { author: window.firebase.auth().currentUser.uid }
              })
              .then(data => {
                this.setUserMaterials(data.data);
              });
          } catch (err) {
            return err.message;
          }
        });
      } catch (err) {
        return err.message;
      }
    }
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 5px;
  &:hover {
    width: 10px;
  }
}

::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb:hover {
  width: 10px;
  background: #555;
}
</style>
