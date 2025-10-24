<template>
  <v-card v-if="chart && chart.type === 'graphic'">
    <v-card-text>
      <Plotly
        class="PlotlyChart"
        :data="[
          {
            title: 'watermark_1',
            z: contentOfChartInJSON,
            colorscale: colorScale(chart),
            showscale: false,
            type: 'heatmap'
          }
        ]"
        style="width: 100%; padding-bottom: 100%"
        :options="{ responsive: true }"
        :layout="{
          name: '',
          ...layout,
          title: chart.title,
          responsive: true,
          type: 'rect'
        }"
        :display-responsive="true"
        :responsive="true"
        :options-responsive="true"
      ></Plotly>
    </v-card-text>
  </v-card>
  <v-card v-else-if="chart && chart.type === 'flux'">
    <v-card-text>
      <Plotly
        :data="[
          {
            x: contentOfChartInJSON.row1.x,
            y: contentOfChartInJSON.row1.y,
            type: 'scatter'
          },
          {
            x: contentOfChartInJSON.row2.x,
            y: contentOfChartInJSON.row2.y,
            type: 'scatter'
          },
          {
            x: contentOfChartInJSON.row3.x,
            y: contentOfChartInJSON.row3.y,
            type: 'scatter'
          }
        ]"
        style="width: 100%; padding-bottom: 100%"
        :options="{ responsive: true }"
        :layout="{
          ...layout,
          title: 'Exampl',
          responsive: true
        }"
        :display-responsive="true"
        :responsive="true"
        :options-responsive="true"
      ></Plotly>
    </v-card-text>
  </v-card>
  <div v-else>
    <v-row justify="center" align="center" class="fill-height">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </div>
</template>
<script>
import { Plotly } from "vue-plotly";
import simulator from "@/services/simulator";
import Swal from "sweetalert2";
export default {
  name: "DetailsChartCard",
  props: {
    chart: { type: Object, default: null }
  },
  data: () => ({
    contentOfChartInJSON: [],
    layout: { font: { size: 13 } }
  }),
  methods: {
    colorScale: function(obj) {
      return obj.title == "Dieletrico"
        ? [
            [0, "#FFF"],
            [1, "#000"]
          ]
        : [];
    },
    searchChartsFromProduction: async function() {
      try {
        const { content } = this.chart;
        const address = String(content).replace("./", "/");
        const { data } = await simulator.get(address);
        this.contentOfChartInJSON = await data;
        console.log(this.chart.type);
        console.log(this.contentOfChartInJSON);
      } catch (err) {
        Swal.fire({ title: "An error appears", text: err.message });
      }
    }
  },
  mounted() {
    this.searchChartsFromProduction();
  },
  components: { Plotly }
};
</script>
