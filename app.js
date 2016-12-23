var profile = require('./profile.js');
// process = global object of Node.js
  // argv = property of process
var users = process.argv.slice(2);

users.forEach(profile.get);
