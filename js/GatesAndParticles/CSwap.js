function CSwap(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.run = function cnot(objectList){
    let object1 = objectList[0];
    let object2 = objectList[1];
    let object3 = objectList[2];

    console.log("object1: " + object1.color);
    console.log("object2: " + object2.color);
    console.log("object3: " + object3.color);

    if(object1.constructor.name === 'Ball'){
      //Not first object if second object is white
      object1.y += 2 * this.height;
      object2.y += 2 * this.height;
      object3.y += 2 * this.height;

      if(object1.color === 1){
        tmp = object2.x ;
        object2.x = object3.x;
        object3.x = tmp;

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
