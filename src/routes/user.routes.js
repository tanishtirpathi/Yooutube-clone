import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccesToken,
  changecurrentpassword,
  getCureentUser,
  updateAccountdetail,
  getUserchannelProfile,
  updateUserCoverImage,
  updateUserAvatar,
  userWatchHistory,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/change-pass").post(verifyJWT, changecurrentpassword);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCureentUser);
router.route("/update-account").patch(verifyJWT, updateAccountdetail);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/refresh-token").post(refreshAccesToken);
router.route("/c/:username").get(verifyJWT, getUserchannelProfile);
router.route("/histroy").get(verifyJWT, userWatchHistory);
export default router;
