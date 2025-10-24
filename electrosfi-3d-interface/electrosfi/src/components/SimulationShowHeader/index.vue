<template>
  <v-row align-content="center" align="center" class="py-5">
    <v-col class="text-left">
      <v-row>
        <v-col>
          <span class="text-h5">
            <strong>{{ simulation.title }} </strong>
          </span>
          <p class="text-caption">
            <v-icon small>mdi-calendar</v-icon>
            {{ formatDate(new Date(simulation.create_date)) }}
          </p>
          <v-row align="center">
            <DeleteSimulationModalAndButton x-small :simulation="simulation" />
            <span>
              <v-btn
                class="ma-1"
                x-small
                @click="showShareModal = true"
                elevation="0"
              >
                <v-icon x-small left>mdi-share-variant</v-icon>
                Share
              </v-btn>
            </span>
            <span>
              <v-btn
                class="ma-1"
                x-small
                :to="(is3d ? '/simulator3d/' : '/simulator/') + simulation._id"
                elevation="0"
                color="secondary"
              >
                <v-icon x-small left>mdi-pen</v-icon>
                Edit
              </v-btn>
            </span>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          ><p class="text-caption">Description</p>
          <p class="text-body">{{ simulation.description }}</p>
        </v-col>
      </v-row>
      <v-divider class="mt-2" />
    </v-col>
    <ShareModal
      @close="showShareModal = false"
      :show="showShareModal"
      :url="simulationPublicURL"
    />
  </v-row>
</template>
<script>
import ShareModal from "@/components/ShareModal";
import DeleteSimulationModalAndButton from "@/components/DeleteSimulationModalAndButton";
import formatDate from "@/common/formatDate.js";
export default {
  name: "SimulationShowHeader",
  data: () => ({
    showShareModal: false
  }),
  props: {
    is3d: { type: Boolean, default: false },
    simulation: { type: Object, default: null }
  },
  methods: {
    formatDate
  },
  components: { ShareModal, DeleteSimulationModalAndButton },
  computed: {
    simulationPublicURL() {
      return `${process.env.VUE_APP_LOCATION}/${this.simulation._id}`;
    }
  }
};
</script>
