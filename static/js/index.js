// get input field
const usernameInput = document.querySelector('#user-name')
const submitUsername = document.querySelector('#submit-details')
const consent = document.querySelector('#consent')

// error field
const errorSpan = document.querySelector('#error-display')

const errors = []

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

submitUsername.addEventListener('click', () => {
  if (usernameInput.value === '' || !usernameInput) {
    errors.push({ error: 'err-missing-username', message: 'Missing username, please provide a valid username before proceeding to the next page.' })
    console.error('Please provide a username before you can moving forward.')

    errorSpan.innerText = errors[0].message
    errorSpan.classList.remove('hidden')
    errorSpan.classList.add('block')
    errorSpan.classList.add('text-red-300')

    return
  }

  if (getField('username') !== '' || getField('username') !== undefined) {
    // replace the username
    localStorage.clear()
    setField('username', usernameInput.value)
  }

  setField('username', usernameInput.value)

  if (consent.checked) {
    window.location.href = '/2d-graph'
  } else {
    errorSpan.innerText = 'In order to continue with the survey you must consent to the consent statement'
    errorSpan.classList.remove('hidden')
    errorSpan.classList.add('block')
    errorSpan.classList.add('text-red-300')
  }
})
