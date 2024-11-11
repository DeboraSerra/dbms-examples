const http = require("http");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.status.createMany({
    data: [{ name: "Processed" }, { name: "Shipped" }, { name: "Delivered" }],
  });
  await prisma.shipper.createMany({
    data: [
      { name: "Hettinger LLC" },
      { name: "Schinner-Predovic" },
      { name: "Satterfield LLC" },
      { name: "Mraz, Renner and Nolan" },
      { name: "Waters, Mayert and Prohaska" },
    ],
  });
};

const valid = async (req, res) => {
  await prisma.$transaction(async (t) => {
    const customer = await t.customer.create({
      data: {
        firstName: "Babara",
        lastName: "MacCaffrey",
        birthDate: new Date("1986-03-28").toISOString(),
        phone: "781-932-9754",
        address: "0 Sage Terrace",
        city: "Waltham",
        state: "MA",
        points: 2273,
      },
    });
    const order = await t.orders.create({
      data: {
        customerId: customer.id,
        orderDate: new Date(),
        status: 1,
        comments: "",
        shippedDate: null,
        shipperId: 1,
      },
    });
    return res.end(
      `customer: ${JSON.stringify(customer, null, 2)}, order: ${JSON.stringify(
        order,
        null,
        2
      )}`
    );
  });
};

const invalid = async (req, res) => {
  await prisma.$transaction(async (t) => {
    const customer = await t.customer.create({
      data: {
        firstName: "Babara",
        lastName: "MacCaffrey",
        birthDate: new Date("1986-03-28").toISOString(),
        phone: "781-932-9754",
        address: "0 Sage Terrace",
        city: "Waltham",
        state: "MA",
        points: 2273,
      },
    });
    const order = await t.orders.create({
      data: {
        customerId: customer.id,
        orderDate: new Date(),
        status: 20,
        comments: "",
        shippedDate: null,
        shipperId: 1,
      },
    });
    return res.end(
      `customer: ${JSON.stringify(customer, null, 2)}, order: ${JSON.stringify(
        order,
        null,
        2
      )}`
    );
  });
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.includes("seed")) {
      await seed();
      return res.end("OK");
    }
    if (req.url.includes("invalid")) return invalid(req, res);
    return valid(req, res);
  } catch (err) {
    console.log(err);
  }
});

server.listen(3000, () => console.log("running"));
