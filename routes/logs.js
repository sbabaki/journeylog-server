import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/your-logs", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    res.json(JSON.parse(logs));
  } catch (error) {
    res.status(500).json({ error: "failed to load logs" });
  }
});

router.get("/journey-map", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    const parsedLogs = JSON.parse(logs);

    const coordinates = parsedLogs.flatMap((log) =>
      log.cities.map((city) => ({
        city: city.city,
        coordinates: city.coordinates,
      }))
    );
    if (coordinates.length === 0) {
      return res.status(404).json({
        error: "No coordinates found.",
      });
    }
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: "Failed to load data." });
  }
});

router.get("/your-logs/:id", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    const parsedLogs = JSON.parse(logs);
    const foundLog = parsedLogs.find((log) => log.id === req.params.id);
    if (!foundLog) {
      return res.status(404).json({
        error: "Log not found.",
      });
    }
    res.json(foundLog);
  } catch (error) {
    res.status(500).json({ error: "log not found" });
  }
});

router.post("/your-logs", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    const parsedLogs = JSON.parse(logs);

    const newLog = {
      id: uuidv4(),
      name: req.body.name,
      cities: req.body.cities.map((city) => ({
        id: uuidv4(),
        city: city.city,
        coordinates: {
          longitude: city.coordinates.longitude,
          latitude: city.coordinates.latitude,
        },
        image: "/images/atitlan.jpg",
        startDate: city.startDate,
        endDate: city.endDate,
        note: city.note,
      })),
    };

    const updatedLogs = [newLog, ...parsedLogs];
    fs.writeFileSync("./data/logs.json", JSON.stringify(updatedLogs));
    res.status(201).json(newLog);
  } catch (error) {
    console.error("Error saving new log:", error);
    res.status(500).json({ error: "Failed to save new log." });
  }
});

export default router;
