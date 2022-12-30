const twoDCheckbox = document.querySelector('#checkbox-2d')
const threeDCheckbox = document.querySelector('#checkbox-3d')
const submit = document.querySelector('#submit-feedback')
const justification = document.querySelector('#justification')
const addtionalComments = document.querySelector('#additional_comments')
const howOftenQuestions = document.querySelectorAll('.questions > input')
const education = document.querySelector('#education')
const age = document.querySelector('#age')

let howOftenSelected

console.log(education.options[education.selectedIndex])

howOftenQuestions.forEach((question) => {
  question.addEventListener('click', (e) => {
    const element = e.target

    howOftenSelected = element.value
  })
})

threeDCheckbox.addEventListener('click', () => {
  threeDCheckbox.checked = true
  twoDCheckbox.checked = false
})

twoDCheckbox.addEventListener('click', () => {
  threeDCheckbox.checked = false
  twoDCheckbox.checked = true
})

async function submitFields (fields) {
  try {
    await fetch('https://survey-app-production.up.railway.app/post-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
  } catch (err) {
    return err
  }
}

submit.addEventListener('click', (e) => {
  e.preventDefault()
  let preference = ''

  if (twoDCheckbox.checked) {
    preference = '2d'
  } else if (threeDCheckbox.checked) {
    preference = '3d'
  }

  if ((twoDCheckbox.checked || threeDCheckbox.checked) && justification.value !== '') {
    // add logic to push to database
    submitFields({
      name: localStorage.getItem('username'),
      graph_preference: preference,
      justification: justification.value,
      additional_comments: addtionalComments.value,
      age: age.value,
      education_level: education.options[education.selectedIndex].text,
      graph_view_frequency: howOftenSelected
    }).then(() => {
      window.location.href = '/completion'
    })
  } else {
    window.location.href = '/completion'
    console.error('Please select a graph preference and provide a justification')
  }
})
