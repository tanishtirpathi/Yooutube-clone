import { User } from "../modals/user.modal";
import { Apierror } from "../utils/APIerror";
import { AsyncHanddler } from "../utils/AsyncHanddler";
import { Jwt } from "jsonwebtoken";
import { User } from "../modals/user.modal";

export const verifyJWT = AsyncHanddler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization ")?.replace("Bearer", "");
    if (!token) {
      throw new Apierror(401, "unauthorize request ");
    }
  
    const decodedToken = Jwt.verify(token, process.env.ACCCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-passoword -RefreshToken"
    );
    if (!user) {
      throw new Apierror(401, "inveled token ");
    }
    req.user = user;
    next();
  } catch (error) {
    
  }
});
