import md5 from "js-md5";
import { mapActions } from "vuex";

const methods = {
    /**
    * Adiciona borda à geometria selecionada
    *
    * @param {Object} objeto
    * @public
    */
    geometryBordered: function (objeto) {
        const content = {
            stroke: "#3eb772",
        };
        return Object.assign(content, objeto);
    },
    ...mapActions("simulator", [
        "setCurrentGeometryFillPattern",
        "GeometryListAppendAction",
        "setGeometryList",
        "setDrawingStatusAction",
        "setKonvaStageAction",
        "setSelectedTokenAction",
        "setCurrentGeometryAction",
        "ZOOM",
        "setCurrentMode",
        "keyPressAction",
        "keySolveAction",
        "GeometryListRemove",
        "setCurrentGeometryData",
        "setCurrentGeometrySizeWidth",
        "setCurrentGeometrySizeHeight",
        "setCurrentGeometryRadius",
        "SourcesListAppend",
        "setCurrentGeometryPosX",
        "setCurrentGeometryPosY",
        "FluxListAppend",
        "set_showMiniCanvas",
        "setGeometricFillPatternList",
        "removeGeometricItem",
        "setShapeOfCurrentGeometry",
        "setSelectedInsideToken",
        "setPropertiesGeometryFill",
        "setGeometryFill",
        "setCurrentGeometricElementMiniCanvas"
    ]),
    mouseDownEvent: function (event) {
        if (this.mode === "miniCanvas") {
            const transformerNode = this.$refs.transformerMiniCanvas.getNode();
            const stage = transformerNode.getStage();
            // this.setSelectedTokenAction("");
            this.updateTransformer();
            stage.stopDrag();
            this.InicioDesenho(event);
            this.setKonvaStageAction(this.$refs.transformerMiniCanvas.getNode().getStage());
        }
    },

    mouseDownTransformEvent: function (event) {
        if (this.mode === "transform") {
            this.Transformer(event);
            this.setKonvaStageAction(this.$refs.transformerMiniCanvas.getNode().getStage());
        }
    },
    handleTransformStart: function (e) {
        this.currentStart = {
            width: e.target.size().width,
            scaleX: e.target.scaleX(),
        };
    },

    handleTransform: function (e) {
        if (e.target.attrs.shape == "block") {
            this.setCurrentGeometrySizeWidth(
                e.target.attrs.width * e.target.attrs.scaleX
            );
            this.setCurrentGeometrySizeHeight(
                e.target.attrs.height * e.target.attrs.scaleY
            );
        } else if (e.target.attrs.shape == "sphere") {
            this.setCurrentGeometryRadius(
                e.target.attrs.radius * e.target.attrs.scaleY
            );
        }
    },
    handleDrag: function (e) {
        this.setCurrentGeometryPosX(Number(e.currentTarget.attrs.x.toFixed(2)));
        this.setCurrentGeometryPosY(Number(e.currentTarget.attrs.y.toFixed(2)));
    },
    InicioDesenho: function (event) {
        if (this.mode != "miniCanvas") return;
        if (this.drawing) return false;
        let token = md5.hex(Date.now().toString());
        var oldScale = event.target.getStage().scaleX();
        var pointer = event.target.getStage().getPointerPosition();

        var PosicaoInicial = {
            x: (pointer.x - event.target.getStage().x()) / oldScale,
            y: (pointer.y - event.target.getStage().y()) / oldScale,
        };

        var geometry = {
            name: "inner " + this.shape + " " + (this.currentGeometry.geometricFillPattern.length + 1),
            token: token,
            x: PosicaoInicial.x,
            y: PosicaoInicial.y,
            fill: this.color,
            shape: this.shape,
            epsilon: 12,
            class: "geometry",
            width: 0,
            height: 0,
            materialId: 0,
            radius: 0,
            scaleX: 1,
            scaleY: 1,
        };


        // this.setCurrentGeometryAction(geometry);

        if (this.shape == "triangle") {
            geometry.closed = true;
            geometry.points = [0, 0, 0, 0, 0];
            geometry.sides = 3;
            geometry.visible = true;
        }

        this.setDrawingStatusAction(true);
        this.setCurrentGeometryFillPattern(geometry);
    },
    MudarTamanhoDesenho: function (event) {
        if (!this.drawing) return false;
        var geometricListObjects = this.currentGeometry.geometricFillPattern;

        var CurrentElement = geometricListObjects.length - 1;
        let posicaoInicialX = geometricListObjects[CurrentElement].x;
        let posicaoInicialY = geometricListObjects[CurrentElement].y;

        var oldScale = event.target.getStage().scaleX();
        var pointer = event.target.getStage().getPointerPosition();

        let posicalMouseX = (pointer.x - event.target.getStage().x()) / oldScale;
        let posicalMouseY = (pointer.y - event.target.getStage().y()) / oldScale;

        let shape = geometricListObjects[CurrentElement].shape;
        var AtualGeometry = geometricListObjects[CurrentElement];

        let DinamicPos = {
            height: posicalMouseY - posicaoInicialY,
            width: posicalMouseX - posicaoInicialX,
        };

        if (shape == "triangle") {
            AtualGeometry.points[3] = DinamicPos.height;
            AtualGeometry.points[4] = DinamicPos.width;
            AtualGeometry.points[5] = DinamicPos.height;
        }

        if (shape == "sphere") {
            AtualGeometry.radius = DinamicPos.width < 0 ? 1 : DinamicPos.width;
            AtualGeometry.height = DinamicPos.height < 0 ? 1 : DinamicPos.height;
            AtualGeometry.width = DinamicPos.width < 0 ? 1 : DinamicPos.width;
        } else {
            AtualGeometry.radius = DinamicPos.width;
            AtualGeometry.height = DinamicPos.height;
            AtualGeometry.width = DinamicPos.width;
        }
    },
    FimDesenho: function () {
        this.setDrawingStatusAction(false);
        if (this.mode !== "transform") {
            // this.setSelectedTokenAction(
            //   this.GeometryList[this.GeometryList.length - 1].Geometry.token
            // );
        }
        this.setKonvaStageAction(this.$refs.transformerMiniCanvas.getNode().getStage());
    },
    Transformer: function (e) {
        if (e.target === e.target.getStage() || e.target.attrs.token == "main") {
            this.selectedShapeName = "";
            this.updateTransformer();
            return;
        }

        const clickedOnTransformer =
            e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }

        const token = e.target.attrs.token;
        if (token != "") {
            this.setSelectedTokenAction(token);
        } else {
            this.setSelectedTokenAction("");
        }
        this.updateTransformer();
    },
    updateTransformer: function () {
        const transformerNode = this.$refs.transformerMiniCanvas.getNode();
        const stage = transformerNode.getStage();
        var selectedNode = stage.findOne((node) => {
            return node.getAttr("token") === this.selectedToken;
        });

        if (selectedNode === transformerNode.node()) {
            return;
        }

        if (selectedNode) {
            transformerNode.attachTo(selectedNode);
            transformerNode.rotateEnabled(true);

            if (selectedNode.x() > 600) {
                selectedNode.draggable(false);
            } else {
                selectedNode.draggable(true);
            }

            window.addEventListener("keydown", (e) => {
                if (e.key == "Delete") {
                    this.GeometryListRemove(this.selectedToken);
                    this.updateTransformer();
                }
            });
        } else {
            transformerNode.detach();
        }
        this.updateTransformer();

        transformerNode.getLayer().batchDraw();
    },
    setShapeOfCurrentGeometryState: function (string) {
        if (string == "triangle") {
            this.showMessage = true;
        }
        this.setShapeOfCurrentGeometry(string);
    },
    setSelectedLocalTokenAction: function (token) {
        this.setSelectedInsideToken(token);
    },
    GeometricLocalListRemove: function (token) {
        let indexToRemove;
        let currentGeometryLocal;
        this.GeometryList.forEach((element) => {
            if (element.token == this.selectedToken) {
                currentGeometryLocal = element;
            }
        });
        currentGeometryLocal.geometricFillPattern.forEach((element, index) => {
            if (element.token == token) {
                indexToRemove = index;
            }
        });

        this.removeGeometricItem(indexToRemove);
    },
    verifyGeometry: function (string) {
        var arr = [];
        let currentGeometryLocal;
        this.GeometryList.forEach((element) => {
            if (element.token == this.selectedToken) {
                currentGeometryLocal = element;
            }
        });

        currentGeometryLocal.geometricFillPattern.forEach((element) => {
            if (element.shape == string) {
                arr.push(element);
            }
        });
        return arr;
    },
    /**
    * Atualiza a geometria atual selecionada
    *
    * @param {Object}
    * @public
    */
    setSelectedGeometric: function (campo, val) {
        var geometriaSelecionada = this.selectedGeometric;
        this.setCurrentGeometricElementMiniCanvas([geometriaSelecionada[0].token, campo, val])
    },
};
export default methods;