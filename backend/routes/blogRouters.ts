import Express from "express";
import {
  handleAll,
  handleCreate,
  handleDelete,
  handleGetOne,
  handleUpdate,
} from "../controllers/Blog";
import { upload } from "../controllers/File";

const router = Express.Router();

router.get("/all", handleAll);
router.get("/one/:id", handleGetOne);
router.post("/create",upload.single('image'), handleCreate);
router.put("/update",upload.single('image'), handleUpdate);
router.delete("/blog/:id", handleDelete);

export default router;
