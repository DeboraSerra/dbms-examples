const conn = require("./connection");
const http = require("http");

const server = http.createServer(async (req, res) => {
  const result = await conn.execute("SELECT * FROM customers");
  res.end(JSON.stringify(result[0]))
});

server.listen(3000, () => console.log("running on http://localhost:3000"));
