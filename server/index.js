const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { JsonDB, Config } = require("node-json-db");
require("dotenv").config();

const server = express();

server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);
server.use(express.json());
server.use(cookieParser());

const db = new JsonDB(new Config("db", true, false));

server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    var data = await db.getData("/users");
  } catch (error) {
    console.log(error);
  }

  const user = await data?.find((user) => {
    return user.username === username && user.password === password;
  });

  if (!user) {
    return res.status(403).json({
      error: "something went wrong",
    });
  }

  delete user?.password;

  const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });

  await db.reload();

  res.cookie("token", token);
  res.status(200);
  res.end();
});

server.get("/verify", async (req, res) => {
  const defaultReturnObject = { authenticated: false, user: null };

  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.MY_SECRET);
    const data = await db.getData("/users");

    const user = await data?.find((user) => {
      return user.username === decoded.username;
    });

    if (!user) {
      return res.status(403).json(defaultReturnObject);
    }

    res.status(200).json({ authenticated: true, user: user });
  } catch (error) {
    console.log("/verify error", error);
    res.status(400);
    res.end();
  }
});

server.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200);
  res.end();
});

server.listen(3000, () => {
  console.log("server listening on port 3000");
});
