const readline = require("readline");
const terminalImage = require('terminal-image');
const got = require('got');
const gis = require('g-i-s');

var imageLimit = 10;

// The GoogleImage function takes in a search term for Google images.
// 'gis' takes in that search term and collects the URLS in a JSON format.
// The JSON results are cycled through with a random number of up to ten
// and the URL is inserted into 'got' and 'terminalImage' renders the image
// onto the terminal.
function GoogleImage(image) {
  gis(image, logResults);
  function logResults(error, results) {
    if (error) {
      console.log("Image error");
    }
    else {
      (async () => {
        var num = Math.floor(Math.random() * (imageLimit + 1));
        const body = await got(results[num].url).buffer();
        console.log(await terminalImage.buffer(body, {width: '80%', height: '80%'}));
        console.log(results[num].url + '\n');
      })();
    }
  }
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("> ");
rl.prompt();
rl.on("line", function(cmd) {
  GoogleImage(cmd)
}).on("close", function() {
  process.exit(0);
});
