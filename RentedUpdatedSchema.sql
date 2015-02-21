CREATE DATABASE  IF NOT EXISTS `Rented` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Rented`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rented
-- ------------------------------------------------------
-- Server version	5.6.21-log

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
-- Table structure for table `address_history`
--

DROP TABLE IF EXISTS `address_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
/*changed it from `id` int(10) unsigned NOT NULL DEFAULT '0', to:*/;
CREATE TABLE `address_history` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `userId` int(10) unsigned DEFAULT NULL,
  `aboutMe` varchar(255) DEFAULT NULL,
  `present` tinyint(1) unsigned DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresshistory_user_idx` (`userId`),
  CONSTRAINT `addresshistory_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `apartment_complex`
--

DROP TABLE IF EXISTS `apartment_complex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment_complex` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
  `distanceToUniv` float(3,2) DEFAULT NULL COMMENT 'calculate with google maps api',
  `petsAllowed` tinyint(1) NOT NULL DEFAULT '0',
  `dogsAllowed` tinyint(1) NOT NULL DEFAULT '0',
  `catsAllowed` tinyint(1) NOT NULL DEFAULT '0',
  `othersAllowed` tinyint(1) NOT NULL DEFAULT '0',
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
-- Table structure for table `apartment_complex_floor_plan`
--

