import express from "express";
import { getAllRoutes } from "./api";
import { errorMiddleware } from './middlewares';

const server = express();

server.use('/api', getAllRoutes())
server.use(errorMiddleware)

server.listen(3334);