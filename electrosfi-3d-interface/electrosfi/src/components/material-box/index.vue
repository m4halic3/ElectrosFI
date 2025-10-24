<template>
  <span>
    <v-col>
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-text-field
            v-model="searchMaterialTitle"
            class
            label="Search Material"
          />
        </v-col>

        <v-col cols="2">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                small
                fab
                link
                color="primary"
                v-on="on"
                @click="setMaterialForm(true)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add Material</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>

    <v-list
      two-line
      color="theme-background"
      class="mt-0 pt-0"
      max-height="300px"
      style="overflow-y:scroll"
    >
      <template
        v-for="(item, index) in getUserMaterials.filter(
          item =>
            item.title
              .trim()
              .toLowerCase()
              .indexOf(searchMaterialTitle) !== -1 ||
            item.description
              .trim()
              .toLowerCase()
              .indexOf(searchMaterialTitle) !== -1
        )"
      >
        <v-list-item
          :key="item._id"
          link
          @click="setMaterialOfCurrentGeometry(item)"
        >
          <v-list-item-avatar :color="item.color">
            <span class="white--text headline">{{ item.title[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title" />
            <v-list-item-subtitle v-html="item.description" />
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="item._id + index" inset />
      </template>
    </v-list>
  </span>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import materials from "@/services/materials";
export default {
  name: "MaterialBox",
  computed: {
    ...mapGetters("simulator", ["getUserMaterials"])
  },
  methods: {
    ...mapActions("simulator", [
      "setMaterialForm",
      "setUserMaterials",
      "setMaterialOfCurrentGeometry"
    ])
  },
  data: () => ({
    searchMaterialTitle: ""
  }),
  mounted() {
    materials
      .get("/", {
        params: {
          author: window.firebase.auth().currentUser.uid
        }
      })
      .then(data => {
        this.setUserMaterials(data.data);
      });
  }
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
