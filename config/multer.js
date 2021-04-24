// Create storage engine
import GridFsStorage from "multer-gridfs-storage";
import multer from "multer";
import crypto from "crypto";

// const mongoURI =
//   "mongodb+srv://file:dap196421@cluster0.flyo0.mongodb.net/file-uploader?retryWrites=true&w=majority";
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        // const filename = buf.toString("hex") + path.extname(file.originalname);
        const filename = file.originalname;
        const fileInfo = { filename: filename };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

export default upload;
