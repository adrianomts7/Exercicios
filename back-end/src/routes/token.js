import { Router } from "express";

import tokenControllers from "../controllers/TokenControllers.js";

const router = Router();

router.post("/", tokenControllers.store);

export default router;
