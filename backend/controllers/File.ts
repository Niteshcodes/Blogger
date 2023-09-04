import multer from "multer";
import { Request, Response } from "express";
import { GridFsStorage } from "multer-gridfs-storage";
import { Multer } from "multer";
import { GridFSBucket, MongoClient } from "mongodb";

const dbURL = process.env.DB || "mongodb://127.0.0.1:27017/Blogger";
const DBClient = new MongoClient(dbURL);

const storage = new GridFsStorage({
  url: dbURL,
  file: (req, file) => {
    console.log(file)
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "images",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

const upload = multer({ storage });

const handleProfileImage = async (req: Request, res: Response) => {
  try {
    await DBClient.connect();
    const db = DBClient.db("Blogger");
    const imageBucket = new GridFSBucket(db, { bucketName: "images" });
    let downloadStream = imageBucket.openDownloadStreamByName(
      req.params.filename
    );
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function () {
      return res.status(404).send({ error: "Profile Picture not found!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export { upload, handleProfileImage };
