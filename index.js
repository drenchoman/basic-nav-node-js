const http = require('http');
const url = require('url');
const fs = require('fs');
const hostname = '127.0.0.1'
const port = 8080

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data)
  return data
})

const server = http.createServer((req, res) => {
let q = url.parse(req.url, true)
let fileName
if (q.pathname === '/'){
  fileName = "." + "/index.html";
}
else {
  fileName = "." + q.pathname + ".html"
}

fs.readFile(fileName, function(err, data){
  if (err) {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.write(page404)
    return res.end();
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  }
})

})


server.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`)
})
