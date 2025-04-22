import { Router } from "express";
import multer from "multer";

import multerConfig from "../config/multer.js";
import fotoControllers from "../controllers/FotoControllers.js";

const upload = multer(multerConfig);

const router = Router();

router.post("/", upload.single("foto"), fotoControllers.store);

export default router;
