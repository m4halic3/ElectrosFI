import simulator from "@/services/simulator.js";
import gmsh from "@/services/gmsh";
import ngsolve from "@/services/ngsolve";
import materials from "@/services/materials";


import router from '@/router';
import updateState from './lib/updateState';
import Swal from 'sweetalert2';
import {
  setCurrentGeometrySize,
  setCurrentGeometrySizeWidth,
  setCurrentGeometrySizeHeight,
  setCurrentGeometrySizeDepth,
  setCurrentGeometryRadius,
  setCurrentGeometryRotation
} from "./lib/geometryDimensions"

import {
  ZOOM,
  keyPress,
  keySolve,
} from "./lib/interfaceKeyActions"

import {
  setUserMaterials,
  setMaterialForm,
  setMaterialOfCurrentGeometry,
} from "./lib/materials"

import {
  setCell,
  setCoordinates,
  setPMLThickness,
  setTitle,
  setDescription,
  setResolution,
  setUntil,
  setViewSimulation,
  setSceneSimulation,
} from "./lib/cellOptions"

import {
  setCurrentGeometryPosX,
  setCurrentGeometryPosY,
  setCurrentGeometryPosZ
} from "./lib/geometryPositions"
import md5 from "js-md5";

const GeometryListAppend = (state, geometry) => {
  state.GeometryList.push(geometry)
}

const setCurrentGeometryFillPattern = (state, geometryData) => {
  try {
    state.GeometryList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.geometricFillPattern.push(geometryData);
      }
    });
  } catch (err) {
    return { message: err.message }
  }

}

const setCurrentViewMode = (state, content) => {
  state.viewMode = content
}

const SourcesListAppend = (state, source) => {
  state.SourcesList.push(source)
}

const FluxListAppend = (state, flux) => {
  state.FluxList.push(flux)
}

const GeometryListRemove = (state, geometry) => {
  state.FluxList.forEach((content, indice) => {
    if (content.token == geometry) {
      state.FluxList.splice(indice, 1)
    }
  });
  state.SourcesList.forEach((content, indice) => {
    if (content.token == geometry) {
      state.SourcesList.splice(indice, 1)
    }
  });
  state.GeometryList.forEach((content, indice) => {
    if (content.token == geometry) {
      state.GeometryList.splice(indice, 1)
    }
  });
}

const removeGeometricItem = (state, indexToRemove) => {
  state.GeometryList.forEach((content) => {
    if (content.token == state.selectedToken) {
      content.geometricFillPattern.splice(indexToRemove, 1);
    }
  });
}

const setGeometryList = (state, newList) => {
  state.GeometryList = newList;
}

const setGeometricFillPatternList = (state, newList) => {
  state.currentGeometry.geometricFillPattern = newList;
}

const setSourcesList = (state, newList) => {
  state.SourcesList = newList;
}

const setFluxList = (state, newList) => {
  state.FluxList = newList;
}

const setDrawingStatus = (state, status) => {
  state.drawing = status;
}

const setKonvaStage = (state, konvaStageObject) => {
  state.konvaStage = konvaStageObject;
}

const setCurrentKonvaStageLayers = (state, konvaStageObject) => {
  state.konvaStage.children[0] = konvaStageObject;
}

const setSelectedToken = (state, token) => {
  state.selectedToken = token;
}

const setSelectedShapeName = (state, shape) => {
  state.selectedShapeName = shape;
}

const setZoomAction = (state, action_string) => {
  state.zoomAction = action_string;
}

const setCurrentGeometry = (state, geometry) => {
  state.currentGeometry = geometry;
}

const setCurrentMode = (state, string) => {
  state.mode = string;
  state.configKonva.draggable = (state.mode == 'handOn') ? true : false;
}

const setShapeOfCurrentGeometry = (state, data) => {
  state.shape = data;
}

const updateColor = (state, data) => {
  state.color = data;
}

const dismiss = (state) => {
  state.modalView = "nenhum";
}

const openModal = (state, string) => {
  state.modalView = string;
}

const showCompleteModal = (state, boolean_choice) => {
  state.ShowModalComplete = boolean_choice;
}

