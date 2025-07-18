import { extname, dirname, resolve } from "path";
import { fileURLToPath } from "url";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
