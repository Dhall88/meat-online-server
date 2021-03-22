const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const crypto = require('crypto');
const { Client, Environment, ApiError } = require('square');
const dotenv = require('dotenv');
dotenv.config();
// const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


mongoose.connect('mongodb://localhost:27017/meat', { useNewUrlParser: true, useUnifiedTopology: true })

const client = new Client({
    timeout:3000,
    environment: Environment.Sandbox, // `Environment.Sandbox` to access sandbox resources
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
  })

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
defaultClient.basePath = 'https://connect.squareupsandbox.com';

app.post('/process-payment', async (req, res) => {
    const request_params = req.body;
  
  // Charge the customer's card
  const paymentsApi = client.paymentsApi;
  const requestBody = {
    sourceId: requestParams.nonce,
    amountMoney: {
      amount: 100, // $1.00 charge
      currency: 'USD'
    },
    locationId: requestParams.location_id,
    idempotencyKey: requestParams.idempotency_key,
  };
  
  try {
    const response = await paymentsApi.createPayment(requestBody);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response.result
    });
  } catch(error) {
    let errorResult = null;
    if (error instanceof ApiError) {
      errorResult = error.errors;
    } else {
      errorResult = error;
    }
    res.status(500).json({
      'title': 'Payment Failure',
      'result': errorResult
    });
  }
});

const meatRouter = require("./routes/meatRoutes");
// const wholesaleRouter = require("./routes/wholesaleRoutes");

app.get('/', function(req,res){
	res.json({message:'You did it!'})
})

app.use('/api/meats', meatRouter);
// app.use('/api/wholesale', wholesaleRouter);

app.listen(3000);
console.log('starting app')