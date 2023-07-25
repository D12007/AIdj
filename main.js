 song="";
 leftWristScore=0;
 left_wrist_x=0;
 left_wrist_y=0;
 right_wrist_x=0;
 right_wrist_y=0;
function preload(){
   song=loadSound("music.mp3");
}
function setup(){
 canvas=createCanvas(500,400);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,500,400);
    if(leftWristScore>0.2){
        fill("#dd00ff");
        stroke("#dd00ff");
        circle(left_wrist_x,left_wrist_y,20);
        NUMLEFT=Number(left_wrist_y);
        deci=floor(NUMLEFT);
        volume=deci/400;
        document.getElementById("volume").innerHTML="VOLUME ="+volume;
    }
}
function play(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}
function modelLoaded(){
console.log("model loaded successfully");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristScore=results[0].pose.keypoints[9].score;
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("left_wrist_x="+left_wrist_x+" and left_wrist_y="+left_wrist_y);
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("right_wrist_x="+right_wrist_x+" and right_wrist_y="+right_wrist_y);


    }
}