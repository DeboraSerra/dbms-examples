const conn = require("./connection");
const http = require("http");

const server = http.createServer(async (req, res) => {
  if (req.url.includes("/correct")) return correct(req, res);
  const connection = await conn.getConnection();
  await connection.beginTransaction();
  try {
    const [result1] = await connection.execute(
      "INSERT INTO customers (first_name, last_name, birth_date, phone, address, city, state, points) VALUES (?,?,?,?,?,?,?,?)",
      [
        "Jane",
        "Doe",
        "1986-03-28",
        "781-932-9754",
        "0 Sage Terrace",
        "Vancouver",
        "BC",
        2273,
      ]
    );
    const log = "Customer " + result1.insertId + " added";
    console.log(result1);
    console.log(log);
    const [result2] = await connection.execute(
      `INSERT INTO orders (customer_id, order_date, status, comments, shipped_date, shipper_id) VALUES (?, ?, ?, ?, ?, ?);`,
      [null, new Date(), 1, "", null, 1]
    );
    console.log(result2);
    await connection.commit();
    res.end(JSON.stringify(result2));
    console.log("Transaction Completed Successfully.");
  } catch (err) {
    await connection.rollback();
    console.error("Transaction Failed:", err);
    res.statusCode = 400;
    res.end("error");
  } finally {
    connection.release();
  }
});

const correct = async (req, res) => {
  const connection = await conn.getConnection();
  await connection.beginTransaction();
  try {
    const [result1] = await connection.execute(
      "INSERT INTO customers (first_name, last_name, birth_date, phone, address, city, state, points) VALUES (?,?,?,?,?,?,?,?)",
      [
        "Jane",
        "Doe",
        "1986-03-28",
        "781-932-9754",
        "0 Sage Terrace",
        "Vancouver",
        "BC",
        2273,
      ]
    );
    const log = "Customer " + result1.insertId + " added";
    console.log(result1);
    console.log(log);
    const [result2] = await connection.execute(
      `INSERT INTO orders (customer_id, order_date, status, comments, shipped_date, shipper_id) VALUES (?, ?, ?, ?, ?, ?);`,
      [result1.insertId, new Date(), 1, "", null, 1]
    );
    console.log(result2);
    await connection.commit();
    res.end(JSON.stringify(result2));
    console.log("Transaction Completed Successfully.");
  } catch (err) {
    await connection.rollback();
    console.error("Transaction Failed:", err);
    res.statusCode = 400;
    res.end("error");
  } finally {
    connection.release();
  }
};

server.listen(3000, () => console.log("running on http://localhost:3000"));
