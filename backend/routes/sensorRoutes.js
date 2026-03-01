const express = require('express');
const createSensor = require('../controllers/sensor/createSensor');
const authenticateToken = require('../middleware/authenticateToken');
const getSensorById = require('../controllers/sensor/getSensorById');
const getSensorsByProjectId = require('../controllers/sensor/getSensorByProjectId');
const updateSensor = require('../controllers/sensor/updateSensor');
const deleteSensor = require('../controllers/sensor/deleteSensor');
const getAllSensor = require('../controllers/sensor/getAllSensor');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const sendSensorData = require('../controllers/sensor/sensorData/getSensorData');
const deleteSensorData = require('../controllers/sensor/sensorData/deleteSensorData');
const getSensorData = require('../controllers/sensor/sensorData/getSensorData');
const getSensorDataByName = require('../controllers/sensor/sensorData/getSensorDataByName');
const sendSensorDataByName = require('../controllers/sensor/sensorData/sendSensorDataByName');
const deleteMultipleSensorData = require('../controllers/sensor/sensorData/deleteMultipleSensorData');
const router = (io) => {
  const router = express.Router();
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

    // Send sensor data (WebSocket enabled)
    router.post('/projects/:projectId/sensor/:sensorId/sendData', authenticateToken, (req, res) => {
        req.io = io;
        sendSensorData(req, res);
    });
    // Get sensor data (WebSocket enabled)
    router.post('/projects/:projectId/sensor/:sensorId/getData', authenticateToken, (req, res) => {
        req.io = io;
        getSensorData(req, res);
    });
    // Delete sensor data
    router.delete('/projects/:projectId/sensor/:sensorId/deleteData/:dataId', authenticateToken, (req, res) => {
        req.io = io;
        deleteSensorData(req, res);
    });
    // Delete multiple sensor data
    // router.delete('/projects/:projectId/sensor/:sensorId/deleteData', authenticateToken, deleteMultipleSensorData);

    //get sensor data by sensor name & project Name (WebSocket enabled)
    router.post('/projects/:projectName/sensor/:sensorName/getValue', authenticateToken, (req, res) => {
        req.io = io;
        getSensorDataByName(req, res);
    });

    // Send sensor data by sensor name & project name (WebSocket enabled)
    router.post('/projects/:projectName/sensor/:sensorName/sendValue', authenticateToken, (req, res) => {
        req.io = io;
        sendSensorDataByName(req, res);
    });

    return router;
  };
module.exports = router;