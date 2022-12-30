// get input field
const submitUsername = document.querySelector('#submit-details')
const consent = document.querySelector('#consent')

// error field
const errorSpan = document.querySelector('#error-display')

/**
 * Set value to local storage
 * @param key {string} Key to set for local storage
 * @param value {string} Value to set for key in local storage
 * @returns {void} returns void
 */
function setField (key, value) {
  localStorage.setItem(key, value)
}

function getField (key) {
  return localStorage.getItem(key)
}

function randomlyGenerateId (length) {
  const array = new Uint32Array(2)
  window.crypto.getRandomValues(array)
  let result = ''
  let str = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  for (let i = 0; i < array.length; i++) {
    str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(4).slice(-1)
  }
  return result + str
}

submitUsername.addEventListener('click', () => {
  if (getField('username') !== '' || getField('username') !== undefined) {
    // replace the username
    localStorage.clear()
    setField('username', randomlyGenerateId(5))
  }

  setField('username', randomlyGenerateId(5))

  if (consent.checked) {
    window.location.href = '/2d-graph'
  } else {
    errorSpan.innerText = 'In order to continue with the survey you must consent to the consent statement'
    errorSpan.classList.remove('hidden')
    errorSpan.classList.add('block')
    errorSpan.classList.add('text-red-300')
  }
})
