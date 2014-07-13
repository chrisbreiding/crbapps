define ->

  newId: (items)->
    ids = (item.id for item in items)
    return 0 unless ids.length
    Math.max(ids...) + 1
