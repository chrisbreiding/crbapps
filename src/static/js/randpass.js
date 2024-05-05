(function() {
  function random(lower, upper, floating) {
    if (floating === undefined) {
        if (typeof upper === 'boolean') {
            floating = upper;
            upper = undefined;
        } else if (typeof lower === 'boolean') {
            floating = lower;
            lower = undefined;
        }
    }
    if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
    } else {
        lower = Math.floor(lower);
        if (upper === undefined) {
            upper = lower;
            lower = 0;
        } else {
            upper = Math.floor(upper);
        }
    }
    if (lower > upper) {
        const temp = lower;
        lower = upper;
        upper = temp;
    }
    if (floating || lower % 1 || upper % 1) {
        const rand = Math.random();
        const randLength = `${rand}`.length - 1;
        return Math.min(lower + rand * (upper - lower + freeParseFloat(`1e-${randLength}`)), upper);
    }
    return lower + Math.floor(Math.random() * (upper - lower + 1));
  }

  function shuffle (arr) {
    var len = arr.length, i, j, tmp;
    for(i = len-1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  var chars, limit, lower, nums, pass, upper;
  lower = 'abcdefghijklmnopqrstuvwxyz';
  upper = lower.toUpperCase().split('');
  lower = lower.split('');
  nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  limit = 14;
  chars = lower.concat(upper).concat(nums);
  pass = [
    lower[random(lower.length - 1)],
    upper[random(upper.length - 1)],
    nums[random(nums.length - 1)]
  ];
  limit -= 3;

  while (limit--) {
    pass.push(chars[random(chars.length - 1)]);
  }

  document.getElementById('password').textContent = shuffle(pass).join('');
})();
