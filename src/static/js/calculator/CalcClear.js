define(['calculation'], function(calculation) {
  function CalcClear(value, type) {
    this.value = value != null ? value : 'C';
    this.type = type != null ? type : 'op';
  }

  CalcClear.prototype.process = function() {
    return calculation.reset();
  };

  return CalcClear;
});
