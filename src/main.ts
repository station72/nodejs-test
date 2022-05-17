import express, { Express } from "express";
import { initAllRoutes } from "./api";
import { addErrorMiddleware } from './middlewares';

const server = express();

initAllRoutes(server);
addErrorMiddleware(server);

server.listen(3334);
