const getCurrentScale = (state) => {
    return state.currentScale
}

const dimensions = (state) => {
    return state.dimensions
}

const coordinates = (state) => {
    return state.coordinates
}

const getUserMaterials = (state) => {
    return state.userMaterials
}

const GeometryList = (state) => {
    return state.GeometryList
}

const materialForm = (state) => {
    return state.materialForm
}

const drawing = (state) => {
    return state.drawing
}

const configKonva = (state) => {
    return state.configKonva
}

const currentGeometry = (state) => {
    return state.currentGeometry
}

const mode = (state) => {
    return state.mode
}
const title = (state) => {
    return state.title
}

const description = (state) => {
    return state.description
}

const resolution = (state) => {
    return state.resolution
}

const until = (state) => {
    return state.plotOptions.until
}

const zoomAction = (state) => {
    return state.zoomAction
}

const currentScale = (state) => {
    return state.currentScale
}
const shape = (state) => {
    return state.shape
}
const color = (state) => {
    return state.color
}

const pml = (state) => {
    return state.pml
}

const pmlThickness = (state) => {
    return state.pml.thickness
}

const geometryData = (state) => {
    var currenGeometryData;
    // let contentGeometryData;
    // if(state.mode == "miniCanvas"){
    //     state.GeometryList.forEach(function (e) {
    //         if (e.token == state.selectedToken) {
    //             contentGeometryData = e;
    //         }
    //     });
    //     contentGeometryData.geometricFillPattern.forEach((e) => {
    //         if(e.token == state.selectedInsideToken){
    //             currenGeometryData = e;
    //         }
    //     });
    // }

    state.GeometryList.forEach(function (e) {
        if (e.token == state.selectedToken) {
            currenGeometryData = e;
        }
    });

    state.SourcesList.forEach(function (e) {
        if (e.token == state.selectedToken) {
            currenGeometryData = e;
        }
    });

    state.FluxList.forEach(function (e) {
        if (e.token == state.selectedToken) {
            currenGeometryData = e;
        }
    });

    return currenGeometryData;
}

const selectedToken = (state) => {
    return state.selectedToken
}

const selectedInsideToken = (state) => {
    return state.selectedInsideToken;
}

const getCurrentKonvaStageLayers = (state) => {
    let contain = state.konvaStage.children[0].children;
    return contain;
}

const SourcesList = (state) => {
    return state.SourcesList;
}

const viewMode = (state) => {
    return state.viewMode;
}

const selectedSourceToken = (state) => {
    return state.selectedSourceToken;
}

const gridVisible = (state) => {
    return state.gridVisible;
}

const loading_simulation = (state) => {
    return state.loading_simulation;
}

const view_simulation = (state) => {
    return state.view_simulation;
}

const scene_simulation = (state) => {
    return state.scene_simulation;
}

const scene_design = (state) => {
    return state.scene_design;
}

const cell = (state) => {
    return state.cell;
}

const showPlotOptions = (state) => {
    return state.showPlotOptions;
}

const generateAxis = (state) => {
    return (state.plotOptions.generateAxis) ? true : false;
}
const generateVideo = (state) => {
    return (state.plotOptions.generateVideo) ? true : false;
}
const generateDielectric = (state) => {
    return (state.plotOptions.generateDielectric) ? true : false;
}
const plotAxis = (state) => {
    return (state.plotOptions.plotAxis) ? true : false;
}
const realtime = (state) => {
    return (state.plotOptions.realtime) ? true : false;
}

const labels = (state) => {
    return (state.plotOptions.labels) ? true : false;
}

const field_parameters = (state) => {
    return (state.plotOptions.field_parameters);
}

const monitor_parameters = (state) => {
    return state.plotOptions.monitor_parameters;
}


const source_parameters = (state) => {
    return state.plotOptions.source_parameters;
}

const plotViews = (state) => {
    return state.plotOptions.plotViews;
}

const boundary_parameters = (state) => {
    return state.plotOptions.boundary_parameters;
}

const eps_parameters = (state) => {
    return state.plotOptions.eps_parameters;
}

const plotOptions = (state) => {
    return state.plotOptions;
}

const FluxList = (state) => {
    return state.FluxList;
}

const showMiniCanvas = (state) => {
    return state.showMiniCanvas;
}

const movie = (state) => {
    return state.movie;
}

const author = (state) => {
    return state.author;
}
const id = (state) => {
    return state.id;
}

const showModalSettingsFlux = (state) => {
    return state.showModalSettingsFlux;
}

const sincronizado = (state) => {
    return state.sincronizado;
}

const showError = (state) => {
    return state.showError;
}

const errorMessage = (state) => {
    return state.errorMessage;
}
const errors = (state) => {
    return state.errors;
}
export {
    getCurrentScale,
    getCurrentKonvaStageLayers,
    GeometryList,
    drawing,
    gridVisible,
    configKonva,
    currentGeometry,
    geometryData,
    mode,
    zoomAction,
    currentScale,
    shape,
    color,
    selectedToken,
    materialForm,
    getUserMaterials,
    SourcesList,
    viewMode,
    selectedSourceToken,
    dimensions,
    coordinates,
    loading_simulation,
    view_simulation,
    scene_simulation,
    pml,
    pmlThickness,
    title,
    description,
    resolution,
    until,
    cell,
    scene_design,
    showPlotOptions,
    generateAxis,
    generateVideo,
    generateDielectric,
    plotAxis,
    realtime,
    labels,
    field_parameters,
    monitor_parameters,
    source_parameters,
    plotViews,
    boundary_parameters,
    eps_parameters,
    plotOptions,
    FluxList,
    showMiniCanvas,
    selectedInsideToken,
    movie,
    author,
    id,
    showModalSettingsFlux,
    sincronizado,
    showError,
    errorMessage,
    errors
}
