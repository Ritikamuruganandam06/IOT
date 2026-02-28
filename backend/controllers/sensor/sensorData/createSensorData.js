const Joi = require("joi");
const SensorModel = require("../../../models/SensorModels");
const ProjectModel = require("../../../models/projectModel");
const UserModel = require("../../../models/userModel");
const sendEmail = require("../../../utils/email");

const lastEmailSentTime = {};

const sendSensorData = async (req, res) => {
  const paramsSchema = Joi.object({
    projectId: Joi.string().length(24).hex().required(),
    sensorId: Joi.string().length(24).hex().required(),
  });

  const bodySchema = Joi.object({
    value: Joi.number().required(),
  });

  const { error: pErr, value: pVal } = paramsSchema.validate(req.params);
  if (pErr) {
    return res.status(400).json({
      status: "error",
      message: pErr.message,
    });
  }

  const { error: bErr, value: bVal } = bodySchema.validate(req.body);
  if (bErr) {
    return res.status(400).json({
      status: "error",
      message: bErr.message,
    });
  }

  try {
    // 1️⃣ Check project
    const project = await ProjectModel.findProjectById(pVal.projectId);
    if (!project) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    // 2️⃣ Check sensor
    const sensor = await SensorModel.findSensorById(pVal.sensorId);
    if (!sensor) {
      return res.status(404).json({
        status: "error",
        message: "Sensor not found",
      });
    }

    // Check sensor belongs to project
    if (sensor.project.toString() !== pVal.projectId) {
      return res.status(400).json({
        status: "error",
        message: "Sensor does not belong to this project",
      });
    }

    // 4️⃣ Store sensor data
    const sensorData = await SensorModel.createSensorData({
      sensor: pVal.sensorId,
      value: bVal.value,
    });

    console.log("📡 Sensor data received →", sensorData.value);

    // 5️⃣ Threshold + Email
    if (
      sensor.minThreshold !== undefined &&
      sensor.maxThreshold !== undefined &&
      (sensorData.value < sensor.minThreshold ||
        sensorData.value > sensor.maxThreshold)
    ) {
      const user = await UserModel.findById(project.owner);
      const userEmail = user?.email;

      if (userEmail) {
        const now = Date.now();
        const last = lastEmailSentTime[sensor._id] || 0;

        if (now - last > 15 * 60 * 1000) {
          await sendEmail(
            userEmail,
            "🚨 Sensor Alert",
            `<h3>Sensor Alert</h3>
             <p>Sensor: ${sensor.sensorName}</p>
             <p>Value: ${sensorData.value}</p>
             <p>Allowed Range: ${sensor.minThreshold} - ${sensor.maxThreshold}</p>`,
          );

          lastEmailSentTime[sensor._id] = now;
          console.log("📧 Alert email sent →", userEmail);
        }
      }
    }

    return res.status(201).json({
      status: "success",
      message: "Sensor data stored",
      sensorData,
    });
  } catch (err) {
    console.error("Sensor Data Error:", err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = sendSensorData;
