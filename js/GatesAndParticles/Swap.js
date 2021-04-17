function Swap(){
  this.swap = function swap(object1, object2){
    if(object1.constructor.name === 'Ball'){
      console.log("SWAP HERE");
      return [object2, object1];
    } else if(object1.constructor.name === 'Mist'){
      // TODO: handle mist
      return [object1, object2]
    } else {
      console.log("Else in Swap, something went wrong");
      console.log(object1.toString() + object2.toString());
      return [object1, object2];
    }
  };

  this.toString = function toString(){
    return 'Swap-Gate';
  };
}
