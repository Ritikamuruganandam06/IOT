const ProjectModel = require("../models/projectModel");

const verifyDevice = async (req, res, next) => {
  const deviceKey = req.headers["x-device-key"];

  console.log("All headers:", req.headers);
  console.log("Device key received:", req.headers["x-device-key"]);

  try {
    const projectId = req.params.projectId;
    console.log("Project ID from params:", projectId)
    const project = await ProjectModel.findProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }
    console.log("Project found:", project)
    console.log("Expected key:", project.deviceKey); 

    if (!deviceKey || deviceKey !== project.deviceKey) {
      return res.status(401).json({
        status: "error",
        message: "Invalid device key",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = verifyDevice;
