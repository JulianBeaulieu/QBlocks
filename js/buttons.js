function createPETE_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'img/hadamard.png', 'hadamard');
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/swap.png', 'swap');
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/cnot.png', 'cnot');
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'img/not.png', 'not');
  stage.add(layer);
}

function createBLACK_BALL(){
  newBall(blockSnapSize * 3, blockSnapSize * 3, 0.5, layer, stage, 'black');
  stage.add(layer);
}

function createWHITE_BALL(){
  newBall(blockSnapSize * 3, blockSnapSize * 3, 0.5, layer, stage, 'white');
  stage.add(layer);
}

function start(){
  console.log("Starting simulations");
  getShapes();
  simulate();
}
