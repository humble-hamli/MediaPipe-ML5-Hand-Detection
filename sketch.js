//p5 Functions
function setup() {
  createCanvas(640, 360);
  frameRate(25);

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  hands.onResults(onResults);

  camera.start();

  video = select("#input_video");

  showButtons();

  console.log("P5 Setup Complete");
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
  drawLandmarks();
  if (finished) classify();
}
