const ProjectModel = require("../../models/projectModel");
const Joi = require("joi");

const getProjectsByUserId = async (req, res) => {
  console.log("getProjectsByUserId API HIT");

  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
  });

  const { error } = schema.validate(req.params);

  if (error) {
    console.log("❌ Validation Error:", error.details[0].message);
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const paramUserId = req.params.userId;
    const tokenUserId = req.user?.id;

    console.log("➡ Param userId:", paramUserId);
    console.log("➡ Token userId:", tokenUserId);

    if (paramUserId !== tokenUserId) {
      console.log("🚨 Unauthorized access attempt");
      return res.status(403).json({
        status: "error",
        message: "Unauthorized access",
      });
    }

    // ✅ Use your model method
    const projects = await ProjectModel.findByUserId(tokenUserId);

    console.log("📦 Projects found:", projects.length);

    return res.status(200).json({
      status: "success",
      count: projects.length,
      projects,
    });
  } catch (err) {
    console.log("💥 Server Error:", err.message);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = getProjectsByUserId;
