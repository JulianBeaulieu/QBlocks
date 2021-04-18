function createPETE_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'img/hadamard.png', 'hadamard', 'user');
  stage.add(layer);
}

function createSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/swap.png', 'swap', 'user');
  stage.add(layer);
}

function createCSWAP_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 6, 2, layer, stage, 'img/cswap.png', 'cswap', 'user');
  stage.add(layer);
}

function createCNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/cnot.png', 'cnot', 'user');
  stage.add(layer);
}

function createNOT_Gate(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 2, 2, layer, stage, 'img/not.png', 'not', 'user');
  stage.add(layer);
}

function createBLACK_BALL(){
  newBall(blockSnapSize * 2, blockSnapSize * 2, 0.5, layer, stage, 'black', 'user');
  stage.add(layer);
}

function createWHITE_BALL(){
  newBall(blockSnapSize * 2, blockSnapSize * 2, 0.5, layer, stage, 'white', 'user');
  stage.add(layer);
}

function createWBMist(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/wb.png', 'wb', 'user');
  stage.add(layer);
}

function createWNegBMist(){
  newGate(blockSnapSize * 3, blockSnapSize * 3, 4, 2, layer, stage, 'img/wnegb.png', 'w-b', 'user');
  stage.add(layer);
}


function start(){
  console.log("Starting simulations");
  getShapes();
  simulate();
}

function stop(){
  console.log("Clearing simulation objects");
  clearShapes()
}
