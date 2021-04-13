const http = require("http");

const port = 3333;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>ss, World!</h1>");
});

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});
