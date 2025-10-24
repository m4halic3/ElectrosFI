<template>
  <v-container>
    <v-card
      rounded
      elevation="0"
      outlined
    >
      <v-card-title>Bem vindo</v-card-title>
      <v-card-subtitle>Para onde quer ir primeiro?</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="4"> 
            <ColoredCard
              card_image="/img/illustrations/blank.svg"
              card_title="Ambiente de Desenho"
              card_subtitle="Crei novas simulações e as exiba"
              card_color="purple darken-3"
              to="/simulator"
            />
          </v-col>
          <v-col cols="4">
            <ColoredCard
              card_image="/img/illustrations/settings.svg"
              card_title="Minhas Simulações"
              card_subtitle="Crei novas simulações e as exiba"
              card_color="blue darken-3"
              to="/simulations"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import ColoredCard from "@/components/Cards/ColoredCard";
export default {
  name: "WelcomeDashboard",
  components: { ColoredCard }
};
</script>