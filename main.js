Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})
camera = document.getElementById("camera")
Webcam.attach("#camera") 
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/oeaEm8lgh/model.json", modelLoaded)
console.log("versão do ml5", ml5.version)
function modelLoaded(){
    console.log("Modelo pronto")
}
function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}
function check(){
    img = document.getElementById("captured_image")
    classifier.classify(img, gotresult)
}
function gotresult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("resultObjectName").innerHTML = results[0].label
        document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(2)
       }
}