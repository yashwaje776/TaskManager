import jwt from "jsonwebtoken";

export const check = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({
          success: false,
          message: "No token provided, authorization denied",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token is not valid" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Error in checkAuth:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
