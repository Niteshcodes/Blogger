import Express from "express";
import {
  handleAll,
  handleCreate,
  handleDelete,
  handleGetOne,
} from "../controllers/Blog";
import { upload } from "../controllers/File";

const router = Express.Router();

router.get("/all", handleAll);
router.get("/one/:id", handleGetOne);
router.post("/create",upload.single('image'), handleCreate);
router.delete("/blog/:id", handleDelete);

export default router;
