const express = require('express'),
      app = express(),
      port = 8000,
      mongoose = require('mongoose'),
      request = require('request'),
      FB = require('fb'),
      FacebookAccessToken = 'EAAHHcFOnUw4BAOiZAVc6HdP2ZBeocxkU1XZATRvgg30YCqdCSZBduRAAyqQ1jhOz0pvlvsEuqbX4qD1oj11kFFzM35Bal3lYPzoVTEiiWz9b90njaerNmV1IZAYx6T4kZA4QoWhGOogJQPxWxnKyJer0iKFnaP7TEZD',
      url = 'mongodb://jakelamb1:7HeWCQBqqf1rRPtSc7DZD4LUehoXhlMnk5DLNwNv5vPnKGXwY8oVnBCvRsbny8i8UTFZd7pGsypmAaQYHoz3PQ%3D%3D@jakelamb1.documents.azure.com:10255/?ssl=true';

/**
    this project uses Semantic-UI as a front-end framework
    LESS is also loaded up and linked in the header
*/

FB.options({version: 'v3.2', appId: '500760230449934', appSecret: 'bee045ce4184a8016f6710a06ec2b2e3'});
FB.setAccessToken(FacebookAccessToken);

let fb = new FB.Facebook();

// THIS IS THE FORMAT
// fb.api(path, method, options/parameters, callback)
// API call for total likes on the most recent 20 posts
fb.api(
   '/2572337952783191/posts?limit=20', 
   'GET',
    {
        "fields":"id,likes.limit(0).summary(true)",
        "access_token": 'EAAHHcFOnUw4BAOiZAVc6HdP2ZBeocxkU1XZATRvgg30YCqdCSZBduRAAyqQ1jhOz0pvlvsEuqbX4qD1oj11kFFzM35Bal3lYPzoVTEiiWz9b90njaerNmV1IZAYx6T4kZA4QoWhGOogJQPxWxnKyJer0iKFnaP7TEZD'
    },
    function(response) {
        let likesArr = Array.from(response.data).map(cur => cur.likes.summary.total_count);
        console.log(likesArr);
  }
);

mongoose.connect(url, {useNewUrlParser: false});
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Get it fool");
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.listen(8000, () => {
    console.log(`Server is funning on port ${port}`);
});