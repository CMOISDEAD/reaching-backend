import { createServer } from "http";
import { Server } from "socket.io";

export const socket = (app: Express.Application) => {
  const server = createServer(app);
  const io = new Server(server as any, {
    cors: {
      origin: "*",
    },
  });

  return { server, io };
};
