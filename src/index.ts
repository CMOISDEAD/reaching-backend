import express from "express";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import { socket } from "./lib/socket";

const app = express();

const { server, io } = socket(app);

app.set("port", process.env.PORT || 3000);

app.use("/auth", authRouter);
app.use("/api", apiRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
