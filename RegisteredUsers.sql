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
-- Table structure for table `RegisteredUsers`
--

DROP TABLE IF EXISTS `RegisteredUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RegisteredUsers` (
  `email` varchar(30) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `password` varchar(99) DEFAULT NULL,
  `type` varchar(30) NOT NULL,
  `agree` varchar(30) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RegisteredUsers`
--

LOCK TABLES `RegisteredUsers` WRITE;
/*!40000 ALTER TABLE `RegisteredUsers` DISABLE KEYS */;
INSERT INTO `RegisteredUsers` VALUES ('dalau6@gmail.com','david','lau','$2a$10$jTt7I9h/hMxvuH.nLeD3heo1DVD7IkDHMWv/8KztKtjYzXySYbExi','buyer','y',3),('allisonBon@gmail.com','Allison','Bonita','$2a$10$wumlkQoso0L4AewwopQ7DeFpJEOMdaElt6cuVGwax4i1zo6Bl2wo.','agent','y',23),('laguenTy@harvest.net','Laguen','Tyson','$2a$10$6Ya3DRxS.Zq39V038/ayrORSygTBTcK.cdGnCimxB8NMU9aygVQqy','agent','y',24),('EricsonKyle@yahoo.co','Ericson','Jones','$2a$10$Ju3MWKtq1WQOSXt80n2aHuu4vGlWqiMaYPqNagaZj7KM6L/5Koiea','agent','y',26),('DougRubert@gmail.com','Doug ','Robert','$2a$10$V6Su42dbUFAUYr3mf6PU2OZPjvQlWVyV5MdgDnd6qaAcNPIMPG1Sy','agent','y',29),('MaryKate@gmail.com','Mary','Katlyn','$2a$10$m47SlYdQfYI/pML2xao5Qe2fuepKh29PCSz5EQGKmjjJR5fnYjQXW','agent','y',35),('BerchKonda@yahoo.com','Berchon','Kondan','$2a$10$NQzXhsxqLE7FOTD9/431G.rFGYEM7m54.lhRvMht9JM.LxU5ZDzxC','agent','y',47),('jessetirayoh@gmail.com','Jesse','Gab','$2a$10$5VOtJ66QhDNH9or0.V5Iue4HqKxb2cqKP0.pAzDoZzPcI1SNxECPW','buyer','y',48),('petkovic@sfsu.edu','Dragutin','Petkovic','$2a$10$gtoC690KXJa02SJNbpjOE.2hheHx40rQnVarP4aDwMh8T9GiLOp22','agent','y',63);
/*!40000 ALTER TABLE `RegisteredUsers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-20 23:15:26
