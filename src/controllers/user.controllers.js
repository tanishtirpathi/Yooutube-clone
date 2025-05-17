import { AsyncHanddler } from "../utils/AsyncHanddler.js";
import { Apierror } from "../utils/APIerror.js";
import { User } from "../modals/user.modal.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { APIresp } from "../utils/APIresp.js";
import { error } from "console";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccesstoken();
    const refreshToken = await user.generateRefreshtoken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Apierror(
      500,
      error,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = AsyncHanddler(async (req, res) => {
  // * get user details from frontend
  // * validations
  // * check if user exists already: username / emails
  // * check about images
  // * upload them to cloudinary
  // * double check the avatar
  // * create user object
  // * check entry in db
  // * remove password and refresh token field from response
  // * check for user creation
  // * return response
  // ! all are done here

  const { fullName, username, email, password } = req.body || {};
  console.log(`username: ${username}`);

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new Apierror(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new Apierror(409, "User with same email or username already exists");
  }

  // Debug logging to understand incoming files
  console.log("req.files:", req.files);

  const avatarFiles = req.files?.avatar;
  const coverImageFiles = req.files?.coverImage;

  if (!Array.isArray(avatarFiles) || avatarFiles.length === 0) {
    throw new Apierror(400, "Avatar image is required");
  }

  const avatarLocalPath = avatarFiles[0].path;
  let coverImageLocalPath;

  if (Array.isArray(coverImageFiles) && coverImageFiles.length > 0) {
    coverImageLocalPath = coverImageFiles[0].path;
  }

  // Upload to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new Apierror(400, "Avatar image upload failed");
  }

  let coverImage;
  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new Apierror(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new APIresp(201, createdUser, "User registered successfully"));
});

const loginUser = AsyncHanddler(async (req, res) => {
  // * request body se data le aao
  // * username or emails se login
  // * find the user
  // * password check
  // * access and refresh token generate and give to user
  // * send through secure cookie

  const { username, email, password } = req.body || {};

  if (!username && !email) {
    throw new Apierror(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new Apierror(404, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new Apierror(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new APIresp(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

  const logoutUser = AsyncHanddler(async (req, res) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new APIresp(200, {}, "User logged out successfully"));
  });

const refreshAccesToken = AsyncHanddler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  if (incomingRefreshToken) {
    throw new Apierror(401, "unauthrised request ");
  }
try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  
    const user = await User.findById(decodedToken?._id);
  
    if (!user) {
      throw new Apierror(401, "invalid request token ");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new Apierror(401, "Refresh token is expired ");
    }
  
    const options = {
      httpsOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new APIresp(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token refresh succesfully "
        )
      );
} catch (error) {
  throw new Apierror(401 , error?.messsage || "invalid code of refresh token ")
}
});
export { registerUser, loginUser, logoutUser,refreshAccesToken };
