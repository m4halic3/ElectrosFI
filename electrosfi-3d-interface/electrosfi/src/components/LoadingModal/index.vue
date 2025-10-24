<template>
  <div id="loading-modal">
    <v-dialog
      v-model="loadingSimulation"
      max-width="400"
      scrollable
    >
      <v-card color="">
        <v-card-text class="pt-1">
          <v-row
            align-items="center"
            justify="center"
            class="py-5"
          >
            <v-col>
              Sua simulação está sendo processada
              <v-progress-linear
                indeterminate
                color="primary"
                class="mb-0"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LoadingModal",
  methods: {
    ...mapActions("simulator", ["setLoadingSimulation"]),
  },
  computed: {
      ...mapGetters("simulator", ["loading_simulation"]),
      loadingSimulation:{
          get(){
              return this.loading_simulation 
          },
          set(val){
              this.setLoadingSimulation(val)
          }
      }
  },
};
</script>