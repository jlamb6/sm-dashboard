const express = require('express'),
      router = express.Router();

/**
 *  These controllers with only send POST calls
 *  Send the post call to the API you are looking for
 *  Return a JSON object
 */

 router.post('/accounts', function(req, res) {
    /** this will send a post request back to the application with the /accounts
     *  in this post, send another post request to the API of your choice
     *  return a JSON object
     */
 });

module.exports = router;