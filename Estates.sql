-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: fa17g03
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Estates`
--

DROP TABLE IF EXISTS `Estates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Estates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Address` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Zip` varchar(45) NOT NULL,
  `Price` int(11) NOT NULL,
  `Bedrooms` varchar(45) NOT NULL,
  `Bathrooms` varchar(45) NOT NULL,
  `Email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Estates`
--

LOCK TABLES `Estates` WRITE;
/*!40000 ALTER TABLE `Estates` DISABLE KEYS */;
INSERT INTO `Estates` VALUES (1,'1313 Disneyland Dr','Anaheim','92802',509607,'5','5','BerchKonda@yahoo.com'),(2,'2001 H St','Bakersfield','93301',42570,'2','2','MaryKate@gmail.com'),(3,'1400 Fulton St','Fresno','93721',37890,'3','2','BerchKonda@yahoo.com'),(4,'1250 Bellflower Blvd','Long Beach','90840',795760,'8','3','MaryKate@gmail.com'),(5,'1156 High St','Santa Cruz','95064',603200,'1','1','BerchKonda@yahoo.com'),(6,'868 Fourth Ave','San Diego','92101',978790,'4','2','MaryKate@gmail.com'),(7,'1600 Holloway','San Francisco','94132',35700,'2','1','BerchKonda@yahoo.com'),(8,'50 Phelan Ave','San Francisco','94112',121576,'1','1','allisonBon@gmail.com'),(9,'145 Cortland Ave','San Francisco','94110',1350000,'4','2','laguenTy@harvest.net'),(10,'155 Jenkins Ct','Stanford','94305',743050,'5','3','EricsonKyle@yahoo.com'),(11,'200 Elm Ave','Mill Valley','94941',2404600,'3','2','allisonBon@gmail.com'),(12,'210 Juniper St','San Diego','92101',524000,'2','1','DougRubert@gmail.com'),(13,'222 Columbia St','Santa Cruz','95060',560000,'2','1','MaryKate@gmail.com'),(14,'540 28th St','Oakland','94609',250700,'1','1','laguenTy@harvest.net'),(15,'753 8th Ave','San Francisco','94118',100400,'1','1','allisonBon@gmail.com'),(16,'875 W Remington Dr','Sunnyvale','94087',230500,'2','1','allisonBon@gmail.com'),(17,'897 47th Ave','San Francisco','94121',670000,'3','1','laguenTy@harvest.net'),(18,'901 S Claudina St','Anaheim','92805',436900,'2','1','EricsonKyle@yahoo.com'),(19,'905 N Emily St','Anaheim','92805',240000,'1','1','DougRubert@gmail.com'),(20,'1415 Indiana St','San Francisco','94107',486000,'4','2','EricsonKyle@yahoo.com'),(21,'1717 California Ave','Bakersfield','93304',399000,'2','1','DougRubert@gmail.com'),(22,'2220 Cabrillo St','San Francisco','94121',378990,'1','1','laguenTy@harvest.net'),(23,'2294 48th Ave','San Francisco','94116',299000,'2','1','laguenTy@harvest.net'),(24,'2525 19th St','San Francisco','94110',210000,'1','1','allisonBon@gmail.com'),(25,'3120 E Balch Ave','Fresno','93702',312000,'2','1','DougRubert@gmail.com'),(26,'3232 E Ventura Ave','Fresno','93702',190000,'1','1','EricsonKyle@yahoo.com'),(27,'3381 E Ocean Blvd','Long Beach','90803',540300,'4','2','EricsonKyle@yahoo.com'),(28,'3817 E Livingston Dr','Long Beach','90803',499000,'4','3','DougRubert@gmail.com'),(30,'55 9th St','San Francisco','94103',400000,'2','2','dalau6@gmail.com');
/*!40000 ALTER TABLE `Estates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-20 23:15:25
