import express from "express";
import { getAllRoutes } from "./api";
import { errorMiddleware } from './middlewares';
import { connectDb } from './data';

(async () => {
  const server = express();

  const db = await connectDb();

  server.use(express.json())
  server.use('/api', getAllRoutes())
  server.use(errorMiddleware)
  
  server.listen(3334);
}) ()

