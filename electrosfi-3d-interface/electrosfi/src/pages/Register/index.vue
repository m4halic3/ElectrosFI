<template>
  <div id="register" class="auth-theme-background">
    <v-container
      class="pt-0 fill-height"
    >
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="4"
          class='white--text'
        >
          <h1 class="text-h2">
            Register
          </h1>
          <p class="text-subtitle mt-1">
            Sign up your account
          </p>
          <v-form>
            <v-text-field
              v-model="name"
              outlined
              :rules="nameRules"
              dark
              required
              label="Name"
              @keydown.enter="cadUser"
            />
            <v-text-field
              v-model="email"
              outlined
              :rules="emailRules"
              dark
              required
              label="E-mail"
              @keydown.enter="cadUser"
            />
            <v-text-field
              v-model="password"
              outlined
              :rules="passwordRules"
              dark
              type="password"
              required
              label="Password"
              @keydown.enter="cadUser"
            />
            <v-text-field
              v-model="confirmPassword"
              outlined
              :rules="passwordRules"
              light
              dark
              type="password"
              required
              label="Rewrite Password"
              @keydown.enter="cadUser"
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
                  Back
                </v-btn>
              </v-col>
              <v-col cols="8">
                <v-btn
                  class=""
                  color="primary"
                  block
                  large
                  @click="cadUser"
                >
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <p class="text-caption text-right">
            Do you have an account? <br>
            <router-link to="/login">
              Sign In
            </router-link>
          </p>
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
  name: "Register",
  components: {},
  data: () => ({
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    photoURL: "",
    error: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Name is required",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length > 6 || "Invalid password",
    ],
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
    cadUser: function () {
      if (
        this.password == "" ||
        this.name == "" ||
        this.confirmPassword == "" ||
        this.email == ""
      ) {
        this.$swal({
          icon: "error",
          title: "Sem essas informações não há como criar uma conta",
        });
        return false;
      } else if (
        this.password < 6 ||
        this.name < 6 ||
        this.confirmPassword < 6 ||
        this.email < 6
      ) {
        this.$swal({
          icon: "error",
          title:
            "Os campos precisam estar corretamente preenchidos para prosseguir",
        });
        return false;
      }
      const self = this;

      window.firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          window.firebase
            .auth()
            .currentUser.updateProfile({
              displayName: self.name,
              photoURL:
                "https://ui-avatars.com/api/?name=" +
                self.name +
                "&size=512&color=ffffff&background=3eb772",
            })
            .then(function () {
              self.$router.push("/dashboard");
            })
            .catch(function (error) {
              self.error = error;
            });
        })
        .catch(function (error) {
          self.error = error;
        });
    },
  },
};
</script> 
<style scoped lang="scss">
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
#register {
  background: white;
  color: black;
  height: 100vh;
  .content-row {
    height: 100%;
  }
}
</style> 