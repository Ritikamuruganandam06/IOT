const SensorModel = require("../../models/SensorModels");

const getAllSensor = async (req, res) => {
  try {
    const sensors = await SensorModel.getAllSensors();

    return res.status(200).json({
      status: "success",
      count: sensors.length,
      sensors,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = getAllSensor;
