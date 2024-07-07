import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res, next) => {
  res.status(200).send("node and typescript running");
});

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
