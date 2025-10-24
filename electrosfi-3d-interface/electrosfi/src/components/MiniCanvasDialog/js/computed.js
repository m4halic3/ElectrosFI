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
        "showMiniCanvas",
        "selectedInsideToken"]),
    width: {
        set(content) {
            this.setPropertiesGeometryFill(['width', Number(content)]);
        },
        get() {
            return Number(this.currentGeometryLocal.geometricFill.properties.width);
        }
    },
    name: {
        set(content) {
            this.setPropertiesGeometryFill(['name', content]);
        },
        get() {
            return this.currentGeometryLocal.geometricFill.properties.name;
        }
    },
    height: {
        set(content) {
            this.setPropertiesGeometryFill(['height', Number(content)]);
        },
        get() {
            return Number(this.currentGeometryLocal.geometricFill.properties.height);
        }
    },
    geometryListDraggableContent: {
        get() {
            return Object.entries(this.currentGeometryLocal.geometricFillPattern)
                .reverse()
                .map((entry) => entry[1]);
        },
        set(value) {
            this.setGeometricFillPatternList(value.reverse());
        },
    },
    showMiniCanvasLocal: {
        set(val) {
            this.set_showMiniCanvas(val);
        },
        get() {
            return this.showMiniCanvas;
        },
    },
    circleGeometry: function () {
        return this.verifyGeometry("sphere");
    },
    blockGeometry: function () {
        return this.verifyGeometry("block");
    },
    triangleGeometry: function () {
        return this.verifyGeometry("triangle");
    },
    currentGeometryLocal: function () {
        let currentGeometryLocal;
        if (this.selectedToken == "") return {};
        this.GeometryList.forEach((element) => {
            if (element.token == this.selectedToken) {
                currentGeometryLocal = element;
            }
        });
        return currentGeometryLocal;
    },
    widthGeometry: {
        get() {
            return this.selectedGeometric[0].width / (400 / this.width);
        },
        set(val) {
            this.setSelectedGeometric("width", val * (400 / this.width));
        }
    },
    heightGeometry: {
        get() {
            return this.selectedGeometric[0].height / (400 / this.height);
        },
        set(val) {
            this.setSelectedGeometric("height", val * (400 / this.height));
        }
    },
    xGeometry: {
        get() {
            return (this.selectedGeometric[0].x - this.dimensions.width/2)/ this.dimensions.relationship.x;
        },
        set(val) {
            this.setSelectedGeometric("x", (val * this.dimensions.relationship.x) + this.dimensions.width/2);
        }
    },
    yGeometry: {
        get() {
            return (this.selectedGeometric[0].y - this.dimensions.height/2)/ this.dimensions.relationship.y;
        },
        set(val) {
            this.setSelectedGeometric("y", (val * this.dimensions.relationship.y) + this.dimensions.height/2);
        }
    },
    nameGeometry: {
        get() {
            return this.selectedGeometric[0].name;
        },
        set(val) {
            this.setSelectedGeometric("name", val);
        }
    },
    selectedGeometric: function () {
        let currentGeometryLocal;
        let elementLocal = [];

        this.GeometryList.forEach((element) => {
            if (element.token == this.selectedToken) {
                currentGeometryLocal = element;
            }
        });

        currentGeometryLocal.geometricFillPattern.forEach((element, indice) => {
            if (element.token == this.selectedInsideToken) {
                elementLocal = [element, indice];
            }
        });

        return elementLocal;
    },
}