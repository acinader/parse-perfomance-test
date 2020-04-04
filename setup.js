const Parse = require('parse/node');

Parse.initialize('playground', '', 'playground');
Parse.serverURL = 'http://localhost:1337/parse';

module.exports = Parse;
