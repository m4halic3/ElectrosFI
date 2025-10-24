<template>
  <v-dialog v-model="dialogShow" max-width="800">
    <v-card>
      <v-card-title>
        Simulation Settings
        <v-spacer />
        <v-btn icon @click="dialogShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        <v-col cols="8">
          Output settings of simulation, all options can be better understod in
          the reference:
          <a
            href="https://meep.readthedocs.io/en/latest/Python_User_Interface/#data-visualization"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meep Data Visualization
          </a>
          and
          <a
            href="https://meep.readthedocs.io/en/latest/Python_User_Interface/#animate2d"
            target="_blank"
            rel="noopener noreferrer"
          >
            Animation 2D
          </a>
        </v-col>
      </v-card-subtitle>
      <v-card-text>
        <v-tabs v-model="tabs">
          <v-tab>Plot</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <p class="text-subtitle mt-3">
              Output to your simulation run, the files that you will visit after
              simulations was complete. Visit the reference:
              <a
                href="https://meep.readthedocs.io/en/latest/Python_User_Interface/#data-visualization"
                target="_blank"
                rel="noopener noreferrer"
                >Data Visualization</a
              >
              and
              <a
                href="https://meep.readthedocs.io/en/latest/Python_User_Interface/#animate2d"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation 2D
              </a>
            </p>
            <v-row dense>
              <v-col cols="4">
                <v-checkbox
                  v-model="_generateDielectric"
                  dense
                  label="Dielectric"
                />
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="_generateAxis" dense label="Axis" />
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="_generateVideo" dense label="Video" />
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="_realtime" dense label="RealTime" />
              </v-col>
              <v-col cols="4">
                <v-checkbox v-model="_labels" dense label="Labels" />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn @click="dialogShow = false">
          Cancel
        </v-btn>
        <v-btn color="primary" @click="is3d ? Run3dSimulation() : RunSimulation()">
          Run Simulation
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PlotOptions",
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    e6: 1,
    tabs: 0,
    interpolationItems: [
      "none",
      "nearest",
      "bilinear",
      "bicubic",
      "spline16",
      "spline36",
      "hanning",
      "hamming",
      "hermite",
      "kaiser",
      "quadric",
      "catrom",
      "gaussian",
      "bessel",
      "mitchell",
      "sinc",
      "lanczos"
    ],
    cmapItems: [
      "viridis",
      "plasma",
      "inferno",
      "magma",
      "cividis",
      "Greys",
      "Purples",
      "Blues",
      "Greens",
      "Oranges",
      "Reds",
      "YlOrBr",
      "YlOrRd",
      "OrRd",
      "PuRd",
      "RdPu",
      "BuPu",
      "GnBu",
      "PuBu",
      "YlGnBu",
      "PuBuGn",
      "BuGn",
      "YlGn",
      "binary",
      "gist_yarg",
      "gist_gray",
      "gray",
      "bone",
      "pink",
      "spring",
      "summer",
      "autumn",
      "winter",
      "cool",
      "Wistia",
      "hot",
      "afmhot",
      "gist_heat",
      "copper",
      "PiYG",
      "PRGn",
      "BrBG",
      "PuOr",
      "RdGy",
      "RdBu",
      "RdYlBu",
      "RdYlGn",
      "Spectral",
      "coolwarm",
      "bwr",
      "seismic",
      "twilight",
      "twilight_shifted",
      "hsv",
      "Pastel1",
      "Pastel2",
      "Paired",
      "Accent",
      "Dark2",
      "Set1",
      "Set2",
      "Set3",
      "tab10",
      "tab20",
      "tab20b",
      "tab20c",
      "flag",
      "prism",
      "ocean",
      "gist_earth",
      "terrain",
      "gist_stern",
      "gnuplot",
      "gnuplot2",
      "CMRmap",
      "cubehelix",
      "brg",
      "gist_rainbow",
      "rainbow",
      "jet",
      "nipy_spectral",
      "gist_ncar"
    ]
  }),
  methods: {
    ...mapActions("simulator", [
      "setCurrentGeometryPosY",
      "setCurrentGeometryPosX",
      "openPlotOptions",
      "set_generateAxis",
      "set_generateVideo",
      "set_generateDielectric",
      "set_plotAxis",
      "set_realtime",
      "set_labels",
      "set_plotOptions",
      "RunSimulation",
      "Run3dSimulation"
    ])
  },
  computed: {
    ...mapGetters("simulator", [
      "runSimulation",
      "showPlotOptions",
      "generateAxis",
      "generateVideo",
      "generateDielectric",
      "plotAxis",
      "realtime",
      "labels",
      "plotViews",
      "plotOptions"
    ]),
    //#region plotOptions 1
    _generateAxis: {
      get() {
        return this.generateAxis;
      },
      set(value) {
        this.set_generateAxis(value);
      }
    },
    _generateVideo: {
      get() {
        return this.generateVideo;
      },
      set(value) {
        this.set_generateVideo(value);
      }
    },
    _generateDielectric: {
      get() {
        return this.generateDielectric;
      },
      set(value) {
        this.set_generateDielectric(value);
      }
    },
    _plotAxis: {
      get() {
        return this.plotAxis;
      },
      set(value) {
        this.set_plotAxis(value);
      }
    },
    _realtime: {
      get() {
        return this.realtime;
      },
      set(value) {
        this.set_realtime(value);
      }
    },
    _labels: {
      get() {
        return this.labels;
      },
      set(value) {
        this.set_labels(value);
      }
    },
    //#endregion

    //#region plotOptions 2 - fieldParameters
    field_parameters_interpolation: {
      get() {
        return this.plotOptions.field_parameters.interpolation;
      },
      set(val) {
        this.set_plotOptions(["field_parameters", "interpolation", val]);
      }
    },
    field_parameters_alpha: {
      get() {
        return this.plotOptions.field_parameters.alpha;
      },
      set(val) {
        this.set_plotOptions(["field_parameters", "alpha", val]);
      }
    },
    field_parameters_cmap: {
      get() {
        return this.plotOptions.field_parameters.cmap;
      },
      set(val) {
        this.set_plotOptions(["field_parameters", "cmap", val]);
      }
    },
    //#endregion

    //#region
    monitor_parameters_alpha: {
      get() {
        return this.plotOptions.monitor_parameters.alpha;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "alpha", val]);
      }
    },
    monitor_parameters_color: {
      get() {
        return this.plotOptions.monitor_parameters.color;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "color", val]);
      }
    },
    monitor_parameters_facecolor: {
      get() {
        return this.plotOptions.monitor_parameters.facecolor;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "facecolor", val]);
      }
    },
    monitor_parameters_edgecolor: {
      get() {
        return this.plotOptions.monitor_parameters.edgecolor;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "edgecolor", val]);
      }
    },
    monitor_parameters_linewidth: {
      get() {
        return this.plotOptions.monitor_parameters.linewidth;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "linewidth", val]);
      }
    },
    monitor_parameters_hatch: {
      get() {
        return this.plotOptions.monitor_parameters.hatch;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "hatch", val]);
      }
    },
    monitor_parameters_label_color: {
      get() {
        return this.plotOptions.monitor_parameters.label_color;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "label_color", val]);
      }
    },
    monitor_parameters_label_alpha: {
      get() {
        return this.plotOptions.monitor_parameters.label_alpha;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "label_alpha", val]);
      }
    },
    monitor_parameters_offset: {
      get() {
        return this.plotOptions.monitor_parameters.offset;
      },
      set(val) {
        this.set_plotOptions(["monitor_parameters", "offset", val]);
      }
    },
    //#endregion

    //#region
    source_parameters_color: {
      get() {
        return this.plotOptions.source_parameters.color;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "color", val]);
      }
    },
    source_parameters_alpha: {
      get() {
        return this.plotOptions.source_parameters.alpha;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "alpha", val]);
      }
    },
    source_parameters_facecolor: {
      get() {
        return this.plotOptions.source_parameters.facecolor;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "facecolor", val]);
      }
    },
    source_parameters_edgecolor: {
      get() {
        return this.plotOptions.source_parameters.edgecolor;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "edgecolor", val]);
      }
    },
    source_parameters_linewidth: {
      get() {
        return this.plotOptions.source_parameters.linewidth;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "linewidth", val]);
      }
    },
    source_parameters_hatch: {
      get() {
        return this.plotOptions.source_parameters.hatch;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "hatch", val]);
      }
    },
    source_parameters_label_color: {
      get() {
        return this.plotOptions.source_parameters.label_color;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "label_color", val]);
      }
    },
    source_parameters_label_alpha: {
      get() {
        return this.plotOptions.source_parameters.label_alpha;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "label_alpha", val]);
      }
    },
    source_parameters_offset: {
      get() {
        return this.plotOptions.source_parameters.offset;
      },
      set(val) {
        this.set_plotOptions(["source_parameters", "offset", val]);
      }
    },

    //#endregion

    //#region

    boundary_parameters_alpha: {
      get() {
        return this.plotOptions.boundary_parameters.alpha;
      },
      set(val) {
        this.set_plotOptions(["boundary_parameters", "alpha", val]);
      }
    },
    boundary_parameters_facecolor: {
      get() {
        return this.plotOptions.boundary_parameters.facecolor;
      },
      set(val) {
        this.set_plotOptions(["boundary_parameters", "facecolor", val]);
      }
    },
    boundary_parameters_edgecolor: {
      get() {
        return this.plotOptions.boundary_parameters.edgecolor;
      },
      set(val) {
        this.set_plotOptions(["boundary_parameters", "edgecolor", val]);
      }
    },
    boundary_parameters_linewidth: {
      get() {
        return this.plotOptions.boundary_parameters.linewidth;
      },
      set(val) {
        this.set_plotOptions(["boundary_parameters", "linewidth", val]);
      }
    },
    boundary_parameters_hatch: {
      get() {
        return this.plotOptions.boundary_parameters.hatch;
      },
      set(val) {
        this.set_plotOptions(["boundary_parameters", "hatch", val]);
      }
    },

    //#endregion

    eps_parameters_alpha: {
      get() {
        return this.plotOptions.eps_parameters.alpha;
      },
      set(val) {
        this.set_plotOptions(["eps_parameters", "alpha", val]);
      }
    },
    eps_parameters_interpolation: {
      get() {
        return this.plotOptions.eps_parameters.interpolation;
      },
      set(val) {
        this.set_plotOptions(["eps_parameters", "interpolation", val]);
      }
    },
    eps_parameters_cmap: {
      get() {
        return this.plotOptions.eps_parameters.cmap;
      },
      set(val) {
        this.set_plotOptions(["eps_parameters", "cmap", val]);
      }
    },
    _plotViews: {
      get() {
        return this.plotViews;
      },
      set(val) {
        this.set_plotViews(val);
      }
    },
    _boundary_parameters: {
      get() {
        return this.boundary_parameters;
      },
      set(val) {
        this.set_boundary_parameters(val);
      }
    },
    _eps_parameters: {
      get() {
        return this.eps_parameters;
      },
      set(val) {
        this.set_eps_parameters(val);
      }
    },
    dialogShow: {
      get() {
        return this.showPlotOptions;
      },
      set(val) {
        this.openPlotOptions(val);
      }
    }
  }
};
</script>
