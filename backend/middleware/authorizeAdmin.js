const authorizeAdmin = (req, res, next) => {
  const adminKey = req.headers["x-admin-key"];
  const allowedAdminEmail = "vishalr.ec23@bitsathy.ac.in";

  if (!adminKey) {
    return res.status(403).json({
      status: "error",
      message: "Admin key required",
    });
  }

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({
      status: "error",
      message: "Invalid admin key",
    });
  }

  if (req.user.email !== allowedAdminEmail) {
    return res.status(403).json({
      status: "error",
      message: "Not authorized as admin",
    });
  }

  next();
};

module.exports = authorizeAdmin;
