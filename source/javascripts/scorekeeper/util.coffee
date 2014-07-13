define ->

  debounce: (timeout, fn)->
    obj = this
    (args...)->
      context = this
      clearTimeout obj.debounce.timeout
      obj.debounce.timeout = setTimeout ->
        fn.call context, args...
      , timeout

  findIndex: (items, predicate)->
    for item, index in items
      return index if predicate item
    -1

  newId: (items)->
    ids = (item.id for item in items)
    return 0 unless ids.length
    Math.max(ids...) + 1
