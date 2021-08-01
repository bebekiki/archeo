-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 04 Mai 2021 à 20:07
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `archeo`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `libelle`) VALUES
(1, 'Agriculture'),
(2, 'Archéologie'),
(3, 'Cultes'),
(4, 'Architecture'),
(5, 'Industrie&artisanat'),
(6, 'Peuplement&occupation_espace'),
(7, 'Sciences&méthodes_archéologie'),
(8, 'Vie_quotidienne&usages');

-- --------------------------------------------------------

--
-- Structure de la table `chantiers`
--

CREATE TABLE IF NOT EXISTS `chantiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(100) NOT NULL,
  `participants` int(11) DEFAULT NULL,
  `dateDebut` date NOT NULL,
  `dateFin` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `participants` (`participants`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `dons`
--

CREATE TABLE IF NOT EXISTS `dons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `montant` int(10) unsigned NOT NULL,
  `commentaire` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `messages`
--

INSERT INTO `messages` (`id`, `nom`, `email`, `subject`, `message`) VALUES
(1, 'Patricia Menekeu Wamo', 'patriciameneku@yaoo.fr', 'dd', 'dd');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `auteur` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `tag` text NOT NULL,
  `id_categories` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categories` (`id_categories`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `posts`
--

INSERT INTO `posts` (`id`, `titre`, `auteur`, `date`, `image`, `description`, `tag`, `id_categories`, `type`) VALUES
(1, 'La découverte d’une nécropole du Bas-Empire renouvelle l’histoire de l’Île-Rousse (Haute-Corse)', 'Samaku Kourou', '2021-04-07', 'img2.png', 'Dans la commune d''Île-Rousse, au pied de l’église de l''Immaculée Conception, l''Inrap vient de mettre au jour une quarantaine de tombes datées des IIIe - VIe siècles de notre ère. Les défunts sont inhumés majoritairement à l''intérieur de grandes amphores provenant de Tunisie.', 'ossements,fouille,découvertes', 2, 'decouvertes'),
(2, 'La plus ancienne carte d’Europe ?', 'Samaku Kourou', '2021-04-06', 'img3.jpg', 'La dalle ornée de Saint-Bélec à Leuhan (Finistère) est probablement la plus vieille représentation cartographique d’un territoire connue en Europe. Yvan Pailler, chercheur à l’Inrap, mis à disposition de l’université de Bretagne Occidentale, et Clément Nicolas, post-doctorant Marie Curie/Bournemouth University dévoilent leurs conclusions sur cette exceptionnelle découverte.', 'ossements,fouille,découvertes', 2, 'decouvertes'),
(3, 'Découverte d’une sépulture double du Mésolithique à Casseneuil (Lot-et-Garonne) ', 'Samaku Kourou', '2021-03-31', 'img1.png', 'Le Mésolithique couvre une période de 5 000 ans, et pourtant moins d’une cinquantaine de sépultures de cette époque sont connues en France. L’une d’elles, contenant deux défunts, est fouillée depuis le 1er mars par une équipe de l’Inrap à Casseneuil.', 'ossements,fouille,découvertes', 1, 'decouvertes'),
(4, 'Appel à projets scientifiques 2022 : une date unique pour l’ensemble des projets de recherche', 'Samaku Kourou', '2021-03-30', 'img4.jpg', 'L’appel à projets scientifiques 2022 de l’Inrap est ouvert jusqu’au lundi 13 septembre 2021. Le dépôt des dossiers se fait en ligne, sur la plateforme @GIR.Le dépôt des dossiers se fait en ligne, sur la plateforme @GIR.', 'ossements,fouille,découvertes', 2, 'découvertes'),
(5, 'Découverte d’une sépulture double du Mésolithique à Casseneuil (Lot-et-Garonne) ', 'Samaku Kourou', '2021-03-31', 'aide.jpg', 'Le Mésolithique couvre une période de 5 000 ans, et pourtant moins d’une cinquantaine de sépultures de cette époque sont connues en France. L’une d’elles, contenant deux défunts, est fouillée depuis le 1er mars par une équipe de l’Inrap à Casseneuil.', 'ossements,fouille,découvertes', 4, 'découvertes'),
(6, 'La découverte d’une nécropole du Bas-Empire renouvelle l’histoire de l’Île-Rousse (Haute-Corse)', 'Samaku Kourou', '2021-04-07', 'collaboration.jpg', 'Dans la commune d''Île-Rousse, au pied de l’église de l''Immaculée Conception, l''Inrap vient de mettre au jour une quarantaine de tombes datées des IIIe - VIe siècles de notre ère. Les défunts sont inhumés majoritairement à l''intérieur de grandes amphores provenant de Tunisie.', 'ossements,fouille,découvertes', 5, 'publications'),
(7, 'La plus ancienne carte d’Europe ?', 'Samaku Kourou', '2021-04-06', 'raison.jpg', 'La dalle ornée de Saint-Bélec à Leuhan (Finistère) est probablement la plus vieille représentation cartographique d’un territoire connue en Europe. Yvan Pailler, chercheur à l’Inrap, mis à disposition de l’université de Bretagne Occidentale, et Clément Nicolas, post-doctorant Marie Curie/Bournemouth University dévoilent leurs conclusions sur cette exceptionnelle découverte.', 'ossements,fouille,découvertes', 3, 'publications'),
(8, 'Appel à projets scientifiques 2022 : une date unique pour l’ensemble des projets de recherche', 'Samaku Kourou', '2021-03-30', 'imgp4.jpg', 'L’appel à projets scientifiques 2022 de l’Inrap est ouvert jusqu’au lundi 13 septembre 2021. Le dépôt des dossiers se fait en ligne, sur la plateforme @GIR.Le dépôt des dossiers se fait en ligne, sur la plateforme @GIR.', 'ossements,fouille,découvertes', 7, 'publications');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(10, 'MENEKEU WAMO PATRICIA', 'patriciamenekeu@gmail.com', '$2y$10$/YsCN9vZv0GaU2N7Q1dYgOBmdHSjpvKIKDFz43rPmIPvxUxxBZ6uC'),
(11, '', '', '$2y$10$ACp36oCJmD/P2ljY13UCMui9AchPQAJnrqnjtLPF.HyxdztRGMggK'),
(12, 'patricia', 'patriciamenekeu@yahoo.fr', '$2y$10$1uzd2x5aEJL7./t5/tQ6bu0Bwugd80r.mlLa9l1PugRTa3QjTIRsO'),
(13, 'Chaboua AKE', 'doriane.ake2998@gmail.com', '$2y$10$.Do3p3fnDyiWFWyBJZq80uSwNbPtaQ/jB5PwJIDE94pHqBkRNzaqe');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `chantiers`
--
ALTER TABLE `chantiers`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`participants`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_categories` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
