const JWTService = require("../services/JWTService");
const User = require("../models/users");
const userDto = require("../dto/userDto");
const UserDTO = require("../dto/userDto");

const auth = async (req, res, next) => {
  try {
    // validate token
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    let _id;

    try {
      _id = await JWTService.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }

    // to modify request
    let user;
    try {
      user = await User.findOne({ _id: _id });
    } catch (error) {
      return next(error);
    }
    const userDto = new UserDTO(user);

    req.userId = userDto._id;

    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