const setCurrentGeometryData = (state, geometryData) => {
  try {
    state.GeometryList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}


const setCurrentGeometryWaveLength = (state, geometryData) => {
  try {
    state.SourcesList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.waveLength = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}

const setCurrentGeometryWaveWidth = (state, geometryData) => {
  try {
    state.SourcesList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.waveWidth = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}



const setCurrentGeometryWaveSize = (state, geometryData) => {
  try {
    state.SourcesList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.waveSize = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}

const setCurrentGeometryFrequency = (state, geometryData) => {
  try {
    state.SourcesList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.frequency = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}

const setCurrentGeometryIntegrated = (state, geometryData) => {
  try {
    state.SourcesList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.integrated = geometryData;
      }
    });
  } catch (err) {
    return { message: err.message }
  }
}


const setSelectedSourceToken = (state, content) => {
  state.selectedSourceToken = content;
}


const setLoadingSimulation = (state, content) => {
  state.loading_simulation = content;
}

const updateSizeAndPosition = (state, content) => {
  var {
    x,
    y,
    z
  } = content;
  setCurrentGeometryPosX(((x + (state.coordinates.x / 2)) * state.dimensions.relationship.x) - (state.currentGeometry.width / 2));
  setCurrentGeometryPosY((((state.coordinates.y / 2) + y) * state.dimensions.relationship.y) - (state.currentGeometry.height / 2));
  setCurrentGeometryPosZ((((state.coordinates.z / 2) + z) * state.dimensions.relationship.z) - (state.currentGeometry.depth / 2));
}

const openPlotOptions = (state, content) => {
  state.showPlotOptions = content;
}

const set_generateAxis = (state, content) => {
  state.plotOptions.generateAxis = (content) ? 1 : 0;
}
const set_generateVideo = (state, content) => {
  state.plotOptions.generateVideo = (content) ? 1 : 0;
}
const set_generateDielectric = (state, content) => {
  state.plotOptions.generateDielectric = (content) ? 1 : 0;
}
const set_plotAxis = (state, content) => {
  state.plotOptions.plotAxis = (content) ? 1 : 0;
}
const set_realtime = (state, content) => {
  state.plotOptions.realtime = (content) ? 1 : 0;
}

const set_labels = (state, content) => {
  state.plotOptions.labels = (content) ? 1 : 0;
}

const set_field_parameters = (state, content) => {
  state.plotOptions.field_parameters[content[0]] = content[1];
}

const set_monitor_parameters = (state, content) => {
  state.plotOptions.monitor_parameters = content;
}


const set_source_parameters = (state, content) => {
  state.plotOptions.source_parameters = content;
}

const set_plotViews = (state, content) => {
  state.plotOptions.plotViews = content;
}

const set_boundary_parameters = (state, content) => {
  state.plotOptions.boundary_parameters = content;
}

const set_eps_parameters = (state, content) => {
  state.plotOptions.eps_parameters = content;
}

const set_plotOptions = (state, content) => {
  state.plotOptions[content[0]][content[1]] = content[2];
}

const set_showMiniCanvas = (state, content) => {
  state.mode = "miniCanvas";
  state.showMiniCanvas = content;
}

const setSelectedInsideToken = (state, content) => {
  state.selectedInsideToken = content;
}

const setPropertiesGeometryFill = (state, content) => {
  state.GeometryList.forEach((e) => {
    if (e.token == state.selectedToken) {
      e.geometricFill.properties[content[0]] = content[1];
    }
  });
}

const updateGeometry = (state, content) => {
  state.FluxList.forEach((e) => {
    if (e.token == state.selectedToken) {
      if (content.length == 2) {
        e[content[0]] = content[1];
      } else if (content.length === 3) {
        e[content[0]][content[1]] = content[2];
      }
    }
  });
}


const setCurrentGeometricElementMiniCanvas = (state, content) => {
  try {
    let padraoGeometria = state.GeometryList.filter((e) => e.token == state.selectedToken);
    padraoGeometria[0].geometricFillPattern.forEach(e => {
      if (e.token == content[0]) {
        e[content[1]] = content[2];
      }
    });
  } catch (err) {
    Swal.fire({ title: 'An Error Appears!', text: err.message })
  }
}

const set3dState = (state, { data }) => {
  try {
    state.is3d = true,
    state.GeometryList = [...data.geometries];
    state.SourcesList = [...data.sources];
    state.title = data.title;
    state.description = data.description;
    state.scene_design = data.scene_design;
    state.scene_simulation = data.scene_simulation;
    state.movie = data.movie;
    state.id = data._id;
    state.author = data.author;
    state.productions = data.productions;
  } catch (err) {
    Swal.fire({
      title: 'An error appears!',
      text: err.message
    });
    console.error(err.message);
    router.push('/dashboard');
  }
}

const setState = (state, { data }) => {
  try {
    state.is3d = false;
    state.GeometryList = [...data.geometries];
    state.FluxList = [...data.flux];
    state.SourcesList = [...data.sources];
    state.title = data.title;
    state.description = data.description;
    state.scene_design = data.scene_design;
    state.scene_simulation = data.scene_simulation;
    state.movie = data.movie;
    state.id = data._id;
    state.author = data.author;
    state.productions = data.productions;
    state.coordinates = data.coordinates;
    state.resolution = data.resolution;
    state.charts = data.charts;
    state.plotOptions = data.plotOptions;
    setCoordinates(state, data.coordinates);
  } catch (err) {
    Swal.fire({
      title: 'An error appears!',
      text: err.message
    });
    console.error(err.message);
    router.push('/dashboard');
  }
}

const reclassficateGeometries = (state, conteudo) => {
  var atualGeometry = conteudo;
  var refactor_geometry = {};
  var size = [];
  var position = [];

  size.push(atualGeometry.width / state.dimensions.relationship.x);
  size.push(atualGeometry.height / state.dimensions.relationship.y);
  refactor_geometry.size = size;

  position.push(((atualGeometry.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2));
  position.push((state.coordinates.y / 2) - (((atualGeometry.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y)));

  return { ...conteudo, position, size };
}

const reclassificateSources = (state, conteudo) => {
  var atualGeometry = conteudo;
  var refactor_geometry = {};
  var size = [];
  var position = [];

  size.push(atualGeometry.width / state.dimensions.relationship.x);
  size.push(atualGeometry.height / state.dimensions.relationship.y);
  refactor_geometry.size = size;
  position.push(((atualGeometry.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2));
  position.push((state.coordinates.y / 2) - ((atualGeometry.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y));

  refactor_geometry.position = position;
  // refactor_geometry.type_of_geometry = atualGeometry.shape == "rect" ? "block" : "sphere";
  return { ...conteudo, position, size };
}

const reclassificateFluxes = (state, conteudo) => {
  var atualGeometry = conteudo;
  var refactor_geometry = {};
  var position = [];

  //Para o x
  atualGeometry.transmittance_normal_flux.center.x = ((atualGeometry.transmittance_normal_flux.center.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2);
  atualGeometry.transmittance_flux.center.x = ((atualGeometry.transmittance_flux.center.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2);
  atualGeometry.reflected_flux.center.x = ((atualGeometry.reflected_flux.center.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2);

  //Para o y
  atualGeometry.transmittance_normal_flux.center.y = (state.coordinates.y / 2) - ((atualGeometry.transmittance_normal_flux.center.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y);
  atualGeometry.reflected_flux.center.y = (state.coordinates.y / 2) - ((atualGeometry.reflected_flux.center.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y);
  atualGeometry.transmittance_flux.center.y = (state.coordinates.y / 2) - ((atualGeometry.transmittance_flux.center.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y);

  position.push(((atualGeometry.x + (atualGeometry.width / 2)) / state.dimensions.relationship.x) - (state.coordinates.x / 2));
  position.push((state.coordinates.y / 2) - ((atualGeometry.y + (atualGeometry.height / 2)) / state.dimensions.relationship.y));

  refactor_geometry.position = position;

  return { ...atualGeometry };
}

const fireErrorAlert = (message) => {
  Swal.fire({
    title: 'An error appears!',
    text: message
  });
}
const runSimulation = (state) => {
  state.sincronizado = false;
  state.loading_simulation = true;
  const {
    title,
    author,
    resolution,
    description,
    default_material,
    until,
    pml,
    GeometryList,
    SourcesList,
    FluxList,
    coordinates,
    plotOptions,
    generateVideo,
    id
  } = state;

  var geometries = GeometryList.map((geometry) => reclassficateGeometries(state, geometry));
  var sources = SourcesList.map((source) => reclassificateSources(state, source));
  var flux = FluxList.map((flux) => reclassificateFluxes(state, flux));

  simulator
    .post("/exec", {
      title,
      author,
      "simulation": id,
      resolution: Number(resolution),
      description,
      flux,
      default_material,
      until,
      pml,
      geometries,
      sources,
      coordinates,
      plotOptions,
      generateVideo
    }).then(function ({ data: { error, data } }) {
      if (error) {
        throw new Error(data.replace('meep:', ' '));
      }

      data = JSON.parse(data);
      state.charts = [];
      state.scene_design = data.scene;
      state.scene_simulation = data.wave_scene;
      state.movie = data.videoName;


      state.charts.push({
        title: 'Dieletrico',
        type: 'graphic',
        content: data.scene
      });

      state.charts.push({
        title: 'Simulação Gerada',
        type: 'graphic',
        content: data.wave_scene
      });

      if (data.fluxes.length > 0) {
        state.charts.push({
          title: 'Fluxo 01',
          type: 'flux',
          content: data.fluxes
        });
      }

      var str = state;
      delete str._id;

      state.productions.push({ content: JSON.stringify(str) });

      state.view_simulation = true;
      state.loading_simulation = false;

    }).then(() => {
      updateState(state);
    })
    .catch((err) => {
      fireErrorAlert(err.message);
      state.loading_simulation = false;
      state.showPlotOptions = false
    });
}

const run3dSimulation = async (state) => {
  state.sincronizado = false;
  state.loading_simulation = true;

  const { GeometryList, id, SourcesList, productions  } = state;
  const geometryList = GeometryList.map(geometry => {
    const {
      shape,
      width,
      height,
      depth,
      x, y, z
    } = geometry

    return {
      shape,
      material: "magnet",
      width,
      height,
      depth,
      x, y, z
    }
  });

  try {
    const gmshRequestData = {
      id: id,
      geometries: geometryList
    } 
  
    const gmshRequest = await gmsh.post("/", gmshRequestData);
    console.log(gmshRequest.data);

    let materialInfo = [];

    const materialsRequest = await materials.get("/")
    
    materialsRequest.data.map((material) => {
      const newMaterial = {
        name: material.title,
        refraction_index : material.refraction_index
      }
      materialInfo.push(newMaterial);
    })


    const production = md5.hex(Date.now().toString());
    const productionData = { 
      GeometryList,
      SourcesList,
      content: production
    }
    console.log(productionData);
    
    productions.push(productionData);

    const ngsolveRequestData = {
      simulation_id: id,
      production: production,
      gmsh_mesh_path: id+".msh",
      materials: materialInfo,
      sources: SourcesList.map(source => {
        return {
          wavelength: 1.55,
          wave_width: 1.55,
          source_position: [source.x, source.y, source.z]
        }
      })
    }
  
    const ngsolveRequest = await ngsolve.post("/simulate", ngsolveRequestData);

    if (ngsolveRequest.error) console.log('error: ', ngsolveRequest.error);

    state.view_simulation = true;
    state.loading_simulation = false;

    updateState(state);
  } catch (err) {
    fireErrorAlert(err.message);
    state.loading_simulation = false;
    state.showPlotOptions = false
  }
}

const clearCanvas = (state) => {
  state.GeometryList = [];
  state.FluxList = [];
  state.SourcesList = [];
}

const setAuthor = (state, content) => {
  state.author = content;
}

const setShowModalSettingsFlux = (state, content) => {
  state.showModalSettingsFlux = content;
}

const closeErrorModal = (state, content) => {
  state.showError = content;
  state.errorMessage = "";
}



export {
  GeometryListAppend,
  setDrawingStatus,
  setSelectedToken,
  setSelectedShapeName,
  setCurrentGeometry,
  setShapeOfCurrentGeometry,
  setCurrentMode,
  setZoomAction,
  setKonvaStage,
  setCurrentGeometryData,
  ZOOM,
  keyPress,
  keySolve,
  updateColor,
  dismiss,
  openModal,
  showCompleteModal,
  setCurrentKonvaStageLayers,
  setGeometryList,
  GeometryListRemove,
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
  setCurrentViewMode,
  setSelectedSourceToken,
  setCurrentGeometryWaveLength,
  setCurrentGeometryWaveWidth,
  setCurrentGeometryWaveSize,
  setCurrentGeometryFrequency,
  setViewSimulation,
  setSceneSimulation,
  setLoadingSimulation,
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
  set_generateAxis,
  set_generateVideo,
  set_generateDielectric,
  set_plotAxis,
  set_realtime,
  set_labels,
  set_field_parameters,
  set_monitor_parameters,
  set_source_parameters,
  set_plotViews,
  set_boundary_parameters,
  set_eps_parameters,
  set_plotOptions,
  FluxListAppend,
  setFluxList,
  set_showMiniCanvas,
  setCurrentGeometryFillPattern,
  setGeometricFillPatternList,
  removeGeometricItem,
  setSelectedInsideToken,
  setPropertiesGeometryFill,
  setCurrentGeometricElementMiniCanvas,
  set3dState,
  setState,
  updateState,
  runSimulation,
  run3dSimulation,
  clearCanvas,
  setAuthor,
  setShowModalSettingsFlux,
  updateGeometry,
  closeErrorModal,
  setCurrentGeometryRotation
}