USE coding_challenge;
CREATE TABLE `USER` (
	`id_user` INT(4) NOT NULL AUTO_INCREMENT,
	`nom_user` varchar(255) NOT NULL,
    `mdp_user` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id_user`)
);
CREATE TABLE `GENRE` (
	`id_genre` INT(4) NOT NULL AUTO_INCREMENT,
	`nom_genre` varchar(255) NOT NULL,
	PRIMARY KEY (`id_genre`)
);
CREATE TABLE `APPARTENIR` (
	`id_genre` INT(4) NOT NULL,
	`id_media` INT(4) NOT NULL
);
CREATE TABLE IF NOT EXISTS MEDIA (
  id_media INT AUTO_INCREMENT PRIMARY KEY,
  titre_media VARCHAR(255) UNIQUE NOT NULL,
  image_media TEXT NOT NULL,
  date_sortie_media YEAR NOT NULL,
  type_media VARCHAR(10) NOT NULL
);
