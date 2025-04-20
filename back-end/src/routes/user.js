import { Router } from "express";

import userControllers from "../controllers/userController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = new Router();

router.post("/", userControllers.create);
router.get("/", loginRequired, userControllers.index);
router.get("/", loginRequired, userControllers.show);
router.delete("/", loginRequired, userControllers.delete);
router.put("/", loginRequired, userControllers.update);

export default router;
