const setCell = (state, data) => {
    state.cell = data;
}


const setCoordinates = (state, content) => {
    state.coordinates = content;
    //padrão do quadrado
    let axisX = state.coordinates.x;
    let axisY = state.coordinates.y;
    let width = 400;
    let height = 400;
    let relationship = {
        x: width / axisX,
        y: height / axisY
    };

    if (state.coordinates.x > state.coordinates.y) {
        height = (width * axisY) / axisX;
    } else if (state.coordinates.x < state.coordinates.y) {
        width = (height * axisX) / axisY;
    }

    state.dimensions = {
        width,
        height,
        relationship
    }
}

const setPMLThickness = (state, content) => {
    state.pml.thickness = content;
}

const setTitle = (state, content) => {
    state.title = content;
}

const setDescription = (state, content) => {
    state.description = content;
}

const setResolution = (state, content) => {
    state.resolution = content;
}

const setUntil = (state, content) => {
    state.plotOptions.until = Number(content);
}

const setViewSimulation = (state, content) => {
    state.view_simulation = content;
}

const setSceneSimulation = (state, content) => {
    state.scene_simulation = content;
}
export {
    setCell,
    setCoordinates,
    setPMLThickness,
    setTitle,
    setDescription,
    setResolution,
    setUntil,
    setViewSimulation,
    setSceneSimulation,
}
