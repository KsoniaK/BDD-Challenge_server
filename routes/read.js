const express = require("express");
const router = express.Router();
const db = require("../database");

// 🔹 GET tous les genres
router.get("/genre", (req, res) => {
  db.all("SELECT DISTINCT type_media FROM medias", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// 🔹 GET films
router.get("/genre/films", (req, res) => {
  db.all("SELECT * FROM medias WHERE type_media = 'FILM'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// 🔹 GET séries
router.get("/genre/series", (req, res) => {
  db.all("SELECT * FROM medias WHERE type_media = 'SERIE'", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// 🔹 POST film
router.post("/genre/films", (req, res) => {
  const { titre_media, image_media, date_sortie_media } = req.body;

  db.run(
    "INSERT INTO medias (titre_media, image_media, date_sortie_media, type_media) VALUES (?, ?, ?, 'FILM')",
    [titre_media, image_media, date_sortie_media],
    function (err) {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 🔹 POST série
router.post("/genre/series", (req, res) => {
  const { titre_media, image_media, date_sortie_media } = req.body;

  db.run(
    "INSERT INTO medias (titre_media, image_media, date_sortie_media, type_media) VALUES (?, ?, ?, 'SERIE')",
    [titre_media, image_media, date_sortie_media],
    function (err) {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, id: this.lastID });
    }
  );
});

module.exports = router;
