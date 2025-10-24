
const GeometryListAppendAction = ({ dispatch, commit }, geometry) => {
    commit('GeometryListAppend', geometry);
    dispatch('updateState');
}

const setShapeOfCurrentGeometry = ({ dispatch, commit }, data) => {
    commit('setShapeOfCurrentGeometry', data);
    dispatch('updateState');
}
const RunSimulation = ({ dispatch, commit }) => {
    commit('runSimulation');
    dispatch('updateState');
}

const Run3dSimulation = ({ dispatch, commit }) => {
    commit('run3dSimulation');
    dispatch('updateState');
}

const SourcesListAppend = ({ dispatch, commit }, content) => {
    commit('SourcesListAppend', content);
    dispatch('updateState');
}

const setDrawingStatusAction = ({ commit }, content) => {
    commit('setDrawingStatus', content);
}

const setKonvaStageAction = ({ commit }, content) => {
    commit('setKonvaStage', content);
}

const setSelectedTokenAction = ({ commit }, content) => {
    if (content.length > 0) {
        commit('setCurrentMode', 'transform');
    }
    commit('setSelectedToken', content);
}
const setCurrentMode = ({ commit }, content) => {
    commit('setCurrentMode', content);
}
const setSelectedShapeNameAction = ({ dispatch, commit }, content) => {
    commit('setSelectedShapeName', content);
    dispatch('updateState');
}

const setCurrentGeometryAction = ({ commit }, content) => {
    commit('setCurrentGeometry', content);
}

const ZOOM = ({ commit }, content) => {
    commit('ZOOM', content);
}

const keyPressAction = ({ commit }, content) => {
    commit('keyPress', content);
}

const keySolveAction = ({ commit }, content) => {
    commit('keySolve', content);
}

const setCurrentKonvaStageLayers = ({ commit }, content) => {
    commit('setCurrentKonvaStageLayers', content);
}

const setGeometryList = ({ dispatch, commit }, content) => {
    commit('setGeometryList', content)
    dispatch('updateState');
}

const setSourcesList = ({ dispatch, commit }, content) => {
    commit('setSourcesList', content)
    dispatch('updateState');
}

const setCurrentGeometryData = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryData', content)
    dispatch('updateState');
}

const setCurrentGeometrySize = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometrySize', content)
    dispatch('updateState');
}

const setCurrentGeometrySizeWidth = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometrySizeWidth', content)
    dispatch('updateState');
}

const setCurrentGeometrySizeHeight = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometrySizeHeight', content)
    dispatch('updateState');
}

const setCurrentGeometrySizeDepth = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometrySizeDepth', content)
    dispatch('updateState')
}

const setCurrentGeometryPosX = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryPosX', content)
    dispatch('updateState');
}

const setCurrentGeometryPosY = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryPosY', content)
    dispatch('updateState');
}

const setCurrentGeometryPosZ = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryPosZ', content)
    dispatch('updateState');
}

const GeometryListRemove = ({ dispatch, commit }, content) => {
    commit('GeometryListRemove', content)
    dispatch('updateState');
}

const setCurrentGeometryRadius = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryRadius', content)
    dispatch('updateState');
}

const setCurrentGeometryFrequency = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryFrequency', content)
    dispatch('updateState');
}

const setCurrentGeometryWaveLength = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryWaveLength', content)
    dispatch('updateState');
}

const setCurrentGeometryWaveWidth = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryWaveWidth', content)
    dispatch('updateState');
}

const setCurrentGeometryWaveSize = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryWaveSize', content)
    dispatch('updateState');
}

const setCurrentGeometryIntegrated = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryIntegrated', content)
    dispatch('updateState');
}

const setMaterialForm = ({ commit }, content) => {
    commit('setMaterialForm', content);
}

const setUserMaterials = ({ dispatch, commit }, materialsArray) => {
    commit('setUserMaterials', materialsArray)
    dispatch('updateState');
}

const setMaterialOfCurrentGeometry = ({ dispatch, commit }, content) => {
    commit('setMaterialOfCurrentGeometry', content);
    dispatch('updateState');
}
const setCurrentViewMode = ({ commit }, content) => {
    commit('setCurrentViewMode', content);
}

