
const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    res.send('<h1>dog<h1>');
})

app.get('/contact',function(req,res){
    res.send('vorakan.sumeth@gmail.com')
})

app.get('/about',function(req,res){
    res.send('IT"S ME PAULO JINYOU DA')
})

app.get('/calculator',function(req,res){
    res.sendFile(__dirname + "/calculator.html")
})

app.post("/calculator",function(req,res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1+num2;

    res.send("result is "+result);
})

app.get("/weather",function(req,res){
    res.sendFile(__dirname+'/weather.html')
});

app.post("/weather", function(req,res){
    const query = String(req.body.cityName);
    const apiKey = "0ff84fb0351b8807ab978874ce073b0c"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
    
    https.get(url, function(response){
        
        response.on('data',function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            var out = "<h1>The temperature in "+query+" is "+temp+" degree Celcius.</h1>"+
                        "<h1>The weather is currently "+desc+"<h1>"
            res.write(out)         
            res.write("<image src="+imageURL+"></image>")   
            res.send()
        })
    });
    
})


app.listen(3000, function(){
    console.log('server started on localhost:3000');
});

