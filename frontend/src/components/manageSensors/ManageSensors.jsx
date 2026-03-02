import React, { useState } from "react";
import { createSensor, deleteSensor, updateSensor } from "@/APIs/sensorAPI";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const ManageSensors = ({ projectId, sensors, changeSensors, handleOpen }) => {
  const [sensorId, setSensorId] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [sensorUnit, setSensorUnit] = useState("");
  const [sensorMinThreshold, setSensorMinThreshold] = useState("");
  const [sensorMaxThreshold, setSensorMaxThreshold] = useState("");
  const [loading, setLoading] = useState(false);

  // ==============================
  // CREATE SENSOR
  // ==============================
  const handleCreateSensor = async () => {
    if (
      !sensorName ||
      !sensorType ||
      !sensorUnit ||
      (sensorType === "OUTPUT" && (!sensorMinThreshold || !sensorMaxThreshold))
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const data = {
      sensorName,
      unit: sensorUnit,
      sensorMode: sensorType.toLowerCase(),
      minThreshold:
        sensorType === "OUTPUT" ? Number(sensorMinThreshold) : undefined,
      maxThreshold:
        sensorType === "OUTPUT" ? Number(sensorMaxThreshold) : undefined,
    };

    if (sensorType === "INPUT") {
      delete data.minThreshold;
      delete data.maxThreshold;
    }

    try {
      const response = await createSensor(projectId, data);

      if (response.status === "success") {
        toast.success(response.message);

        const newSensor = {
          ...response.sensor,
          id: response.sensor._id,
          name: response.sensor.sensorName,
          type: response.sensor.sensorMode?.toUpperCase(),
        };

        changeSensors([...sensors, newSensor]);

        setSensorName("");
        setSensorType("");
        setSensorUnit("");
        setSensorMinThreshold("");
        setSensorMaxThreshold("");

        handleOpen();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to create sensor");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // UPDATE SENSOR
  // ==============================
  const handleUpdateSensor = async () => {
    if (!sensorId) {
      toast.error("Select a sensor first.");
      return;
    }

    setLoading(true);

    const data = {
      sensorName,
      unit: sensorUnit,
      sensorMode: sensorType.toLowerCase(),
      minThreshold:
        sensorType === "OUTPUT" ? Number(sensorMinThreshold) : undefined,
      maxThreshold:
        sensorType === "OUTPUT" ? Number(sensorMaxThreshold) : undefined,
    };

    if (sensorType === "INPUT") {
      delete data.minThreshold;
      delete data.maxThreshold;
    }

    try {
      const response = await updateSensor(projectId, sensorId, data);

      if (response.status === "success") {
        toast.success(response.message);

        const updatedSensor = {
          ...response.sensor,
          id: response.sensor._id,
        };

        changeSensors(
          sensors.map((sensor) =>
            sensor.id === sensorId ? updatedSensor : sensor,
          ),
        );

        handleOpen();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to update sensor");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE SENSOR
  // ==============================
  const handleDelete = async () => {
    if (!sensorId) {
      toast.error("Select a sensor first.");
      return;
    }

    setLoading(true);

    try {
      const response = await deleteSensor(projectId, sensorId);

      if (response.status === "success") {
        toast.success(response.message);

        changeSensors(sensors.filter((sensor) => sensor.id !== sensorId));

        handleOpen();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete sensor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="w-full grid grid-cols-3 gap-2">
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>

      {/* CREATE */}
      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create Sensor</CardTitle>
            <CardDescription>Add new sensor</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Sensor Name</Label>
            <Input
              value={sensorName}
              onChange={(e) => setSensorName(e.target.value)}
            />

            <Label>Sensor Type</Label>
            <Select
              onValueChange={(value) => {
                setSensorType(value);
                if (value === "INPUT") {
                  setSensorUnit("status");
                  setSensorMinThreshold(0);
                  setSensorMaxThreshold(1);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="INPUT">INPUT</SelectItem>
                  <SelectItem value="OUTPUT">OUTPUT</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label>Unit</Label>
            <Input
              value={sensorType === "INPUT" ? "status" : sensorUnit}
              onChange={(e) => setSensorUnit(e.target.value)}
              disabled={sensorType === "INPUT"}
            />

            <Label>Min Threshold</Label>
            <Input
              value={sensorType === "INPUT" ? "0" : sensorMinThreshold}
              onChange={(e) => setSensorMinThreshold(e.target.value)}
              disabled={sensorType === "INPUT"}
            />

            <Label>Max Threshold</Label>
            <Input
              value={sensorType === "INPUT" ? "1" : sensorMaxThreshold}
              onChange={(e) => setSensorMaxThreshold(e.target.value)}
              disabled={sensorType === "INPUT"}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button onClick={handleOpen}>Cancel</Button>
            <Button onClick={handleCreateSensor} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ManageSensors;
