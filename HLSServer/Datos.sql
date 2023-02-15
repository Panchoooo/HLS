/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `lives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `portada_path` varchar(50) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `cantidad_fragmentos` int(11) DEFAULT NULL,
  `fragmento_actual` int(11) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL,
  `prioridad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `lives`;
INSERT INTO `lives` (`id`, `nombre`, `portada_path`, `descripcion`, `cantidad_fragmentos`, `fragmento_actual`, `activo`, `prioridad`) VALUES
	(3, 'Obs', './src/lives/Conejo/portada.png', 'Transmision de OBS', 0, 0, 0, 0);
INSERT INTO `lives` (`id`, `nombre`, `portada_path`, `descripcion`, `cantidad_fragmentos`, `fragmento_actual`, `activo`, `prioridad`) VALUES
	(23, 'Conejo', './src/lives/Conejo/portada.png', 'El conejo que vive en un paraíso bucólico de bonitas praderas, árboles fruteros, pájaros y mariposas, es llevado al límite por la destrucción y crueldad de tres pequeños roedores.', 63, 9, 1, 1);
INSERT INTO `lives` (`id`, `nombre`, `portada_path`, `descripcion`, `cantidad_fragmentos`, `fragmento_actual`, `activo`, `prioridad`) VALUES
	(24, 'Malcom', './src/lives/Malcom/portada.png', 'Los Cleavers son una familia peculiar. La madre es una crontroladora radical que grita, el padre es un hombre chistoso calvo, el hijo mayor, Francis huyo de la familia a corta edad, Reese es un criminal, Dewey es un cadete espacial y el joven Jamie es un chivo expiatorio. ', 18, 5, 1, 3);
INSERT INTO `lives` (`id`, `nombre`, `portada_path`, `descripcion`, `cantidad_fragmentos`, `fragmento_actual`, `activo`, `prioridad`) VALUES
	(25, 'Sherk', './src/lives/Sherk/portada.png', 'Un ogro llamado Shrek vive en su pantano, pero su preciada soledad se ve súbitamente interrumpida por la invasión de los ruidosos personajes de los cuentos de hadas. Todos fueron expulsados de sus reinos por el malvado Lord Farquaad.', 18, 586, 1, 2);

