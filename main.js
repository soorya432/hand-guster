//https://teachablemachine.withgoogle.com/models/dOUry0aca/

function load(){
    setInterval(function(){
        document.getElementById("startEmoji").innerHTML = "&#9757;&#9996;";
    },6000);
    setTimeout(function(){
        setInterval(function(){
            document.getElementById("startEmoji").innerHTML = "&#128075;&#128076;";
        },6000);
    },2000);
    setTimeout(function(){
        setInterval(function(){
            document.getElementById("startEmoji").innerHTML = "&#128079;&#128077;";
        },6000);
    },4000);
}
Webcam.set({
    width:320,
    height:290,
    image_format:'png',
    png_quality:90
});
cam = document.getElementById("camera");
Webcam.attach(cam);

function snapshot(){
    Webcam.snap(function(img){
        console.log(img);
        image = img;
        document.getElementById("webcam").style.display = "none";
        document.getElementById("pic").style.display = "block";
        document.getElementById("result").innerHTML = "<img src="+img+" id='selfie'>";
    });
    Webcam.reset();
}

image = "";
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dOUry0aca/model.json",loaded);

function loaded(){
    console.log("model loaded!!");
}

function predict(){
    theImage = document.getElementById("selfie");
    document.getElementById("pic").style.display = "none";
    document.getElementById("resultDiv").style.display = "block";
    classifier.classify(theImage,result)
}

function result(error,result){
    if(error){
        console.log(error);
    }else if(result){
        speak = window.speechSynthesis;
        text = "";

        console.log(result);
        answer = result[0].label;
        document.getElementById("picture").src = image;

        if(answer == "Thumbs Up"){
            document.getElementById("resultEmoji").innerHTML = "&#128077;";
            document.getElementById("resultText").innerHTML = "Thumbs Up";
            text = "The gesture is a Thumbs Up";
            tell = new SpeechSynthesisUtterance(text);
            speak.speak(tell);
        }else if(answer == "Awesome"){
            document.getElementById("resultEmoji").innerHTML = "&#128076;";
            document.getElementById("resultText").innerHTML = "Awesome";
            text = "The gesture is an Awesome";
            tell = new SpeechSynthesisUtterance(text);
            speak.speak(tell);
        }else if(answer == "Victory"){
            document.getElementById("resultEmoji").innerHTML = "&#9996;";
            document.getElementById("resultText").innerHTML = "Victory";
            text = "The gesture is a sign of Victory";
            tell = new SpeechSynthesisUtterance(text);
            speak.speak(tell);
        }
    }
}

function reset(){
    document.getElementById("webcam").style.display = "block";
    document.getElementById("resultDiv").style.display = "none";

    Webcam.attach(cam);
}