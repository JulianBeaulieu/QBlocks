function CNot(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.run = function cnot(objectList){
    let object1 = objectList[0];
    let object2 = objectList[1];

    if(object1.constructor.name === 'Ball'){
      //Not first object if second object is white
      object1.y += 2 * this.height;
      object2.y += 2 * this.height;
      if(object1.color === 1){
        object2.color = Math.abs(object2.color - 1);

        return [object1, object2];
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
