require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database/database");
const userRoute = require("./users/users.route");
const authRoute = require("./auth/auth.route");
const characterRoute = require("./character/character.route")
const swaggerRoute = require("./swagger/swagger.route");

const port = process.env.PORT || 3001;
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/characters",characterRoute)
app.use("/api-docs", swaggerRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});