DROP TABLE IF EXISTS `apartment_complex_floor_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment_complex_floor_plan` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `aptComplexFloorPlan_complexId` FOREIGN KEY (`complexId`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `apartment_complex_image`
--

DROP TABLE IF EXISTS `apartment_complex_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment_complex_image` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `complexId` int(10) unsigned NOT NULL,
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aptComplexImage_complex_idx` (`complexId`),
  CONSTRAINT `aptComplexImage_complexId` FOREIGN KEY (`complexId`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `apartment_complex_transportation`
--

DROP TABLE IF EXISTS `apartment_complex_transportation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment_complex_transportation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `complexId` int(10) unsigned NOT NULL,
  `shuttleRoute` varchar(255) NOT NULL,
  `busLine` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aptComplexTrans_complex_idx` (`complexId`),
  CONSTRAINT `aptComplexTrans_complexId` FOREIGN KEY (`complexId`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `friendId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_user_idx` (`userId`),
  KEY `friend_friend_idx` (`friendId`),
  CONSTRAINT `friend_friendId` FOREIGN KEY (`friendId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `friend_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `invitee`
--

DROP TABLE IF EXISTS `invitee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invitee` (
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
  `viewPropertyId` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitee_invitor_idx` (`invitorId`),
  KEY `invitee_viewproperty_idx` (`viewPropertyId`),
  CONSTRAINT `invitee_invitorId` FOREIGN KEY (`invitorId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `invitee_viewpropertyId` FOREIGN KEY (`viewPropertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lease`
--

DROP TABLE IF EXISTS `lease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lease` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `propertyId` int(10) unsigned NOT NULL,
  `approved` tinyint(1) DEFAULT NULL COMMENT 'Default value is NULL so you know that it hasn’t been approved or rejected yet',
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `paymentAmount` float(5,2) NOT NULL,
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
  CONSTRAINT `propertyId` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lessee`
--

DROP TABLE IF EXISTS `lessee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lessee` (
  `leaseId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`leaseId`,`userId`),
  KEY `leaseId_idx` (`leaseId`),
  KEY `lessee_user_idx` (`userId`),
  CONSTRAINT `leaseId` FOREIGN KEY (`leaseId`) REFERENCES `lease` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lessee_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `looking`
--

DROP TABLE IF EXISTS `looking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `looking` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `maxMonthlyRent` int(5) NOT NULL,
  `utilitiesIncluded` tinyint(1) NOT NULL,
  `area` varchar(30) DEFAULT NULL COMMENT 'an area from a fixed list of cities or regions',
  `distanceToUniv` float(3,2) DEFAULT NULL COMMENT 'in miles',
  `moveInDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lengthOfStay` int(3) unsigned DEFAULT NULL COMMENT 'in months',
  `longTermIntention` tinyint(1) DEFAULT NULL,
  `openToFullYearLeaseNewRoomates` tinyint(1) DEFAULT NULL,
  `roomType` enum('single','double','triple','loft','living room') DEFAULT NULL,
  `sharedBathroom` tinyint(1) DEFAULT NULL,
  `gender` enum('no preference','male preferred','female preferred','male only','female only') NOT NULL DEFAULT 'no preference',
  `numRoommates` int(2) unsigned DEFAULT NULL,
  `furnished` tinyint(1) DEFAULT NULL,
  `busRouteRequired` tinyint(1) DEFAULT NULL,
  `parkingNeeded` tinyint(1) DEFAULT NULL,
  `smokingAllowed` tinyint(1) DEFAULT NULL,
  `petsAllowed` tinyint(1) DEFAULT NULL,
  `coupleAllowed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `payerId` int(10) unsigned NOT NULL,
  `payeeId` int(10) unsigned NOT NULL,
  `dollarAmount` float(5,2) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `rentPayment` tinyint(1) DEFAULT '0',
  `creditCheckPayment` tinyint(1) DEFAULT '0',
  `paymentForm` enum('credit card','ACH','cash') DEFAULT NULL,
  `paymentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_payer_idx` (`payerId`),
  KEY `payment_payee_idx` (`payeeId`),
  CONSTRAINT `payment_payee` FOREIGN KEY (`payeeId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `payment_payer` FOREIGN KEY (`payerId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pet` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `type` enum('cat','dog','bird','fish','other') NOT NULL,
  `breed` varchar(45) NOT NULL,
  `weightLbs` int(10) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pets_user_idx` (`userId`),
  CONSTRAINT `pets_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `bldg` varchar(10) DEFAULT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
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
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `listingId` int(10) unsigned DEFAULT NULL COMMENT 'listing image may not exist for each property image',
  `propertyId` int(10) unsigned NOT NULL COMMENT 'if we decide to have listing images different from property images then create listing image table',
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyimages_property_idx` (`propertyId`),
  KEY `propertyimages_listing_idx` (`listingId`),
  CONSTRAINT `propertyimages_listing` FOREIGN KEY (`listingId`) REFERENCES `propertylisting` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyimages_property` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_lease_defaults`
--

DROP TABLE IF EXISTS `property_lease_defaults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_lease_defaults` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `propertyleasedefaults_owner` FOREIGN KEY (`ownerId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyleasedefaults_property` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_likes`
--

DROP TABLE IF EXISTS `property_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_likes` (
  `propertyId` int(10) unsigned NOT NULL,
  `userId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertylikes_property_idx` (`propertyId`),
  KEY `propertylikes_user_idx` (`userId`),
  CONSTRAINT `propertylikes_property` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertylikes_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_listing`
--

DROP TABLE IF EXISTS `property_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_listing` (
  `propertyId` int(10) unsigned NOT NULL,
  `monthlyPrice` float(5,2) NOT NULL,
  `securityDeposit` float(5,2) DEFAULT '0.00',
  `petDeposit` float(4,2) DEFAULT '0.00',
  `availableMoveIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `leaseEndDate` datetime DEFAULT NULL,
  `leaseLength` int(3) unsigned NOT NULL,
  `leaseLengthUnit` enum('day','week','month','year') NOT NULL,
  `leaseType` enum('sub-lease','month-to-month','regular') NOT NULL,
  `gender` enum('no preference','male preferred','female preferred','male only','female only') NOT NULL DEFAULT 'no preference',
  `totalUtilityCost` int(4) NOT NULL,
  `roomType` enum('single','double','triple','loft','living room') NOT NULL,
  `sharedBathroom` tinyint(1) DEFAULT NULL,
  `numRoomates` int(3) unsigned NOT NULL,
  `furnished` tinyint(1) DEFAULT NULL,
  `parkingAvailable` tinyint(1) DEFAULT NULL,
  `smokingAllowed` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('available','rental pending','rented') DEFAULT 'available',
  `contactPhone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
  `contactEmail` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertylisting_property_idx` (`propertyId`),
  CONSTRAINT `propertylisting_property` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_owner`
--

DROP TABLE IF EXISTS `property_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_owner` (
  `propertyOwnershipId` int(10) unsigned NOT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`propertyOwnershipId`,`ownerId`),
  KEY `propertyowner_user_idx` (`ownerId`),
  CONSTRAINT `propertyOwnershipFK` FOREIGN KEY (`propertyOwnershipId`) REFERENCES `property_ownership` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyowner_user` FOREIGN KEY (`ownerId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_ownership`
--

DROP TABLE IF EXISTS `property_ownership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_ownership` (
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` datetime NOT NULL,
  `propertyFK` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_idx` (`propertyFK`),
  KEY `propTime` (`startDate`,`endDate`,`propertyFK`),
  CONSTRAINT `propertyFK` FOREIGN KEY (`propertyFK`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rental_applicant`
--

DROP TABLE IF EXISTS `rental_applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rental_applicant` (
  `userId` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rentalAppId` int(10) unsigned NOT NULL,
  `shareCredit` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rentalAppId_idx` (`rentalAppId`),
  KEY `rentalapplicant_user_idx` (`userId`),
  CONSTRAINT `rentalAppId` FOREIGN KEY (`rentalAppId`) REFERENCES `rentalapplication` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `rentalapplicant_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rental_application`
--

DROP TABLE IF EXISTS `rental_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rental_application` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `propFK` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rented_user`
--

DROP TABLE IF EXISTS `rented_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rented_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `confirmedEmail` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(128) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `aboutMe` varchar(255) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
  `userImage` varchar(255) DEFAULT NULL COMMENT 'location on storage like S3 or cloudfront   put a defaut image value here after its on S3',
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
  `role` VARCHAR(45) NULL DEFAULT 'user',
  `provider` VARCHAR(64) NULL,
  `facebookOAuthId` VARCHAR(64) NULL,
  `googleOAuthId` VARCHAR(64) NULL,
  `twitterOAuthId` VARCHAR(64) NULL,
  `salt` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roommate`
--

DROP TABLE IF EXISTS `roommate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roommate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `roommateId` int(10) unsigned NOT NULL,
  `fromDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `toDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roommate_user_idx` (`userId`),
  KEY `roommate_roomie_idx` (`roommateId`),
  CONSTRAINT `roommate_rommieId` FOREIGN KEY (`roommateId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `roommate_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `Street` varchar(50) NOT NULL,
  `city` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `academicYearType` enum('quarter','semester') DEFAULT 'semester',
  `streetNumeric` int(5) NOT NULL,
  `streetAddress` varchar(255) NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
  `startDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `university_calender_quater`
--

DROP TABLE IF EXISTS `university_calender_quater`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_calender_quater` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `universityId` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `fallQuaterStartDate` datetime NOT NULL,
  `fallQuaterEndDate` datetime NOT NULL,
  `winterQuaterStartDate` datetime NOT NULL,
  `winterQuaterEndDate` datetime NOT NULL,
  `springQuaterStartDate` datetime NOT NULL,
  `springQuaterEndDate` datetime NOT NULL,
  `summerQuaterStartDate` datetime NOT NULL,
  `summerQuaterEndDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalquarter_university_idx` (`universityId`),
  CONSTRAINT `univcalquarter_university` FOREIGN KEY (`universityId`) REFERENCES `university` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `university_calender_semester`
--

DROP TABLE IF EXISTS `university_calender_semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `university_calender_semester` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `universityId` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `fallSemesterStartDate` datetime NOT NULL,
  `fallSemesterEndDate` datetime NOT NULL,
  `springSemesterStartDate` datetime NOT NULL,
  `springSemesterEndDate` datetime NOT NULL,
  `summerSemesterStartDate` datetime NOT NULL,
  `summerSemesterEndDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalsemester_university_idx` (`universityId`),
  CONSTRAINT `univcalsemester_university` FOREIGN KEY (`universityId`) REFERENCES `university` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_cosigner`
--

DROP TABLE IF EXISTS `user_cosigner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_cosigner` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cosingeeId` int(10) unsigned NOT NULL,
  `cosginerId` int(10) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usercosigner_cosingee_idx` (`cosingeeId`),
  KEY `usercosigner_cosginer_idx` (`cosginerId`),
  CONSTRAINT `usercosigner_cosginer` FOREIGN KEY (`cosginerId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usercosigner_cosingee` FOREIGN KEY (`cosingeeId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_education`
--

DROP TABLE IF EXISTS `user_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_education` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `usereducation_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_financial`
--

DROP TABLE IF EXISTS `user_financial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_financial` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `userfinancials_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_occupation`
--

DROP TABLE IF EXISTS `user_occupation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_occupation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `useroccupation_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_recommendation`
--

DROP TABLE IF EXISTS `user_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_recommendation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `userrecommendations_recommended` FOREIGN KEY (`recommendedId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userrecommendations_recommendor` FOREIGN KEY (`recommendorId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_reference`
--

DROP TABLE IF EXISTS `user_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_reference` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `userreferences_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_vehicle`
--

DROP TABLE IF EXISTS `user_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_vehicle` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  CONSTRAINT `uservehicles_user` FOREIGN KEY (`userId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `facebookUserId` int(11) DEFAULT NULL,
  `twitterUserId` int(11) DEFAULT NULL,
  `twitterKey` varchar(255) DEFAULT NULL,
  `twitterSecret` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `openId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'rented'
--

--
-- Dumping routines for database 'rented'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-03 14:36:12
