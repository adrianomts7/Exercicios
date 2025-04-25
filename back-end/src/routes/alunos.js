import { Router } from "express";

import alunoControllers from "../controllers/AlunoControllers.js";

const router = Router();

router.get("/", alunoControllers.index);
router.get("/:email", alunoControllers.show);
router.post("/", alunoControllers.store);
router.delete("/", alunoControllers.delete);
router.put("/", alunoControllers.update);

export default router;
