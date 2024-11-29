define(['util'], function(util) {
  var calculator = {
    ACCURACY: 1000,
    op: {
      '+': function(a, b) {
        return (a * calculator.ACCURACY + b * calculator.ACCURACY) / calculator.ACCURACY;
      },
      '-': function(a, b) {
        return (a * calculator.ACCURACY - b * calculator.ACCURACY) / calculator.ACCURACY;
      },
      '*': function(a, b) {
        return ((a * calculator.ACCURACY) * (b * calculator.ACCURACY)) / (calculator.ACCURACY * calculator.ACCURACY);
      },
      '/': function(a, b) {
        return (a * calculator.ACCURACY) / (b * calculator.ACCURACY);
      }
    }
  };

  util.extend(calculator, util.events);

  return calculator;
});
