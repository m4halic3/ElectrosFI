import md5 from "js-md5";
import { mapActions } from "vuex";

const methods = {
    geometryBordered: function (objeto) {
        const content = {
            stroke: "#3eb772",
        };
        return Object.assign(content, objeto);
    },
    ...mapActions("simulator", [
        "GeometryListAppendAction",
        "setGeometryList",
        "updateState",
        "setDrawingStatusAction",
        "setKonvaStageAction",
        "setState",
        "setSelectedTokenAction",
        "setCurrentGeometryAction",
        "ZOOM",
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
        "setCurrentGeometryRotation"
    ]),
    mouseDownEvent: function (event) {
        if (this.mode === "create") {
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            this.setSelectedTokenAction("");
            this.updateTransformer();
            stage.stopDrag();
            this.InicioDesenho(event);
            this.setKonvaStageAction(this.$refs.transformer.getNode().getStage());
        } else if (this.mode === "sources") {
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            this.setSelectedTokenAction("");
            this.updateTransformer();
            stage.stopDrag();
            this.addSource(event);
            this.setKonvaStageAction(this.$refs.transformer.getNode().getStage());
        } else if (this.mode === "flux") {
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            this.setSelectedTokenAction("");
            this.updateTransformer();
            stage.stopDrag();
            this.addSource(event, true);
            this.setKonvaStageAction(this.$refs.transformer.getNode().getStage());
        } else if (this.mode === "zoom") {
            this.ZOOM(event);
        } else if (this.mode === "transform") {
            this.setSelectedTokenAction("");
        }
    },

    mouseDownTransformEvent: function (event) {
        if (this.mode === "transform") {
            this.Transformer(event);
            this.setKonvaStageAction(this.$refs.transformer.getNode().getStage());
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
        if (e.target.attrs.rotation) this.setCurrentGeometryRotation(parseFloat(e.target.attrs.rotation.toFixed(3)));
    },
    handleDrag: function (e) {
        this.setCurrentGeometryPosX(Number(e.currentTarget.attrs.x.toFixed(2)));
        this.setCurrentGeometryPosY(Number(e.currentTarget.attrs.y.toFixed(2)));
    },
    addSource: function (event, flux = false) {
        const stage = event.target.getStage();
        const pos = stage.getPointerPosition();
        let token = md5.hex(Date.now().toString());
        var oldScale = event.target.getStage().scaleX();
        var PosicaoInicial = {
            x: (pos.x - event.target.getStage().x()) / oldScale,
            y: (pos.y - event.target.getStage().y()) / oldScale,
        };
        var name = "Source " + (this.SourcesList.length + 1);
        var fill = "#FF0000";
        var className = "source";
        var fluxData = {};
        if (flux) {
            name = "Flux " + (this.FluxList.length + 1);
            fill = "#0000FF";
            className = "flux";
            fluxData = {
                type: 'transmittance_spectrum',
                fcen: 0,
                nfreq: 0,
                df: 0,
                run_norm: 0,
                transmittance_normal_flux: {
                    center: {
                        x: PosicaoInicial.x,
                        y: PosicaoInicial.y,
                        z: 0,
                    },
                    size: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                transmittance_flux: {
                    center: {
                        x: PosicaoInicial.x,
                        y: PosicaoInicial.y,
                        z: 0,
                    },
                    size: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                },
                reflected_flux: {
                    center: {
                        x: PosicaoInicial.x,
                        y: PosicaoInicial.y,
                        z: 0,
                    },
                    size: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }
            }
        }

        var newSource = {
            ...fluxData,
            width: 5,
            height: 5,
            radius: 10,
            token,
            frequency: 0,
            waveLength: 0,
            fwidth: 0,
            integrated: 0,
            waveWidth: 0,
            component: "Ez",
            waveSize: [0, 0],
            name,
            fill,
            sourceType: "continuous",
            class: className,
            shape: "sphere",
            x: PosicaoInicial.x,
            y: PosicaoInicial.y,
            posX: PosicaoInicial.x,
            posY: PosicaoInicial.y,
            dragBoundFunc: function (pos) {
                const content = event.target.getStage().children[0].children[0];
                const currentScale = this.VueComponent.$store.getters[
                    "simulator/getCurrentScale"
                ];
                var posicaoX =
                    pos.x <= content.absolutePosition().x ||
                        pos.x >=
                        content.size().width * currentScale +
                        content.absolutePosition().x -
                        this.size().width * currentScale
                        ? this.absolutePosition().x
                        : pos.x;

                var posicaoY =
                    pos.y <= content.absolutePosition().y ||
                        pos.y >=
                        content.absolutePosition().y +
                        content.size().height * currentScale -
                        this.size().height * currentScale
                        ? this.absolutePosition().y
                        : pos.y;

                return {
                    x: posicaoX,
                    y: posicaoY,
                };
            },
        };
        if (flux) {
            this.FluxListAppend(newSource);
        } else {
            this.SourcesListAppend(newSource);
        }
    },
    InicioDesenho: function (event) {
        if (this.mode != "create") return false;
        if (this.drawing) return false;
        let token = md5.hex(Date.now().toString());
        var oldScale = event.target.getStage().scaleX();
        var pointer = event.target.getStage().getPointerPosition();

        var PosicaoInicial = {
            x: (pointer.x - event.target.getStage().x()) / oldScale,
            y: (pointer.y - event.target.getStage().y()) / oldScale,
        };


        this.setCurrentGeometryAction({
            name: this.shape + " " + (this.GeometryList.length + 1),
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
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            geometricFill: {
                properties: {
                    name: `Default ${this.shape + " " + (this.GeometryList.length + 1)}`,
                    width: 1,
                    height: 1,
                    image: ''
                },
                elements: []
            },
            geometricFillPattern: []
        });

        if (this.shape == "triangle") {
            this.currentGeometry.closed = true;
            this.currentGeometry.points = [0, 0, 0, 0, 0];
            this.currentGeometry.sides = 3;
            this.currentGeometry.visible = true;
        }

        this.setDrawingStatusAction(true);
        this.GeometryListAppendAction(this.currentGeometry);
    },
    MudarTamanhoDesenho: function (event) {
        if (!this.drawing) return false;

        var CurrentElement = this.GeometryList.length - 1;
        let posicaoInicialX = this.GeometryList[CurrentElement].x;
        let posicaoInicialY = this.GeometryList[CurrentElement].y;

        var oldScale = event.target.getStage().scaleX();
        var pointer = event.target.getStage().getPointerPosition();

        let posicalMouseX = (pointer.x - event.target.getStage().x()) / oldScale;
        let posicalMouseY = (pointer.y - event.target.getStage().y()) / oldScale;

        let shape = this.GeometryList[CurrentElement].shape;
        var AtualGeometry = this.GeometryList[CurrentElement];

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
        this.setKonvaStageAction(this.$refs.transformer.getNode().getStage());
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
        const transformerNode = this.$refs.transformer.getNode();
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
    }
};
export default methods;