const express       = require('express'),
      router        = express.Router(),
      request      = require('request'),
      FB            = require('FB');

require('dotenv').config();

let todaysDate = new Date();
let YYYY = todaysDate.getFullYear();
let month = todaysDate.getMonth() + 1;
let MM = month.toString().padStart(2, "0");
let day = todaysDate.getDate();
let DD = day.toString().padStart(2, "0");

let myDate = `${YYYY}-${MM}-${DD}`;
let lastYear = `${YYYY - 2}-${MM}-${DD}`;

//FB.options({version: 'v3.2', appId: process.env.APP_ID, appSecret: process.env.APP_SECRET});
//FB.setAccessToken(process.env.ACCESS_TOKEN);

//let fb = new FB.Facebook();

let queries = {
    FacebookQueries: {
        avgLikes: {
            path: `/${process.env.USER_ID}/posts?limit=20`,
            method: 'GET',
            options: {
                        "fields":"id,likes.limit(0).summary(true)",
                         "access_token": process.env.ACCESS_TOKEN
            },
            callback: function(response) {
                likesArr = Array.from(response.data).map(cur => cur.likes.summary.total_count);
                let totalLikes = likesArr.reduce((acc, cur) => acc += cur);
                return totalLikes / 20;
            }
        },
        posts: {
            path: `/${process.env.USER_ID}/posts`,
            method: 'GET',
            options:{

            }
        },
        avgComments: {
            path: `/${process.env.USER_ID}/posts?limit=20`,
            method: 'GET',
            options: {
                "fields": "id,message,comments.limit(0).summary(true)",
                "access_token": process.env.ACCESS_TOKEN
            }
        }
    }
}

exports.data = queries;