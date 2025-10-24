export default {
  fcen: {
    get() {
      return this.geometryData["fcen"];
    },
    set(val) {
      this.updateGeometry(["fcen", Number(val)]);
    },
  },
  df: {
    get() {
      return this.geometryData["df"];
    },
    set(val) {
      this.updateGeometry(["df", Number(val)]);
    },
  },
  nfreq: {
    get() {
      return this.geometryData["nfreq"];
    },
    set(val) {
      this.updateGeometry(["nfreq", Number(val)]);
    },
  },
  flux_type: {
    get() {
      return this.geometryData.type;
    },
    set(val) {
      this.updateGeometry(['type', val]);
    },
  },
  run_norm: {
    get() {
      return this.geometryData["run_norm"];
    },
    set(val) {
      this.updateGeometry(["run_norm", Number(val)]);
    },
  },
  //#region 
  transmittance_normal_flux_x: {
    get() {
      let pos =
        (this.geometryData["transmittance_normal_flux"]["center"]["x"] + this.geometryData.width / 2) /
        this.dimensions.relationship.x -
        this.coordinates.x / 2;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["transmittance_normal_flux"]["center"];
      center["x"] = Number(val);
      this.updateGeometry(["transmittance_normal_flux", "center", center]);
    },
  },
  transmittance_normal_flux_y: {
    get() {
      let pos =
        (this.coordinates.y / 2 -
          (this.geometryData.transmittance_normal_flux.center.y + this.geometryData.height / 2) /
          this.dimensions.relationship.y) *
        -1;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["transmittance_normal_flux"]["center"];
      center["y"] = Number(val);
      this.updateGeometry(["transmittance_normal_flux", "center", center]);
    },
  },
  transmittance_normal_flux_width: {
    get() {
      return this.geometryData["transmittance_normal_flux"]["size"]["x"];
    },
    set(val) {
      let size = this.geometryData["transmittance_normal_flux"]["size"];
      size["x"] = Number(val);
      this.updateGeometry(["transmittance_normal_flux", "size", size]);
    },
  },
  transmittance_normal_flux_height: {
    get() {
      return this.geometryData["transmittance_normal_flux"]["size"]["y"];
    },
    set(val) {
      let size = this.geometryData["transmittance_normal_flux"]["size"];
      size["y"] = Number(val);
      this.updateGeometry(["transmittance_normal_flux", "size", size]);
    },
  },
  //#endregion
  //#region 
  transmittance_flux_x: {
    get() {
      let pos =
        (this.geometryData.transmittance_flux.center.x + this.geometryData.width / 2) /
        this.dimensions.relationship.x -
        this.coordinates.x / 2;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["transmittance_flux"]["center"];
      center["x"] = Number(val);
      this.updateGeometry(["transmittance_flux", "center", center]);
    },
  },
  transmittance_flux_y: {
    get() {
      let pos =
        (this.coordinates.y / 2 -
          (this.geometryData.transmittance_flux.center.y + this.geometryData.height / 2) /
          this.dimensions.relationship.y) *
        -1;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["transmittance_flux"]["center"];
      center["y"] = Number(val);
      this.updateGeometry(["transmittance_flux", "center", center]);
    },
  },
  transmittance_flux_width: {
    get() {
      return this.geometryData["transmittance_flux"]["size"]["x"];
    },
    set(val) {
      let size = this.geometryData["transmittance_flux"]["size"];
      size["x"] = Number(val);
      this.updateGeometry(["transmittance_flux", "size", size]);
    },
  },
  transmittance_flux_height: {
    get() {
      return this.geometryData["transmittance_flux"]["size"]["y"];
    },
    set(val) {
      let size = this.geometryData["transmittance_flux"]["size"];
      size["y"] = Number(val);
      this.updateGeometry(["transmittance_flux", "size", size]);
    },
  },
  //#endregion
  //#region 
  reflected_flux_x: {
    get() {
      let pos =
        (this.geometryData.reflected_flux.center.x + this.geometryData.width / 2) /
        this.dimensions.relationship.x -
        this.coordinates.x / 2;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["reflected_flux"]["center"];
      center["x"] = Number(val);
      this.updateGeometry(["reflected_flux", "center", center]);
    },
  },
  reflected_flux_y: {
    get() {
      let pos =
        (this.coordinates.y / 2 -
          (this.geometryData.reflected_flux.center.y + this.geometryData.height / 2) /
          this.dimensions.relationship.y) *
        -1;
      return pos.toFixed(3);
    },
    set(val) {
      let center = this.geometryData["reflected_flux"]["center"];
      center["y"] = Number(val);
      this.updateGeometry(["reflected_flux", "center", center]);
    },
  },
  reflected_flux_width: {
    get() {
      return this.geometryData["reflected_flux"]["size"]["x"];
    },
    set(val) {
      let size = this.geometryData["reflected_flux"]["size"];
      size["x"] = Number(val);
      this.updateGeometry(["reflected_flux", "size", size]);
    },
  },
  reflected_flux_height: {
    get() {
      return this.geometryData["reflected_flux"]["size"]["y"];
    },
    set(val) {
      let size = this.geometryData["reflected_flux"]["size"];
      size["y"] = Number(val);
      this.updateGeometry(["reflected_flux", "size", size]);
    },
  },
  //#endregion
}