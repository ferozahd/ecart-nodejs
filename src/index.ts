import express, { Application } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./configs/db"
import itemRoutes from "./controllers/itemController";
import authRoutes from "./controllers/authController";


dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
connectDB();


const app: Application = express();
app.use(express.json());

const swaggerDocument = YAML.load("./src/swagger/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", itemRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
