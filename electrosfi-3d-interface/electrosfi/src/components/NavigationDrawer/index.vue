<template>
  <v-navigation-drawer
    id="global-navigation-drawer"
    v-model="drawer"
    elevation="10"
    class="elevation-5"
    app
    dark
  >
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-content class="text-center">
          <v-list-item-title class="title">
            <img
              height="100px"
              class="mx-auto"
              src="../../assets/images/logo-branco.png"
              alt
            >
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <template v-for="item in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center"
        >
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            class="text-center"
          >
            <a
              href="#!"
              class="body-2 black--text"
            >EDIT</a>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          :to="item.link"
          dense
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <strong>{{ item.text }}</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import firebase from 'firebase';
export default {
  name: "NavigationDrawer",
  data: () => ({
    drawer: true,
    items: [
      {
        icon: "mdi-home",
        text: "Início",
        link: "/dashboard",
      },
      {
        icon: "mdi-folder-outline",
        text: "Minhas Simulações",
        link: "/simulations",
      },
      { icon: "mdi-plus", text: "Nova simulacao", link: "/simulator" },
      { icon: "mdi-bell", text: "Notificações", link: "/notifications" },
      { icon: "mdi-cog", text: "Configurações", link: "/settings" },
      { icon: "mdi-help", text: "Ajuda", link: "/ajuda" },
    ],
  }),
  methods: {
    logout: function () {
      alert('oie');
      firebase
        .auth()
        .signOut()
        .then(function () {
          this.$router.push("/");
          location.href = "/";
        })
        .catch(function () {});
    },
  },
};
</script>
<style>
#global-navigation-drawer {
  font-family: Noto Sans !important;
  font-weight: bold !important;
}
</style>