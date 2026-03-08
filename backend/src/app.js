import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);



app.set("port", (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({extended: true, limit: "40kb"}));

app.use("/api/v1/users", userRoutes);

const start= async () => {
    const connectionDB = await mongoose.connect("mongodb+srv://shivampal2004:shivam042604@zetacluster.74l69u5.mongodb.net/zeta?appName=ZetaCluster");
    console.log(`Connected to MongoDB ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8080");
    });
}

start();