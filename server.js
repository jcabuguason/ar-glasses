var rxjs = require("rxjs");

// Use Express
var express = require("express");
// Use body-parser
// var bodyParser = require("body-parser");

// Create new instance of the express server
var app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
// app.use(bodyParser.json());
app.use(express.json())

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

const spawn = require('child_process').spawn;

// Initial Server Data
let toggleProcessing = false;
let toggleClassification = false;
let classificationValue = "None";
let brightness = 0;
let bitDepth = 30;
let isConnected = true;
let isRequestingConnection = false;
let isRequestingDisconnect = false;
let message = { message: "better late than never", datetime: new Date().toTimeString()}

setInterval(()=>{
    isRequestingDisconnect = false
},5000)


/*  "/api/status"
 *   POST: Get All Statuses
 */
app.get("/api/status", function (req, res) {
    // console.log({ brightness: brightness, bitDepth: bitDepth , message: message, toggleClassification: toggleClassification, toggleProcessing: toggleProcessing});
    res.send({ brightness: brightness, bitDepth: bitDepth , message: message, toggleClassification: toggleClassification, toggleProcessing: toggleProcessing, classificationValue: classificationValue});
});


/*  "/api/status/connection"
 *   GET: Get Connection Status
 */
app.get("/api/status/connection", function (req, res) {
    res.send({ value: isConnected });
});

/*  "/api/request/connection"
 *   GET: Get Connection Request Status
 */
app.get("/api/request/connection", function (req, res) {
    res.send({ value: isRequestingConnection });
});

/*  "/api/status/processing"
 *   GET: Get Connection Disconnect Request Status
 */
app.get("/api/request/disconnect", function (req, res) {
    isConnected = false;
    isRequestingConnection = false;
    res.send({ value: isRequestingDisconnect });
});


/*  "/api/status/processing"
 *   GET: Get Processing Toggle Status
 */
app.get("/api/status/processing", function (req, res) {
    console.log('getting processing toggle');
    res.send({ value: toggleProcessing });
});

/*  "/api/status/classification"
 *   GET: Get Classification/STT Toggle Status
 */
app.get("/api/status/classification", function (req, res) {
    console.log('updating classification values');
    res.send({ value: toggleClassification });
});

/*  "/api/status/classification"
 *   GET: Get Classification/STT Toggle Status
 */
app.get("/api/status/classification-value", function (req, res) {
  console.log('updating classification values');
  res.send({ value: classificationValue });
});

/*  "/api/status/classification"
 *   GET: Get Display Brightness Value
 */
app.get("/api/status/brightness", function (req, res) {
    console.log('get brightness values');
    res.send({ value: brightness });
});

/*  "/api/status/classification"
 *   GET: Get Microphone Bit-depth
 */
app.get("/api/status/bitDepth", function (req, res) {
    console.log('getting bitdepth values');
    res.send({ value: bitDepth });
});

/*  "/api/status/classification"
 *   GET: Get Speech to Text Values
 */
app.get("/api/stt/message", function (req, res) {
    console.log('getting stt values');
    res.send(message);
});



/*  "/api/status"
 *   POST: Update All Statuses
 */
app.put("/api/status", function (req, res) {
    let data = req.body;
    brightness = data.brightness
    bitDepth = data.bitDepth
    res.status(200).json({ value: data });
});


/*  "/api/status/connection"
 *   POST: Update Connection Status
 */
app.put("/api/status/connection", function (req, res) {
    let data = req.body;
    isConnected = data.value;
    res.status(200).json({ value: isConnected });
});

/*  "/api/request/connection"
 *   POST: Update Connection Request Status
 */
app.put("/api/request/connection", function (req, res) {
    let data = req.body;
    isRequestingConnection = data.value;
    res.status(200).json({ value: isRequestingConnection });
});

/*  "/api/request/connection"
 *   POST: Update Disconnect Request Status
 */
app.put("/api/request/disconnect", function (req, res) {
    console.log('updating disconnect');
    let data = req.body;
    isRequestingDisconnect = data.value;
    isRequestingConnection = false;
    res.status(200).json({ value: isRequestingDisconnect });
});

/*  "/api/status"
 *   POST: Update Processing Status
 */
app.put("/api/status/processing", function (req, res) {
    console.log('updating processing toggle');
    let data = req.body;
    toggleProcessing = data.value;
    res.status(200).json({ value: toggleProcessing });
});


/*  "/api/status/classification"
 *   POST: Update Processing Status
 */
app.put("/api/status/classification", function (req, res) {
    let data = req.body;

    toggleClassification = data.value;
    res.status(200).json({ value: toggleClassification });
});

/*  "/api/status/classification"
 *   POST: Update Processing Status
 */
app.put("/api/status/classification-value", function (req, res) {
  let data = req.body;

  classificationValue = data.value;
  res.status(200).json({ value: classificationValue });
});

/*  "/api/status/brightness"
 *   POST: Update Processing Status
 */
app.put("/api/status/brightness", function (req, res) {
    console.log('updating brightness');
    let data = req.body;
    brightness = data.value;
    res.status(200).json({ value: brightness });
});

/*  "/api/status/bit-depth"
 *   PUT: Update Processing Status
 */
app.put("/api/status/bitDepth", function (req, res) {
    console.log('updating bitdepth');
    let data = req.body;
    bitDepth = data.value;
    res.status(200).json({value: bitDepth});
});

/*  "/api/stt/message"
 *   POST: Update STT Message
 */
app.put("/api/stt/message", function (req, res) {
    console.log('updating stt message');
    let data = req.body.value;
    console.log(data);
    text = data;
    datetime = new Date();
    message = {message: text, datetime: new Date().toTimeString()};

    console.log(message);
    res.status(200).json({ value: message });
});

    // const python = spawn('python', ['testserver.py']);
    // // collect data from script
    // console.log('getting python script')
    // python.stdout.on('data', function (data) {
    // console.log('Pipe data from python script ...');
    // dataToSend = data.toString();
    // console.log(dataToSend)
    // });

// const ls = spawn('python', ['script.py', 'arg1', 'arg2']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });
