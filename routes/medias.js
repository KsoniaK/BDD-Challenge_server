// routes/medias.js
const express = require("express");
const router = express.Router();
const db = require("../database");

// GET FILMS
router.get("/films", async (req, res) => {
  try {
    const films = await db.getFilms();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération films" });
  }
});

// GET SERIES
router.get("/series", async (req, res) => {
  try {
    const series = await db.getSeries();
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: "Erreur récupération séries" });
  }
});

// POST FILM
router.post("/films", async (req, res) => {
  try {
    const result = await db.addMedia(req.body, "FILM");

    res.json({
      id_media: result.lastID,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur ajout film" });
  }
});

// POST SERIE
router.post("/series", async (req, res) => {
  try {
    const result = await db.addMedia(req.body, "SERIE");

    res.json({
      id_media: result.lastID,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur ajout série" });
  }
});

module.exports = router;
