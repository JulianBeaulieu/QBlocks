function CSwap(){
  this.cnot = function cnot(object1, object2, object3){
    if(object1.constructor.name === 'Ball'){
      //Not first object if second object is white
      if(object1.color === 1){
        let not_gate = new Not();
        return [object1, object3, object2];
      } else { //don't Not first object
        return [object1, object2, object3];
      }
    } else if(object1.constructor.name === 'Mist'){
      // TODO: handle mist
      return [object1, object2, object3]
    } else {
      console.log("Else in CNot, something went wrong");
      console.log(object1.toString() + object2.toString() + object3.toString());
      return [object1, object2, object3];
    }
  };

  this.toString = function toString(){
    return 'CSwap-Gate';
  };
}
