import express from "express";
import cors from "cors";
import crypto from "crypto";
import path from "path";
import mongoose from "mongoose";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./../.env" });

// Middlewares
app.use(express.json());
app.use(cors());

// connection
const conn = mongoose.createConnection(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// init gfs
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// Storage
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({
  storage,
});

app.post("/api/files", upload.single("file"), (req, res) => {
  res.status(201).json({
    message: req.file,
  });
});

app.get("/api/files", (req, res) => {
  gfs.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    }

    return res.json(files);
  });
});

app.get("/api/files/:filename", async (req, res) => {
  gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }

      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

app.listen(process.env.PORT, () => {
  console.log("server started on " + process.env.PORT);
});
