const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index.js');

// Assertion Style
chai.should();
chai.use(chaiHttp);
