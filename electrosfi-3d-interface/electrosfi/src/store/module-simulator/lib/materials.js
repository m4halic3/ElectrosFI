import updateState from './updateState';
import Swal from 'sweetalert2';
const setUserMaterials = (state, materialsArray) => {
  state.userMaterials = materialsArray
}

const setMaterialForm = (state, status) => {
  state.materialForm = status
}


const setMaterialOfCurrentGeometry = (state, material) => {
  try {
    if (state.selectedToken === '') {
      state.default_material = Number(material.refraction_index)
      state.cell.fill = material.color;
      state.cell.materialTitle = material.title;
      state.cell.materialDescription = material.description;
      return;
    }

    if (state.mode === "miniCanvas") {
      let e_local = {};
      state.GeometryList.forEach((e) => {
        if (e.token == state.selectedToken) {
          e_local = e;
        }
      });

      e_local.geometricFillPattern.forEach((e) => {
        if (e.token == state.selectedInsideToken) {
          e.materialId = material._id;
          e.fill = material.color;
          e.epsilon = Number(material.refraction_index);
        }
      });

      return;
    }

    state.GeometryList.forEach((e) => {
      if (e.token == state.selectedToken) {
        e.materialId = material._id;
        e.fill = material.color;
        e.epsilon = Number(material.refraction_index);
        e.materialTitle = material.title;
        e.materialDescription = material.description;
      }
    });
    updateState(state);

  } catch (err) {
    Swal.fire({ title: 'An error appears', text: err.message });
  }
}

export {
  setUserMaterials,
  setMaterialForm,
  setMaterialOfCurrentGeometry,
}