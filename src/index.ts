import app from "./app";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
});
