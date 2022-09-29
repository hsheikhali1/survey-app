const express = require("express");
const logger = require("./logger");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("pictures"))

app.get("/", function (request, response) {
	response.render("index");
})

app.get("/health", (_, response) => {
	logger.debug("running the logger");
	return response.send({ message: "alive", status: 200 });
});

app.get("/silvia", function (_, response) {
	return response.send("Hello Silvia!");
});

app.listen(3000, () => {
	console.log("we're off to the races!",
	"We are live on http://localhost:3000/")
});