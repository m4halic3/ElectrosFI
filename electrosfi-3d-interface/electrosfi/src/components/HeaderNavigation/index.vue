<template>
  <v-row
    id="header-content-row"
    justify="center"
  >
    <v-col
      id="header-content-column"
      cols="12"
      md="7"
    >
      <header>
        <v-row
          id="header-navigation"
          justify="space-between"
        >
          <router-link to="/">
            <img
              src="../../assets/images/arrow-left-white.svg"
              alt="voltar"
            >
          </router-link>
          <img
            src="../../assets/images/logo-branco.png"
            alt="inicio"
            class="header-logo-white"
          >
        </v-row>
        <v-row>
          <v-col id="header-text">
            <p class="header-title">
              {{ title }}
            </p>
            <p class="header-subtitle">
              {{ subtitle }}
            </p>
          </v-col>
        </v-row>
      </header>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Header",
  props: {
    title: {
      type:String,
      default:''
    },
    subtitle: {
      type:String,
      default:''
    } 
  }
};
</script>
<style scoped lang="scss">
@import './styles.scss';
</style>