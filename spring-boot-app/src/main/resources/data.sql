-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.0.1 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table db.cours: ~2 rows (approximately)
DELETE FROM `cours`;
INSERT INTO `cours` (`id`, `nom`, `matiere_id`) VALUES
	(1, 'Chapitre 1 : Urbaniser un ....', 1),
	(2, 'Chapitre 2 : Système d\'urbanisation...', 1);

-- Dumping data for table db.directeurs: ~1 rows (approximately)
DELETE FROM `directeurs`;
INSERT INTO `directeurs` (`id`, `email`, `mot_de_pass`, `nom`, `prenom`, `status`) VALUES
	(1, 'salmanbenomar250@gmail.com', '$2a$10$aiThd60wx1hUqb1PO5.Sg.dGx7OYsWahjCPmw5AuFvz2TJ1M64tfO', 'Ben omar', 'Salman', 1);

-- Dumping data for table db.documents_cours: ~0 rows (approximately)
DELETE FROM `documents_cours`;
INSERT INTO `documents_cours` (`id`, `chemin`, `nom`, `cours_id`) VALUES
	(1, 'tp1_usi23a7a9ab.pdf', 'TP1 : USI', 1),
	(2, 'tp2_usi21ef0134.pdf', 'TP2 : USI', 2);

-- Dumping data for table db.enseignants: ~5 rows (approximately)
DELETE FROM `enseignants`;
INSERT INTO `enseignants` (`id`, `email`, `mot_de_pass`, `nom`, `prenom`, `status`) VALUES
	(1, 'mesmoudi@gmail.com', '$2a$10$woTjpcxmv/Mgn.ifezFQ/OPJY2t0D/la4e9C2QYDiuKp8FTxZO/1e', 'Mesmoudi', 'Mesmoudi', 1),
	(2, 'chkouri@gmail.com', '$2a$10$/Tte051QA7zEtwotNeYeF..pJq5MWd98UxH0UJV16avwRz.l.nCri', 'Chkouri', 'Chkouri', 1),
	(3, 'younoussi@gmail.com', '$2a$10$lWuB2JGlv8EQGnLd8XCRzO8SAmZaVDeFmzUuqcGvE9n8b1ZAkSuN.', 'Younoussi', 'Younoussi', 1),
	(4, 'mansour@gmail.com', '$2a$10$GkDoUmfllVJ.jH5w52e2..G/oiJ.v.Dl2BWYmseHRTr1UTuLmOQzS', 'Mansour', 'Mansour', 1),
	(5, 'belmir@gmail.com', '$2a$10$q60omC9zJU9NczTHkMgHFuaO8JkWMME2YHY22scYkHiMrUY29Af2G', 'Belmir', 'Belmir', 1);

