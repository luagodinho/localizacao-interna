import fs from "fs";

export default function handler(req, res) {
  let pins = [];
  try {
    pins = JSON.parse(fs.readFileSync("pins.json", "utf8"));
  } catch {}

  res.status(200).json(pins);
}
