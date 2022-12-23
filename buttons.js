function showButtons() {

    let thumbsUpBtn = select("#thumbsUp");
    thumbsUpBtn.mousePressed(() => { thumbsUp.addDataset() });
    
    let thumbsDownBtn = select("#thumbsDown");
    thumbsDownBtn.mousePressed(() => {
      thumbsDown.addDataset();
    });

    let thumbsNeutralBtn = select("#thumbsNeutral");
    thumbsNeutralBtn.mousePressed(() => {
      thumbsNeutral.addDataset();
    });

  // Train Button
  let train = select("#Train");
  train.mousePressed(trainModel);

  // Predict Button
  let predict = select("#Predict");
    predict.mousePressed(finished = !finished);

//   // Save Model
//   let saveModel = select("#saveModel");
//   saveModel.mousePressed(function () {
//     classifier.save();
//   });
//   // Load Model
//   loadModel = select("#Load");
//   loadModel.changed(function () {
//     files = loadModel.elt.files;
//     classifier.load(files);
//   });
}