-- Dumping data for table db.etudiants: ~8 rows (approximately)
DELETE FROM `etudiants`;
INSERT INTO `etudiants` (`id`, `email`, `mot_de_pass`, `nom`, `prenom`, `status`, `num_apogee`, `num_semestre`, `formation_id`) VALUES
	(1, 'abdlha9.harra9@etu.uae.ac.ma', '$2a$10$ombpl5jefwJ/y4mlWDAoZOaQTtYX3bRJQ3VulYzJphbQ1LMCCkaVO', 'abd lha9', 'harra9', 1, 2034708, 5, 2),
	(2, 'yassin.haddach@etu.uae.ac.ma', '$2a$10$XKI7jA/kdEOvB/sHFwscKuaYD1t3zg.kpammvVkpdY36WeRQfg6Vq', 'haddach', 'yassin', 1, 554543, 5, 3),
	(3, 'oussama.radi@etu.uae.ac.ma', '$2a$10$Bjct8HDdkyCf4eprwbcwBeU6VofSA.xZralgkur8uxEpJhqCNsNqq', 'radi', 'oussama', 1, 213454, 5, 3),
	(4, 'samir.amrani@etu.uae.ac.ma', '$2a$10$xHCbuZya5YM3GJD4s0nsReP1c8YW.TKm0bbYsQ9rNXRolxB0meCG2', 'amrani', 'samir', 1, 877256, 5, 2),
	(5, 'etu1GI3@etu.uae.ac.ma', '$2a$10$6ZKgPGz.lZ3YKBQRgtuvOeaIuZWxBzczh6ZMJpt7Eg77O..XTEfJ2', 'etu1GI3', 'etudiant1GI3', 1, 286765, 5, 4),
	(6, 'etu2GI3@etu.uae.ac.ma', '$2a$10$AeltCwoeYlGEUpPEicg8COyztJNfTJ0ROPY3RaRBOz1aRruRIIObG', 'etu2GI3', 'etudiant2GI3', 1, 532765, 5, 4),
	(7, 'etu3GI3@etu.uae.ac.ma', '$2a$10$6DE8VA6wql/J/JY16FEzKe3UAF/mvBTUIRnEk5yVVHoksgIN00JiK', 'etu3GI3', 'etudiant3GI3', 1, 1733265, 5, 4),
	(8, 'etu4GI3@etu.uae.ac.ma', '$2a$10$l1zbfuznJqQqc6c6WlZh/Owq3Ms4ZBy8wc28w4r1449KC3quZqyXy', 'etu4GI3', 'etudiant4GI3', 1, 86722265, 5, 4);

-- Dumping data for table db.formations: ~0 rows (approximately)
DELETE FROM `formations`;
INSERT INTO `formations` (`id`, `nbr_semestres`, `nom`) VALUES
	(1, 5, 'SCM'),
	(2, 5, 'GC'),
	(3, 5, 'GM'),
	(4, 5, 'GI');

-- Dumping data for table db.liens_cours: ~0 rows (approximately)
DELETE FROM `liens_cours`;
INSERT INTO `liens_cours` (`id`, `lien`, `cours_id`) VALUES
	(1, 'lien liee au promiere chapitre de matiere d\'urbanisation', 1),
	(2, 'lien liee au deuxieme chapitre de matiere d\'urbanisation...', 2);

-- Dumping data for table db.matieres: ~5 rows (approximately)
DELETE FROM `matieres`;
INSERT INTO `matieres` (`id`, `nom`, `enseignant_id`, `module_id`) VALUES
	(1, 'Système d\'information urba et audit', 1, 1),
	(2, 'dotNet', 2, 2),
	(3, 'BI', 3, 3),
	(4, 'Thread', 4, 4),
	(5, 'dev mobile', 4, 4);

-- Dumping data for table db.modules: ~4 rows (approximately)
DELETE FROM `modules`;
INSERT INTO `modules` (`id`, `nom`, `num_semestre`, `formation_id`) VALUES
	(1, 'Urbanisation', 5, 4),
	(2, 'Technologie d\'entreprise', 5, 4),
	(3, 'Business Intelligence', 5, 4),
	(4, 'Programmation des systems', 5, 4);

-- Dumping data for table db.notes: ~0 rows (approximately)
DELETE FROM `notes`;
INSERT INTO `notes` (`id`, `value`, `etudiant_id`, `matiere_id`) VALUES
	(1, 15, 5, 1),
	(2, 12, 6, 1),
	(3, 14, 7, 1),
	(4, 13, 8, 1),
	(5, 10, 5, 2),
	(6, 12, 6, 2),
	(7, 8, 7, 2),
	(8, 17, 8, 2),
	(9, 10, 5, 3),
	(10, 18, 6, 3),
	(11, 10, 7, 3),
	(12, 18, 8, 3),
	(13, 10, 5, 4),
	(14, 18, 6, 4),
	(15, 10, 7, 4),
	(16, 18, 8, 4),
	(17, 10, 5, 5),
	(18, 18, 6, 5),
	(19, 10, 7, 5),
	(20, 18, 8, 5);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
