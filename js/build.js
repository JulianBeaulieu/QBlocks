// var width = window.innerWidth;
// var height = window.innerHeight;
// window.onresize = function(){ location.reload(); }
var width = document.getElementById('canvas-div').clientWidth;
var height = (window.innerHeight * 2/3);

console.log("Height: " + height + " | Width: " + width);
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;

/*############################################################################*/
/*####################### Ball Definition ####################################*/
/*############################################################################*/

function newBall(x, y, radius, layer, stage, color, createdBy) {
  var shadowCircle = new Konva.Circle({
    x: x,
    y: y,
    shapeType: 'shadowCircle',
    type: color+'Ball',
    id: createdBy,
    radius: blockSnapSize * radius,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
  });
  shadowCircle.hide();
  layer.add(shadowCircle);

  let circle = new Konva.Circle({
    x: x,
    y: y,
    x_prev: x,
    y_prev: y,
    shapeType: 'circle',
    type: color+'Ball',
    id: createdBy,
    radius: blockSnapSize * radius,
    fill: color,
    stroke: '#ddd',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: {x : 1, y : 1},
    shadowOpacity: 0.4,
    draggable: true
  });

  circle.on('dragstart', (e) => {
    shadowCircle.show();
    shadowCircle.moveToTop();
    circle.moveToTop();
    circle.position({
      x_prev: circle.x,
      y_prev: circle.y
    });
  });

  circle.on('dragend', (e) => {
    circle.position({
      x: Math.round(circle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(circle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
    shadowCircle.hide();
  });

  circle.on('dragmove', (e) => {
    shadowCircle.position({
      x: Math.round(circle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(circle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
  });

  layer.add(circle);

  // do something else on right click
  circle.on('contextmenu', (e) => {
    circle.destroy();
    layer.draw();
  });
}

/*############################################################################*/
/*####################### Gate Definition ####################################*/
/*############################################################################*/

function newGate(x, y, width, height, layer, stage, filepath, type, createdBy) {

  var shadowRectangle = new Konva.Rect({
    x: x,
    y: y,
    shapeType: 'shadowRectangle',
    type: type,
    id: createdBy,
    width: blockSnapSize * width,
    height: blockSnapSize * height,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
  });
  shadowRectangle.hide();
  layer.add(shadowRectangle);

  Konva.Image.fromURL(filepath, function (rectangle) {
    rectangle.setAttrs({
      x: x,
      y: y,
      x_prev: x,
      y_prev: y,
      shapeType: 'rectangle',
      type: type,
      id: createdBy,
      width: blockSnapSize * width,
      height: blockSnapSize * height,
      shadowColor: 'black',
      shadowBlur: 2,
      shadowOffset: {x : 1, y : 1},
      shadowOpacity: 0.4,
      draggable: true
    });

    rectangle.on('dragstart', (e) => {
      shadowRectangle.show();
      shadowRectangle.moveToTop();
      rectangle.moveToTop();
      rectangle.position({
        x_prev: rectangle.x,
        y_prev: rectangle.y
      });
    });

    rectangle.on('dragend', (e) => {
      rectangle.position({
        x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
        y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
      });
      stage.batchDraw();
      shadowRectangle.hide();
    });

    rectangle.on('dragmove', (e) => {
      shadowRectangle.position({
        x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
        y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
      });
      stage.batchDraw();
    });

    layer.add(rectangle);
    layer.batchDraw();
    // do something else on right click
    rectangle.on('contextmenu', (e) => {
      rectangle.destroy();
      layer.draw();
    });

    // do something else on right click
    rectangle.on('stop-button', (e) => {
      // rectangle.destroy();
      // layer.draw();
      console.log("\n\nPENIS\n\n");
    });
  });
}

/*############################################################################*/
/*####################### Creates Grid #######################################*/
/*############################################################################*/



var stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});

var gridLayer = new Konva.Layer();
var padding = blockSnapSize;

for (var i = 0; i < width / padding; i++) {
  gridLayer.add(new Konva.Line({
    points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
    stroke: '#ddd',
    strokeWidth: 1,
  }));
}

gridLayer.add(new Konva.Line({points: [0,0,10,10]}));
for (var j = 0; j < height / padding; j++) {
  gridLayer.add(new Konva.Line({
    points: [0, Math.round(j * padding), width, Math.round(j * padding)],
    stroke: '#ddd',
    strokeWidth: 0.5,
  }));
}

var layer = new Konva.Layer();
stage.add(gridLayer);

// do not show context menu on right click
stage.on('contentContextmenu', (e) => {
  e.evt.preventDefault();
});

/*############################################################################*/
/*####################### Colision Detection #################################*/
/*############################################################################*/

function haveIntersection(r1, r2) {

  if(r1.attrs.shapeType.includes('shadow') || r2.attrs.shapeType.includes('shadow') ){
    return false;
  }

  y1 = r1.attrs.y
  h1 = (r1.attrs.shapeType === 'circle') ? r1.attrs.radius +1: r1.attrs.height;
  x1 = r1.attrs.x
  w1 = (r1.attrs.shapeType === 'circle') ? r1.attrs.radius +1: r1.attrs.width

  x2 = r2.attrs.x
  w2 = (r2.attrs.shapeType === 'circle') ? r2.attrs.radius +1: r2.attrs.width
  y2 = r2.attrs.y
  h2 = (r2.attrs.shapeType === 'circle') ? r2.attrs.radius +1 : r2.attrs.height;


  let colision = !(
    x2 > x1 + w1 ||
    x2 + w2 < x1 ||
    y2 > y1 + h1 ||
    y2 + h2 < y1
  )

  //console.log(colision);

  return colision;
}

function calcNewY(r1, r2){
  y1 = r1.attrs.y
  h1 = (r1.attrs.shapeType === 'circle') ? r1.attrs.radius +1: r1.attrs.height;

  y2 = r2.attrs.y
  h2 = (r2.attrs.shapeType === 'circle') ? r2.attrs.radius +1 : r2.attrs.height;

  if ((y1 + h1/2) > (y2 + h2/2) > y1){
    return y1 - h2;
  } else {
    return (y1 + h1);
  }
}

function calcNewX(r1, r2){
  x1 = r1.attrs.x
  w1 = (r1.attrs.shapeType === 'circle') ? r1.attrs.radius +1: r1.attrs.width;

  x2 = r2.attrs.x
  w2 = (r2.attrs.shapeType === 'circle') ? r2.attrs.radius +1: r2.attrs.width;

  if ((x1 + w1/2) > (x2 + w2/2) > x1){
    return (x1 - w2);
  } else {
    return (x1 + w1);
  }
}

layer.on('dragmove', function (e) {
  var target = e.target;

  layer.children.each(function (shape) {
    // do not check intersection with itself
    if (shape === target) {
      return;
    }
    else if (haveIntersection(shape, target)) {
      newX = calcNewX(shape, target)
      newY = calcNewY(shape, target)
      // console.log("X: ", newX);
      // console.log("Y: ", newY);
      target.position({
        x: newX,
        y: newY
      });
    } else {
    }
  });
});

/*############################################################################*/
/*####################### Simulation Code ####################################*/
/*############################################################################*/

function clearShapesCreatedDuringSimulation() {
  // select shapes by name
  var objects = stage.find('#simulation');

  objects.each(function (object) {
      object.destroy();
      layer.draw();
  });
};

function clearAllObjects(){
  // select shapes by name

  let shapes = ["Image", "Rect", "Circle"]

  shapes.forEach((shape, i) => {
    var shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      console.log(shape);
      object.destroy();
    });
  });

  layer.draw();
};

function getShapes() {
  let shapes = ["Image", "Circle"]
  var gates = []
  var particles = []

  shapes.forEach((shape, i) => {
    var shapeInStage = stage.find(shape);
    shapeInStage.each(function (object) {
      if(!object.attrs.shapeType.toLowerCase().includes("shadow")){
        if(object.attrs.shapeType.toLowerCase().includes("circle") ||
            object.attrs.shapeType.toLowerCase().includes("mist")){
              particles.push(object);
            } else {
              gates.push(object);
            }
      }
    });
  });

  // console.log("Length of gates array: " + gates.length);
  // gates.forEach((shape, i) => {
  //   console.log(shape.attrs);
  // });
  //
  // console.log("Length of particles array: " + particles.length);
  // particles.forEach((shape, i) => {
  //   console.log(shape.attrs);
  // });

  var matchedObjects = findAbove(gates, particles);
  // console.log("findAbove");
  // console.log("Length of matchedObjects array: " + matchedObjects.length);
  // matchedObjects.forEach((shape, i) => {
  //   console.log(shape);
  // });

  matchedObjects = removeSingleObjects(matchedObjects);

  matchedObjects = shapesToObject(matchedObjects);
  // console.log("shapesToObject");

  console.log("Length of matchedObjects array: " + matchedObjects.length);
  matchedObjects.forEach((shape, i) => {
    console.log(i + " | " + shape);
  });

  let simulationOutcome = simulate(matchedObjects);
  // console.log("simulate");

  console.log("Length of matchedObjects array: " + simulationOutcome.length);
  simulationOutcome.forEach((shape, i) => {
    console.log(i + " | " + shape);
  });

  clearShapesCreatedDuringSimulation();

  // console.log("Length of simulationOutcome array: " + simulationOutcome.length);
  // simulationOutcome.forEach((shape, i) => {
  //   console.log(shape.toString());
  // });

  drawObjects(simulationOutcome);
};

function findAbove(gates, particles) {
  var particles = particles;
  var matchedObjects = [];

  gates.forEach((gate, i) => {
    console.log("Gate: " + gate.attrs.type.toLowerCase());
    if(gate.attrs.type.toLowerCase().includes("cswap")){
      let temp = matchTrippleGate(gate, particles);
      particles = temp[1];
      matchedObjects.push(temp[0]);
    } else if(gate.attrs.type.toLowerCase().includes("cnot") ||
        gate.attrs.type.toLowerCase().includes("swap")){
      let temp = matchDoubleGate(gate, particles);
      particles = temp[1];
      matchedObjects.push(temp[0]);
    } else if(gate.attrs.type.toLowerCase().includes("not") ||
        gate.attrs.type.toLowerCase().includes("pete")){
      let temp = matchSingleGate(gate, particles);
      particles = temp[1];
      matchedObjects.push(temp[0]);
    } else {
      console.log("Something went wrong while matching gates and particles");
    }
  });

  return matchedObjects;
};

function matchSingleGate(gate, particles) {
  console.log("matchSingleGate");
  let x1 = gate.attrs.x;
  let x2 = gate.attrs.x + gate.attrs.width;
  let y1 = gate.attrs.y;
  let y2 = gate.attrs.y + gate.attrs.height;

  var particles = particles;
  var matchedObjects = [gate];

  particles.forEach((particle, i) => {
    let x = particle.attrs.x;
    let y = particle.attrs.y;

    if((x1 <= x <= x2) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      particles.splice(i, 1);
      return [matchedObjects, particles];
    }
  });

  return [matchedObjects, particles];
}

function matchDoubleGate(gate, particles) {
  console.log("matchDoubleGate");
  let x1 = gate.attrs.x;
  let x2 = gate.attrs.x + gate.attrs.width/2;
  let x3 = gate.attrs.x + gate.attrs.width;
  let y1 = gate.attrs.y;
  let y2 = gate.attrs.y + gate.attrs.height;

  var particles = particles;
  var matchedObjects = [gate];

  for (var i = 0; i < particles.length; i++) {
    let particle = particles[i];
    let x = particle.attrs.x;
    let y = particle.attrs.y;

    if((x1 <= x <= x2) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      particles.splice(i, 1);
      break;
    }
  }

  for (var i = 0; i < particles.length; i++) {
    let particle = particles[i];
    let x = particle.attrs.x;
    let y = particle.attrs.y;

    if((x2 <= x <= x3) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      particles.splice(i, 1);
      return [matchedObjects, particles];
    }
  }

  return [matchedObjects, particles];
}

function matchTrippleGate(gate, particles) {
  console.log("matchTrippleGate");
  let x1 = gate.attrs.x;
  let x2 = gate.attrs.x + gate.attrs.width/3;
  let x3 = gate.attrs.x + (gate.attrs.width*2) /3;
  let x4 = gate.attrs.x + gate.attrs.width;
  let y1 = gate.attrs.y;
  let y2 = gate.attrs.y + gate.attrs.height;

  var x = 0;
  var y = 0;

  var particles = particles;
  var matchedObjects = [gate];

  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    x = particle.attrs.x;
    y = particle.attrs.y;

    if((x1 <= x <= x2) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      console.log(particle.attrs.type);
      particles.splice(i, 1);
      break;
    }
  }

  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    x = particle.attrs.x;
    y = particle.attrs.y;

    if((x2 <= x <= x3) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      console.log(particle.attrs.type);
      particles.splice(i, 1);
      break;
    }
  }

  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    x = particle.attrs.x;
    y = particle.attrs.y;

    if((x3 <= x <= x4) && (y1 <= y <= y2)){
      matchedObjects.push(particle);
      console.log(particle.attrs.type);
      particles.splice(i, 1);
      return [matchedObjects, particles];
    }
  }

  return [matchedObjects, particles];
}

function removeSingleObjects(objects) {
  var convertedObjects = [];

  for (var i = 0; i < objects.length; i++) {
    let matchedObjects = objects[i];

    if(matchedObjects.length > 1){
      convertedObjects.push(matchedObjects);
    }
  }

  return convertedObjects;
};

function shapesToObject(objects) {
  var convertedObjects = [];

  for (var i = 0; i < objects.length; i++) {
    let matchedObjects = objects[i];
    var newObjectsList = [];

    matchedObjects.forEach((shape, i) => {
      newObjectsList.push(createObject(shape));
    });

    convertedObjects.push(newObjectsList);
  }

  return convertedObjects;
};

function createObject(object) {
  if(object.attrs.type.toLowerCase().includes("cswap")){
    return new CSwap(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("cnot")){
    return new CNot(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("swap")){
    return new Swap(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("not")){
    return new Not(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("pete")){
    return new Pete(object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("black")){
    return new Ball(0, '+', object.attrs.x, object.attrs.y, object.attrs.radius);
  } else if(object.attrs.type.toLowerCase().includes("white")){
    return new Ball(1, '+', object.attrs.x, object.attrs.y, object.attrs.radius);
  } else if(object.attrs.type.toLowerCase().includes("wb")){
    return new Mist(1, '+', 0, '+', object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else if(object.attrs.type.toLowerCase().includes("w-b")){
    return new Mist(1, '+', 0, '1', object.attrs.x, object.attrs.y, object.attrs.width, object.attrs.height);
  } else {
    console.log("Something went wrong while creating the objects");
    return null;
  }
}

function drawObjects(objects){
  objects.forEach((object, i) => {
    if(object.constructor.name.toLowerCase() === 'ball'){
      newBall(object.x, object.y, 0.5, layer, stage, ((object.color === 1) ? 'white' : 'black'), 'simulation');
    } else if(object.constructor.name.toLowerCase() === 'mist'){
      if(object.colorLeft === 1 && object.colorRight === 0 && object.signLeft === '+' && object.signRight === '+'){
        newGate(object.x, object.y, 4, 2, layer, stage, 'img/wb.png', 'wbMist', 'simulation');
      } else {
        newGate(object.x, object.y, 4, 2, layer, stage, 'img/wnegb.png', 'w-bMist', 'simulation');
      }
    } else {
      console.log("Something went wrong: " + object.toString());
      return null;
    }
    stage.add(layer);
  });
};

function simulate(matchedObjects){
  var newObjects = [];

  for (var i = 0; i < matchedObjects.length; i++) {
    let particles = matchedObjects[i];
    let gate = particles[0];
    particles.splice(0, 1);

    let elementList = gate.run(particles);

    elementList.forEach((item, i) => {
      newObjects.push(item);
    });
  }

  return newObjects;
}
