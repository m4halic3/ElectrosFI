<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <v-tabs v-model="tabs">
          <v-tab>Profile Settings</v-tab>
          <v-tab>Interface</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item class="pt-5">
            <v-row justify="center">
              <v-col cols="2">
                <v-avatar class="ma-2">
                  <v-img
                    lazy-src="https://picsum.photos/id/11/100/60"
                    :src="photoURL"
                  />
                </v-avatar>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="displayName"
                  class="ma-2"
                  outlined
                  label="Nome de exibição"
                />
              </v-col>
            </v-row>
            <v-row
              justify="center"
              dense
            >
              <v-col cols="4">
                <v-btn
                  color="faded"
                  class=""
                  large
                  block
                  @click="getUserData"
                >
                  <v-icon left>
                    mdi-close
                  </v-icon>Reset
                </v-btn>
              </v-col>
              <v-col cols="8">
                <v-btn
                  color="primary"
                  class=""
                  large
                  block
                  @click="updateUser"
                >
                  <v-icon left>
                    mdi-check
                  </v-icon>Update
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col>
                <p class="text-subtitle-2 mb-0">
                  Theme:
                </p>
                <v-switch
                  v-model="nocturne"
                  class="mt-0"
                  dense
                  color="primary"
                  :label="nocturne ? 'Nocturne' : 'Daytime'"
                  hide-details
                />
                <p class="text-caption">
                  Color of the simulator interface and administrator ambient
                </p>
              </v-col>
              <v-divider vertical />
              <v-col>
                <p class="text-subtitle-2 mb-0">
                  Primary Color:
                </p>
                <v-color-picker
                  v-model="primaryColorInterface"
                  class=""
                  mode="hexa"
                  :swatches="swatches"
                  hide-canvas
                  hide-inputs
                  disabled
                  hide-mode-switch
                  show-swatches
                />
                <p class="text-caption">
                  Color of buttons, titles and tools at the interface.
                </p>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Settings",
  data: () => ({
    displayName: "",
    photoURL: "",
    email: "",
    tabs: 0,
    swatches: [
      ["#3eb772", "#257246", "#0A6933"],
      ["#F14242", "#CC0B0B", "#920000"],
      // ["#00FF00", "#00AA00", "#005500"],
      // ["#00ACC1FF", "#00AAAA", "#005555"],
      ["#3F51B5FF", "#1A237EFF", "#283593FF"],
    ],
  }),
  computed: {
    nocturne: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        localStorage.setItem("NOCTURNE_MODE_ELECTROSFI", val);
        this.$vuetify.theme.dark = val;
      },
    },
    primaryColorInterface: {
      get() {
        if (this.$vuetify.theme.dark) {
          return this.$vuetify.theme.themes.dark.primary;
        } else {
          return this.$vuetify.theme.themes.light.primary;
        }
      },
      set(val) {
        localStorage.setItem("PRIMARY_COLOR_ELECTROSFI", val);
        this.$vuetify.theme.themes.dark.primary = val;
        this.$vuetify.theme.themes.light.primary = val;
      },
    },
  },
  watch: {
    displayName: function (val) {
      if (
        this.photoURL.indexOf("ui-avatars").length > -1 ||
        typeof this.photoURL === "undefined" ||
        this.photoURL == ""
      ) {
        this.photoURL =
          "https://ui-avatars.com/api/?name=" +
          val +
          "&size=512&color=ffffff&background=3eb772";
      }
    },
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData: function () {
      this.displayName = window.firebase.auth().currentUser.displayName;
      this.email = window.firebase.auth().currentUser.email;
      this.photoURL = window.firebase.auth().currentUser.photoURL;
    },
    updateUser: function () {
      window.firebase.auth().currentUser.photoURL;
      window.firebase
        .auth()
        .currentUser.updateProfile({
          displayName: this.displayName,
          email: this.email,
          photoURL: this.photoURL,
        })
        .then(function () {
          self.$swal({
            icon: "success",
            title: "Dados atualizados com sucesso!",
          });
        })
        .catch(function (error) {
          self.$swal({
            icon: "error",
            title: "Um erro aconteceu: " + error.message,
          });
        });
    },
  },
};
</script>