const Joi = require("joi");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const UserDto = require("../dto/userDto");
const JWTService = require("../services/JWTService");
const RefreshToken = require("../models/token");
const token = require("../models/token");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  register: register,
  login: login,
  logout: logout,
  refresh: refresh,
};

async function register(req, res, next) {
  const userRegisterSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().pattern(passwordPattern).required(),
    confirmPassword: Joi.ref("password"),
  });

  // 2. if error in validation -> return error via middleware
  // const { error } = userRegisterSchema.validate(req.body);
  let error = false;
  if (error) {
    const err = {
      status: 400,
      message: error.message,
    };
    return next(err);
  }

  const { username, name, email, password } = req.body;
  try {
    const emailInUse = await User.exists({ email });
    const usernameInUse = await User.exists({ username });

    if (emailInUse) {
      const error = {
        status: 409,
        message: "Email already registered, use another email!",
      };
      return next(error);
    }

    if (usernameInUse) {
      const error = {
        status: 409,
        message: "Username not available, choose another username! ",
      };
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let accessToken;
  let refreshToken;
  let savedUser;

  try {
    const userToRegister = new User({
      username: username,
      email: email,
      name: name,
      password: hashedPassword,
    });
    savedUser = await userToRegister.save();

    //  token Generation
    accessToken = JWTService.signAccessToken(
      {
        _id: savedUser._id,
      },
      "30m"
    );
    refreshToken = JWTService.signRefreshToken({ _id: savedUser._id }, "60m");
  } catch (error) {
    return next(error);
  }

  await JWTService.storeRefreshToken(refreshToken, savedUser._id);

  // send cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // for XSS attack
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  const userDto = new UserDto(savedUser);

  return res.status(201).json({ user: userDto, auth: true });
}

async function login(req, res, next) {
  let accessToken;
  let refreshToken;

  // Validate user Input
  const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordPattern),
  });

  // const { error } = userLoginSchema.validate(req.body);
  let error = false;
  if (error) {
    const err = {
      status: 400,
      message: error.message,
    };

    return next(err);
  }

  const { email, password } = req.body;
  let user;
  try {
    //   const user = await User.findOne({ username: username });
    user = await User.findOne({ email: email });

    if (!user) {
      const error = {
        status: 401,
        message: "Invalid Username or password",
      };
      return next(error);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error = {
        status: 401,
        message: "Invalid Username or password",
      };
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
  refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

  // update refresh token in database

  try {
    await RefreshToken.updateOne(
      {
        _id: user._id,
      },
      { token: refreshToken },
      { upsert: true }
    );
  } catch (error) {
    return next(error);
  }

  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  const userDto = new UserDto(user);

  return res.status(200).json({
    user: userDto,
    auth: true,
  });
}

async function logout(req, res, next) {
  // delete refresh token from db
  const { refreshToken } = req.cookies;

  try {
    await RefreshToken.deleteOne({ token: refreshToken });
  } catch (error) {
    return next(error);
  }

  // delete cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ user: null, auth: false });
}

async function refresh(req, res, next) {
  // get refreshToken from cookies
  const originalRefreshToken = req.cookies.refreshToken;

  let id;
  try {
    id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
  } catch (e) {
    const error = {
      status: 401,
      message: e.message ? e.message : "Unauthorized",
    };
    return next(error);
  }

  try {
    const match = RefreshToken.findOne({
      _id: id,
      token: originalRefreshToken,
    });
    if (!match) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  try {
    const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
    const refreshToken = JWTService.signAccessToken({ _id: id }, "60m");

    await RefreshToken.updateOne({ _id: id }, { token: refreshToken });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
  } catch (error) {
    return next(error);
  }

  const user = new UserDto(await User.findOne({ _id: id }));

  return res.status(200).json({ user, auth: true });
}

module.exports = authController;
