<template>
  <div>
    <v-menu
      offset-y
      absolute
      min-width="200px"
      rounded="lg"
    >
      <template v-slot:activator="{ on:menu }">
        <v-card
          elevation="6"
          rounded="lg"
          v-bind="attrs"
          icon
          v-on="{ ...menu }"
        >
          <v-img
            :src="scene_design"
            gradient="to bottom, rgba(255,255,255,0), rgba(0,0,0,.4)"
          >
            <v-row
              align="end"
              class="fill-height"
            >
              <v-col>
                <v-card-title>
                  <span class="headline white--text">{{ title }}</span>
                  <v-spacer />
                </v-card-title>
              </v-col>
            </v-row>
            <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
            <v-card-text>{{ text }}</v-card-text>
          </v-img>
        </v-card>
      </template>
      <v-list>
        <v-list-item :to="'/simulations/' + SimulationKey">
          <v-list-item-action>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item-action>
          <v-list-item-title>View Simulation</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          @click="snackbar = true"
        >
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-title>Edit Simulation</v-list-item-title>
        </v-list-item>

        <v-list-item
          link
          @click="snackbar = true"
        >
          <v-list-item-action>
            <v-icon>mdi-share</v-icon>
          </v-list-item-action>
          <v-list-item-title>Share Simulation</v-list-item-title>
        </v-list-item>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="320"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item
              link
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-action>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-action>
              <v-list-item-title>Delete Simulation</v-list-item-title>
            </v-list-item>
          </template>
          <v-card>
            <v-card-title class="headline">
              Delete this simulation?
            </v-card-title>
            <v-card-text>This action is permanent and you can't recovery this simulation and this informations.</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="this.delete"
              >
                Yes, delete it!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      right
    >
      This is not disponible
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          icon
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "SimulationCard",
  props: {
    to: String,
    subtitle: String,
    title: String,
    text: String,
    sceneDesign: String,
    simulationKey: String,
  },
  data: () => ({
    dialog: false,
    snackbar:true
  }),
  methods: {
    edit: function () {
      this.$emit("edit");
    },
    delete: function () {
      this.dialog = false;
      this.$emit("delete");
    },
  },
};
</script>