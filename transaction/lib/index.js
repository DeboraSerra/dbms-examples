const conn = require("./connection");
const http = require("http");

const server = http.createServer(async (req, res) => {
  await conn.getConnection().beginTransaction();
  try {
    const [result1] = await conn.execute(
      "INSERT INTO customers VALUES (?,?,?,?,?,?,?)",
      {
        first_name: "Babara",
        last_name: "MacCaffrey",
        birth_date: "1986-03-28",
        phone: "781-932-9754",
        address: "0 Sage Terrace",
        city: "Waltham",
        state: "MA",
        points: 2273,
      }
    );
    const log = "Customer " + result1.insertId + " added";
    console.log(log);
    const [result2] = await conn.execute(
      `INSERT INTO orders (customer_id, order_date, status, comments, shipped_date, shipper_id) VALUES (?, ?, ?, ?, ?, ?);`,
      {
        customer_id: result1.insertId,
        order_date: new Date(),
        status: 1,
        comments: "",
        shipped_date: null,
        shipper_id: 1,
      }
    );
    console.log(result2);
    await conn.commit();
    res.end(result2);
    console.log("Transaction Completed Successfully.");
  } catch (err) {
    await conn.rollback();
    console.error("Transaction Failed:", err);
    res.statusCode = 400;
    res.end("error");
  } finally {
    await conn.end();
  }
});

server.listen(3000, () => console.log("running on http://localhost:3000"));
