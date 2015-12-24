define ->

  scoresTotal: (scores)->
    scores.reduce (total, score)->
      total += +score.score unless isNaN +score.score
      total
    , 0
