// Media Pipe Videoelement
const videoElement = document.getElementById("input_video");

// P5 Video Element
let video;

// Const Detections Array
let detections = [];

// Maschine Learning Modul Laden
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

// Kamera definieren
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});


function onResults(results) {
  if (!results) return;
  

  if (results.multiHandLandmarks) {
    detections = [];
		// console.log(results)
    for (const landmarks of results.multiHandLandmarks) {
      detections.push(landmarks)
    }
    
    // console.log(detections);
	}
}
  
function drawLandmarks() {
  // console.log(detections)
  for (const landmarks of detections) {
    for (let i = 0; i < landmarks.length; i++) {
      fill(0, 0, 255);
      noStroke();
      circle(landmarks[i].x * width, landmarks[i].y * height, 10);
      // console.log(landmarks[i].x, landmarks[i].y, 10);
    }
  }

}
  

// function drawConnections() {
//   drawConnectors(drawingContext, landmarks, HAND_CONNECTIONS, {
//     color: "#00FF00",
//     lineWidth: 5,
//   });
//   drawLandmarks(drawingContext, landmarks, { color: "#FF0000", lineWidth: 2 });
// }