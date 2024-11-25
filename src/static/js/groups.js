(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/js/groups-service-worker.js')
  }

  function shuffle (arr) {
    var len = arr.length, newArr = arr.slice(), i, j, tmp;
    for (i = len - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = tmp;
    }
    return newArr;
  }

  const numberOfPeopleInput = document.getElementById('number-of-people')
  const numberPerGroupInput = document.getElementById('number-per-group')

  const state = {
    numberOfPeople: Number(localStorage['groups:numberOfPeople'] || numberOfPeopleInput.value),
    numberPerGroup: Number(localStorage['groups:numberPerGroup'] || numberPerGroupInput.value),
  }

  numberOfPeopleInput.value = state.numberOfPeople
  numberPerGroupInput.value = state.numberPerGroup

  function selectOnFocus (e) {
    try {
      e.target.setSelectionRange(0, e.target.value.length)
    } catch (err) {
      try {
        e.target.setSelectionRange(0, 100)
      } catch (err) {}
    }
  }

  numberOfPeopleInput.addEventListener('focus', selectOnFocus)
  numberPerGroupInput.addEventListener('focus', selectOnFocus)

  const onInputChange = (field) => (e) => {
    function revert () {
      e.preventDefault()
      e.target.value = state[field]
    }

    if (
      typeof e.target.value !== 'string'
      || !/\d+/.test(e.target.value)
    ) {
      return revert()
    }

    const value = Number(e.target.value)

    if (value === 0) {
      return revert()
    }

    if (field === 'numberOfPeople' && value < state.numberPerGroup) {
      numberPerGroupInput.value = value
      state.numberPerGroup = value
    }

    if (field === 'numberPerGroup' && value > state.numberOfPeople) {
      numberOfPeopleInput.value = value
      state.numberOfPeople = value
    }

    state[field] = value
    localStorage[`groups:${field}`] = value
  }

  numberOfPeopleInput.addEventListener('change', onInputChange('numberOfPeople'))
  numberPerGroupInput.addEventListener('change', onInputChange('numberPerGroup'))

  const resultsUl = document.getElementById('results-list')

  function displayGroups (groups) {
    const groupsHtml = groups.map((group, i) => (
      `<li class="group">
        <span class="group-label">#${i + 1}</span>
        <ul class="group-items">
          <li class="group-item">
            ${group.join('</li><li class="group-item-joiner">↔</li><li class="group-item">')}
          </li>
        </ul>
      </li>`
    )).join('')

    resultsUl.innerHTML = groupsHtml

    document.querySelector('.container').classList.add('has-results')
  }

  function makeGroups (e) {
    e.preventDefault()

    resultsUl.innerHTML = ''

    const { numberOfPeople, numberPerGroup } = state

    const people = (new Array(numberOfPeople)).fill().map((_, i) => i + 1)
    const shuffledPeople = shuffle(people)
    const numGroups = Math.ceil(numberOfPeople / numberPerGroup)
    const groups = (new Array(numGroups)).fill().map((_, i) => {
      return shuffledPeople.slice(i * numberPerGroup, i * numberPerGroup + numberPerGroup)
    })
    const lastGroup = groups[groups.length - 1]

    if (lastGroup.length < numberPerGroup) {
      const otherGroups = groups.slice(0, groups.length - 1).map((group) => {
        return shuffle(group)
      })
      let otherGroupIndex = 0
      let otherGroupInnerIndex = 0

      while (lastGroup.length < numberPerGroup) {
        lastGroup.push(otherGroups[otherGroupIndex][otherGroupInnerIndex])

        otherGroupIndex++

        if (!otherGroups[otherGroupIndex]) {
          otherGroupIndex = 0
          otherGroupInnerIndex++
        }
      }
    }

    localStorage['groups:lastResults'] = JSON.stringify(groups)

    displayGroups(groups)
  }

  const lastResults = JSON.parse(localStorage['groups:lastResults'] || 'null')

  if (lastResults) {
    displayGroups(lastResults)
  }

  document.getElementById('make-groups').addEventListener('click', makeGroups)
  document.querySelector('form').addEventListener('submit', makeGroups)
})()
