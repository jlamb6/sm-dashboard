const express = require('express'),
      router = express.Router(),
      requrest = require('request'),
      FB = require('FB');

require('dotenv').config();
let todaysDate = new Date();
let YYYY = todaysDate.getFullYear();
let month = todaysDate.getMonth() + 1;
let MM = month.toString().padStart(2, "0");
let day = todaysDate.getDate();
let DD = day.toString.padStart(2, "0");

let myDate = `${YYYY}-${MM}-${DD}`;
let lastYear = `${YYYY - 2}-${MM}-${DD}`;

FB.options({version: 'v3.2', appId: process.env.APP_ID, appSecret: process.env.APP_SECRET});
FB.setAccessToken(process.env.ACCESS_TOKEN);

let fb = new FB.Facebook();

/**
 * Get an array of all likes on the last 20 posts
 */
fb.api(
    `/${process.env.USER_ID}/posts?limit=20`, 
    'GET',
    {
        "fields":"id,likes.limit(0).summary(true)",
        "access_token": process.env.ACCESS_TOKEN
    },
    function(response) {
        likesArr = Array.from(response.data).map(cur => cur.likes.summary.total_count);
        let totalLikes = likesArr.reduce((cur, acc) => acc + cur);
    }
);

/**
 * Get an array of all posts from the past year
 */
fb.api(
    //`/${process.env.USER_ID}/posts?since=2017-01-01&until=2019-01-01`,
    `/${process.env.USER_ID}/posts?since=${lastYear}&until=${myDate}`, 
    'GET',
    {
        //"fields":"id,likes.limit(0).summary(true)",
        "access_token": process.env.ACCESS_TOKEN
    },
    function(response) {
        let numPosts = Array.from(response.data).length;
    }
);