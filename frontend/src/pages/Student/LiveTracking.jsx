import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getProjectsByUserId } from "@/APIs/projectAPI";
import { getSensorByProjectId } from "@/APIs/sensorAPI";
import {
  deleteSensorData,
  receiveSensorData,
  sendSensorData,
} from "@/APIs/sensorDataAPI";
import socket from "@/utils/socket";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card1";

import Loading from "@/components/loading";
import GaugeCard from "@/components/gauge/gaugeCard";
import { BarChartCard } from "@/components/chart/BarChartCard";
import { LineChartCard } from "@/components/chart/LineChartCard";
import TableCard from "@/components/table/TableCard";
import { toast } from "sonner";

const LiveTracking = () => {
  const { user } = useAuth();
  const { projectId } = useParams();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // 1️⃣ Fetch Projects
  // ==============================
  useEffect(() => {
    if (!user?._id) return;

    const fetchProjects = async () => {
      try {
        const response = await getProjectsByUserId(user._id);
        const projectsData = response?.projects || [];

        if (!Array.isArray(projectsData)) {
          setProjects([]);
          setLoading(false);
          return;
        }

        setProjects(projectsData);

        if (projectsData.length > 0) {
          const found =
            projectsData.find((p) => p._id === projectId) || projectsData[0];

          setSelectedProject(found);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user?._id, projectId]);

  // ==============================
  // 2️⃣ Fetch Sensors
  // ==============================
  useEffect(() => {
    if (!selectedProject?._id) return;

    const fetchSensors = async () => {
      try {
        const response = await getSensorByProjectId(
          selectedProject._id,
          user._id,
        );

        const sensorArray = response?.data || [];
        setSensors(sensorArray);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sensors");
      }
    };

    fetchSensors();
  }, [selectedProject?._id]);

  // ==============================
  // 3️⃣ Fetch Sensor Data
  // ==============================
  useEffect(() => {
    if (!selectedProject?._id) return;

    const fetchSensorData = async () => {
      try {
        if (!Array.isArray(sensors) || sensors.length === 0) {
          setSensorData([]);
          setLoading(false);
          return;
        }

        const promises = sensors.map((sensor) =>
          receiveSensorData(selectedProject._id, sensor._id, user._id),
        );

        const responses = await Promise.all(promises);

        setSensorData(responses.map((res) => res?.data || []));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch sensor data");
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [sensors]);

  // ==============================
  // Socket Updates
  // ==============================
  useEffect(() => {
    if (!selectedProject?._id) return;

    socket.emit("joinProject", selectedProject._id);

    socket.on("sensorDataUpdate", (data) => {
      setSensorData((prev) =>
        prev.map((arr) =>
          arr.length > 0 && arr[0].sensor === data.sensorId
            ? [...arr, data]
            : arr,
        ),
      );
    });

    socket.on("sensorDataDeleted", (data) => {
      setSensorData((prev) =>
        prev.map((arr) =>
          arr.length > 0 && arr[0].sensor === data.sensorId
            ? arr.filter((item) => item._id !== data.dataId)
            : arr,
        ),
      );
    });

    return () => {
      socket.off("sensorDataUpdate");
      socket.off("sensorDataDeleted");
    };
  }, [selectedProject?._id]);

  // ==============================
  // Loading
  // ==============================
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================
  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Track Individual Project</h1>

        <Select
          value={selectedProject?._id || ""}
          onValueChange={(value) =>
            setSelectedProject(projects.find((p) => p._id === value))
          }
        >
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Select Project" />
          </SelectTrigger>

          <SelectContent>
            {Array.isArray(projects) &&
              projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.projectName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProject && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{selectedProject.projectName}</CardTitle>
            <CardDescription>{selectedProject.description}</CardDescription>
          </CardHeader>
        </Card>
      )}

      <GaugeCard sensors={sensors} sensorData={sensorData} />
      <BarChartCard sensors={sensors} sensorData={sensorData} />
      <LineChartCard sensors={sensors} sensorData={sensorData} />
      <TableCard sensors={sensors} sensorData={sensorData} />
    </div>
  );
};

export default LiveTracking;
