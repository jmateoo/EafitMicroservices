import { PrismaClient } from '@prisma/client';
import cors from "cors";
import express from 'express';
import authRoute from "./routes/auth.routes.js";
import indexRoute from "./routes/index.routes.js";
import { wrappedResponse } from "./utils/functions.js";
import { manageAuth, cookieAuth, echo } from "./middlewares/authJWT.js";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();

const app = express();

const port = process.env.PORT;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieAuth);
app.use(echo);

app.use("/bicycles", indexRoute);
app.use("/auth", authRoute);

app.get('/hello', async (req, res) => {
  const authUser = req.user;
  let payload = {user: "unauthenticated"};
  if (authUser) {
    payload = {user: authUser};
  }
  // console.log(`authUser: ${authUser}\nusername: ${authUser.username}\nuser: ${JSON.stringify(authUser)}`)
  res.send({
    success: true,
    payload: payload,
    message: "Hello World!",
  })
})

// app.use("*", (_, res) => {
//   return wrappedResponse(res, "Not Found", 404, null);
// });

const server = app.listen(port, async () => {
  await prisma.$connect();
  console.log(`⚡️[server]: Server is running on PORT ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close();
  console.log("[server]: Server closed on SIGINT");
});
