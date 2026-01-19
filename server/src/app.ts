import express from "express";
import cors from 'cors';

import categoryRoutes from "./routes/category.routes";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { seedInitCategories } from "./seed/category.seed";

const app = express();

// Cors for running locally
app.use(cors());

// Parses json req/res/body
app.use(express.json());

// Routes
app.use("/category", categoryRoutes);
app.use("/todo", todoRoutes);

// Middleware
// 404 for unknown routes
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);

seedInitCategories();

export default app;
