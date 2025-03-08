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
import { AppRouter, appRouter } from "./routes/trpcRouters/appRouter";

startMongooseDatabase();
startPrismaDatabase();

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

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use("/trpc", trpcServer);

app.use("/employees", employeeRouter);
app.use("/chat", employeeRouter);

const server = createServer(app);

// ws server
const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext,
});

app.listen(5200, () => {
  console.log(`Server running at http://localhost:2022...`);
});

server.listen(2022, () => {
  console.log(`Server running at http://localhost:2022...`);
});
