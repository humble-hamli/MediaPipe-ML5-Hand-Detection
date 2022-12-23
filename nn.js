// Step 1: Load Data
let classes = [];
let classifier;
let finished = false;
class dataClass {
  constructor(name) {
    this.name = name;
    this.datasets = [];
    this.index = this.datasets.length;
    this.indexSpan = document.getElementById("thumbs" + this.name + "Index");
  }
  addDataset() {
    if (detections.length > 0) {
      for (const landmarks of detections) {
        this.datasets.push({ landmarks });
      }
      console.log("Data added to: ", this.name);
      this.index = this.datasets.length;
      // console.log("Length: ", this.index);
      this.indexSpan.innerHTML = this.index;
    } else {
      alert("please show hand to create dataset.");
    }
  }
}

//Define Classes
let thumbsUp = new dataClass("Up");
let thumbsDown = new dataClass("Down");
let thumbsNeutral = new dataClass("Neutral");

// Step 2: set your neural network options
const options = {
  task: "classification",
  debug: true,
};

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options, networkLoaded);

function preload() {
  dataSet = loadJSON("dataset.json");
}

// Step 4: add data to the neural Network
function addTrainingData() {
  classes.push(thumbsUp, thumbsDown, thumbsNeutral);
  // console.log(classes);
  for (let i = 0; i < classes.length; i++) {
    for (let j = 0; j < classes[i].datasets.length; j++) {
      inputs = [];
      // console.log(classes[i].datasets[j]);
      for (let k = 0; k < classes[i].datasets[j].landmarks.length; k++) {
        // console.log(classes[i].datasets[j].landmarks[k])
        const landmark = {
          x: classes[i].datasets[j].landmarks[k].x,
          y: classes[i].datasets[j].landmarks[k].y,
          z: classes[i].datasets[j].landmarks[k].z,
          index: k,
        };
        //console.log(landmark);
        inputs.push(landmark);
        //nn.normalizeData();
      }
    }
    const output = {
      gesture: classes[i].name,
    };

    console.log(inputs);
    for (let j = 0; j < inputs.length; j++) {
      console.log(inputs[i]);
      nn.addData(inputs[i], output);
    }

    //  console.log("Inputs: ", inputs, " Outputs: ", output);
  }
  console.log("Data added to Neural Network");
}

function networkLoaded() {
  console.log("Network Loaded");
}

// Step 4: train the model
function trainModel() {
  addTrainingData();

  console.log("Data Normalized");
  const trainingOptions = {
    epochs: 32,
    batchSize: 12,
  };
  nn.train(trainingOptions, finishedTraining);
}

// Step 5: use the trained model
function finishedTraining() {
  console.log("Training finished");
}

// Step 6: make a classification
function classify() {
  for (const landmarks of detections) {
    for (let i = 0; i < landmarks.length; i++) {
      const input = {
        x: landmarks[i].x,
        y: landmarks[i].y,
        z: landmarks[i].z,
        index: i,
      };
      //  console.log(input);
      nn.classify(input, handleResults);
    }
  }
}

// Step 7: define a function to handle the results of your classification
function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  // {label: 'red', confidence: 0.8};
  // console.log(result[0].confidence);
  select("#result").html(result[0].label);
  select("#confidence").html(`${result[0].confidence.toFixed(2) * 100} []`);
}