const setSelectedSourceToken = ({ commit }, content) => {
    commit('setSelectedToken', content);
}

const setViewSimulation = ({ commit }, content) => {
    commit('setViewSimulation', content);
}

const setLoadingSimulation = ({ commit }, content) => {
    commit('setLoadingSimulation', content);
}

const setSceneSimulation = ({ dispatch, commit }, content) => {
    commit('setSceneSimulation', content);
    dispatch('updateState');
}

const setPMLThickness = ({ dispatch, commit }, content) => {
    commit('setPMLThickness', content)
    dispatch('updateState');
}

const setTitle = ({ dispatch, commit }, content) => {
    commit('setTitle', content)
    dispatch('updateState');
}

const setDescription = ({ dispatch, commit }, content) => {
    commit('setDescription', content)
    dispatch('updateState');
}

const setResolution = ({ dispatch, commit }, content) => {
    commit('setResolution', content)
    dispatch('updateState');
}

const setUntil = ({ dispatch, commit }, content) => {
    commit('setUntil', content)
    dispatch('updateState');
}

const setCoordinates = ({ dispatch, commit }, content) => {
    commit('setCoordinates', content)
    dispatch('updateState');
}

const setCell = ({ dispatch, commit }, content) => {
    commit('setCell', content)
    dispatch('updateState');
}

const updateSizeAndPosition = ({ dispatch, commit }, content) => {
    commit('updateSizeAndPosition', content);
    dispatch('updateState');
}

const openPlotOptions = ({ commit }, content) => {
    commit('openPlotOptions', content);
}

const set_field_parameters = ({ dispatch, commit }, content) => {
    commit('set_field_parameters', content);
    dispatch('updateState');
}

const set_monitor_parameters = ({ dispatch, commit }, content) => {
    commit('set_monitor_parameters', content);
    dispatch('updateState');
}

const set_source_parameters = ({ dispatch, commit }, content) => {
    commit('set_source_parameters', content);
    dispatch('updateState');
}

const set_plotViews = ({ dispatch, commit }, content) => {
    commit('set_plotViews', content);
    dispatch('updateState');
}

const set_boundary_parameters = ({ dispatch, commit }, content) => {
    commit('set_boundary_parameters', content);
    dispatch('updateState');
}

const set_eps_parameters = ({ dispatch, commit }, content) => {
    commit('set_eps_parameters', content);
    dispatch('updateState');
}

const set_generateAxis = ({ dispatch, commit }, content) => {
    commit('set_generateAxis', content);
    dispatch('updateState');
}
const set_generateVideo = ({ dispatch, commit }, content) => {
    commit('set_generateVideo', content);
    dispatch('updateState');
}
const set_generateDielectric = ({ dispatch, commit }, content) => {
    commit('set_generateDielectric', content);
    dispatch('updateState');
}
const set_plotAxis = ({ dispatch, commit }, content) => {
    commit('set_plotAxis', content);
    dispatch('updateState');
}
const set_realtime = ({ dispatch, commit }, content) => {
    commit('set_realtime', content);
    dispatch('updateState');
}

const set_labels = ({ dispatch, commit }, content) => {
    commit('set_labels', content);
    dispatch('updateState');
}

const set_plotOptions = ({ dispatch, commit }, content) => {
    commit('set_plotOptions', content);
    dispatch('updateState');
}

const FluxListAppend = ({ dispatch, commit }, content) => {
    commit('FluxListAppend', content);
    dispatch('updateState');
}

const setFluxList = ({ dispatch, commit }, content) => {
    commit('setFluxList', content);
    dispatch('updateState');
}

const setZoomAction = ({ commit }, content) => {
    commit('setZoomAction', content);
}
const set_showMiniCanvas = ({ commit }, content) => {
    commit('set_showMiniCanvas', content);
}

const setCurrentGeometryFillPattern = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometryFillPattern', content);
    dispatch('updateState');
}
const setGeometricFillPatternList = ({ dispatch, commit }, content) => {
    commit('setGeometricFillPatternList', content);
    dispatch('updateState');
}

