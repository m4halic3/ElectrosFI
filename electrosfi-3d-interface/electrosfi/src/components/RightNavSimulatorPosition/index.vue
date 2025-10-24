<template>
  <v-expansion-panel v-if="selectedToken !== ''">
    <v-expansion-panel-header>Position</v-expansion-panel-header>
    <v-expansion-panel-content>
      <section class="item-body">
        <v-col>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrX"
                outlined
                dense
                label="X"
                color="primary"
                type="number"
                readonly
                @click="dialog = true"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="contentGeometrY"
                outlined
                dense
                label="Y"
                color="primary"
                type="number"
                readonly
                @click="dialog = true"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-if="is3d"
                v-model="contentGeometrZ"
                outlined
                dense
                label="Z"
                color="primary"
                type="number"
                readonly
                @click="dialog = true"
              />
            </v-col>
          </v-row>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="faded"
                block
                small
                v-bind="attrs"
                v-on="on"
              >
                Manual insert
              </v-btn>
            </template>

            <v-card>
              <v-card-title> Manual size and position insert </v-card-title>

              <v-card-text>
                Insert new values to size and position to this element.
                <p class="text-subtitle-2 mt-5">
                  Position (&mu;m)
                </p>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="contentGeometrX"
                      outlined
                      dense
                      label="X"
                      color="primary"
                      type="number"
                      @keydown.enter="updateSizeAndPositionLocal"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="contentGeometrY"
                      outlined
                      dense
                      label="Y"
                      color="primary"
                      type="number"
                      @keydown.enter="updateSizeAndPositionLocal"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-if="is3d"
                      v-model="contentGeometrZ"
                      outlined
                      dense
                      label="Z"
                      color="primary"
                      type="number"
                      @keydown.enter="updateSizeAndPositionLocal"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="updateSizeAndPositionLocal"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </section>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Position",
  data: () => {
    return {
      dialog: false,
      posX: 0,
      posY: 0,
      posZ: 0
    };
  },
  props: {
    is3d: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions("simulator", [
      "setCurrentGeometryPosY",
      "setCurrentGeometryPosX",
      "setCurrentGeometryPosZ",
      "updateSizeAndPosition",
    ]),
    updateSizeAndPositionLocal: function () {
      this.dialog = false;
      

      if (this.is3d) {
        this.setCurrentGeometryPosX(this.posX);
        this.setCurrentGeometryPosY(this.posY);
        this.setCurrentGeometryPosZ(this.posZ);
      } else {
        this.setCurrentGeometryPosX(
          (this.posX + this.coordinates.x / 2) * this.dimensions.relationship.x -
            this.geometryData.width / 2
        );

        this.setCurrentGeometryPosY(
          (this.posY + this.coordinates.y / 2) * this.dimensions.relationship.y -
            this.geometryData.height / 2
        );
      }
    },
  },
  computed: {
    ...mapGetters("simulator", [
      "selectedToken",
      "geometryData",
      "dimensions",
      "coordinates",
      "currentGeometry",
    ]),
    contentGeometrX: {
      get() {
        if(!this.geometryData) return 0;
        let pos;
        if (this.is3d) {
          pos = this.geometryData.x;
        } else {
          pos = (this.geometryData.x + this.geometryData.width / 2) /
            this.dimensions.relationship.x -
          this.coordinates.x / 2;
        }
        return pos.toFixed(3);
      },
      set(value) {
        this.posX = Number(value);
      },
    },
    contentGeometrY: {
      get() {
        if(!this.geometryData) return 0;
        let pos;
        if (this.is3d) {
          pos = this.geometryData.y;
        } else {
          pos = (this.geometryData.y + this.geometryData.height / 2) /
            this.dimensions.relationship.y -
          this.coordinates.y / 2;
        }
        return pos.toFixed(3);
      },
      set(value) {
        this.posY = Number(value);
      },
    },
    contentGeometrZ: {
      get() {
        if(!this.geometryData) return 0;
        let pos = this.geometryData.x;
        return pos.toFixed(3);
      },
      set(value) {
        this.posZ = Number(value);
      },
    },
  },
};
</script>