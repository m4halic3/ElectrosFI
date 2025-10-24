
const setCurrentGeometryPosX = (state, geometryData) => {
    try {
        state.GeometryList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.x = geometryData;
            }
        });

        state.SourcesList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.x = geometryData;
            }
        });

    } catch (err) {
        return { message: err.message }
    }
}

const setCurrentGeometryPosY = (state, geometryData) => {
    try {
        state.GeometryList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.y = geometryData;
            }
        });
        state.SourcesList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.y = geometryData;
            }
        });
    } catch (err) {
        return { message: err.message }
    }
}

const setCurrentGeometryPosZ = (state, geometryData) => {
    try {
        state.GeometryList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.z = geometryData;
            }
        });
        state.SourcesList.forEach((e) => {
            if (e.token == state.selectedToken) {
                e.z = geometryData;
            }
        });
    } catch (err) {
        return { message: err.message }
    }
}

export {
    setCurrentGeometryPosX,
    setCurrentGeometryPosY,
    setCurrentGeometryPosZ
}