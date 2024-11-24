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

router.post("/", (req, res) => {
  const logs = fs.readFileSync("./data/logs.json", "utf8");
  const parsedLogs = JSON.parse(logs);
  const newLog = {
    id: uuidv4(),
    name: req.body.name,
    cities: [
      {
        id: uuidv4(),
        city: req.body.city,
        image: "../../IMAGE",
        notes: [
          {
            id: uuidv4(),
            note: "favourite city this trip",
          },
        ],
        restaurants: [
          {
            name: "Olive's",
            note: "the tartar was amazing",
            rating: 5,
          },
        ],
        accomodations: [
          {
            name: "Hotel Cabana",
            notes: "Amazing infinity pool",
            rating: 4,
          },
        ],
        attractions: [{
            name: "Cathedral Church",
            notes: "Looks like all the other churches in the area",
            rating: 2   
        }]
      },
    ],
  };

  parsedLogs.push(newLog);

  fs.writeFileSync("./data/logs.json", JSON.stringify(parsedLogs));
  res.status(201).json(newLog);
});

export default router;
