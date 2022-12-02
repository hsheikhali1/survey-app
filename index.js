const express = require("express");
const logger = require("./logger");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("pictures"));
app.use(express.json());

// write a function that randomly generates or reads an image
// then displays that image to the browser
const randomlyDisplayImage = () => {
  // declare the image variable
  let image;

  // get all the images from your directory

  // using javascript, randomly select a graph

  // return the image
  return image;
};

app.get("/", function (request, response) {
  // example logic for randomly selecting from a list
  /*
   */
  const questions = [
    {
      id: "question1",
      question: "What percentage of cold drinks consumed in Autumn",
    },
    {
      id: "question2",
      question:
        "What was the precentage increase of hot drinks consumed from summer to winter",
    },
  ];
  const listOfGraphs = [
    {
      graph: "graph1.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph1",
    },
    {
      graph: "graph2.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph2",
    },
    {
      graph: "graph3.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph3",
    },
    {
      graph: "graph4.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph4",
    },
    {
      graph: "graph5.png",
      questions,
      typeOfGraph: "3D",
      graphId: "graph5",
    },
    { graph: "graph6.png", questions, typeOfGraph: "2D", graphId: "graph6" },
    { graph: "graph7.png", questions, typeOfGraph: "2D", graphId: "graph7" },
    { graph: "graph8.png", questions, typeOfGraph: "2D", graphId: "graph8" },
    { graph: "graph9.png", questions, typeOfGraph: "2D", graphId: "graph9" },
    {
      graph: "graph10.png",
      questions,
      typeOfGraph: "2D",
      graphId: "graph10",
    },
  ];
  const randomGraph = Math.floor(Math.random() * listOfGraphs.length);

  response.render("index", {
    graphs: {
      graph: listOfGraphs[randomGraph].graph,
      questions: listOfGraphs[randomGraph].questions,
      typeOfGraph: listOfGraphs[randomGraph].typeOfGraph,
      graphId: listOfGraphs[randomGraph].graphId,
    },
  });
});

app.get("/health", (_, response) => {
  logger.debug("running the logger");
  return response.send({ message: "alive", status: 200 });
});

app.get("/silvia", function (_, response) {
  return response.send("Hello Silvia!");
});

app.post("/post-results", function (request, response) {
  console.log(request.body);
  return response.send("MAKING POST REQUESTS");
});

app.listen(3000, () => {
  console.log(
    "we're off to the races!",
    "We are live on http://localhost:3000/"
  );
});
