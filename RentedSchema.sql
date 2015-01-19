CREATE DATABASE  IF NOT EXISTS `Rented` /*!40100 DEFAULT CHARACTER SET utf8 */;
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
-- Table structure for table `ADDRESS_HISTORY`
--

DROP TABLE IF EXISTS `ADDRESS_HISTORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ADDRESS_HISTORY` (
  `id` int(10) unsigned NOT NULL DEFAULT '0',
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `aboutMe` varchar(255),
  `present` tinyint(1) unsigned DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresshistory_user_idx` (`userId`),
  CONSTRAINT `addresshistory_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `INVITEE`
--

DROP TABLE IF EXISTS `INVITEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `INVITEE` (
  `id` int(10) unsigned NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `invitorId` int(10) unsigned NOT NULL COMMENT 'Ideally, this could be a userId or propertyMgmtCo id but relation doesn’t support plymorphic associations so just have it as userId for now',
  `email` varchar(45) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
  `facebook` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `googlePlus` varchar(45) DEFAULT NULL,
  `linkedIn` varchar(45) DEFAULT NULL,
  `viewProperty` tinyint(1) DEFAULT NULL,
  `viewPropertyId` int(10) unsigned,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitee_invitor_idx` (`invitorId`),
  KEY `invitee_viewproperty_idx` (`viewPropertyId`),
  CONSTRAINT `invitee_invitorId` FOREIGN KEY (`invitorId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `invitee_viewpropertyId` FOREIGN KEY (`viewPropertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `approved` tinyint(1) DEFAULT NULL COMMENT 'Default value is NULL so you know that it hasn’t been approved or rejected yet',
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `paymentAmount` float(5,2)  NOT NULL,
  `paymentInterval` enum('weekly','monthly','yearly') NOT NULL,
  `securityDeposit` float(5,2) DEFAULT NULL,
  `petDeposit` float(4,2) DEFAULT NULL,
  `payee` varchar(45) DEFAULT NULL COMMENT 'trusted partner ID	reference to trustedPartnerID	need to see if the lease has property management company or not\nuserID of property owner	reference to userID	only refer to property owner if no property management company\nOther	<string>	Changed manually at the time of lease signing\nPayee will be only ONE of the 3 items (NOT ALL)	',
  `built` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyId_idx` (`propertyId`),
  CONSTRAINT `propertyId` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LESSEE`
--

DROP TABLE IF EXISTS `LESSEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LESSEE` (
  `leaseId` int(10)  unsigned NOT NULL,
  `userId` int(10) unsigned  NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`leaseId`,`userId`),
  KEY `leaseId_idx` (`leaseId`),
  KEY `lessee_user_idx` (`userId`),
  CONSTRAINT `leaseId` FOREIGN KEY (`leaseId`) REFERENCES `LEASE` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lessee_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PET`
--

DROP TABLE IF EXISTS `PET`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PET` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `type` enum('cat','dog','bird','fish','other') NOT NULL,
  `breed` varchar(45) NOT NULL,
  `weightLbs` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pets_user_idx` (`userId`),
  CONSTRAINT `pets_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTY`
--

DROP TABLE IF EXISTS `PROPERTY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state`varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `bldg` varchar(10) DEFAULT NULL,
  `type` enum('apt','sfh','duplex','land','townhouse') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '100 words or less',
  `bedrooms` int(1) unsigned DEFAULT NULL,
  `bathrooms` int(1) unsigned DEFAULT NULL,
  `parkingSpots` int(1) unsigned DEFAULT NULL,
  `livingAreaSqFt` int(5) unsigned DEFAULT NULL,
  `hoaFee` int(4) DEFAULT NULL,
  `otherFee` int(4) DEFAULT NULL,
  `status` enum('avail','pending','rented') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `PROPERTY_LISTING`
--

DROP TABLE IF EXISTS `PROPERTY_LISTING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_LISTING` (
  `propertyId` int(10) unsigned NOT NULL,
  `monthlyPrice` float(5,2) NOT NULL,
  `securityDeposit` float(5,2) DEFAULT '0',
  `petDeposit` float(4,2) DEFAULT '0',
  `availableMoveIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leaseEndDate` datetime ,
  `leaseLength` int(3) unsigned NOT NULL,
  `leaseLengthUnit` enum('day','week','month','year') NOT NULL,
  `leaseType` enum('sub-lease','month-to-month','regular') NOT NULL,
  `gender` enum('no preference', 'male preferred', 'female preferred', 'male only', 'female only') NOT NULL DEFAULT 'no preference',
  `totalUtilityCost` int(4) NOT NULL,
  `roomType` enum('single','double','triple', 'loft', 'living room') NOT NULL,
  `sharedBathroom` tinyint(1) DEFAULT NULL,
  `numRoomates` int(3) unsigned NOT NULL,
  `furnished` tinyint(1) DEFAULT NULL,
  `parkingAvailable` tinyint(1) DEFAULT NULL,
  `smokingAllowed` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('available', 'rental pending', 'rented') DEFAULT 'available',
  `contactPhone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
  `contactEmail` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertylisting_property_idx` (`propertyId`),
  CONSTRAINT `propertylisting_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `LOOKING`
--
DROP TABLE IF EXISTS `LOOKING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LOOKING` (
  `id` int(10) unsigned NOT NULL,
  `maxMonthlyRent` int(5) NOT NULL,
  `utilitiesIncluded` tinyint(1)  NOT NULL,
  `area` varchar(30)  COMMENT 'an area from a fixed list of cities or regions',
  `distanceToUniv` float(3,2)  COMMENT 'in miles',
  `moveInDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lengthOfStay` int(3) unsigned  COMMENT 'in months',
  `longTermIntention` tinyint(1) DEFAULT NULL,
  `openToFullYearLeaseNewRoomates` tinyint(1)  DEFAULT NULL,
  `roomType` enum('single','double','triple', 'loft', 'living room') DEFAULT NULL,
  `sharedBathroom` tinyint(1)  DEFAULT NULL,
  `gender` enum('no preference', 'male preferred', 'female preferred', 'male only', 'female only') NOT NULL DEFAULT 'no preference',
  `numRoommates` int(2) unsigned DEFAULT NULL,
  `furnished` tinyint(1) DEFAULT NULL,
  `busRouteRequired` tinyint(1)  DEFAULT NULL,
  `parkingNeeded` tinyint(1)  DEFAULT NULL,
  `smokingAllowed` tinyint(1)  DEFAULT NULL,
  `petsAllowed` tinyint(1)  DEFAULT NULL,
  `coupleAllowed` tinyint(1)  DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `PROPERTY_IMAGES`
--

DROP TABLE IF EXISTS `PROPERTY_IMAGES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_IMAGES` (
  `id` int(10) unsigned NOT NULL,
  `listingId` int(10) unsigned DEFAULT NULL COMMENT 'listing image may not exist for each property image',
  `propertyId` int(10) unsigned NOT NULL COMMENT 'if we decide to have listing images different from property images then create listing image table',
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyimages_property_idx` (`propertyId`),
  KEY `propertyimages_listing_idx` (`listingId`),
  CONSTRAINT `propertyimages_listing` FOREIGN KEY (`listingId`) REFERENCES `PROPERTYLISTING` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyimages_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTY_LEASE_DEFAULTS`
--

DROP TABLE IF EXISTS `PROPERTY_LEASE_DEFAULTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_LEASE_DEFAULTS` (
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
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyleasedefaults_owner_idx` (`ownerId`),
  KEY `propertyleasedefaults_property_idx` (`propertyId`),
  CONSTRAINT `propertyleasedefaults_owner` FOREIGN KEY (`ownerId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyleasedefaults_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTY_LIKES`
--

DROP TABLE IF EXISTS `PROPERTY_LIKES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_LIKES` (
  `propertyId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertylikes_property_idx` (`propertyId`),
  KEY `propertylikes_user_idx` (`userId`),
  CONSTRAINT `propertylikes_property` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertylikes_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;




--
-- Table structure for table `PROPERTY_OWNER`
--

DROP TABLE IF EXISTS `PROPERTY_OWNER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_OWNER` (
  `propertyOwnershipId` int(10) unsigned NOT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`propertyOwnershipId`,`ownerId`),
  KEY `propertyowner_user_idx` (`ownerId`),
  CONSTRAINT `propertyOwnershipFK` FOREIGN KEY (`propertyOwnershipId`) REFERENCES `PROPERTYOWNERSHIP` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyowner_user` FOREIGN KEY (`ownerId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PROPERTY_OWNERSHIP`
--

DROP TABLE IF EXISTS `PROPERTY_OWNERSHIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROPERTY_OWNERSHIP` (
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` datetime NOT NULL,
  `propertyFK` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_idx` (`propertyFK`),
  KEY `propTime` (`startDate`,`endDate`,`propertyFK`),
  CONSTRAINT `propertyFK` FOREIGN KEY (`propertyFK`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RENTAL_APPLICANT`
--

DROP TABLE IF EXISTS `RENTAL_APPLICANT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENTAL_APPLICANT` (
  `userId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL,
  `rentalAppId` int(10) unsigned NOT NULL,
  `shareCredit` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rentalAppId_idx` (`rentalAppId`),
  KEY `rentalapplicant_user_idx` (`userId`),
  CONSTRAINT `rentalAppId` FOREIGN KEY (`rentalAppId`) REFERENCES `RENTALAPPLICATION` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rentalapplicant_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RENTAL_APPLICATION`
--

DROP TABLE IF EXISTS `RENTAL_APPLICATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENTAL_APPLICATION` (
  `id` int(10) unsigned NOT NULL,
  `propertyId` int(10) unsigned NOT NULL,
  `preferredLeaseLength` int(3) unsigned DEFAULT NULL,
  `preferredMoveIn` datetime NOT NULL,
  `numOccupants` int(10) unsigned NOT NULL DEFAULT '1' COMMENT 'number of occupants needs to be filled in and should be >= to number of applicants for this specific application',
  `moveReason` varchar(255) DEFAULT NULL,
  `preferredLeaseLengthUnit` enum('day','week','month','year') DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `propFK_idx` (`propertyId`),
  CONSTRAINT `propFK` FOREIGN KEY (`propertyId`) REFERENCES `PROPERTY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RENTED_USER`
--

DROP TABLE IF EXISTS `RENTED_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RENTED_USER` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
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
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_EDUCATION`
--

DROP TABLE IF EXISTS `USER_EDUCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_EDUCATION` (
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
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usereducation_user_idx` (`userId`),
  CONSTRAINT `usereducation_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_FINANCIAL`
--

DROP TABLE IF EXISTS `USER_FINANCIAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_FINANCIAL` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `individualAnnualIncom` int(10) unsigned DEFAULT NULL,
  `householdAnnualIncome` int(10) unsigned DEFAULT NULL,
  `spouseAnnualIncome` int(10) unsigned DEFAULT NULL,
  `incomeProof` varchar(255) DEFAULT NULL COMMENT 'This should be a link to S3 that houses a (one) file that is the proof of income document(s) or pictures of the document(s)',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userfinancials_user_idx` (`userId`),
  CONSTRAINT `userfinancials_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_OCCUPATION`
--

DROP TABLE IF EXISTS `USER_OCCUPATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_OCCUPATION` (
  `id` int(10) unsigned NOT NULL,
  `role` varchar(45) NOT NULL,
  `company` varchar(45) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `presentlyEmployeed` tinyint(1) NOT NULL DEFAULT '0',
  `userId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `useroccupation_user_idx` (`userId`),
  CONSTRAINT `useroccupation_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_RECOMMENDATION`
--

DROP TABLE IF EXISTS `USER_RECOMMENDATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_RECOMMENDATION` (
  `id` int(10) unsigned NOT NULL,
  `recommendedId` int(10) unsigned NOT NULL,
  `recommendorId` int(10) unsigned NOT NULL,
  `recommendedApproved` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userrecommendations_recommended_idx` (`recommendedId`),
  KEY `userrecommendations_recommendor_idx` (`recommendorId`),
  CONSTRAINT `userrecommendations_recommended` FOREIGN KEY (`recommendedId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userrecommendations_recommendor` FOREIGN KEY (`recommendorId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_REFERENCE`
--

DROP TABLE IF EXISTS `USER_REFERENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_REFERENCE` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(10) NOT NULL COMMENT 'supporting only US number only',
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `relation` enum('relative','roommate','friend','spouse','landlord','colleague') NOT NULL,
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userreferences_user_idx` (`userId`),
  CONSTRAINT `userreferences_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER_VEHICLE`
--

DROP TABLE IF EXISTS `USER_VEHICLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_VEHICLE` (
  `id` int(10) unsigned NOT NULL,
  `year` int(10) unsigned NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `licensePlate` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uservehicles_user_idx` (`userId`),
  CONSTRAINT `uservehicles_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `USER_COSIGNER`
--
DROP TABLE IF EXISTS `USER_COSIGNER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_COSIGNER` (
  `id` int(10) unsigned NOT NULL,
  `cosingeeId` int(10) unsigned NOT NULL,
  `cosginerId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usercosigner_cosingee_idx` (`cosingeeId`),
  KEY `usercosigner_cosginer_idx` (`cosginerId`),
  CONSTRAINT `usercosigner_cosingee` FOREIGN KEY (`cosingeeId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usercosigner_cosginer` FOREIGN KEY (`cosginerId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `UNIVERSITY`
--
DROP TABLE IF EXISTS `UNIVERSITY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIVERSITY` (
   `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `academicYearType` enum('quarter', 'semester') DEFAULT 'semester',
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `UNIVERSITY_CALENDER_QUATER`
--
DROP TABLE IF EXISTS `UNIVERSITY_CALENDER_QUATER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIVERSITY_CALENDER_QUATER` (
  `id` int(10) unsigned NOT NULL,
  `universityId` int(10) unsigned NOT NULL,
  `year` varchar(255) NOT NULL,
  `fallQuaterStartDate`  datetime NOT NULL,
  `fallQuaterEndDate`  datetime NOT NULL,
  `winterQuaterStartDate`  datetime NOT NULL,
  `winterQuaterEndDate`  datetime NOT NULL,
  `springQuaterStartDate`  datetime NOT NULL,
  `springQuaterEndDate`  datetime NOT NULL,
  `summerQuaterStartDate`  datetime NOT NULL,
  `summerQuaterEndDate`  datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalquarter_university_idx` (`universityId`),
  CONSTRAINT `univcalquarter_university` FOREIGN KEY (`universityId`) REFERENCES `UNIVERSITY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `UNIVERSITY_CALENDER_SEMESTER`
--
DROP TABLE IF EXISTS `UNIVERSITY_CALENDER_SEMESTER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIVERSITY_CALENDER_SEMESTER` (
  `id` int(10) unsigned NOT NULL,
  `universityId` int(10) unsigned NOT NULL,
  `year` varchar(255) NOT NULL,
  `fallSemesterStartDate`  datetime NOT NULL,
  `fallSemesterEndDate`  datetime NOT NULL,
  `springSemesterStartDate`  datetime NOT NULL,
  `springSemesterEndDate`  datetime NOT NULL,
  `summerSemesterStartDate`  datetime NOT NULL,
  `summerSemesterEndDate`  datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalsemester_university_idx` (`universityId`),
  CONSTRAINT `univcalsemester_university` FOREIGN KEY (`universityId`) REFERENCES `UNIVERSITY` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `PAYMENT`
--
DROP TABLE IF EXISTS `PAYMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PAYMENT` (
  `id` int(10) unsigned NOT NULL,
  `payerId` int(10) unsigned NOT NULL,
  `payeeId` int(10) unsigned NOT NULL,
  `dollarAmount` float(5,2),
  `reason` varchar(255),
  `rentPayment` tinyint(1) DEFAULT '0',
  `creditCheckPayment` tinyint(1) DEFAULT '0',
  `paymentForm` enum('credit card', 'ACH', 'cash'),
  `paymentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_payer_idx` (`payerId`),
  KEY `payment_payee_idx` (`payeeId`),
  CONSTRAINT `payment_payer` FOREIGN KEY (`payerId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `payment_payee` FOREIGN KEY (`payeeId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ROOMMATE`
--
DROP TABLE IF EXISTS `ROOMMATE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROOMMATE` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `roommateId` int(10) unsigned NOT NULL,
  `fromDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `toDate` datetime,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roommate_user_idx` (`userId`),
  KEY `roommate_roomie_idx` (`roommateId`),
  CONSTRAINT `roommate_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `roommate_rommieId` FOREIGN KEY (`roommateId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FRIEND`
--
DROP TABLE IF EXISTS `FRIEND`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FRIEND` (
  `id` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `friendId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_user_idx` (`userId`),
  KEY `friend_friend_idx` (`friendId`),
  CONSTRAINT `friend_user` FOREIGN KEY (`userId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `friend_friendId` FOREIGN KEY (`friendId`) REFERENCES `RENTED_USER` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `APARTMENT_COMPLEX`
--
DROP TABLE IF EXISTS `APARTMENT_COMPLEX`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APARTMENT_COMPLEX` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `distanceToUniv` float(3,2)  COMMENT 'calculate with google maps api',
  `petsAllowed` tinyint(1)  NOT NULL DEFAULT '0',
  `dogsAllowed` tinyint(1)  NOT NULL DEFAULT '0',
  `catsAllowed` tinyint(1)  NOT NULL DEFAULT '0',
  `othersAllowed` tinyint(1)  NOT NULL DEFAULT '0',
  `dogQtyAllowed` int(3) unsigned DEFAULT '0',
  `catQtyAllowed` int(3) unsigned DEFAULT '0',
  `otherQtyAllowed` int(3) unsigned DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `APARTMENT_COMPLEX_IMAGE`
--
DROP TABLE IF EXISTS `APARTMENT_COMPLEX_IMAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APARTMENT_COMPLEX_IMAGE` (
  `id` int(10) unsigned NOT NULL,
  `complexId` int(10) unsigned NOT NULL,
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aptComplexImage_complex_idx` (`complexId`),
  CONSTRAINT `aptComplexImage_complexId` FOREIGN KEY (`complexId`) REFERENCES `APARTMENT_COMPLEX` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `APARTMENT_COMPLEX_TRANSPORTATION`
--
DROP TABLE IF EXISTS `APARTMENT_COMPLEX_TRANSPORTATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APARTMENT_COMPLEX_TRANSPORTATION` (
  `id` int(10) unsigned NOT NULL,
  `complexId` int(10) unsigned NOT NULL,
  `shuttleRoute` varchar(255) NOT NULL,
  `busLine` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aptComplexTrans_complex_idx` (`complexId`),
  CONSTRAINT `aptComplexTrans_complexId` FOREIGN KEY (`complexId`) REFERENCES `APARTMENT_COMPLEX` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `APARTMENT_COMPLEX_FLOOR_PLAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `APARTMENT_COMPLEX_FLOOR_PLAN` (
  `id` int(10) unsigned NOT NULL,
  `complexId` int(10) unsigned NOT NULL,
  `bedrooms` int(1) unsigned NOT NULL,
  `bathrooms` int(1) unsigned NOT NULL DEFAULT '1',
  `parking` int(1) unsigned NOT NULL DEFAULT '0',
  `living_area` int(4) unsigned NOT NULL COMMENT 'SQUARE FEET',
  `washer_dryer` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aptComplexFloorPlan_complex_idx` (`complexId`),
  CONSTRAINT `aptComplexFloorPlan_complexId` FOREIGN KEY (`complexId`) REFERENCES `APARTMENT_COMPLEX` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
