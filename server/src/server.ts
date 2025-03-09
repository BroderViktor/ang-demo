import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import {
  applyWSSHandler,
  CreateWSSContextFnOptions,
} from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { startMongooseDatabase } from "./database/mongooseDatabase";
import { prisma, startPrismaDatabase } from "./database/prismaDatabase";
import { employeeRouter } from "./routes/employees/employee.routes";
import { AppRouter, appRouter } from "./trpc/appRouter";

//? Start the databases
startMongooseDatabase();
startPrismaDatabase();

//? Create a TRPC router
const createContext = async (
  opts: trpcExpress.CreateExpressContextOptions | CreateWSSContextFnOptions
) => ({
  req: opts.req,
  res: opts.res,
  db: prisma,
});
type TrpcContext = Awaited<ReturnType<typeof createContext>>;
initTRPC.context<TrpcContext>().create();

const trpcServer = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

//? Create an express server
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use("/trpc", trpcServer);

app.use("/employees", employeeRouter);
app.use("/chat", employeeRouter);

app.listen(5200, () => {
  console.log(`Server running at http://localhost:2022...`);
});

//? Create a WebSocket server
const server = createServer(app);

const wss = new WebSocketServer({ server });
const handler = applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

server.listen(2022, () => {
  console.log(`Server running at http://localhost:2022...`);
});

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});
console.log("✅ WebSocket Server listening on ws://localhost:3001");
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
