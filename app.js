const express = require('express'),
      app = express(),
      port = 8000,
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      request = require('request'),
      FB = require('fb'),
      url = 'mongodb://jakelamb1:7HeWCQBqqf1rRPtSc7DZD4LUehoXhlMnk5DLNwNv5vPnKGXwY8oVnBCvRsbny8i8UTFZd7pGsypmAaQYHoz3PQ%3D%3D@jakelamb1.documents.azure.com:10255/?ssl=true';

/**
    this project uses Semantic-UI as a front-end framework
    LESS is also loaded up and linked in the header
*/
require('dotenv').config();

mongoose.connect(url, {useNewUrlParser: false});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

FB.options({version: 'v3.2', appId: process.env.APP_ID, appSecret: process.env.APP_SECRET});
FB.setAccessToken(process.env.ACCESS_TOKEN);

let fb = new FB.Facebook();

// THIS IS THE FORMAT
// fb.api(path, method, options/parameters, callback)
// API call for total likes on the most recent 20 posts
let likesArr;
fb.api(
   `/${process.env.USER_ID}/posts?limit=20`, 
   'GET',
    {
        "fields":"id,likes.limit(0).summary(true)",
        "access_token": process.env.ACCESS_TOKEN
    },
    function(response) {
        likesArr = Array.from(response.data).map(cur => cur.likes.summary.total_count);
  }
);

app.get('/', (req, res) => {
    res.send("Get it fool");
});

app.get('/home', (req, res) => {
    let averageLikes = likesArr.reduce((acc, cur) => acc += cur) / likesArr.length;
    res.render('home', {title: averageLikes});
});

app.listen(8000, () => {
    console.log(`Server is funning on port ${port}`);
});