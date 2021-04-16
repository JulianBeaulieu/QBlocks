var width = window.innerWidth;
var height = window.innerHeight;
var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;

/*############################################################################*/
/*####################### Ball Definition ####################################*/
/*############################################################################*/

function newBall(x, y, radius, layer, stage, color) {
  var shadowCircle = new Konva.Circle({
    x: x,
    y: y,
    shapeType: 'shadow',
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

function newGate(x, y, width, height, layer, stage, filepath) {

  var shadowRectangle = new Konva.Rect({
    x: x,
    y: y,
    shapeType: 'shadow',
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
  });
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
stage.add(gridLayer);

// do not show context menu on right click
stage.on('contentContextmenu', (e) => {
  e.evt.preventDefault();
});

/*############################################################################*/
/*####################### Colision Detection #################################*/
/*############################################################################*/

function haveIntersection(r1, r2) {

  if(r1.attrs.shapeType === 'shadow' || r2.attrs.shapeType === 'shadow' ){
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
      console.log("X: ", newX);
      console.log("Y: ", newY);
      target.position({
        x: newX,
        y: newY
      });
    } else {
    }
  });
});
