objects = [];
video = "";
alarm1 = "";
function preload() {
    alarm1 = loadSound("answer_me.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 450, 450);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    objectDetector.detect(video, gotResults);
    console.log(objects);
    if(objects != null){
        for (i = 0; i < objects.length; i++) {
            console.log(objects[i]);
            if (objects[i].label == 'person') {
                document.getElementById("status").innerHTML = "Baby Detected";
                alarm1.stop();
            } else if (objects[i].label != 'person'){
                document.getElementById("status").innerHTML = "No Baby Detected";
                alarm1.play();
            }
        }
    }
}
function gotResults(results, error) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function modelLoaded() {
    console.log("model is loaded")
} 