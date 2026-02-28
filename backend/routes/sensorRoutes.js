const express = require('express');
const router = express.Router();

const createSensor = require('../controllers/sensor/createSensor');
const authenticateToken = require('../middleware/authenticateToken');
const getSensorById = require('../controllers/sensor/getSensorById');
const getSensorsByProjectId = require('../controllers/sensor/getSensorByProjectId');
const updateSensor = require('../controllers/sensor/updateSensor');
const deleteSensor = require('../controllers/sensor/deleteSensor');
const getAllSensor = require('../controllers/sensor/getAllSensor');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const sendSensorData = require('../controllers/sensor/sensorData/createSensorData');
const deleteSensorData = require('../controllers/sensor/sensorData/deleteSensorData');
router.post('/projects/:projectId/sensors', authenticateToken, createSensor);
router.get(
"/projects/:projectId/sensor/get/:sensorId",
  authenticateToken,
  getSensorById,
);
router.get(
  "/projects/:projectId/sensors/getByProject",
  authenticateToken,
  getSensorsByProjectId,
);

router.patch(
  "/projects/:projectId/sensor/update/:sensorId",
  authenticateToken,
  updateSensor,
);

router.delete(
  "/projects/:projectId/sensor/delete/:sensorId",
  authenticateToken,
  deleteSensor,
);

router.post(
  "/projects/:projectId/sensor/getAll",
  authenticateToken,
  authorizeAdmin,
  getAllSensor,
);


router.post("/projects/:projectId/sensors/:sensorId/data", authenticateToken, sendSensorData);
router.delete("/projects/:projectId/sensors/:sensorDataId/data/:dataId", authenticateToken, deleteSensorData);
module.exports = router;