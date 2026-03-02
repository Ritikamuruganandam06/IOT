// middleware/verifyDevice.js

const verifyDevice = (req, res, next) => {
  const deviceKey = req.headers["x-device-key"];
  console.log("All headers:", req.headers);
      console.log("Device key received:", req.headers["x-device-key"]);
      console.log("Expected key:", process.env.DEVICE_SECRET);
  if (!deviceKey || deviceKey !== process.env.DEVICE_SECRET) {
    return res.status(401).json({
      status: "error",
      message: "Invalid device key",
    });
  }

  next();
};

module.exports = verifyDevice;
