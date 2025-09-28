import express from "express";
import cookieparser from 'cookie-parser'
import "dotenv/config";
import cors from 'cors';
import authRouter from "./routes/routes.auth.js";
import { connectDB } from "./config/mongo.connect.js";
import userRouter from "./routes/user.router.js";
import chatRouter from "./routes/chat.router.js";

const port = process.env.PORT || 30000;

const app = express();
app.use(cors({origin:"https://chatme-frontend-ochre.vercel.app",
  credentials:true,
}

))
app.use(express.json());
app.use(cookieparser())

app.use("/api/auth", authRouter);
app.use("/api/users",userRouter)
app.use("/api/chat",chatRouter);

app.get("/",(req,res)=>{
res.json("url updated")
})

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listenig at http://localhost:${port}`);
  });
});
