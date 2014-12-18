-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: rv4
-- ------------------------------------------------------
-- Server version	5.6.21

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
-- Table structure for table `ADDRESSHISTORY`
--

DROP TABLE IF EXISTS `ADDRESSHISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ADDRESSHISTORY` (
  `id` int(11) NOT NULL DEFAULT '0',
  `street` varchar(255) NOT NULL,
  `apt` varchar(20) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zip` varchar(45) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresshistory_user_idx` (`userId`),
  CONSTRAINT `addresshistory_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LEASE`
--

DROP TABLE IF EXISTS `LEASE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LEASE` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `propertyId` int(10) unsigned NOT NULL,
  `approved` bit(1) DEFAULT NULL COMMENT 'Default value is NULL so you know that it hasn’t been approved or rejected yet',
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `paymentAmount` float NOT NULL,
  `paymentInterval` enum('weekly','monthly','yearly') NOT NULL,
  `securityDeposit` float DEFAULT NULL,
  `petDeposit` float DEFAULT NULL,
  `payee` varchar(45) DEFAULT NULL COMMENT 'trusted partner ID	reference to trustedPartnerID	need to see if the lease has property management company or not\nuserID of property owner	reference to userID	only refer to property owner if no property management company\nOther	<string>	Changed manually at the time of lease signing\nPayee will be only ONE of the 3 items (NOT ALL)	',
  `built` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyId_idx` (`propertyId`),
  CONSTRAINT `propertyId` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LESSEE`
--

DROP TABLE IF EXISTS `LESSEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LESSEE` (
  `leaseId` int(11) unsigned NOT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`leaseId`,`userId`),
  KEY `leaseId_idx` (`leaseId`),
  KEY `lessee_user_idx` (`userId`),
  CONSTRAINT `leaseId` FOREIGN KEY (`leaseId`) REFERENCES `LEASE` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lessee_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTY`
--

DROP TABLE IF EXISTS `PROPERTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY` (
  `streetAddress` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('apt','sfh','duplex','land','townhouse') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '100 words or less',
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `parkingSpots` int(11) DEFAULT NULL,
  `livingAreaSqFt` int(11) DEFAULT NULL,
  `hoaFee` float DEFAULT NULL,
  `otherFee` float DEFAULT NULL,
  `status` enum('avail','pending','rented') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYOWNER`
--

DROP TABLE IF EXISTS `PROPERTYOWNER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYOWNER` (
  `propertyOwnershipId` int(10) unsigned NOT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`propertyOwnershipId`,`ownerId`),
  KEY `propertyowner_user_idx` (`ownerId`),
  CONSTRAINT `propertyOwnershipFK` FOREIGN KEY (`propertyOwnershipId`) REFERENCES `PROPERTYOWNERSHIP` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyowner_user` FOREIGN KEY (`ownerId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYOWNERSHIP`
--

DROP TABLE IF EXISTS `PROPERTYOWNERSHIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYOWNERSHIP` (
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` datetime NOT NULL,
  `propertyFK` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `property_idx` (`propertyFK`),
  KEY `propTime` (`startDate`,`endDate`,`propertyFK`),
  CONSTRAINT `propertyFK` FOREIGN KEY (`propertyFK`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RENTALAPPLICANT`
--

DROP TABLE IF EXISTS `RENTALAPPLICANT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENTALAPPLICANT` (
  `userId` int(10) unsigned NOT NULL,
  `id` int(11) NOT NULL,
  `rentalAppId` int(10) unsigned NOT NULL,
  `shareCredit` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rentalAppId_idx` (`rentalAppId`),
  KEY `rentalapplicant_user_idx` (`userId`),
  CONSTRAINT `rentalAppId` FOREIGN KEY (`rentalAppId`) REFERENCES `RENTALAPPLICATION` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rentalapplicant_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RENTALAPPLICATION`
--

DROP TABLE IF EXISTS `RENTALAPPLICATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENTALAPPLICATION` (
  `id` int(10) unsigned NOT NULL,
  `propertyId` int(10) unsigned NOT NULL,
  `preferredLeaseLength` enum('weakly','monthly','1yr','2yr','3yr','4+yr') DEFAULT NULL,
  `preferredMoveIn` datetime DEFAULT NULL,
  `numOccupants` int(11) DEFAULT NULL,
  `moveReason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `propFK_idx` (`propertyId`),
  CONSTRAINT `propFK` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERVEHICLES`
--

DROP TABLE IF EXISTS `USERVEHICLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERVEHICLES` (
  `id` int(10) unsigned NOT NULL,
  `year` int(11) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `licensePlate` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uservehicles_user_idx` (`userId`),
  CONSTRAINT `uservehicles_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-17 19:06:01
