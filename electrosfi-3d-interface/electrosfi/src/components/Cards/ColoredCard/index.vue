<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="colored-card"
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 5 : 2"
      rounded
      :color="card_color"
      :dark="dark"
      link
      :to="to"
    >
      <v-img
        aspect-ratio="1"
        contain
        :src="card_image"
        :alt="card_title"
      />
      <v-card-title><strong>{{ card_title }}</strong></v-card-title>
      <v-card-subtitle class="text-body-1">
        {{ card_subtitle }}
      </v-card-subtitle>
    </v-card>
  </v-hover>
</template>
<script>
export default {
  name: "ColoredCard",
  props: {
    cardTitle: String,
    cardSubtitle: String,
    cardImage: String,
    cardColor: String,
    to:String,
    dark: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  }
};
</script>
<style>
.colored-card{
  font-family: Noto Sans !important;
}
</style>