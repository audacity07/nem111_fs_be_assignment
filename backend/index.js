const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { bookRouter } = require("./routes/book.routes");
require("dotenv").config();
const { limiter } = require("./middleware/rateLimiter.middleware");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management App",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(limiter);
app.use("/users", userRouter);
app.use("/books", bookRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: `Working` });
// });

app.get("/regeneratetoken", (req, res) => {
  const refreshToken = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(refreshToken, "masai");
  if (decoded) {
    const authToken = jwt.sign(
      { username: decoded.username, userID: decoded.userID },
      "masai",
      {
        expiresIn: 300,
      }
    );
    res.json({ newAuthToken: authToken });
  } else {
    res.json({ msg: `Invalid Refresh Token, Cant generate new token` });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
  } catch (error) {}
  console.log(`Server is running on ${process.env.PORT}`);
});
