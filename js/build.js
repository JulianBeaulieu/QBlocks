var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;
var PETE_Gate = []
var CNOT_Gate = []
var NOT_Gate = []
var SWAP_Gate = []

/*############################################################################*/
/*####################### Squares Definition #################################*/
/*############################################################################*/
var shadowRectangle = new Konva.Rect({
  x: 0,
  y: 0,
  shapeType: 'shadow',
  width: blockSnapSize * 6,
  height: blockSnapSize * 3,
  fill: '#FF7B17',
  opacity: 0.6,
  stroke: '#CF6412',
  strokeWidth: 3,
  dash: [20, 2]
});

function newRectangle(x, y, layer, stage, group) {
  let rectangle = new Konva.Rect({
    x: x,
    y: y,
    x_prev: x,
    y_prev: y,
    shapeType: 'rectangle',
    width: blockSnapSize * 6,
    height: blockSnapSize * 3,
    fill: '#fff',
    stroke: '#ddd',
    strokeWidth: 1,
    shadowColor: 'black',
    shadowBlur: 2,
    shadowOffset: {x : 1, y : 1},
    shadowOpacity: 0.4,
    draggable: true
  });

  console.log(rectangle);

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
}

/*############################################################################*/
/*####################### Creates Grid #######################################*/
/*############################################################################*/
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var gridLayer = new Konva.Layer();
var padding = blockSnapSize;
console.log(width, padding, width / padding);

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
shadowRectangle.hide();
layer.add(shadowRectangle);

function createPETE_Gate(){
  newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
  stage.add(layer);
}

function createSWAP_Gate(){
  newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
  stage.add(layer);
}

function createCNOT_Gate(){
  newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
  stage.add(layer);
}

function createNOT_Gate(){
  newRectangle(blockSnapSize * 3, blockSnapSize * 3, layer, stage);
  stage.add(layer);
}

stage.add(gridLayer);

/*############################################################################*/
/*####################### Colision Detection Grid ############################*/
/*############################################################################*/

function haveIntersection(r1, r2) {

  if(r1.attrs.shapeType === 'shadow' || r2.attrs.shapeType === 'shadow' ){
    return false;
  }

  return !(
    r2.attrs.x > r1.attrs.x + r1.attrs.width ||
    r2.attrs.x + r2.attrs.width < r1.attrs.x ||
    r2.attrs.y > r1.attrs.y + r1.attrs.height ||
    r2.attrs.y + r2.attrs.height < r1.attrs.y
  );
}

function calcNewY(r1, r2){
  y1 = r1.attrs.y
  h1 = r1.attrs.height

  y2 = r2.attrs.y
  h2 = r2.attrs.height

  if ((y1 + h1)/2 > (y2 + h2)/2){
    return y1 - h2;
  } else {
    return y1 + h1;
  }
}

function calcNewX(r1, r2){
  x1 = r1.attrs.x
  w1 = r1.attrs.width

  x2 = r2.attrs.x
  w2 = r2.attrs.width

  if ((x1 + w1)/2 > (x2 + w2)/2){
    return x1 - w2;
  } else {
    return x1 + w1;
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
      target.position({
        x: newX,
        y: newY
      });
    } else {
    }
  });
});
