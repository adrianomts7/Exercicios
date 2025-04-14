import { Router } from "express";

import userControllers from "../controllers/userController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = new Router();

router.get("", loginRequired, userControllers.index);
router.post("", userControllers.create);
router.get("/:email", userControllers.show);
router.delete("/:email", userControllers.delete);
router.put("/:email", userControllers.update);

export default router;
