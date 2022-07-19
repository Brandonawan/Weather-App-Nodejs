const express = require("express");
const https = require("https");

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 5000


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");


	// res.send("Your Server Is Up And Running");
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = "fe78a462226b37d644590b1b26c3480f"
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit +"&&appid=" + apiKey +""


    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + "</h1>");
            res.write("<img src=" + imageURL +">");
            res.send();
        })
    })
});

app.listen(port, function(){
    console.log("Server started on port 3000");
});


