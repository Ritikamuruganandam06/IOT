import api from "@/utils/api";

// Send sensor value
export const sendSensorData = async (projectId, sensorId, data) => {
  try {
    const response = await api.post(
      `/api/projects/${projectId}/sensor/${sensorId}/sendData`,
      data,
    );

    return response.data;
  } catch (error) {
    console.error("Failed to send sensor data:", error);
    return null;
  }
};

// Receive sensor values
export const receiveSensorData = async (projectId, sensorId) => {
  try {
    const response = await api.post(
      `/api/projects/${projectId}/sensor/${sensorId}/getData`,
    );

    const formatted = response.data.data.map((item) => ({
      id: item._id,
      value: item.value,
      sensorId: item.sensor,
      projectId: projectId,
      createdAt: item.createdAt,
    }));

    return { data: formatted };
  } catch (error) {
    console.error("Failed to receive sensor data:", error);
    return { data: [] };
  }
};

// Delete single sensor data
export const deleteSensorData = async (projectId, sensorId, dataId) => {
  try {
    const response = await api.delete(
      `/api/projects/${projectId}/sensor/${sensorId}/deleteData/${dataId}`,
    );

    return response.data;
  } catch (error) {
    console.error("Failed to delete sensor data:", error);
    return null;
  }
};
