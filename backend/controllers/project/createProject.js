const Joi = require("joi");
const ProjectModel = require("../../models/projectModel");

const createProject = async (req, res) => {
  const schema = Joi.object({
    projectName: Joi.string().required(),
    description: Joi.string().optional(),
    MicroController: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    console.log("req.user →", req.user); 
    console.log("req.body →", req.body);

    const project = await await ProjectModel.createProject({
      ...value,
      owner: req.user.id,
    });

    return res.status(201).json({
      status: "success",
      message: "Project created",
      project,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = createProject;
