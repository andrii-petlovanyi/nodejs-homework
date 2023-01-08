import multer from "multer";
import path from "path";

const tempDir = path.resolve("./src/tmp");

const multerConfig = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, tempDir);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 2048,
  },
});

const uploadAvatar = multer({
  storage: multerConfig,
});

export { uploadAvatar };
