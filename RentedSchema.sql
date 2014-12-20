CREATE DATABASE  IF NOT EXISTS `Rented` /*!40100 DEFAULT CHARACTER SET big5 */;
USE `Rented`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: Rented
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
  `endDate` datetime DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `present` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `addresshistory_user_idx` (`userId`),
  CONSTRAINT `addresshistory_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INVITEES`
--

DROP TABLE IF EXISTS `INVITEES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `INVITEES` (
  `id` int(10) unsigned NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `invitorId` int(10) unsigned NOT NULL COMMENT 'Ideally, this could be a userId or propertyMgmtCo id but relation doesn’t support plymorphic associations so just have it as userId for now',
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `googlePlus` varchar(45) DEFAULT NULL,
  `linkedIn` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitees_invitorId_idx` (`invitorId`),
  CONSTRAINT `invitees_invitorId` FOREIGN KEY (`invitorId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `PETS`
--

DROP TABLE IF EXISTS `PETS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PETS` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `type` enum('cat','dog','bird','fish','other') NOT NULL,
  `breed` varchar(45) NOT NULL,
  `weightLbs` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pets_user_idx` (`userId`),
  CONSTRAINT `pets_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `PROPERTYIMAGES`
--

DROP TABLE IF EXISTS `PROPERTYIMAGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYIMAGES` (
  `id` int(11) NOT NULL,
  `listingId` int(10) unsigned DEFAULT NULL,
  `propertyId` int(10) unsigned NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyimages_property_idx` (`propertyId`),
  KEY `propertyimages_listing_idx` (`listingId`),
  CONSTRAINT `propertyimages_listing` FOREIGN KEY (`listingId`) REFERENCES `PROPERTYLISTING` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyimages_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYLEASEDEFAULTS`
--

DROP TABLE IF EXISTS `PROPERTYLEASEDEFAULTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYLEASEDEFAULTS` (
  `id` int(10) unsigned NOT NULL,
  `propertyId` int(10) unsigned NOT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  `qtyDogsAllowed` int(2) unsigned NOT NULL DEFAULT '0',
  `qtyCatsAllowed` int(2) unsigned NOT NULL DEFAULT '0',
  `qtyOtherAllowed` int(2) unsigned NOT NULL DEFAULT '0',
  `animalSizeLimitLbs` int(3) NOT NULL DEFAULT '25',
  `fishTankAllowed` tinyint(1) NOT NULL DEFAULT '0',
  `preferredLeaseLength` int(3) unsigned NOT NULL,
  `preferredLeaseUnit` enum('day','week','month','year') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyleasedefaults_owner_idx` (`ownerId`),
  KEY `propertyleasedefaults_property_idx` (`propertyId`),
  CONSTRAINT `propertyleasedefaults_owner` FOREIGN KEY (`ownerId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyleasedefaults_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYLIKES`
--

DROP TABLE IF EXISTS `PROPERTYLIKES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYLIKES` (
  `propertyId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `propertylikes_property_idx` (`propertyId`),
  KEY `propertylikes_user_idx` (`userId`),
  CONSTRAINT `propertylikes_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertylikes_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYLISTING`
--

DROP TABLE IF EXISTS `PROPERTYLISTING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYLISTING` (
  `propertyId` int(10) unsigned NOT NULL,
  `monthlyPrice` float NOT NULL,
  `securityDeposit` float DEFAULT '0',
  `petDeposit` float DEFAULT '0',
  `availableMoveIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leaseLength` int(3) unsigned NOT NULL,
  `leaseLengthUnit` enum('day','week','month','year') NOT NULL,
  `contactPhone` varchar(45) NOT NULL COMMENT 'Should be either a property owner or property mgmt',
  `contactEmail` varchar(45) NOT NULL COMMENT 'Should be either a property owner or property mgmt',
  PRIMARY KEY (`id`),
  KEY `propertylisting_property_idx` (`propertyId`),
  CONSTRAINT `propertylisting_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTYMGMTCO`
--

DROP TABLE IF EXISTS `PROPERTYMGMTCO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTYMGMTCO` (
  `trustedPartnerId` int(10) unsigned NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`trustedPartnerId`)
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
  `preferredLeaseLength` int(3) unsigned DEFAULT NULL,
  `preferredMoveIn` datetime NOT NULL,
  `numOccupants` int(11) NOT NULL DEFAULT '1' COMMENT 'number of occupants needs to be filled in and should be >= to number of applicants for this specific application',
  `moveReason` varchar(255) DEFAULT NULL,
  `preferredLeaseLengthUnit` enum('day','week','month','year') DEFAULT NULL,
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
  `twitter` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `googleplus` varchar(45) DEFAULT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `experianIdToken` varchar(255) DEFAULT NULL,
  `creditCheckToken` varchar(255) DEFAULT NULL,
  `runIdentityCheck` tinyint(1) NOT NULL DEFAULT '0',
  `shareCreditReport` tinyint(1) NOT NULL DEFAULT '0',
  `identityDate` datetime DEFAULT NULL,
  `creditReportDate` datetime DEFAULT NULL,
  `realtorLicenseState` varchar(2) DEFAULT NULL,
  `DRE` int(8) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USEREDUCATION`
--

DROP TABLE IF EXISTS `USEREDUCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USEREDUCATION` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `educationCenterName` varchar(45) NOT NULL,
  `type` enum('university','trade','military') DEFAULT 'university',
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `graduation` tinyint(1) NOT NULL DEFAULT '0',
  `graduationDate` datetime DEFAULT NULL,
  `major` varchar(45) DEFAULT NULL,
  `degreeType` enum('undergraduate','graduate','doctorate','post-doctorate') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usereducation_user_idx` (`userId`),
  CONSTRAINT `usereducation_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERFINANCIALS`
--

DROP TABLE IF EXISTS `USERFINANCIALS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERFINANCIALS` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `individualAnnualIncom` int(10) unsigned DEFAULT NULL,
  `householdAnnualIncome` int(10) unsigned DEFAULT NULL,
  `spouseAnnualIncome` int(10) unsigned DEFAULT NULL,
  `incomeProof` varchar(255) DEFAULT NULL COMMENT 'This should be a link to S3 that houses a (one) file that is the proof of income document(s) or pictures of the document(s)',
  PRIMARY KEY (`id`),
  KEY `userfinancials_user_idx` (`userId`),
  CONSTRAINT `userfinancials_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USEROCCUPATION`
--

DROP TABLE IF EXISTS `USEROCCUPATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USEROCCUPATION` (
  `id` int(10) unsigned NOT NULL,
  `role` varchar(45) NOT NULL,
  `company` varchar(45) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `presentlyEmployeed` tinyint(1) NOT NULL DEFAULT '0',
  `userId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `useroccupation_user_idx` (`userId`),
  CONSTRAINT `useroccupation_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERRECOMMENDATIONS`
--

DROP TABLE IF EXISTS `USERRECOMMENDATIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERRECOMMENDATIONS` (
  `id` int(10) unsigned NOT NULL,
  `recommendedId` int(10) unsigned NOT NULL,
  `recommendorId` int(10) unsigned NOT NULL,
  `recommendedApproved` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userrecommendations_recommended_idx` (`recommendedId`),
  KEY `userrecommendations_recommendor_idx` (`recommendorId`),
  CONSTRAINT `userrecommendations_recommended` FOREIGN KEY (`recommendedId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userrecommendations_recommendor` FOREIGN KEY (`recommendorId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USERREFERENCES`
--

DROP TABLE IF EXISTS `USERREFERENCES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERREFERENCES` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `relation` enum('relative','roommate','friend','spouse','landlord','colleague') NOT NULL,
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userreferences_user_idx` (`userId`),
  CONSTRAINT `userreferences_user` FOREIGN KEY (`userId`) REFERENCES `USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=big5;
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

-- Dump completed on 2014-12-19 16:36:31
