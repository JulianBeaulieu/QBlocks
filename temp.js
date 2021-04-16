var shadowBall = new Konva.Rect({
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

function newBall(x, y, width, height, layer, stage, innerText) {
  let circle = new Konva.Rect({
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

  circle.add(new Konva.Text({
        text: innerText
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000',
        width: 130,
        padding: 5,
        align: 'center'
    }));

  circle.on('dragstart', (e) => {
    shadowRectangle.show();
    shadowRectangle.moveToTop();
    rectangle.moveToTop();
    rectangle.position({
      x_prev: rectangle.x,
      y_prev: rectangle.y
    });
  });

  circle.on('dragend', (e) => {
    rectangle.position({
      x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
    shadowRectangle.hide();
  });

  circle.on('dragmove', (e) => {
    shadowCircle.position({
      x: Math.round(rectangle.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(rectangle.y() / blockSnapSize) * blockSnapSize
    });
    stage.batchDraw();
  });

  layer.add(circle);
}
