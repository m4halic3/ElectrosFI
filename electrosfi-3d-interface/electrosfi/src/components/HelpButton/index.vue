<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        href="https://www.notion.so/Ajuda-do-ElectrosFI-cd73ea00c33d4335a8ee1244dac9914c"
        v-bind="attrs"
        v-on="on"
        icon
        target="_blank"
        rel="noreferrer"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <span>Help</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "Help Button"
};
</script>
