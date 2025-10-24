<template>
  <v-app id="inspire">
    <AppBar v-if="user" />
    <v-main class="pt-20 mt-20">
      <router-view class="animate__animated  animate__fadeInLeft" />
    </v-main>
  </v-app>
</template>
<script>
import AppBar from "@/components/AppBar";
import { mapActions } from "vuex";
import firebase from "firebase";
export default {
  name: "Dashboard",
  components: {
    AppBar
  },
  data: () => ({
    user: null,
    simulacao: false
  }),
  mounted() {
    this.getUser();
  },
  computed: {},
  methods: {
    ...mapActions("simulator", ["setAuthor"]),
    redirecionar: function() {
      this.simulacao = false;
      this.$router.replace("/minhas_simulacoes");
    },
    SimulacaoLoaded: function() {
      this.simulacao = true;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    getUser: async function() {
      this.user = await firebase.auth().currentUser;
      if (this.user) {
        this.setAuthor(this.user.uid);
      }
    },
    share: function() {
      if (navigator.share !== undefined) {
        navigator
          .share({
            title: "ElectroSFI",
            text:
              "Um ambiente de desenho online para simulação de cenários ópticos, fotônicos e eletromagnéticos ",
            url: "https://drawing-5bd9c.firebaseapp.com/"
          })
          .then()
          .catch();
      }
    }
  }
};
</script>
<style lang="scss">
#inspire {
  font-family: "Poppins", sans-serif;
}
</style>
