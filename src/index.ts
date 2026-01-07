import express, { Application } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./configs/db"
import itemRoutes from "./controllers/itemController";
import authRoutes from "./controllers/authController";
import shopRoutes from "./controllers/shopController";
import cors from "cors";
import { userContextMiddleware } from "./middlewares/user-context.middleware";

dotenv.config();
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const port: number = Number(process.env.PORT) || 3000;
connectDB();


const app: Application = express();
app.use(cors(corsOptions));
app.use(express.json());

const swaggerDocument = YAML.load("./src/swagger/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/auth", authRoutes);
app.use(userContextMiddleware);
app.use("/api", itemRoutes);
app.use("/api", shopRoutes);

app.use(errorHandler);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
