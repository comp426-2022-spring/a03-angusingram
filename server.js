const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2))
var HTTP_PORT = args['port'] || 5000


const server = app.listen(HTTP_PORT, () => {
   //console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

app.get('/app', (req, res) => {
    // Respond with status 200
        res.statusCode = 200
        res.statusMessage = 'OK'
    // Respond with status message "OK"
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip' : flip })

});

app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number)
    var summary = countFlips(flips)
    res.status(200).contentType('text/plain').json({ "raw" : flips, "summary" : summary})

});

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).contentType('text/plain').json(flipACoin(req.params.call))

});

app.use(function(req, res){
res.status(404).send('404 NOT FOUND')
});











function coinFlip() {
    let min = 1;
    let max = 10;
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    x = x % 2;
    if(x == 1) {
      return '"heads"';
    } else if (x == 0) {
      return '"tails"';
    }
  }
  

  
function coinFlips(flips) {
    if (flips == null) {
      flips = 1;
    }
    let array = new Array(flips);
    for (let i = 0; i < flips; i++) {
      array[i] = coinFlip();
    }
    return array;
}


function countFlips(array) {
    let heads = 0;
    let tails = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        heads++;
      } else {
        tails++;
      }
    }
    return "{ heads: " + heads + ", tails: " + tails + " }";
  }

function flipACoin(call) {
    if (call == "heads" || call == "tails") {
      let x = coinFlip();
      if (x == call) {
        return "{ call: '" + call + "', flip: '" + x + "', result: 'win' }"
      } else {
        return "{ call: '" + call + "', flip: " + x + ", result: 'lose' }"
      }
    }
    
    return "Error: no input \nUsage: node guess-flip --call=[heads|tails]"
  
  }
