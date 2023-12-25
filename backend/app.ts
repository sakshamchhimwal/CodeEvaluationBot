import dotenv from "dotenv";
dotenv.config();
import express, {
    Application,
    NextFunction,
    Request,
    Response,
    Router,
    RouterOptions,
} from "express";
import createHttpError, { HttpError } from "http-errors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import embeddingRouter from "./routes/embeddingsRoutes";
import SmeeClient from "smee-client";
import { connectToMongoDb, connectToVectorDB } from "./config/connectToDB";
import { verifyToken } from "./middleware/verifyJWT";
import { clearDB, showDB } from "./utils/chromadbFunctions";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler);
app.use(cors());

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.statusCode || 500);
    res.render("error");
});

app.use("/", indexRouter);
app.use("/embeddings", embeddingRouter);
app.use("/user", verifyToken, userRouter);

// import { ChromaClient } from "chromadb";

// const client = new ChromaClient();

// client
//   .createCollection({
//     name: "continuous-evaluation",
//   })
//   .then((res) => {
//     console.log(res);
//   });

// clearDB(true).then((res) => {
//     console.log(res);
// });

// showDB().then((res) => {
//     console.log(res);
// });

const smee = new SmeeClient({
    source: <string>(<unknown>process.env.WEBHOOK_TUNNEL_URL),
    target: "http://127.0.0.1:8003/embeddings/compareAndUpdateEmbeddings",
    logger: console,
});

const events = smee.start();
connectToMongoDb();
// connectToVectorDB();

module.exports = app;
