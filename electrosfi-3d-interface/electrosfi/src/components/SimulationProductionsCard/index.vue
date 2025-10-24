<template>
  <v-row class="pb-5 mt-0 pt-0">
    <v-card
      v-for="{ content, _id, create_date } in remasteredProductions"
      :key="_id"
      width="100%"
      class="mt-4"
    >
      <v-card-text>
        <h1 class="text-h6">{{ simulation.title }}</h1>
        <p>{{ simulation.description }}</p>

        <div class="text--primary"></div>
      </v-card-text>
      <v-card-actions>
        <v-row justify="space-between" class="pa-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs" x-small elevation="0">
                <v-icon left x-small>mdi-calendar</v-icon>
                {{ formatDate(new Date(create_date)) }}
              </v-btn>
            </template>
            <span>When this simulation was runned</span>
          </v-tooltip>

          <span>
            <DeleteSimulationModalAndButton
              @deleted="update"
              :simulation="simulation"
              production
              :productionID="_id"
            />
            <v-btn
              :to="is3d ?
              `/datails3d/${simulation._id}/${content}/` :
              `/details/${simulation._id}/${_id}/` 
              "
              color="primary"
              class="ma-2"
              x-small
              elevation="0"
            >
              <v-icon x-small left>mdi-open-in-new</v-icon>
              See Detail
            </v-btn>
          </span>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-row>
</template>
<script>
import formatDate from "@/common/formatDate";
import DeleteSimulationModalAndButton from "@/components/DeleteSimulationModalAndButton";
export default {
  name: "SimualtionProductionsCard",
  props: {
    simulation: { type: Object, default: Object },
    is3d: { type: Boolean, default: false }
  },
  methods: {
    formatDate,
    update() {
      this.$emit("updated");
    }
  },
  mounted() {},
  computed: {
    remasteredProductions() {
      const productions = this.simulation.productions;

      if (this.is3d) {
        return productions;
      }

      return productions.map(e => ({
        ...e,
        content: JSON.parse(e.content)
      })).reverse();
    }
  },
  components: { DeleteSimulationModalAndButton }
};
</script>
