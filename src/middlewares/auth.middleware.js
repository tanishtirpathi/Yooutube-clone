import { User } from "../modals/user.modal.js";
import { Apierror } from "../utils/APIerror.js";
import { AsyncHanddler } from "../utils/AsyncHanddler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = AsyncHanddler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Apierror(401, "unauthorize request ");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-passoword -refreshToken"
    );
    if (!user) {
      
      throw new Apierror(401, "inveled token ");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Apierror(401, error?.message || "invalid accesstoken ");
  }
});
