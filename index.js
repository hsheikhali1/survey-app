const express = require("express");
const logger = require("./logger");

const app = express();

app.use("/", (req, res, next) => {
	logger.debug("running the logger");
	return res.send({ message: "alive", status: 200 });
});


app.listen(3000, () => console.log("we're off to the races!"));