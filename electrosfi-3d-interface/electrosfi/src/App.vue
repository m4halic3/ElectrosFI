<template>
  <v-app id="inspire">
    <router-view />
    <ErrorAlert />
  </v-app>
</template>

<script>
import ErrorAlert from "@/components/ErrorAlert";
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    ErrorAlert
  },
  methods: {
    verifyTemplateMode: function() {
      const userChoiceToMode = localStorage.getItem("NOCTURNE_MODE_ELECTROSFI");
      this.$vuetify.theme.dark = userChoiceToMode === "true" ? true : false;
      const userPrimaryColorChoice = localStorage.getItem(
        "PRIMARY_COLOR_ELECTROSFI"
      );

      if (userPrimaryColorChoice) {
        this.$vuetify.theme.themes.dark.primary = userPrimaryColorChoice;
        this.$vuetify.theme.themes.light.primary = userPrimaryColorChoice;
      } else {
        this.$vuetify.theme.themes.dark.primary = "#3eb772";
        this.$vuetify.theme.themes.light.primary = "#3eb772";
      }
    },
    ...mapActions("simulator", ["setAuthor"]),
    defineCurrentUserAuthorID() {
      try{
        // console.log(firebase.auth().currentUser.uid);
        this.setAuthor(firebase.auth().currentUser.uid);
      }catch(err){
        console.error(err.message);
      }
    }
  },
  mounted() {
    if (firebase.auth().currentUser) {
      this.verifyTemplateMode();
      this.defineCurrentUserAuthorID();
    }
  }
};
</script>
<style lang="scss">
@import "./assets/sass/global.scss";
</style>
