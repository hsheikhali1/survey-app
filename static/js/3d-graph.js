// 3d-graph page
const timeStart = performance.now()

// get all the required fields
const submitButton = document.querySelector('#submit')
const graph = document.querySelector('#graph-img')
const graphType = graph.getAttribute('data-graph-type')
const graphId = graph.getAttribute('data-graph-id')
const questionOne = document.querySelector('#question1')
const questionTwo = document.querySelector('#question2')
const usernameSpan = document.querySelector('#username')

// immediately attempt to put username in span tag
const userName = localStorage.getItem('username')
usernameSpan.innerText += ` ${userName}`

async function submitFields(fields) {
  try {
    await fetch('https://survey-app-production.up.railway.app/post-results', {
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

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  const timeEnd = performance.now()
  const timeToReadGraph = timeEnd - timeStart
  const dataSet = {
    name: localStorage.getItem('username'),
    timeForCompletion: timeToReadGraph,
    graphId,
    type: graphType,
    questionOne: `${questionOne.value}%`,
    questionTwo: `${questionTwo.value}%`
  }
  submitFields(dataSet).then(() => {
    window.location.href = '/thank-you'
  })
})
