import { Router } from "express";

import userController from "../controllers/userController.js";

const router = Router();

router.post("/", userController.store);
router.get("/", userController.index);
router.delete("/:email", userController.delete);
router.get("/:email", userController.show);
router.put("/:email", userController.update);

export default router;
