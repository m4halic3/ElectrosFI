<template>
  <span v-if="production">
    <v-row justify="center">
      <v-col md="4" cols="6">
        <img src="/img/icon.svg" alt="Logo do ElectroSFI" width="100%" />
      </v-col>
    </v-row>
    <h1 class="text-h2 text-center headerText">
      <strong>{{ is3d ? simulation.title : production.title }} </strong>
    </h1>
    <v-row justify="center" class="ma-2">
      <v-chip class="ma-2" color="" v-if="create_date">
        Created: {{ formatDate(new Date(create_date)) }}
      </v-chip>
      <v-chip class="ma-2" color="">
        {{
          production.GeometryList.length > 0
            ? production.GeometryList.length
            : 0
        }}
        Geometries
      </v-chip>
      <v-chip class="ma-2">
        {{ production.SourcesList.length }} Sources
      </v-chip>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <p class="text-caption mb-0">Description:</p>
        <p class="mt-0 text-body">
          {{ is3d ? simulation.description : production.description }}
        </p>
      </v-col>
      <v-col cols="12" md="6" v-if="!is3d">
        <p class="text-caption mb-0">Properties:</p>
        <p class="text-body">
          <strong>Cell Size:</strong>
          <v-chip class="ma-1">{{ `x: ${production.coordinates.x}μm` }}</v-chip>
          <v-chip class="ma-1">{{ `y: ${production.coordinates.y}μm` }}</v-chip>
          <v-chip class="ma-1">{{ `z: ${production.coordinates.z}μm` }}</v-chip>
        </p>
        <p class="text-body">
          <strong>Resolution:</strong>
          <v-chip class="ma-1">{{ `${production.resolution}px/μm` }}</v-chip>
        </p>
      </v-col>
    </v-row>
  </span>
</template>
<script>
import formatDate from "@/common/formatDate";

export default {
  name: "DetailsProductHeader",
  props: {
    production: { type: Object, default: null },
    simulation: { type: Object, default: null },
    create_date: { type: String, default: null },
    is3d: { type: Boolean, default: false }
  },
  methods: {
    formatDate
  }
};
</script>
<style>
.headerText {
  overflow: hidden;
  max-width: 100vw;
  text-overflow: ellipsis;
}
</style>
