import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  try {
    if (token) {
      const decoded = jwt.verify(token, 'jwt-secret');
      req.user = {
        user_id: decoded._id,
      };
    next();

    }

    // const users = jwt.verify(token, "jwt-secret");


  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};


export default userAuth;
// if (token) {
//   try {
//     const decoded = jwt.verify(token, 'secret123');

//     req.userId = decoded._id;
//     next();
//   } catch (e) {
//     return res.status(403).json({
//       message: 'Нет доступа',
//     });
//   }
// } else {
//   return res.status(403).json({
//     message: 'Нет доступа',
//   });
// }