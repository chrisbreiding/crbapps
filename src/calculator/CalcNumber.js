define(['calculation'], function(calculation) {
  function CalcNumber(value1, type1) {
    this.value = value1;
    this.type = type1 != null ? type1 : 'num';
  }

  CalcNumber.prototype.process = function() {
    var cC, prevType, type, value;
    cC = calculation.collection;
    prevType = calculation.result.type;
    value = this.value;
    type = this.type;
    console.log('number:', value)
    if (this.value === '.') {
      if (cC.length > 1 && /\./.test(cC[cC.length - 1].value) && prevType !== 'calc') {
        return;
      }
      if (!prevType || prevType === 'calc') {
        value = '0.';
        type = 'num';
      }
    }
    if (prevType === 'calc') {
      cC[0].value = value;
    } else if (prevType === type) {
      value = cC[cC.length - 1].value = cC[cC.length - 1].value + value;
    } else {
      cC.push({
        value: value,
        type: type
      });
    }
    return calculation.setResult(value, type);
  };

  return CalcNumber;
});
