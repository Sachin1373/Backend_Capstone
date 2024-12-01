import express from "express";
import compression from "compression";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import error from "./src/middlewares/error.js"
import auth from "./src/routes/Auth.js"
import job from "./src/routes/Job.js"
import dbconnect from "./src/config/dbconnection.js";
import cors from "cors";

dotenv.config({ path: './.env' });

const port = process.env.PORT || 5000;
const app = express();


app.use(cors());
app.use(compression());
app.use(
    helmet({
        contentSecurityPolicy: false, 
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1', (req, res) => {
    console.log("Welcome to the backend");
    res.send("Welcome to the backend");
});
app.use('/api/v1/auth',auth)
app.use('/api/v1/job',job)


dbconnect();


app.use(error);


app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
