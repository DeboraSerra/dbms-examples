const http = require("http");
const db = require("./models");

const server = http.createServer(async (req, res) => {
  if (req.url.includes("/update")) {
    try {
      const result = await db.Customer.update({ name: "John Doe" });
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 500;
      res.end(err.message);
    }
  }
  const result = await db.Customer.findAll();
  res.end(JSON.stringify(result));
});

server.listen(3000, () => console.log("running on http://localhost:3000"));
