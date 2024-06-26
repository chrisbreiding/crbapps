define(['calculator'], function(calculator) {
  return {
    result: {
      value: '0',
      type: null
    },
    collection: [],
    reset: function() {
      this.result = {
        value: '0',
        type: null
      };
      this.collection = [];
      return calculator.trigger('result:change', '0');
    },
    setResult: function(value, type) {
      this.result = {
        value: value || this.result.value,
        type: type || this.result.type
      };
      return calculator.trigger('result:change', this.result.value);
    },
    calculate: function() {
      var coll, num1, num2, operator;
      coll = this.collection;
      if (!coll.length) {
        return;
      }
      while (coll.length > 1) {
        num1 = parseFloat(coll[0].value);
        operator = coll[1].value;
        num2 = parseFloat(coll[2].value);
        coll[2].value = calculator.op[operator](num1, num2);
        coll.shift();
        coll.shift();
      }

      console.log('result:', coll[0].value)

      this.setResult(coll[0].value, 'calc');
    }
  };
});
