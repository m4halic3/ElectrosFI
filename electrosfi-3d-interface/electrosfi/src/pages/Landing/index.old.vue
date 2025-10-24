<template>
  <div id="landing">
    <v-container>
      <v-row align="center">
        <v-col
          md="6"
          justify-md="center"
          align="center"
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-img
              id="img-logo"
              class="mx-auto"
              mx="auto"
              src="../../assets/images/logo-branco.png"
            />
          </v-row>
          <v-row>
            <v-col>
              <p>Electric Simulator Federal Institute</p>
            </v-col>
          </v-row>
          <v-row
            dense
            class="mt-sm-0"
            justify="center"
          >
            <v-col cols="6">
              <router-link
                to="/sobre"
                class="btn-landing btn ma-md-2"
              >
                <img
                  src="../../assets/images/code-white.svg"
                  alt
                >
                <strong>Como Funciona?</strong>
              </router-link>
            </v-col>
            <v-col cols="6">
              <router-link
                to="/login"
                class="btn-landing-accent btn ma-md-2"
              >
                <img
                  src="../../assets/images/chart-white.svg"
                  alt
                >
                <strong>Começar a usar</strong>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-row
            class="mt-15"
            justify="center"
            justify-md="start"
            align="center"
          >
            <v-img
              id="img-servidor"
              alt="Servidor de funcionamento"
              src="../../assets/images/undraw_server_cluster_jwwq.svg"
            />
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-row
            id="logo-footer"
            justify="center"
            align="center"
            class="mt-10"
          >
            <v-img
              alt="Logo IFSP"
              max-width="150px"
              class="ma-2"
              src="../../assets/images/logo-ifsp.svg"
            />
            <v-img
              alt="Logo Fapesp"
              max-width="150px"
              class="ma-2"
              src="../../assets/images/logo-fapesp.svg"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Landing"
};
</script>
<style scoped lang="scss">
@import "./styles.scss";
</style>