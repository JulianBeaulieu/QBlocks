function Not(){
  this.not = function not(object){
    if(object.constructor.name === 'Ball'){
      object.color = Math.abs(object.color - 1);
      return object;
    } else if(object.constructor.name === 'Mist'){
      // TODO: handle mist
      return object
    } else {
      console.log("Else in Not, something went wrong");
      console.log(object.toString());
      return object;
    }
  };

  this.toString = function toString(){
    return 'Not-Gate';
  };
}
