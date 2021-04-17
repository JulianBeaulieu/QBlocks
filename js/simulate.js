function simulate(){
  let bball = new Ball(0, '+');
  let wball = new Ball(1, '+');

  let not_gate = new Not();
  let cnot_gate = new CNot();
  let swap_gate = new Swap();


  console.log("\nSWAP:");
  var swapBalls = swap_gate.swap(bball, wball);
  console.log("Swapped Balls: (b,w) -> (w,b) (" + swapBalls[0].toString() + ", " + swapBalls[1].toString() + ")");
  swapBalls = swap_gate.swap(wball, bball);
  console.log("Swapped Balls: (w,b) -> (b,w) (" + swapBalls[0].toString() + ", " + swapBalls[1].toString() + ")");

  console.log("\nCNOT:");
  let cnotBallsFalse = cnot_gate.cnot(wball, bball);
  console.log("Cnot Balls False: (w,b) -> (w,b) (" + cnotBallsFalse[0].toString() + ", " + cnotBallsFalse[1].toString() + ")");
  let cnotBallsTrue = cnot_gate.cnot(bball, wball);
  console.log("Cnot Balls True: (b,w) -> (w,w) (" + cnotBallsTrue[0].toString() + ", " + cnotBallsTrue[1].toString() + ")");
}
