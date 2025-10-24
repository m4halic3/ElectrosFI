<template>
  <div id="login" class="auth-theme-background white--text">
    <v-container
      class="fill-height"
    >
      <v-row
        justify="center"
        align="center"
        class="fill-height"
      >
        <v-col
          cols="12"
          md="4"
          class="pt-12"
        >
          <h1 class="text-h2">
            Sign In
          </h1>
          <p class="text-subtitle mt-1">
            Sign in your account
          </p>
          <v-form @submit="loginWithEmailAndPass">
            <v-text-field
              v-model="email"
              outlined
              :rules="emailRules"
              dark
              required
              label="E-mail"
              @keydown.enter="loginWithEmailAndPass"
            />
            <v-text-field
              v-model="password"
              outlined
              dark
              required
              type="password"
              :rules="passwordRules"
              label="Password"
              @keydown.enter="loginWithEmailAndPass"
            />
            <v-row dense>
              <v-col cols="4">
                <v-btn
                  outlined
                  light
                  to="/"
                  class=""
                  color="primary"
                  block
                  large
                >
                  Voltar
                </v-btn>
              </v-col>
              <v-col cols="8">
                <v-btn
                  class=""
                  color="primary"
                  block
                  large
                  @click="loginWithEmailAndPass"
                >
                  Entrar
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      light
                      icon
                      x-large
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="loginWithGooglePopup"
                    >
                      <v-icon>mdi-google</v-icon>
                    </v-btn>
                  </template>
                  <span>Login with Google</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6">
                <p class="text-caption text-right">
                  No have an account? <br>
                  <router-link to="/register">
                    Sign Up
                  </router-link>
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-dialog
        v-model="showError"
        width="300"
      >
        <v-card light>
          <v-card-title> An error ocurred </v-card-title>
          <v-card-text v-text="error.message" />
          <v-card-actions>
            <v-spacer />
            <v-btn
              text
              @click="error = ''"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    password: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length > 6 || "Invalid password",
    ],
    error: "",
  }),
  computed: {
    showError: {
      set() {
        this.error = "";
      },
      get() {
        return this.error != "" ? true : false;
      },
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    loginWithEmailAndPass: function () {
      const self = this;
      window.firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(function () {
          self.$router.push("/dashboard");
          if (localStorage.getItem("PRIMARY_COLOR_ELECTROSFI")) {
            self.$vuetify.theme.themes.dark.primary = localStorage.getItem(
              "PRIMARY_COLOR_ELECTROSFI"
            );
            self.$vuetify.theme.themes.light.primary = localStorage.getItem(
              "PRIMARY_COLOR_ELECTROSFI"
            );
          } else {
            self.$vuetify.theme.themes.dark.primary = "#3eb772";
            self.$vuetify.theme.themes.light.primary = "#3eb772";
          }
        })
        .catch(function (error) {
          self.error = error;
        });
    },
    loginWithGooglePopup: function () {
      let self = this;
      var provider = new window.firebase.auth.GoogleAuthProvider();
      window.firebase.auth().languageCode = "pt";
      window.firebase
        .auth()
        .signInWithPopup(provider)
        .then(function () {
          self.$vuetify.theme.dark =
            localStorage.getItem("NOCTURNE_MODE_ELECTROSFI") === "true"
              ? true
              : false;

          if (localStorage.getItem("PRIMARY_COLOR_ELECTROSFI")) {
            self.$vuetify.theme.themes.dark.primary = localStorage.getItem(
              "PRIMARY_COLOR_ELECTROSFI"
            );
            self.$vuetify.theme.themes.light.primary = localStorage.getItem(
              "PRIMARY_COLOR_ELECTROSFI"
            );
          } else {
            self.$vuetify.theme.themes.dark.primary = "#3eb772";
            self.$vuetify.theme.themes.light.primary = "#3eb772";
          }
          self.$router.push("/dashboard");
        })
        .catch(function (error) {
          self.error = error;
        });
    },
  },
};
</script> 
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap");
*,
.text-h1,
.text-h2,
.text-h3,
.text-h4,
button,
a,
.text-caption {
  font-family: "Noto Sans JP", sans-serif !important;
}
#login {
  background: white;
  color: black;
  height: 100vh;
  .content-row {
    height: 100%;
  }
}
// @import "./styles.scss";
</style> 