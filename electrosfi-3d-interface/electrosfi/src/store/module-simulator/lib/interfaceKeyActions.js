
const ZOOM = (state, e) => {
    
    if (state.mode != 'zoom' || state.mode == "miniCanvas") return;
    e.evt.preventDefault();
    state.drawing = false;
    var oldScale = e.target.getStage().scaleX();
  
    var pointer = e.target.getStage().getPointerPosition();
  
    var mousePointTo = {
      x: (pointer.x - e.target.getStage().x()) / oldScale,
      y: (pointer.y - e.target.getStage().y()) / oldScale,
    };
  
    var newScale = 1;
    if (e.type == "mousedown") {
      newScale = (state.zoomAction == "In") ? oldScale * state.scaleBy : oldScale / state.scaleBy;
    } else {
      newScale =
        e.evt.deltaY > 0 ? oldScale * state.scaleBy : oldScale / state.scaleBy;
    }
    newScale = Number(newScale.toFixed(2));
  
    e.target.getStage().scale({ x: newScale, y: newScale });
    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    e.target.getStage().position(newPos);
    state.currentScale = newScale;
    e.target.getStage().batchDraw();
  }
  
  const keyPress = (state, e) => {
    if(state.mode == "miniCanvas") return;
    if (!e) e = window.event;
    let keyCode = e.keyCode;
    if (keyCode == "32") {
      if (state.mode != 'handOn') {
        state.lastMode = state.mode;
      }
      state.mode = 'handOn';
      state.configKonva.draggable = (state.mode == 'handOn') ? true : false;
    } else if (e.keyCode == "17") {
      if (state.mode != 'zoom') {
        state.lastMode = state.mode;
      }
      state.mode = 'zoom';
    } else if (e.keyCode == "16") {
      if (state.mode == 'zoom') {
        state.zoomAction = "Out";
      }
    } else if (e.keyCode == "90") {
      state.mode = 'zoom';
    } else if (e.keyCode == "72") {
      state.mode = 'handOn';
    } else if (e.keyCode == "86") {
      state.mode = 'transform';
    } else if (e.keyCode == "67") {
      state.mode = 'create';
    } else if (e.keyCode == "83") {
      state.mode = 'sources';
    }else if (e.keyCode == "70") {
      state.mode = 'flux';
    }
  }
  const keySolve = (state, e) => {
    if(state.mode == "miniCanvas") return;
    if (!e) e = window.event;
    // || e.which
    let keyCode = e.keyCode;
    if (keyCode == "32") {
      state.mode = state.lastMode;
      state.configKonva.draggable = (state.mode == 'handOn') ? true : false;
    } else if (e.keyCode == "17") {
      state.mode = state.lastMode;
    } else if (e.keyCode == "16") {
      if (state.mode == 'zoom') {
        state.zoomAction = "In";
      }
    }
  }

  export {
    ZOOM,
    keyPress,
    keySolve,   
  }