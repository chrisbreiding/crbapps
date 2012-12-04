// Generated by CoffeeScript 1.4.0
(function() {

  define(['calculation'], function(calculation) {
    var CalcNumber;
    return CalcNumber = (function() {

      function CalcNumber(value, type) {
        this.value = value;
        this.type = type != null ? type : 'num';
      }

      CalcNumber.prototype.process = function() {
        var cC, prevType, type, value;
        cC = calculation.collection;
        prevType = calculation.result.type;
        value = this.value;
        type = this.type;
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

    })();
  });

}).call(this);