const http = require("http");
const db = require("./models");

const server = http.createServer(async (req, res) => {
  const result = await db.Customer.findAll();
  res.end(JSON.stringify(result))
});

server.listen(3000, () => console.log("running on http://localhost:3000"));
