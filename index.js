const express = require('express')
const { createClient } = require('@supabase/supabase-js')

require('dotenv').config()

const logger = require('./logger')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('static', './static')
app.use(express.static('pictures'))
app.use(express.static('static'))
app.use(express.json())

const supabaseKey = process.env.SUPABASE_KEY

const db = createClient(
  'https://vaqjvzpyoyveukinynym.supabase.co',
  supabaseKey
)

app.get('/', function (_, response) {
  response.render('index')
})

app.get("/2d-graph", (_, response) => {
  // example logic for randomly selecting from a list
  /*
   */
  const questions = [
    {
      id: "question1",
      question: "What percentage of females were enrolled onto medicine",
    },
    {
      id: "question2",
      question:
        "What is the difference between females who studied engineering compared to females who studied veterinary sciences",
    },
    {
      id: "question3",
      question:
        "There are 300 people on the management course. How many of them are female",
    },
    {
      id: "question4",
      question:
        "According to the graph, which course is the most popular amongst females",
    },
    {
      id: "question5",
      question:
        "This question is an attention check. Please type the word ‘yellow’ below",
    },
    {
      id: "question6",
      question:
        "What is the percentage difference between the most popular and least popular course for females",
    }
  ];
  const listOfGraphs = [
    {
      graph: "graph1.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph1",
    },
    {
      graph: "graph2.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph2",
    },
    {
      graph: "graph3.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph3",
    },
    {
      graph: "graph4.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph4",
    },
    {
      graph: "graph5.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph5",
    },
  ];

  const randomGraph = Math.floor(Math.random() * listOfGraphs.length);

  response.render("2d-graph", {
    graphs: {
      graph: listOfGraphs[randomGraph].graph,
      questions: listOfGraphs[randomGraph].questions,
      typeOfGraph: listOfGraphs[randomGraph].typeOfGraph,
      graphId: listOfGraphs[randomGraph].graphId
    }
  })
})

app.get('/3d-graph', (_, response) => {
  const questions = [
    {
      id: 'question1',
      question: 'What percentage of females were enrolled onto medicine?',
    },
    {
      id: 'question2',
      question:
        'What is the difference between females who studied engineering compared to females who studied veterinary sciences?'
    },
    {
      id: 'question3',
      question:
        'There are 300 people on the management course. How many of them are female?'
    },
    {
      id: 'question4',
      question:
        'According to the graph, which course is the most popular amongst females?'
    },
    {
      id: 'question5',
      question:
        "This question is an attention check. Please type the word ‘yellow’ below.",
    },
    {
      id: "question6",
      question:
        "What is the percentage difference between the most popular and least popular course for females?",
    },
  ];
  const listOfGraphs = [
    { graph: "graph6.png", questions, typeOfGraph: "3D", graphId: "graph6" },
    { graph: "graph7.png", questions, typeOfGraph: "3D", graphId: "graph7" },
    { graph: "graph8.png", questions, typeOfGraph: "3D", graphId: "graph8" },
    { graph: "graph9.png", questions, typeOfGraph: "3D", graphId: "graph9" },
    {
      graph: "graph10.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph10",
    },
  ];

  const randomGraph = Math.floor(Math.random() * listOfGraphs.length);

  response.render("3d-graph", {
    graphs: {
      graph: listOfGraphs[randomGraph].graph,
      questions: listOfGraphs[randomGraph].questions,
      typeOfGraph: listOfGraphs[randomGraph].typeOfGraph,
      graphId: listOfGraphs[randomGraph].graphId,
    }
  })
})

app.get('/completion', (_, response) => {
  response.render('completion')
})

app.get('/additional-questions', (_, response) => {
  response.render('additional-questions')
})

app.get("/health", (_, response) => {
  logger.debug("running the logger")
  return response.send({ message: "alive", status: 200 })
})

app.post('/post-results', async function (request, response) {
  // connect to database
  const { error, data } = await db.from('survey_prod').insert({ ...request.body })

  if (error) {
    response.status(400)
    console.log(error)
    return response.send({ error, status: 400 })
  }

  return response.send(data)
})

app.post('/post-feedback', async function (request, response) {
  const { error, data } = await db.from('qualitative_results').insert({ ...request.body })

  if (error) {
    response.status(400)
    console.log(error)
    return response.send({ error, status: 400 })
  }

  return response.send(data)
})

app.get('/get-results', async function (_, response) {
  return response.send(await db.from('survey_prod').select())
})

app.listen(process.env.PORT, () => {
  console.log(
    "we're off to the races!",
    'We are live on http://localhost:3000/'
  )
})
