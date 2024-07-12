import express from "express";
import userRoute from "./routes/users.route";
import authRoute from "./routes/auth.route";
import { config } from "dotenv";

config();
// console.log(process.env.CHECK);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("node and typescript running");
});
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});

export default app;
