import { mapGetters } from "vuex";
export default {
    ...mapGetters("simulator", [
        "getCurrentScale",
        "GeometryList",
        "drawing",
        "configKonva",
        "currentGeometry",
        "mode",
        "zoomAction",
        "currentScale",
        "shape",
        "color",
        "gridVisible",
        "geometryData",
        "selectedToken",
        "SourcesList",
        "viewMode",
        "cell",
        "dimensions",
        "scene_simulation",
        "view_simulation",
        "FluxList",
        "showMiniCanvas"
    ]),
}