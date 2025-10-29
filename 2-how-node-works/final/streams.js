const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1: Using streams (correct approach)
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data)
  
  });
});

server.listen(8001, '127.0.0.1', () => {
  console.log('Listening on port 8001...');
})
