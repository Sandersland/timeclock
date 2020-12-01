import {Router} from 'express';
import * as controller from '../controller/Job.controller';

const router = Router();

router.get("/", controller.getMany);
router.get("/:id", controller.getOne);
router.post("/", controller.createOne);
router.patch("/:id", controller.updateOne);
router.delete("/:id", controller.deleteOne);

export default router;
