import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.header("token") || req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        message: "No entry without auth",
      });
    }

    const users = jwt.verify(token, "jwt-secret");

    req.user = {
      user_id: users._id,
    };
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
  next();
};

export default userAuth;
