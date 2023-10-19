import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("port", process.env.PORT || 3000);

app.get("/", (_, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(app.get("port"), () => {
  console.log(`Server is listening on port ${app.get("port")}`);
});
