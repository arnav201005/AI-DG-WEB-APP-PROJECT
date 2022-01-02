rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;
scorerightWrist = 0;
scoreLeftWrist = 0;

song = "";
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);


}

function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftwristX, leftwristY, 20);
        Inumber = Number(leftwristY);
        removedecimal = floor(Inumber);
        volume = removedecimal / 500;
        document.getElementById("volume").innerHTML = "volume =" + volume;
        song.setVolume(volume);
    }
    fill("#ff0000");
    stroke("#ff0000");
    if (scoreLeftWrist > 0.2) {


        circle(rightWristX, rightWristY, 20);
        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "speed= 0.5x";
            song.rate(0.5);
        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "speed= 1x";
            song.rate(1);
        } else if (rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("speed").innerHTML = "speed= 1.5x";
            song.rate(1.5);
        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "speed= 2x";
            song.rate(2);
        } else if (rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("speed").innerHTML = "speed= 2.5x";
            song.rate(2.5);
        }
    }



}
function Pause() {
    song.pause();
}

function Stop() {
    song.stop();
}
function modelLoaded() {
    console.log('model Loaded');
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreLeftWrist = " + scoreLeftWrist + "scorrightwrist=" + scorerightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);



    }
}





