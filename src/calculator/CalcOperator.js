define(['calculation'], function(calculation) {
  function CalcOperator(value1, type1) {
    this.value = value1;
    this.type = type1 != null ? type1 : 'op';
  }

  CalcOperator.prototype.process = function() {
    var cC, prevType, type, value;
    cC = calculation.collection;
    prevType = calculation.result.type;
    value = this.value;
    type = this.type;
    console.log('ctrl:', value)
    if (!cC.length) {
      cC.push({
        value: '0',
        type: 'num'
      });
    }
    if (prevType === type) {
      cC[cC.length - 1].value = value;
    } else {
      cC.push({
        value: value,
        type: type
      });
    }
    return calculation.setResult(value, type);
  };

  return CalcOperator;
});
