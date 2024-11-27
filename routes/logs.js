import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    res.json(JSON.parse(logs));
  } catch (error) {
    res.status(500).json({ error: "failed to load logs" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const logs = fs.readFileSync("./data/logs.json", "utf8");
    const parsedLogs = JSON.parse(logs);
    const foundLog = parsedLogs.find((log) => log.id === parseInt(req.params.id));
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

router.post("/", (req, res) => {
  try {
  const logs = fs.readFileSync("./data/logs.json", "utf8");
  const parsedLogs = JSON.parse(logs);

  const newLog = {
    id: uuidv4(),
    name: req.body.name,
    cities: req.body.cities.map((city) => ({
        id: uuidv4(),
        city: city.city,
        startDate: city.startDate,
        endDate: city.endDate,
        image: "../../IMAGE",
        notes: [],
        restaurants: [],
        accomodations: [],
        attractions: []
      })),
    };

  parsedLogs.push(newLog);

  fs.writeFileSync("./data/logs.json", JSON.stringify(parsedLogs));
  res.status(201).json(newLog);
} catch (error) {
  console.error("Error saving new log:", error);
  res.status(500).json({error: "Failed to save new log."})
}
});

export default router;
