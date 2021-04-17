function CNot(){
  this.cnot = function cnot(object1, object2){
    if(object1.constructor.name === 'Ball'){
      //Not first object if second object is white
      if(object2.color === 1){
        let not_gate = new Not();
        return [not_gate.not(object1), object2];
      } else { //don't Not first object
        return [object1, object2];
      }
    } else if(object1.constructor.name === 'Mist'){
      // TODO: handle mist
      return [object1, object2]
    } else {
      console.log("Else in CNot, something went wrong");
      console.log(object1.toString() + object2.toString());
      return [object1, object2];
    }
  };

  this.toString = function toString(){
    return 'CNot-Gate';
  };
}
