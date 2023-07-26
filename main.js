 song = "";
 RightWristScore = 0;
 leftWristScore = 0;
 left_wrist_x = 0;
 left_wrist_y = 0;
 right_wrist_x = 0;
 right_wrist_y = 0;

 function preload() {
     song = loadSound("music.mp3");
 }

 function setup() {
     canvas = createCanvas(500, 400);
     canvas.center();
     video = createCapture(VIDEO);
     video.hide();
     poseNet = ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
 }

 function draw() {
     image(video, 0, 0, 500, 400);
     if (leftWristScore > 0.2) {
         fill("#dd00ff");
         stroke("#dd00ff");
         circle(left_wrist_x, left_wrist_y, 20);
         NUMLEFT = Number(left_wrist_y);
         NO_decimal = floor(NUMLEFT);
         volume = NO_decimal / 400;
         document.getElementById("volume").innerHTML = "VOLUME =" + volume;
     }
     if (RightWristScore > 0) {
         fill("#dd00ff");
         stroke("#dd00ff");
         circle(right_wrist_x, right_wrist_y, 20);
         if (right_wrist_y > 0 && right_wrist_y < 100) {
             document.getElementById("speed").innerHTML = "SPEED = 0.5x";
             song.rate(0.5);
         } else if (right_wrist_y > 100 && right_wrist_y < 200) {
             document.getElementById("speed").innerHTML = "SPEED = 1x";
             song.rate(1);
         } else if (right_wrist_y > 200 && right_wrist_y < 300) {
             document.getElementById("speed").innerHTML = "SPEED = 1.5x";
             song.rate(1.5);
         } else if (right_wrist_y > 300 && right_wrist_y < 400) {
             document.getElementById("speed").innerHTML = "SPEED = 2x";
             song.rate(2);
         }
     }
 }

 function play() {
     song.play();
     song.setVolume(volume);
 
 }

 function modelLoaded() {
     console.log("model loaded successfully");
 }

 function gotPoses(results) {
     if (results.length > 0) {
         console.log(results);
         leftWristScore = results[0].pose.keypoints[9].score;
         left_wrist_x = results[0].pose.leftWrist.x;
         left_wrist_y = results[0].pose.leftWrist.y;
         console.log("left_wrist_x=" + left_wrist_x + " and left_wrist_y=" + left_wrist_y);
       RightWristScore = results[0].pose.keypoints[10].score;
         right_wrist_x = results[0].pose.rightWrist.x;
         right_wrist_y = results[0].pose.rightWrist.y;
         console.log("right_wrist_x=" + right_wrist_x + " and right_wrist_y=" + right_wrist_y);
      console.log(RightWristScore);
       console.log(leftWristScore);
     }
 }
