var avensong="";
var pirasong="";
leftWristX = "";
leftWristy = "";
rightWristX = "";
rightWristY = "";
volume = "";
speeed = "";
function preload()
{
    avensong= loadSound("aven.mp3");
    pirasong= loadSound("pira.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("Model is Loaded");
}
function gotPoses(results)
{
    if (results.length > 0)
    {
        leftWristX = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    avensong.setVolume(0.1);
    pirasong.setVolume(0.1);

    aven_status = avensong.isPlaying();
	pira_status = pirasong.isPlaying();

   /* if(leftWristy > 500)
    {
        avensong.pause();
        pirasong.play();
        console.log("down function");
    }
    if(leftWristy < 500)
    {
        pirasong.pause();
        avensong.play();
        console.log("up function");
    }
    if(leftWristy > 500 && rightWristY > 500)
    {
        pirasong.pause();
        avensong.pause();
    }
} */

if(leftWristy < 500)
{ 
    pirasong.stop();

    if(aven_status == false)
    {
        avensong.play();
    }
}

if(rightWristY < 500)
{
    avensong.stop();

    if(pira_status == false)
    {
        pirasong.play();
    }
}
}