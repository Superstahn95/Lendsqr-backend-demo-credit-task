import express from "express";
import userRoute from "./routes/users.route";
import authRoute from "./routes/auth.route";
import globalErrorHandlerMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.get("/", (req, res, next) => {
  res.status(200).send("node and typescript running");
});
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.use(globalErrorHandlerMiddleware);

export default app;
