const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database3.sqlite");

// Création de la table + insertion données test
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS medias (
      id_media INTEGER PRIMARY KEY AUTOINCREMENT,
      titre_media TEXT NOT NULL,
      image_media TEXT NOT NULL,
      date_sortie_media TEXT NOT NULL,
      type_media TEXT NOT NULL
    )
  `);

  db.get("SELECT COUNT(*) AS count FROM medias", (err, row) => {
    if (row.count === 0) {
      console.log("➡ Insertion des données de test…");

      const samples = [
        ["Inception", "/images/inception.jpg", "2010", "FILM"],
        ["Interstellar", "/images/interstellar.jpg", "2014", "FILM"],
        ["Breaking Bad", "/images/breakingbad.jpeg", "2008", "SERIE"],
        ["Stranger Things", "/images/strangerthings.jpg", "2016", "SERIE"],
      ];

      const stmt = db.prepare(`
        INSERT INTO medias (titre_media, image_media, date_sortie_media, type_media)
        VALUES (?, ?, ?, ?)
      `);

      samples.forEach(s => stmt.run(s));
      stmt.finalize();

      console.log("✔ Données de test insérées !");
    }
  });
});

// ------------------------------------------------------
// 🔥 MÉTHODES UTILISÉES PAR medias.js
// ------------------------------------------------------

db.getFilms = function () {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM medias WHERE type_media = 'FILM'", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

db.getSeries = function () {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM medias WHERE type_media = 'SERIE'", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

db.addMedia = function (data, type) {
  return new Promise((resolve, reject) => {
    const { titre_media, image_media, date_sortie_media } = data;

    db.run(
      `INSERT INTO medias (titre_media, image_media, date_sortie_media, type_media)
       VALUES (?, ?, ?, ?)`,
      [titre_media, image_media, date_sortie_media, type],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};


module.exports = db;
