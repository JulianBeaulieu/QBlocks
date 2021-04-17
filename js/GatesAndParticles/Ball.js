function Ball(color=0, sign='+'){
  this.color = color;
  this.sign = sign;

  this.toString = function toString(){
    return ((this.color === 1) ? 'White' : 'Black') + ' Ball with ' + this.sign + ' sign';
  };
}
