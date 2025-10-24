<template>
  <v-menu
    bottom
    left
    :close-on-content-click="false"
    :nudge-width="400"
    offset-y
    rounded="lg"
    class="elevation-6"
    min-width="300"
    max-width="300"
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
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>
    </template>

    <v-list>
      <v-list-item>
        <p class="text-subtitle">
          Notifications
        </p>
      </v-list-item>
      <v-list-item
        class="text-center"
        two-line
      >
        <img
          width="100%"
          src="/img/illustrations/blank.svg"
          alt="Imagem de quadro vazio"
        >
      </v-list-item>
      <v-list-item class="text-center mt-5">
        <p class="text-caption">
          This is empty, you no have notifications.
        </p>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: "Notifications",
};
</script>