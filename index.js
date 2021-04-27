const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const { Client, Environment, ApiError } = require('square');
const dotenv = require('dotenv');
const JSONBig = require("json-bigint")
const path = require('path')
dotenv.config();
// const LocalStrategy = require('passport-local').Strategy;
// const router = express.Router();

// main config
var app = express();

// app.use(express.static(__dirname));
// const expressSession = require('express-session')({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
// });

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// mongoose.connect('mongodb://localhost:27017/meat', { useNewUrlParser: true, useUnifiedTopology: true })
// const conn = mongoose.createConnection('mongodb://localhost:27017/meat')
// conn.model('Meat', require('./models/meat'))

// conn.model('User', require('./models/user'))


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
const userRouter = require("./routes/userRoutes");
// const wholesaleRouter = require("./routes/wholesaleRoutes");

app.get('/', function(req,res){
	// res.json({message:'You did it!'})
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

// app.use('/api/meats', meatRouter);
// // app.use('/api/wholesale', wholesaleRouter);

// app.use('/api/users', userRouter);



app.listen(3000);