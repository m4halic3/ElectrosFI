<template>
  <!-- <v-dialog max-width="600" v-model="showModal"> -->
  <!-- <v-card> -->
  <!-- <v-card-title>
      <p class="text-h5">Add Output</p>
    </v-card-title> -->
  <!-- <v-card-text> -->
  <div>
    <v-select
      dense
      outlined
      :items="[
        { option: 'Transmittance', value: 'transmittance_spectrum' },
        { option: 'Transmission', value: 'transmission_spectrum' },
      ]"
      item-text="option"
      item-value="value"
      v-model="flux_type"
      label="Output Type"
      hint="Select a Visualization to the Flux Type"
    ></v-select>
    <div v-if="flux_type == 'transmittance_spectrum'">
      <p class="text-subtitle">Transmisttance Spectrum Settings</p>
      <v-row dense>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            outlined
            dense
            v-model="fcen"
            persistent-hint
            hint="Frequence Cent"
            label="fcen"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            outlined
            dense
            v-model="df"
            persistent-hint
            hint="Difference of frequences"
            label="df"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            outlined
            dense
            v-model="nfreq"
            persistent-hint
            hint="Number of frequences to observe"
            label="nfreq"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            outlined
            dense
            v-model="run_norm"
            persistent-hint
            hint="Time to run the simulation"
            label="Normalization Time"
          ></v-text-field>
        </v-col>
      </v-row>
      <p class="text-subtitle">Transmisttance Normalization Point</p>
      <v-row dense>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="x"
            persistent-hint
            hint="Position in X"
            outlined
            v-model="transmittance_normal_flux_x"
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="y"
            persistent-hint
            hint="Position in Y"
            v-model="transmittance_normal_flux_y"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Height"
            persistent-hint
            hint="Heigth of Wave"
            v-model="transmittance_normal_flux_height"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Width"
            persistent-hint
            hint="Width of Wave"
            v-model="transmittance_normal_flux_width"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <p class="text-subtitle">Transmisttance Flux</p>
      <v-row dense>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="x"
            v-model="transmittance_flux_x"
            persistent-hint
            hint="Position in X"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="y"
            persistent-hint
            v-model="transmittance_flux_y"
            hint="Position in Y"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Height"
            persistent-hint
            v-model="transmittance_flux_height"
            hint="Heigth of Wave"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Width"
            persistent-hint
            v-model="transmittance_flux_width"
            hint="Width of Wave"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <p class="text-subtitle">Transmisttance Reflected Flux</p>
      <v-row dense>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="x"
            persistent-hint
            hint="Position in X"
            v-model="reflected_flux_x"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="y"
            persistent-hint
            v-model="reflected_flux_y"
            hint="Position in Y"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Height"
            persistent-hint
            v-model="reflected_flux_height"
            hint="Heigth of Wave"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="12" sm="12">
          <v-text-field
            type="number"
            label="Width"
            persistent-hint
            v-model="reflected_flux_width"
            hint="Width of Wave"
            outlined
            dense
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn large color="primary" link>
        <v-icon left>mdi-plus</v-icon>
        Add
      </v-btn>
    </v-row>
  </div>
  <!-- </v-card-text>
  </v-card> -->
  <!-- </v-dialog> -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import script from "./script";
export default {
  data() {
    return {
      selectedFlux: "",
    };
  },
  mounted() {},
  methods: {
    ...mapActions("simulator", ["setShowModalSettingsFlux", "updateGeometry"]),
  },
  computed: {
    ...mapGetters("simulator", [
      "showModalSettingsFlux",
      "geometryData",
      "dimensions",
      "coordinates",
    ]),
    ...script,
    showModal: {
      get() {
        return this.showModalSettingsFlux;
      },
      set(val) {
        this.setShowModalSettingsFlux(val);
      },
    },
  },
};
</script>