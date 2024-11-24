import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import LogRoutes from "./routes/logs.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 2020;


app.use(cors());
app.use(express.static("public"))
app.use(express.json())
app.use("/your-log", LogRoutes)


app.get ("/", (req, res) => {
    res.send ("welcome to the API")
})


app.post ("/post", (req, res) => {
    res.send ("this is a post method for comments")
})



app.listen (PORT, () => {
    console.log (`port listening to ${PORT}`)
}) 