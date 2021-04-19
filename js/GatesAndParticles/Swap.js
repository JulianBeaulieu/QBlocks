function Swap(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.run = function swap(objectList){
    let object1 = objectList[0];
    let object2 = objectList[1];

    if(object1.constructor.name === 'Ball'){
      object1.y += 2 * this.height;
      object2.y += 2 * this.height;

      tmp = object1.x ;
      object1.x = object2.x;
      object2.x = tmp;

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
