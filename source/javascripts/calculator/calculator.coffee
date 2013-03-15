define ['util'], (util) ->

  calculator =
    ACCURACY: 1000
    op:
      '+': (a, b) ->
        (a * calculator.ACCURACY + b * calculator.ACCURACY) / calculator.ACCURACY
      '-': (a, b) ->
        (a * calculator.ACCURACY - b * calculator.ACCURACY) / calculator.ACCURACY
      '*': (a, b) ->
        ((a * calculator.ACCURACY) * (b * calculator.ACCURACY)) / (calculator.ACCURACY * calculator.ACCURACY)
      '/': (a, b) ->
        (a * calculator.ACCURACY) / (b * calculator.ACCURACY)

  util.extend calculator, util.events

  calculator
