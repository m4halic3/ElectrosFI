<template>
  <div>
    <v-app-bar dense app color="dark" dark fixed>
      <v-menu
        bottom
        left
        :close-on-content-click="false"
        :nudge-width="400"
        offset-y
        dense
        rounded
        class="elevation-6"
        min-width="300"
        max-width="300"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip dense bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn dense v-bind="attrs" icon v-on="{ ...tooltip, ...menu }">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
            <span>Menu</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item to="/dashboard">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openPlotOptions(true)">
            <v-list-item-action>
              <v-icon>mdi-play</v-icon>
            </v-list-item-action>
            <v-list-item-title>Run simulation</v-list-item-title>
          </v-list-item>
          <v-list-item to="/dashboard">
            <v-list-item-action>
              <v-icon>mdi-share</v-icon>
            </v-list-item-action>
            <v-list-item-title>Share</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            :color="mode == 'transform' ? 'primary' : ''"
            @click="setCurrentMode('transform')"
          >
            <v-icon style="transform: rotate(-20deg)"> mdi-navigation </v-icon>
          </v-btn>
        </template>
        <span>Move or Select </span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-on="on"
            v-bind="attrs"
            :color="mode == 'sources' ? 'primary' : ''"
            @click="setCurrentMode('sources')"
          >
            <v-icon>mdi-plus-circle-multiple-outline</v-icon>
          </v-btn>
        </template>
        <span>Create Source</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-on="on"
            v-bind="attrs"
            :color="mode == 'flux' ? 'primary' : ''"
            @click="setCurrentMode('flux')"
          >
            <v-icon>mdi-access-point</v-icon>
          </v-btn>
        </template>
        <span>Add Flux Output</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-on="on"
            v-bind="attrs"
            :color="mode == 'handOn' ? 'primary' : ''"
            @click="setCurrentMode('handOn')"
          >
            <v-icon>mdi-hand</v-icon>
          </v-btn>
        </template>
        <span>Handle</span>
      </v-tooltip>
      <v-menu
        bottom
        :close-on-content-click="false"
        :nudge-width="400"
        offset-y
        open-on-hover
        rounded="lg"
        class="elevation-6"
        min-width="100"
        max-width="300"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip dense bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                :color="mode == 'zoom' ? 'primary' : ''"
                v-bind="attrs"
                icon
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon>
                  {{
                    zoomAction == "In"
                      ? "mdi-magnify-plus-outline"
                      : zoomAction == "Out"
                      ? "mdi-magnify-minus-outline"
                      : "mdi-magnify-plus-outline"
                  }}
                </v-icon>
              </v-btn>
            </template>
            <span>Zoom</span>
          </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item dense color="primary" @click="setZoomActionState('In')">
            <v-list-item-action>
              <v-icon>mdi-magnify-plus-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>Zoom In</v-list-item-title>
          </v-list-item>
          <v-list-item dense @click="setZoomActionState('Out')">
            <v-list-item-action>
              <v-icon>mdi-magnify-minus-outline</v-icon>
            </v-list-item-action>
            <v-list-item-title>Zoom Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        bottom
        :close-on-content-click="false"
        :nudge-width="400"
        offset-y
        open-on-hover
        rounded="lg"
        class="elevation-6"
        min-width="100"
        max-width="300"
      >
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip dense bottom>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                :color="mode == 'create' ? 'primary' : ''"
                v-bind="attrs"
                icon
                v-on="{ ...tooltip, ...menu }"
              >
                <v-icon>
                  {{
                    shape == "block"
                      ? "mdi-square"
                      : shape == "sphere"
                      ? "mdi-circle"
                      : "mdi-square"
                  }}
                </v-icon>
              </v-btn>
            </template>
            <span>Geometry</span>
          </v-tooltip>
        </template>
        <v-list dense>
          <v-list-item dense @click="setShapeOfCurrentGeometryState('block')">
            <v-list-item-action>
              <v-icon>mdi-square</v-icon>
            </v-list-item-action>
            <v-list-item-title>Block</v-list-item-title>
          </v-list-item>
          <v-list-item
            dense
            @click="setShapeOfCurrentGeometryState('triangle')"
          >
            <v-list-item-action>
              <v-icon>mdi-triangle</v-icon>
            </v-list-item-action>
            <v-list-item-title>Triangle</v-list-item-title>
          </v-list-item>
          <v-list-item
            dense
            color="primary"
            @click="setShapeOfCurrentGeometryState('sphere')"
          >
            <v-list-item-action>
              <v-icon>mdi-circle</v-icon>
            </v-list-item-action>
            <v-list-item-title>Circle</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        :text="!sincronizado"
        :disabled="sincronizado"
        dense
        @click="updateState"
        >{{ sincronizado ? "Data Saved" : "Save changes" }}</v-btn
      >
      <v-spacer />

      <v-tooltip dense bottom>
        <template v-slot:activator="{ on: tooltip, attrs }">
          <v-btn
            @click="view_confirm_eraser_modal = true"
            v-bind="attrs"
            icon
            v-on="tooltip"
          >
            <v-icon>mdi-eraser</v-icon>
          </v-btn>
        </template>
        <span>Clear Canvas</span>
      </v-tooltip>
      <v-dialog max-width="300" v-model="view_confirm_eraser_modal">
        <v-card class="pa-4">
          <v-card-text>
            <v-row> <p class="text-h5">Confirm this action?</p> </v-row>
            <v-row>
              <v-btn @click="(view_confirm_eraser_modal = false), clearCanvas"
                >Yes!</v-btn
              >
              <v-btn @click="view_confirm_eraser_modal = false">No</v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <HelpButton/>
      <Notifications />
      <MenuButton />
    </v-app-bar>
    <v-snackbar v-model="showMessage">
      The triangles was disponible in the interface but was in tests in the
      simulation code.
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavbarDrawing",
  components: {
    MenuButton: () => import("@/components/MenuButton"),
    Notifications: () => import("@/components/Notifications"),
    HelpButton:() => import("@/components/HelpButton")
  },
  computed: {
    ...mapGetters("simulator", ["shape", "mode", "zoomAction", "sincronizado"]),
    nocturne: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(val) {
        localStorage.setItem("NOCTURNE_MODE_ELECTROSFI", val);
        this.$vuetify.theme.dark = val;
      }
    }
  },
  data() {
    return {
      user: "",
      view_confirm_eraser_modal: false,
      view_dropdown_menu: false,
      view_dropdown_menu_geometries: false,
      view_dropdown_menu_zoom: false,
      drawing: false,
      showMessage: false
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapActions("simulator", [
      "setShapeOfCurrentGeometry",
      "setCurrentMode",
      "setZoomAction",
      "openPlotOptions",
      "clearCanvas",
      "updateState"
    ]),
    getUser: function() {
      this.user = window.firebase.auth().currentUser;
    },
    awayMenuClick: function() {
      if (this.view_dropdown_menu) {
        this.view_dropdown_menu = false;
      }
      if (this.view_dropdown_menu_geometries) {
        this.view_dropdown_menu_geometries = false;
      }
      if (this.view_dropdown_menu_zoom) {
        this.view_dropdown_menu_zoom = false;
      } // this.menuAtivo = "Nenhum";
    },
    setShapeOfCurrentGeometryState: function(string) {
      if (string == "triangle") {
        this.showMessage = true;
      }
      this.setShapeOfCurrentGeometry(string);
      this.setCurrentMode("create");
      this.awayMenuClick();
    },
    setZoomActionState: function(string) {
      this.setCurrentMode("zoom");
      this.setZoomAction(string);
      this.awayMenuClick();
    },
    AlteraForma: function(data) {
      this.$emit("AlteraForma", data);
    },
    updateColor: function(data) {
      this.$emit("updateColor", data);
    },
    squareClick: function() {
      this.DefineMode("create");
      this.AlteraForma("rect");
      // this.updateColor("#000");
    },
    openModal: function(data) {
      this.menuAtivo = "Nenhum";
      this.$emit("openModal", data);
    }
  }
};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
