var https = require('https');

// Needed for status code
var http = require('http');

// Print messages
function printMessage(userName, badgeCount, points) {
  var message = userName + ' has ' + badgeCount + ' total badges and ' + 
  points + ' points in JavaScript.';
  console.log(message);
}

// Print errors
function printError(error) {
  console.error(error.message);
}

function get(username) {
  var req = https.get('https://teamtreehouse.com/' + username + '.json', 
  function (res) {
    var body = '';
    // Node.js uses "streams," creating non-blocking environment; so
    // data will come back in "pieces"
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      if (res.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          // Parse error
          printError(error);
        }
      } else {
        printError({message: 'An error occurred getting ' + username + '. (' + http.STATUS_CODES[res.statusCode] + ')'});
      }
    });
  });

  // Connection error
  req.on('error', printError);
}

// Creating a module, explicitly state what is available 
module.exports.get = get;
