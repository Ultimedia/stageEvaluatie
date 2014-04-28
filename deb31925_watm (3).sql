-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 28, 2014 at 12:45 PM
-- Server version: 5.5.33
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `deb31925_watm`
--

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_companies`
--

CREATE TABLE `stageapp_companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_contact` varchar(200) NOT NULL,
  `company_email` varchar(200) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_evaluations`
--

CREATE TABLE `stageapp_evaluations` (
  `evaluation_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `internship_id` int(11) NOT NULL,
  `evaluate_term` varchar(40) NOT NULL,
  `final_score` varchar(11) NOT NULL,
  PRIMARY KEY (`evaluation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_evaluations_data`
--

CREATE TABLE `stageapp_evaluations_data` (
  `evaluation_data_id` int(11) NOT NULL AUTO_INCREMENT,
  `evaluation_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_rating_id` int(11) NOT NULL,
  `remarks` varchar(400) NOT NULL,
  PRIMARY KEY (`evaluation_data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_internships`
--

CREATE TABLE `stageapp_internships` (
  `internship_id` int(11) NOT NULL AUTO_INCREMENT,
  `intn` varchar(200) COLLATE utf8_bin NOT NULL,
  `student` varchar(200) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin NOT NULL,
  `organisation` varchar(200) COLLATE utf8_bin NOT NULL,
  `mentor` varchar(200) COLLATE utf8_bin NOT NULL,
  `location` varchar(200) COLLATE utf8_bin NOT NULL,
  `discipline` varchar(200) COLLATE utf8_bin NOT NULL,
  `coach` varchar(200) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`internship_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=39 ;

--
-- Dumping data for table `stageapp_internships`
--

INSERT INTO `stageapp_internships` (`internship_id`, `intn`, `student`, `email`, `organisation`, `mentor`, `location`, `discipline`, `coach`) VALUES
(2, 'INT', 'Augustijnen Gilles', 'mailto:Gilles.Augustijnen@student.howest.be#', 'Winoproductions', 'mailto:winoproductions@gmail.com#', 'Gent', 'MOT', 'FBT'),
(3, 'INT', 'Beulque Pieter', 'mailto:Pieter.Beulque@student.howest.be#', 'We work we play', 'mailto:thijs@weworkweplay.com#', 'Gent', 'DES/DEV', 'WVW'),
(4, 'EXT', 'Bombey Jens', 'mailto:jens.bombey@student.howest.be#', 'First Image', '', 'London', 'MOT', 'FJO'),
(5, 'EXT', 'Buysse Warre', 'mailto:warre.buysse@student.howest.be#', 'Arts Square', 'mailto:antoine@arts-square.com#', 'Miami', 'DES/DEV', 'FJO'),
(6, 'EXT', 'Caestecker Dylan', 'mailto:dylan.caestecker@student.howest.be#', 'MUD', '', 'Bath', 'DES/DEV', 'MBR'),
(7, 'EXT', 'Cappelle Thomas', 'mailto:thomas.cappelle@student.howest.be#', 'psyt.com', '', 'London', 'DES/DEV', 'WVW'),
(8, 'INT', 'Cordemans Jessy', 'mailto:jessy.cordemans@student.howest.be#', 'Mortierbrigade', 'mailto:Wietse.DeRidder@mortierbrigade.com#', 'Brussel', 'DES/DEV', 'JCM'),
(9, 'INT', 'De Baets Pieter', 'mailto:pieter.de.baets@student.howest.be#', 'Gents Agency', 'mailto:tim@gents.be#', 'Gent', 'DES', 'CCP'),
(10, 'EXT', 'Debrock Lucas', 'mailto:lucas.debrock@student.howest.be#', 'MediaMonks', '', 'Hilversum', 'DES/DEV', 'FBT'),
(11, 'EXT', 'Debruyne Miguel', 'mailto:Miguel.Debruyne@student.howest.be#', 'No-Bo', '', 'Bialystok', 'DES/DEV', 'MBR'),
(12, 'EXT', 'Deckx Matthias', 'mailto:matthias.deckx@student.howest.be#', 'Lindgren+Lindqvist', '', 'Götenborg', 'DES', 'FBT'),
(13, 'EXT', 'Degry Thomas', 'mailto:Thomas.Degry@student.howest.be#', 'Washington', '', 'Washington', 'DES/DEV', 'GDV'),
(14, 'INT', 'Derumeaux Yoram', 'mailto:yoram.derumeaux@student.howest.be#', 'Create Multimedia Services', 'mailto:bob@createmultimedia.be#', 'Gent', 'DEV', 'FBT'),
(15, 'INT', 'De Schuyter Wouter', 'mailto:Wouter.De.Schuyter@student.howest.be#', 'In the Pocket', 'mailto:jeroen@inthepocket.mobi#', 'Gent', 'DEV', 'FJQ'),
(16, 'INT', 'Devries Bram', 'mailto:bram.devries@student.howest.be#', 'madewithlove', 'mailto:andreas@madewithlove.be#', 'Leuven', 'DEV', 'CCP'),
(17, 'INT', 'Droogendijk Carolina', 'mailto:carolina.droogendijk@student.howest.be#', 'Weblounge', 'mailto:kristof@weblounge.be#', 'Brugge', 'DES', 'JCM'),
(18, 'INT', 'Gesquiere Niels', 'mailto:niels.gesquiere@student.howest.be#', 'Hooox', 'mailto:mvanmarcke@hooox.com#', 'Gent', 'DES', 'EDR'),
(19, 'EXT', 'Jaenen Nicolas', 'mailto:Nicolas.Jaenen@student.howest.be#', 'Delete Agency', '', 'London', 'DEV', 'GDV'),
(20, 'EXT', 'Lambert Thomas', 'mailto:Thomas.Lambert@student.howest.be#', 'Torke+CC', '', 'Lissabon', 'DES/DEV', 'MBR'),
(21, 'INT', 'Martins Tycho', 'mailto:Tycho.Martins@student.howest.be#', 'Create Multimedia Services', 'mailto:bob@createmultimedia.be#', 'Gent', 'DES/DEV', 'FBT'),
(22, 'EXT', 'Masala Sabatino', 'mailto:sabatino.masala@student.howest.be#', 'Humblebee', '', 'Götenborg', 'DES/DEV', 'JCM'),
(23, 'EXT', 'Melsens Thomas', 'mailto:thomas.melsens@student.howest.be#', 'Fluent Studio', '', 'London', 'DEV', 'MBR'),
(24, 'INT', 'Meurrens Jonathan', 'mailto:jonathan.meurrens@student.howest.be#', 'BBDO', 'mailto:pieter.michels@bbdo.be#', 'Brussel', 'DES/DEV', 'JCM'),
(25, 'INT', 'Perriëns Nathalie', 'mailto:nathalie.perriens@student.howest.be#', 'Boondoggle', 'mailto:jonas.verheijden@boondoggle.eu#', 'Leuven', 'DES', 'CCP'),
(26, 'INT', 'Pottie Jonas', 'mailto:Jonas.Pottie@student.howest.be#', 'Reclamebureau Plug', 'mailto:ine@plug.be#', 'Roeselare', 'DES/DEV', 'EDR'),
(27, 'INT', 'Seynhaeve Bram', 'mailto:bram.seynhaeve@student.howest.be#', 'In the Pocket', 'mailto:jeroen@inthepocket.mobi#', 'Gent', 'DEV', 'FJQ'),
(28, 'EXT', 'Van Campenhout Tatiana', 'mailto:Tatiana.Van.Campenhout@student.howest.be#', 'Mapbox', '', 'Washington', 'DES', 'GDV'),
(29, 'INT', 'Vandersyppe Wouter', 'mailto:wouter.vandersyppe@student.howest.be#', 'Little Miss Robot', 'mailto:thomas@littlemissrobot.com#', 'Gent', 'DEV', 'WVW'),
(30, 'INT', 'Van de Veire Michiel', 'mailto:michiel.van.de.veire@student.howest.be#', 'Cloud Design', 'mailto:jonas@clouddesign.be#', 'Gent', 'DEV', 'FJO'),
(31, 'INT', 'Van de Voorde Joachim', 'mailto:joachim.van.de.voorde@student.howest.be#', 'Famous', 'mailto:lisa.derycke@famous.be#', 'Brussel', 'DES/DEV', 'CCP'),
(32, 'EXT', 'Van Dijck Siebe', 'mailto:Siebe.Van.Dijck@student.howest.be#', 'Codegent', '', 'London', 'DES/DEV', 'GDV'),
(33, 'INT', 'Vanhaeverbeke Jeroen', 'mailto:jeroen.vanhaeverbeke@student.howest.be#', 'Reclamebureau Plug', 'mailto:ine@plug.be#', 'Roeselare', 'DES/DEV', 'EDR'),
(34, 'INT', 'Van Helleputte Inez', 'mailto:inez.van.helleputte@student.howest.be#', 'In the Pocket', 'mailto:jeroen@inthepocket.mobi#', 'Gent', 'DES', 'FJQ'),
(35, 'EXT', 'Van Mieghem Mats', 'mailto:mats.van.mieghem@student.howest.be#', 'sleak.tv', '', 'Strasbourg', 'MOT', 'FJO'),
(36, 'EXT', 'Van Neyghem Sarah', 'mailto:Sarah.Van.Neyghem@student.howest.be#', 'Designhorse', '', 'Oslo', 'DES', 'EDR'),
(37, 'EXT', 'Van Respaille Wouter', 'mailto:Wouter.Van.Respaille@student.howest.be#', 'legify.com', '', 'Berlijn', 'DEV', 'WVW'),
(38, 'INT', 'Van Wassenhove Ruben', 'mailto:ruben.van.wassenhove@student.howest.be#', 'Urga', 'mailto:dries@urga.be#', 'Waregem', 'DES/DEV', 'FJQ');

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_questions`
--

CREATE TABLE `stageapp_questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_description_nl` varchar(300) NOT NULL,
  `question_description_en` varchar(200) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `stageapp_questions`
--

INSERT INTO `stageapp_questions` (`question_id`, `question_description_nl`, `question_description_en`) VALUES
(1, 'Houdt de stagiair zich aan de planning, de werkuren en de gemaakte afspraken?', 'Does the intern observe the planning, working hours and agreements?'),
(2, 'Communiceert de stagiair op een heldere manier met u, het team, de klant of derden?', 'Does the intern communicate clearly with you, the team, the customer or a third party?'),
(3, 'Aanvaard de student opbouwende kritiek en verwerkt hij de gegeven feedback op een goede manier?', 'Does the intern accept constructive criticism and does he process the feedback in a good manner?'),
(4, 'Beschikt de stagiair over voldoende technische bagage en skills om de opdrachten uit te voeren?', 'Does the intern have sufficient technical knowledge and skills to execute the tasks?\r\n'),
(5, 'Beschikt de stagiair over voldoende creatieve inzichten en grafische vaardigheden?', 'Does the intern have sufficient creative insights and graphic skills?\r\n'),
(6, 'Heeft de stagiair een goede kennis van animatie- en/of montagetechnieken?', 'Does the intern have sufficient editing / animation skills?\r\n'),
(7, 'Kan de stagiair een project zelfstandig en op een gestructureerde manier van briefing tot gevraagd eindproduct afwerken?', 'Is the intern able to work out a project independently and in a structured way, from briefing to delivering a finished product?\r\n'),
(8, 'Is de stagiair in staat iets te creëren binnen de opgelegde restricties?', 'Is the intern able to create something within the restrictions imposed?\r\n'),
(9, 'Toont de stagiair interesse in trends en evoluties in de interactieve media?', 'Does the intern show an interest in trends and new developments in interactive media?\r\n'),
(10, 'Heeft de stagiair nieuwe of specifieke technieken aangeleerd en toegepast?', 'Has the intern learned and applied any new techniques?\r\n'),
(11, 'Heeft de stagiair initiatief genomen, zelf voorstellen gedaan om een project beter te maken?', 'Has the intern taken initiative to improve the project?\r\n'),
(12, 'Merkt u evolutie bij de stagiair sinds de start van de stageperiode?', 'Do you notice an evolution with the intern since the beginning of the internship?\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `stageapp_question_ratings`
--

CREATE TABLE `stageapp_question_ratings` (
  `question_rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_rating_rating_nl` varchar(200) NOT NULL,
  `question_rating_rating_en` varchar(200) NOT NULL,
  `question_ratings_context_nl` varchar(600) NOT NULL,
  `question_ratings_context_en` varchar(600) NOT NULL,
  `question_rating_points` varchar(20) NOT NULL,
  PRIMARY KEY (`question_rating_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `stageapp_question_ratings`
--

INSERT INTO `stageapp_question_ratings` (`question_rating_id`, `question_rating_rating_nl`, `question_rating_rating_en`, `question_ratings_context_nl`, `question_ratings_context_en`, `question_rating_points`) VALUES
(1, 'ZEER UITZONDERLIJK', 'EXTRAORDINARY', '16 Wordt zelden of nooit uitgereikt:  U wil deze stagiair(e) onmiddellijk aannemen. Zijn werk was gelijk of beter aan de realisaties van andere medewerkers in uw bedrijf.', '16 or more This mark is rarely or never awarded: you want to hire this trainee immediately. His/her work is equal to or better than the realizations of other employees in your company.', '>16'),
(2, 'UITMUNTEND', 'OUTSTANDING', '14-15 Een score om een uitmuntend stagiaires te beoordelen. Hij/Zij heeft zich beter getoond dan stagiaires uit eerdere stage ervaringen.', '14-15 A score to judge an excellent trainee. He/she has been standing out over trainees in former work placement situations.', '14-15'),
(3, 'HEEL TEVREDEN', 'VERY SATISFIED\r\n', '12-13 Deze stagiair(e) voldeed aan al uw verwachtingen. Hij/Zij werkte enthousiast mee in het bedrijf en leverde een waardevolle bijdrage. Hij/Zij was zelfredzaam, vroeg hulp indien nodig en beschikte over de nodige skills die je van een stagiair(e) verwacht.', '12-13 This trainee has met all your expectations. He/she enthusiastically cooperated in the company and made a valuable contribution. He/she worked independently, asked for help if necessary and had the necessary skills that can be expected from a trainee.', '12-13'),
(4, 'TEVREDEN', 'SATISFIED', '10-11 Deze stagiair(e) voldeed bijna aan al uw verwachtingen. Hij/Zij werkte mee en leverde voldoende bijdrage aan uw bedrijf en beschikte over de nodige basis skills die je van een stagiair(e) verwacht.', '11-10 This trainee met almost all your expectations. He/she cooperated and made a sufficient contribution to your company and had the necessary basic skills that can be expected from a trainee.', '10-11'),
(5, 'NIET TEVREDEN', 'NOT SATISFIED', '8-9 De stagiair(e) toonde bepaalde vaardigheden, deed het broodnodige, maar de prestatie ligt beneden het niveau dat u van een stagiair(e) verwacht.', '8-9 The trainee showed certain skills, did what was strictly necessary, but the performance is below the level that can be expected from a trainee.', '8-9'),
(6, 'HELEMAAL NIET TEVREDEN', 'NOT AT ALL SATISFIED\r\n', '6-7 De stagiair(e) realiseerde onvoldoende. De stagiair(e) paste niet in het bedrijf of toonde onvoldoende inzet en engagement. Hij/zij beschikt niet over de nodige basis skills die je van een stagiair(e) verwacht.', '6-7 The trainee’s achievements were unsatisfactory. The trainee did not fit in the company or showed lack of commitment and engagement. He/she does not have the necessary basic skills that can be expected from a trainee.', '6-7'),
(7, 'TELEURSTELLEND', 'DISAPPOINTING', '<6 Stuur me nooit nog zo een stagiair(e), ons bedrijf was er niets mee.', '<6 and less\r\nNever send me a trainee like this again, our company was better off without him/her.', '<6'),
(8, '— NIET VAN TOEPASSING', '— NOT RELEVANT', '', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
