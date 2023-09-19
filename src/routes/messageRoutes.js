import express from "express";
import MessageController from "../controller/messageController";
import DataChequer from "../middlewares/DataChequer";
import VerifyAccess from "../middlewares/veryfyAccess";

const router = express.Router();

router.post(
  "/",
  DataChequer.userRegisterIsEmpty,
  MessageController.createMessage
);
router.get("/", VerifyAccess("admin"), MessageController.getAllMessage);
router.delete("/", VerifyAccess("admin"), MessageController.deleteAllMessage);

export default router;