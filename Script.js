const map = document.getElementById("map");
const container = document.getElementById("mapContainer");

// Cria um PIN
function addPinToScreen(x, y, color) {
  const rect = map.getBoundingClientRect();
  const pin = document.createElement("div");
  pin.className = "pin";
  pin.style.left = (x * rect.width) + "px";
  pin.style.top = (y * rect.height) + "px";
  pin.style.background = color;
  container.appendChild(pin);
}

// Carrega PINs do servidor
async function loadPins() {
  const res = await fetch("/api/get-pins");
  const pins = await res.json();
  pins.forEach(p => addPinToScreen(p.x, p.y, p.color));
}

map.onload = loadPins;

// Cores para turnos
const colors = ["red", "blue", "green", "purple", "orange", "yellow"];

// Ao clicar, cria novo PIN
map.addEventListener("click", async (e) => {
  const rect = map.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  const color = colors[Math.floor(Math.random() * colors.length)];

  addPinToScreen(x, y, color);

  await fetch("/api/add-pin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ x, y, color })
  });
});
