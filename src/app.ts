import express from "express";
import userRoute from "./routes/users.route";
import authRoute from "./routes/auth.route";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res, next) => {
  res.status(200).send("node and typescript running");
});
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

export default app;
