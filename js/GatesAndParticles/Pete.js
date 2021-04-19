function Pete(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.run = function pete(objectList){
    let object = objectList[0];

    if(object.constructor.name === 'Ball'){
      object.color = Math.floor(Math.random() * 2); //creates either a random 1 or 0

      object.y += 2 * this.height;
      return [object];
    } else if(object.constructor.name === 'Mist'){
      // TODO: handle mist
      return [object]
    } else {
      console.log("Else in Pete, something went wrong");
      console.log(object.toString());
      return [object];
    }
  };

  this.toString = function toString(){
    return 'Pete-Gate';
  };
}
