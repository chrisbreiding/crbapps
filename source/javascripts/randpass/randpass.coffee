$ ->

  lower = 'abcdefghijklmnopqrstuvwxyz'
  upper = lower.toUpperCase().split ''
  lower = lower.split ''
  nums  = [0..9]

  limit = 14 # TODO: make this configurable
  chars = lower.concat(upper).concat(nums)
  pass  = [
    lower[_.random(lower.length - 1)]
    upper[_.random(upper.length - 1)]
    nums[_.random(nums.length - 1)]
  ]

  limit -= 3

  while limit--
    pass.push chars[_.random(chars.length - 1)]

  $('#password').html _.shuffle(pass).join('')
