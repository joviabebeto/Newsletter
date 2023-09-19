import express from "express";
import userController from "../controller/usercontroller";
import DataChequer from "../middlewares/DataChequer";
import Validator from "../middlewares/validator";
import VerifyAccess from "../middlewares/veryfyAccess";

const router = express.Router();

router.post(
  "/",
  DataChequer.userRegisterIsEmpty,
  DataChequer.emailExist,
  Validator.userAccountRule(),
  Validator.inputValidator,
  userController.createUser
);
router.get("/", VerifyAccess("admin"), userController.getAllUsers);
router.delete("/", VerifyAccess("admin"), userController.deleteAllUsers);
router.get("/:ido", userController.getOneUser);
router.delete("/:id", userController.deleteOneUser);
router.patch("/:id", userController.updateUser);
router.post("/login", userController.login);

export default router;