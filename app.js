// MODULES
const express = require("express");
const cors = require("cors");
const path = require("path");

// INITIALISATION
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "https://ksoniak.github.io",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));


// Servir les images
app.use("/images", express.static(path.join(__dirname, "images")));

// ROUTES
const lecture = require("./routes/read");
const medias = require("./routes/medias");

app.use("/read", lecture);
app.use("/medias", medias);

// PORT
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("✔ Serveur démarré sur le port " + port);
});
