import { Router } from "express";

import alunoControllers from "../controllers/AlunoControllers.js";

const router = Router();

router.get("/", alunoControllers.index);
router.post("/", alunoControllers.store);
router.get("/", alunoControllers.show);
router.delete("/", alunoControllers.delete);
router.put("/:email", alunoControllers.update);

export default router;