const removeGeometricItem = ({ dispatch, commit }, content) => {
    commit('removeGeometricItem', content);
    dispatch('updateState');
}

const setSelectedInsideToken = ({ commit }, content) => {
    commit('setSelectedInsideToken', content);
}

const setPropertiesGeometryFill = ({ dispatch, commit }, content) => {
    commit('setPropertiesGeometryFill', content);
    dispatch('updateState');
}

const setGeometryFill = ({ dispatch, commit }, content) => {
    commit('setGeometryFill', content);
    dispatch('updateState');
}

const setCurrentGeometricElementMiniCanvas = ({ dispatch, commit }, content) => {
    commit('setCurrentGeometricElementMiniCanvas', content);
    dispatch('updateState');
}

const set3dState = ({ commit }, content) => {
    commit('set3dState', content);
}

const setState = ({ commit }, content) => {
    commit('setState', content);
}

const updateState = ({ commit }, content) => {
    commit('updateState', content);
}

const clearCanvas = ({ dispatch, commit }) => {
    commit('clearCanvas');
    dispatch('updateState');
}

const setAuthor = ({ commit }, content) => {
    commit('setAuthor', content);
}

const setShowModalSettingsFlux = ({ commit }, content) => {
    commit('setShowModalSettingsFlux', content);
}
const updateGeometry = ({ dispatch, commit }, content) => {
    commit('updateGeometry', content);
    dispatch('updateState');
}

const closeErrorModal = ({ commit }, content) => {
    commit('closeErrorModal', content);
}

const setCurrentGeometryRotation = ({dispatch, commit}, content) => {
    commit('setCurrentGeometryRotation', content);
    dispatch('updateState');

}
export {
    GeometryListAppendAction,
    setDrawingStatusAction,
    setKonvaStageAction,
    setSelectedShapeNameAction,
    setSelectedTokenAction,
    setCurrentGeometryAction,
    ZOOM,
    keyPressAction,
    keySolveAction,
    setCurrentKonvaStageLayers,
    setGeometryList,
    GeometryListRemove,
    setCurrentGeometryData,
    setCurrentGeometrySize,
    setCurrentGeometrySizeWidth,
    setCurrentGeometrySizeHeight,
    setCurrentGeometrySizeDepth,
    setCurrentGeometryPosX,
    setCurrentGeometryPosY,
    setCurrentGeometryPosZ,
    setCurrentGeometryRadius,
    setMaterialForm,
    setUserMaterials,
    setMaterialOfCurrentGeometry,
    setSourcesList,
    SourcesListAppend,
    setCurrentMode,
    setCurrentViewMode,
    setSelectedSourceToken,
    setCurrentGeometryFrequency,
    setCurrentGeometryWaveLength,
    setCurrentGeometryWaveWidth,
    setCurrentGeometryWaveSize,
    RunSimulation,
    Run3dSimulation,
    setShapeOfCurrentGeometry,
    setViewSimulation,
    setLoadingSimulation,
    setSceneSimulation,
    setCurrentGeometryIntegrated,
    setPMLThickness,
    setTitle,
    setDescription,
    setResolution,
    setUntil,
    setCoordinates,
    setCell,
    updateSizeAndPosition,
    openPlotOptions,
    set_field_parameters,
    set_monitor_parameters,
    set_source_parameters,
    set_plotViews,
    set_boundary_parameters,
    set_eps_parameters,
    set_generateAxis,
    set_generateVideo,
    set_generateDielectric,
    set_plotAxis,
    set_realtime,
    set_labels,
    set_plotOptions,
    FluxListAppend,
    setFluxList,
    setZoomAction,
    set_showMiniCanvas,
    setCurrentGeometryFillPattern,
    setGeometricFillPatternList,
    removeGeometricItem,
    setSelectedInsideToken,
    setPropertiesGeometryFill,
    setGeometryFill,
    setCurrentGeometricElementMiniCanvas,
    set3dState,
    setState,
    updateState,
    clearCanvas,
    setAuthor,
    setShowModalSettingsFlux,
    updateGeometry,
    closeErrorModal,
    setCurrentGeometryRotation
}
