const express = require('express');
const app = express();
const port = process.env.PORT ||9008;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongourl="mongodb://localhost:27017";
let db;