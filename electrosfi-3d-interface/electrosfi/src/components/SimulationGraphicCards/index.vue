<template>
  <v-row>
    <h1 class="text-subtitle-2" v-if="charts">
      This project is empty, run a simulation to view results here.
    </h1>
    <template v-for="production in charts">
      <v-col
        :key="production.id"
        lg="4"
        xl="3"
        cols="12"
        v-if="
          production.type == 'movie' ||
            production.type == 'flux' ||
            production.type == 'graphic'
        "
      >
        <v-card v-if="production.type == 'movie'">
          <v-card-title>
            <h1 class="text-h5">{{ production.title }}</h1>
            <h2 class="text-subtitle-2">
              {{ Date(production.create_date) }}
            </h2>
          </v-card-title>
          <v-card-text>
            <video width="100%" controls :src="production.content"></video>
          </v-card-text>
        </v-card>
        <v-card v-if="production.type == 'flux'">
          <v-card-text>
            <Plotly
              :data="[
                {
                  x: charts[production._id].row1.x,
                  y: charts[production._id].row1.y,
                  type: 'scatter'
                },
                {
                  x: charts[production._id].row2.x,
                  y: charts[production._id].row2.y,
                  type: 'scatter'
                },
                {
                  x: charts[production._id].row3.x,
                  y: charts[production._id].row3.y,
                  type: 'scatter'
                }
              ]"
              style="width: 100%; padding-bottom: 100%"
              :options="{ responsive: true }"
              :layout="{
                ...layout,
                title: production.title,
                responsive: true
              }"
              :display-responsive="true"
              :responsive="true"
              :options-responsive="true"
            ></Plotly>
            <p class="text-caption">
              {{ Date(production.create_date) }}
            </p>
          </v-card-text>
        </v-card>
        <v-card v-if="production.type == 'graphic'">
          <v-card-text>
            <Plotly
              class="PlotlyChart"
              :data="[
                {
                  title: 'watermark_1',
                  z: charts[production._id],
                  colorscale: colorScale(production),
                  showscale: false,
                  type: 'heatmap'
                }
              ]"
              style="width: 100%; padding-bottom: 100%"
              :options="{ responsive: true }"
              :layout="{
                name: '',
                ...layout,
                title: production.title,
                responsive: true,
                type: 'rect'
              }"
              :display-responsive="true"
              :responsive="true"
              :options-responsive="true"
            ></Plotly>
            <p class="text-caption">
              {{ Date(production.create_date) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>
<script>
import { Plotly } from "vue-plotly";

export default {
  name: "SimulationGraphicCards",
  props: {
    simulation: { type: Object, default: Object },
    charts: { type: Object, default: null }
  },
  components: {
    Plotly
  },
  methods: {
    colorScale: function(obj) {
      return obj.title == "Dieletrico"
        ? [
            [0, "#FFF"],
            [1, "#000"]
          ]
        : [];
    }
  }
};
</script>
