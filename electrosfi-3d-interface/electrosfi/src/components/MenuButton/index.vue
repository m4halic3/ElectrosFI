<template>
  <div id="MenuButton">
    <v-menu
      bottom
      left
      :close-on-content-click="true"
      :nudge-width="200"
      offset-y
      rounded
      class="elevation-6"
      min-width="400"
    >
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip
          dense
          bottom
        >
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              v-bind="attrs"
              icon
              v-on="{ ...tooltip, ...menu }"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <span>Menu</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img
              :src="avatar"
              :alt="'Foto do ' + userName"
            >
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>User </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/materials">
          <v-list-item-action>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-action>
          <v-list-item-title>Materials</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          @click="dialogSettings = true"
        >
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="dialogLogout = true">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="dialogLogout"
      width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Realmente quer sair?
        </v-card-title>
        <v-card-text>
          Você poderá se conectar novamente utilizando a sua conta de e-mail e
          senha que utilizou para acessar desta vez
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="logout"
          >
            Sim
          </v-btn>
          <v-btn
            color="faded"
            text
            @click="dialogLogout = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogSettings"
      width="500"
    >
      <v-card>
        <v-card-title>
          Settings <v-spacer />
          <v-btn
            icon
            @click="dialogSettings = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text><Settings /></v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "MenuButton",
  components: {
    Settings: () => import("@/pages/Settings"),
  },
  data: () => ({
    userName: "",
    avatar: "",
    dialogLogout: false,
    dialogSettings: false,
  }),
  mounted: function () {
    this.getUserData();
  },
  methods: {
    logout: function () {
      const self = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          self.$router.push("/");
        });
    },
    getUserData: function () {
      let name = firebase.auth().currentUser.displayName.split(" ");
      if (name.length > 1) {
        this.userName = name[0] + " " + name[name.length - 1];
      } else {
        this.userName = name[0];
      }

      this.avatar = firebase.auth().currentUser.photoURL;
    },
  },
};
</script>