CREATE TABLE IF NOT EXISTS `lives_fragmentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_live` int(11) DEFAULT NULL,
  `segmento` varchar(150) DEFAULT NULL,
  `duracion` varchar(150) DEFAULT NULL,
  `numero` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `lives_fragmentos`;
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(58, 23, 'segment0', '10.000000', 0);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(59, 23, 'segment1', '10.000000', 1);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(60, 23, 'segment2', '10.000000', 2);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(61, 23, 'segment3', '10.000000', 3);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(62, 23, 'segment4', '10.000000', 4);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(63, 23, 'segment5', '10.000000', 5);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(64, 23, 'segment6', '10.000000', 6);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(65, 23, 'segment7', '10.000000', 7);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(66, 23, 'segment8', '10.000000', 8);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(67, 23, 'segment9', '10.000000', 9);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(68, 23, 'segment10', '10.000000', 10);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(69, 23, 'segment11', '10.000000', 11);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(70, 23, 'segment12', '10.000000', 12);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(71, 23, 'segment13', '10.000000', 13);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(72, 23, 'segment14', '10.000000', 14);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(73, 23, 'segment15', '10.000000', 15);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(74, 23, 'segment16', '10.000000', 16);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(75, 23, 'segment17', '10.000000', 17);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(76, 23, 'segment18', '10.000000', 18);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(77, 23, 'segment19', '10.000000', 19);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(78, 23, 'segment20', '10.000000', 20);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(79, 23, 'segment21', '10.000000', 21);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(80, 23, 'segment22', '10.000000', 22);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(81, 23, 'segment23', '10.000000', 23);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(82, 23, 'segment24', '10.000000', 24);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(83, 23, 'segment25', '10.000000', 25);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(84, 23, 'segment26', '10.000000', 26);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(85, 23, 'segment27', '10.000000', 27);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(86, 23, 'segment28', '10.000000', 28);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(87, 23, 'segment29', '10.000000', 29);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(88, 23, 'segment30', '10.000000', 30);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(89, 23, 'segment31', '10.000000', 31);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(90, 23, 'segment32', '10.000000', 32);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(91, 23, 'segment33', '10.000000', 33);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(92, 23, 'segment34', '10.000000', 34);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(93, 23, 'segment35', '10.000000', 35);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(94, 23, 'segment36', '10.000000', 36);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(95, 23, 'segment37', '10.000000', 37);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(96, 23, 'segment38', '10.000000', 38);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(97, 23, 'segment39', '10.000000', 39);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(98, 23, 'segment40', '10.000000', 40);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(99, 23, 'segment41', '10.000000', 41);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(100, 23, 'segment42', '10.000000', 42);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(101, 23, 'segment43', '10.000000', 43);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(102, 23, 'segment44', '10.000000', 44);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(103, 23, 'segment45', '10.000000', 45);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(104, 23, 'segment46', '10.000000', 46);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(105, 23, 'segment47', '10.000000', 47);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(106, 23, 'segment48', '10.000000', 48);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(107, 23, 'segment49', '10.000000', 49);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(108, 23, 'segment50', '10.000000', 50);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(109, 23, 'segment51', '10.000000', 51);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(110, 23, 'segment52', '10.000000', 52);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(111, 23, 'segment53', '10.000000', 53);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(112, 23, 'segment54', '10.000000', 54);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(113, 23, 'segment55', '10.000000', 55);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(114, 23, 'segment56', '10.000000', 56);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(115, 23, 'segment57', '10.000000', 57);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(116, 23, 'segment58', '10.000000', 58);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(117, 23, 'segment59', '10.000000', 59);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(118, 23, 'segment60', '10.000000', 60);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(119, 23, 'segment61', '10.000000', 61);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(120, 23, 'segment62', '10.000000', 62);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(121, 23, 'segment63', '4.566667', 63);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(122, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio0', '10.433333', 0);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(123, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio1', '10.033333', 1);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(124, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio2', '11.533333', 2);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(125, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio3', '10.666667', 3);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(126, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio4', '10.666667', 4);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(127, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio5', '10.666667', 5);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(128, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio6', '10.666667', 6);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(129, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio7', '5.333333', 7);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(130, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio8', '10.666667', 8);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(131, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio9', '10.366667', 9);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(132, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio10', '10.966667', 10);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(133, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio11', '8.766667', 11);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(134, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio12', '9.633333', 12);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(135, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio13', '13.600000', 13);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(136, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio14', '8.433333', 14);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(137, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio15', '7.566667', 15);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(138, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio16', '10.666667', 16);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(139, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio17', '10.666667', 17);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(140, 24, 'la-plaga-de-murcielago-malcolm-el-del-medio18', '8.200000', 18);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(141, 25, 'intro-shrek-1-hd-espanol-latino0', '10.677333', 0);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(142, 25, 'intro-shrek-1-hd-espanol-latino1', '9.642967', 1);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(143, 25, 'intro-shrek-1-hd-espanol-latino2', '10.643967', 2);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(144, 25, 'intro-shrek-1-hd-espanol-latino3', '10.710700', 3);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(145, 25, 'intro-shrek-1-hd-espanol-latino4', '10.643967', 4);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(146, 25, 'intro-shrek-1-hd-espanol-latino5', '10.677333', 5);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(147, 25, 'intro-shrek-1-hd-espanol-latino6', '10.377033', 6);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(148, 25, 'intro-shrek-1-hd-espanol-latino7', '7.774433', 7);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(149, 25, 'intro-shrek-1-hd-espanol-latino8', '9.809800', 8);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(150, 25, 'intro-shrek-1-hd-espanol-latino9', '11.911900', 9);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(151, 25, 'intro-shrek-1-hd-espanol-latino10', '8.141467', 10);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(152, 25, 'intro-shrek-1-hd-espanol-latino11', '9.509500', 11);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(153, 25, 'intro-shrek-1-hd-espanol-latino12', '9.943267', 12);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(154, 25, 'intro-shrek-1-hd-espanol-latino13', '12.379033', 13);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(155, 25, 'intro-shrek-1-hd-espanol-latino14', '7.207200', 14);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(156, 25, 'intro-shrek-1-hd-espanol-latino15', '10.610600', 15);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(157, 25, 'intro-shrek-1-hd-espanol-latino16', '10.110100', 16);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(158, 25, 'intro-shrek-1-hd-espanol-latino17', '10.744067', 17);
INSERT INTO `lives_fragmentos` (`id`, `id_live`, `segmento`, `duracion`, `numero`) VALUES
	(159, 25, 'intro-shrek-1-hd-espanol-latino18', '0.934267', 18);

CREATE TABLE IF NOT EXISTS `parametros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proxy` varchar(50) NOT NULL DEFAULT '0',
  `cantidad_fragmentos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `parametros`;
INSERT INTO `parametros` (`id`, `proxy`, `cantidad_fragmentos`) VALUES
	(1, 'http://192.168.1.90:3000', 3);

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` blob DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id`, `username`, `email`, `password`) VALUES
	(20, 'Francisco', 'franciscoriveroscorvalann@gmail.com', _binary 0xcea4a8ae1ef58deab2831819f9968344);
INSERT INTO `usuarios` (`id`, `username`, `email`, `password`) VALUES
	(21, 'Admin', 'admin@admin', _binary 0xcea4a8ae1ef58deab2831819f9968344);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
