<template>
  <v-card class="" elevation="" rounded="lg" max-width="100%" v-if="source">
    <v-card-text>
      <p class="">
        <strong>{{ source.name }} </strong>
      </p>
      <v-chip small class="ma-1">fwidth:{{ source.fwidth }} </v-chip>
      <v-chip small class="ma-1"> Source Type:{{ source.sourceType }} </v-chip>
      <v-chip small class="ma-1">
        Wave Width:{{ source.waveWidth }}rad/s
      </v-chip>
      <v-chip small class="ma-1">
        Wave Length:{{ source.waveLength }}μm
      </v-chip>
      <v-chip small class="ma-1"> Size X:{{ source.waveSize[0] }}μm </v-chip>
      <v-chip small class="ma-1">
        Wave Size Y:{{ source.waveSize[1] }}μm
      </v-chip>

      <v-chip small class="ma-1"> Wave Size Y:{{ source.waveSize[1] }} </v-chip>
      <v-chip small class="ma-1">
        {{
          source.integrated === 0 ? "No integrated to PMl" : "Integrated to PML"
        }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "DetailsSourceCard",
  props: {
    source: { type: Object, default: null },
    is3d: { type: Boolean, default: false }
  }
};
</script>
