import { Router } from "express";
import {
  authUser,
  deleteUser,
  getAllUsersProfile,
  getUserProfile,
  getUsersProfileById,
  logoutUser,
  registerUser,
  updateUserByAdmin,
  updateUserProfile,
} from "../controllers/UserController.js";

const router = Router();

router.route("/").get(getAllUsersProfile).post(registerUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router
  .route("/:id")
  .delete(deleteUser)
  .get(getUsersProfileById)
  .put(updateUserByAdmin);
router.post("/logout", logoutUser);
router.post("/login", authUser);

export default router;
