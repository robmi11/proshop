import { Router } from "express";
import {
  loginUser,
  deleteUser,
  getAllUsersProfile,
  getUserProfile,
  getUsersProfileById,
  logoutUser,
  registerUser,
  updateUserByAdmin,
  updateUserProfile,
} from "../controllers/UserController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protect, admin, getAllUsersProfile).post(registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUsersProfileById)
  .put(protect, admin, updateUserByAdmin);
router.post("/logout", logoutUser);
router.post("/login", loginUser);

export default router;
