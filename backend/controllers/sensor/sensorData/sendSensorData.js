const Joi = require("joi");
const SensorModel = require("../../../models/SensorModels");
const ProjectModel = require("../../../models/projectModel");
const UserModel = require("../../../models/userModel");
const sendEmail = require("../../../utils/email");

const lastEmailSentTime = {}; // ⚠ resets if server restarts

const formatEmailContent = (
  username,
  sensorName,
  sensorValue,
  minThreshold,
  maxThreshold,
) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #d9534f;">🚨 Sensor Alert 🚨</h2>
      <p>Dear ${username},</p>
      <p>
        <strong>${sensorName}</strong> reported value 
        <strong>${sensorValue}</strong>
        outside allowed range <strong>${minThreshold} - ${maxThreshold}</strong>.
      </p>
      <p>Please take necessary action immediately.</p>
      <p>Regards,<br/>IoT Monitoring System</p>
    </div>
  `;
};

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
      message: pErr.details.map((d) => d.message).join(", "),
    });
  }

  const { error: bErr, value: bVal } = bodySchema.validate(req.body);
  if (bErr) {
    return res.status(400).json({
      status: "error",
      message: bErr.details.map((d) => d.message).join(", "),
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

    // 3️⃣ Ensure sensor belongs to project
    if (sensor.project.toString() !== pVal.projectId) {
      return res.status(400).json({
        status: "error",
        message: "Sensor does not belong to this project",
      });
    }

    // 4️⃣ Validate INPUT sensor type
    if (sensor.type === "INPUT" && ![0, 1].includes(bVal.value)) {
      return res.status(400).json({
        status: "error",
        message: "Value must be 0 or 1 for INPUT sensor",
      });
    }

    // 5️⃣ Store sensor data
    const sensorData = await SensorModel.createSensorData({
      sensor: sensor._id,
      value: bVal.value,
    });

    console.log("📡 Sensor data stored:", sensorData.value);

    // 6️⃣ Emit real-time update
    if (req.io) {
      req.io.to(pVal.projectId).emit("sensorDataUpdate", {
        projectId: pVal.projectId,
        sensorId: sensor._id,
        sensorName: sensor.sensorName,
        value: sensorData.value,
        timestamp: sensorData.createdAt,
      });

      console.log("🚀 WebSocket emitted to project:", pVal.projectId);
    }

    // 7️⃣ Threshold check (only for OUTPUT sensors)
    if (
      sensor.type !== "INPUT" &&
      sensor.minThreshold !== undefined &&
      sensor.maxThreshold !== undefined &&
      (sensorData.value < sensor.minThreshold ||
        sensorData.value > sensor.maxThreshold)
    ) {
      const user = await UserModel.findById(project.owner);

      if (user && user.email) {
        const now = Date.now();
        const last = lastEmailSentTime[sensor._id] || 0;

        if (now - last > 15 * 60 * 1000) {
          const emailBody = formatEmailContent(
            user.username,
            sensor.sensorName,
            sensorData.value,
            sensor.minThreshold,
            sensor.maxThreshold,
          );

          await sendEmail(user.email, "🚨 Sensor Alert", emailBody);
          lastEmailSentTime[sensor._id] = now;

          console.log("📧 Alert email sent to:", user.email);
        }
      }
    }

    return res.status(201).json({
      status: "success",
      message: "Sensor data stored successfully",
      data: sensorData,
    });
  } catch (error) {
    console.error("Sensor Data Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = sendSensorData;
