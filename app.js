const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
//const request = require("request");
const app = express();
const port = 3001;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/signup", function(req,res){
var firstname=req.body.fname;
var lastname=req.body.lname;
var Email=req.body.email;
const data = {
    members: [
        {
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
    ]
}
const jsondata = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/51bf234576";
const option = {
    method : "POST",
    auth: "ashwani:fdc9b04508282783278929d9da47863f-us5",
}

const request = https.request(url, option,function(response){
    if (response.statusCode == 200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data", function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
});
// construct req data
// const options ={
//     url: 'https://<us5>.api.mailchimp.com/3.0/lists/51bf234576',
//     method:  'POST',
//     headers: {
//         Authorization : 'auth fdc9b04508282783278929d9da47863f-us5'
//     },
//     body: postData
// }

//api key fdc9b04508282783278929d9da47863f-us5
//list id 51bf234576
app.listen(port,function(){
    console.log("server is running on port 3001")
});