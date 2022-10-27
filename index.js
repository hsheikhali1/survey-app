const express = require("express");
const logger = require("./logger");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("pictures"));

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
	const questions = ["What percentage of Cold Drinks were consumed in Autumn"]
	const listOfThreeDGraphs = [
		{ graph: "graph1.png", questions },
		{ graph: "graph2.png", questions },
		{ graph: "graph3.png", questions },
		{ graph: "graph4.png", questions },
		{ graph: "graph5.png", questions },
	]

	const listOfTwoDGraphs = [
		{ graph: "graph6.png", questions },
		{ graph: "graph7.png", questions },
		{ graph: "graph8.png", questions },
		{ graph: "graph9.png", questions },
		{ graph: "graph10.png", questions },
	]

  const randomTwoD = Math.floor(Math.random() * listOfTwoDGraphs.length);
  const randomThreeD = Math.floor(Math.random() * listOfThreeDGraphs.length);

  response.render("index", {
    twoDGraph: {
			graph: listOfTwoDGraphs[randomTwoD].graph,
			questions: listOfTwoDGraphs[randomTwoD].questions,
			answers: [],
		},
    threeDGraph: {
			graph: listOfThreeDGraphs[randomThreeD].graph,
			questions: listOfThreeDGraphs[randomThreeD].questions,
			answers: [],
		}
  });
});

app.get("/health", (_, response) => {
  logger.debug("running the logger");
  return response.send({ message: "alive", status: 200 });
});

app.get("/silvia", function (_, response) {
  return response.send("Hello Silvia!");
});

app.listen(3000, () => {
  console.log(
    "we're off to the races!",
    "We are live on http://localhost:3000/"
  );
});
