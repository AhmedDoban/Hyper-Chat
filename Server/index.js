// import files
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import Users_Routes from "./App/Routes/Users_Routes.js";
import Request_Routes from "./App/Routes/Request_Routes.js";
import Message_Routes from "./App/Routes/Message_Routes.js";

// make a conection to data base
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connected to Server Successfully`));

// middlewares
const App = express();

App.use(express.json());
App.use(cors());

App.use("/API/Users", Users_Routes);
App.use("/API/Request", Request_Routes);
App.use("/API/Message", Message_Routes);

App.use("*", (Req, Res) => {
  Res.status(200).json({
    Status: "Faild",
    message: "Can't access this Route. ",
  });
});

// Server
const AppServer = http.createServer(App);

const io = new Server(AppServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

global.OnlineUsers = new Map();

io.on("connection", (socket) => {
  global.Chatsocket = socket;
  socket.on("online_user", (userId) => {
    const user = OnlineUsers.set(userId, socket.id);
  });
  socket.on("Send_Message", (data) => {
    const GETUSerSocket = OnlineUsers.get(data.To);
    socket.to(GETUSerSocket).emit("Recive_Message", data.Message);
  });
});

AppServer.listen(4000, () => {
  console.log("Listen in port 4000");
});
