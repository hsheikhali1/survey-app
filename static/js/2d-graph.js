// start timer
const timeStart = performance.now()

// get all the required fields
const graph = document.querySelector('#graph-img')
const graphType = graph.getAttribute('data-graph-type')
const graphId = graph.getAttribute('data-graph-id')
const usernameSpan = document.querySelector('#username')

// get all the questions that start with question
const questions = Array.from(document.querySelectorAll('input[id^=question]'))

// this is strictly for 2d graphs page
const submitAndProceed = document.querySelector('#proceed')

// immediately attempt to put username in span tag
const userName = localStorage.getItem('username')
usernameSpan.innerText += ` ${userName}`

// we need to wait for this to finish before we can move to the second page
async function submitFields (fields) {
  try {
    await fetch('https://survey-app-production.up.railway.app/post-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
  } catch (err) {
    console.log('error occured', err)
    return err
  }
}

// this will only work on the 2d graph page
submitAndProceed.addEventListener('click', (e) => {
  e.preventDefault()
  const timeEnd = performance.now()
  const timeToReadGraph = timeEnd - timeStart
  let dataSet = {
    name: localStorage.getItem('username'),
    timeForCompletion: timeToReadGraph,
    graphId,
    type: graphType
  }
  questions.forEach((question) => {
    dataSet = { ...dataSet, [question.id]: question.value }
  })
  submitFields(dataSet).then(() => {
    window.location.href = '/3d-graph'
  })
})
