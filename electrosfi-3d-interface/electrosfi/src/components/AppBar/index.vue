<template>
  <v-app-bar elevation="0" app fixed class="" large>
    <v-container>
      <v-row class="py-5" align="center">
        <v-btn to="/dashboard" v-if="this.$route.name != 'Dashboard'" icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <div id="google_translate_element"></div>

        {{ this.$route.name }}
        <v-spacer />
        
      <HelpButton />
        <Notifications />
        <MenuButton />
        <CreateNewSimulation />
        <CreateNewSimulation :is3d="true"/>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
/**
 * Barra de navegação principal da Aplicação.
 * @displayName Navbar
 * @see https://vuetifyjs.com/en/api/v-app/
 */
import CreateNewSimulation from "@/components/CreateNewSimulation";
import HelpButton from "@/components/HelpButton";
export default {
  name: "AppBar",
  components: {
    MenuButton: () => import("@/components/MenuButton"),
    Notifications: () => import("@/components/Notifications"),
    CreateNewSimulation,
    HelpButton
  },
  data: () => ({
    userName: "",
    avatar: "",
    dialogLogout: false,
    /**
     * @model
     */
    dialogSettings: false
  })
};
</script>
