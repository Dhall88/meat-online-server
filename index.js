const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { Client, Environment, ApiError } = require('square');
const dotenv = require('dotenv');
const JSONBig = require("json-bigint")
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



app.post('/process-payment', async (req, res) => {
    const requestParams = req.body;
  
  // Charge the customer's card
  const paymentsApi = client.paymentsApi;
  const requestBody = {
    sourceId: requestParams.nonce,
    amountMoney: {
      amount: 100, // $1.00 charge
      currency: 'USD'
    },
    locationId: requestParams.locationId,
    idempotencyKey: requestParams.idempotencyKey,
  };

//   console.log(error)
  
  try {
    const response = await paymentsApi.createPayment(requestBody);
    const parsedResponse = JSONBig.parse(JSONBig.stringify(response));
    res.status(200).json({
      'title': 'Payment Successful',
      'result': parsedResponse
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
        console.log(error)
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