import fs from "fs";

export default function handler(req, res) {
  const body = req.body;

  let pins = [];
  try {
    pins = JSON.parse(fs.readFileSync("pins.json", "utf8"));
  } catch {}

  pins.push(body);

  fs.writeFileSync("pins.json", JSON.stringify(pins, null, 2));

  res.status(200).json({ ok: true });
}
