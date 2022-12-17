// start timer
const timeStart = performance.now();

// get all the required fields
const graph = document.querySelector("#graph-img");
const graphType = graph.getAttribute("data-graph-type");
const graphId = graph.getAttribute("data-graph-id");
const questionOne = document.querySelector("#question1");
const questionTwo = document.querySelector("#question2");
const usernameSpan = document.querySelector("#username");

// this is strictly for 2d graphs page
const submitAndProceed = document.querySelector("#proceed")

// immediately attempt to put username in span tag
const userName = localStorage.getItem("username");
usernameSpan.innerText += ` ${userName}`;

// we need to wait for this to finish before we can move to the second page
async function submitFields(fields) {

  try {
    const request = await fetch("https://survey-app-production.up.railway.app/post-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });
    const response = request.json();
  } catch (err) {
    console.log("error occured", err);
  }

}


// this will only work on the 2d graph page
submitAndProceed.addEventListener("click", (e) => {
  e.preventDefault();
  const timeEnd = performance.now();
  const timeToReadGraph = timeEnd - timeStart;
  const dataSet = {
    name: userName.value,
    timeForCompletion: timeToReadGraph,
    graphId,
    type: graphType,
    questionOne: `${questionOne.value}%`,
    questionTwo: `${questionTwo.value}%`,
  };
  submitFields(dataSet);
  window.location.href = "/3d-graph";
});
