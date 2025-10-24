<template>
  <v-dialog max-width="400" v-model="showErrorModalLocal">
    <v-card>
      <v-card-title>An error appears</v-card-title>
      <v-card-text>
        {{
          this.errorMessage !== ""
            ? this.errorMessage
            : "Review your simulation settings"
        }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large color="primary" @click="closeErrorModal">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ErrorModal",
  computed: {
    ...mapGetters("simulator", ["showError", "errorMessage"]),
    showErrorModalLocal: {
      get() {
        return this.showError;
      },
      set(val) {
        this.closeErrorModal(val);
      },
    },
  },
  methods: {
    ...mapActions("simulator", ["closeErrorModal"]),
  },
 };
</script>