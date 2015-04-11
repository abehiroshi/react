'use strict';

require('babel/register');
var app = require('./src/server/app');

app(__dirname + '/public');
