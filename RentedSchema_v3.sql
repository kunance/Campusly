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
-- Table structure for table `apartment_complex`
--

DROP TABLE IF EXISTS `apartment_complex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment_complex` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `"streetNumeric"` int(5) NOT NULL,
  `"streetAddress"` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
  `"distanceToUniv"` float(3,2) DEFAULT NULL COMMENT 'calculate with google maps api',
  `"petsAllowed"` tinyint(1) NOT NULL DEFAULT '0',
  `"dogsAllowed"` tinyint(1) NOT NULL DEFAULT '0',
  `"catsAllowed"` tinyint(1) NOT NULL DEFAULT '0',
  `"othersAllowed"` tinyint(1) NOT NULL DEFAULT '0',
  `"dogQtyAllowed"` int(3) unsigned DEFAULT '0',
  `"catQtyAllowed"` int(3) unsigned DEFAULT '0',
  `"otherQtyAllowed"` int(3) unsigned DEFAULT '0',
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
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
  `"complexId"` int(10) unsigned NOT NULL,
  `bedrooms` int(1) unsigned NOT NULL,
  `bathrooms` int(1) unsigned NOT NULL DEFAULT '1',
  `parking` int(1) unsigned NOT NULL DEFAULT '0',
  `living_area` int(4) unsigned NOT NULL COMMENT 'SQUARE FEET',
  `washer_dryer` tinyint(1) NOT NULL DEFAULT '0',
  `"createdAt"``"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"deletedAt"``"updatedAt"` datetime DEFAULT NULL,
  `"streetNumeric"``"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `"aptComplexFloorPlan_complex_idx"` (`"complexId"`),
  CONSTRAINT `"aptComplexFloorPlan_complexId"` FOREIGN KEY (`"complexId"`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"complexId"` int(10) unsigned NOT NULL,
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `"aptComplexImage_complex_idx"` (`"complexId"`),
  CONSTRAINT `"aptComplexImage_complexId"` FOREIGN KEY (`"complexId"`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"complexId"` int(10) unsigned NOT NULL,
  `"shuttleRoute"` varchar(255) NOT NULL,
  `busLine` int(10) unsigned NOT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `"aptComplexTrans_complex_idx"` (`"complexId"`),
  CONSTRAINT `"aptComplexTrans_complexId"` FOREIGN KEY (`"complexId"`) REFERENCES `apartment_complex` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `"userId"` int(10) unsigned NOT NULL,
  `"friendId"` int(10) unsigned NOT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `friend_user_idx` (`"userId"`),
  KEY `friend_friend_idx` (`"friendId"`),
  CONSTRAINT `"friend_friendId"` FOREIGN KEY (`"friendId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `friend_user` FOREIGN KEY (`"userId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"firstName"` varchar(45) NOT NULL,
  `"lastName"` varchar(45) NOT NULL,
  `"invitorId"` int(10) unsigned NOT NULL COMMENT 'Ideally, this could be a userId or propertyMgmtCo id but relation doesn’t support plymorphic associations so just have it as userId for now',
  `roommate` tinyint(1) DEFAULT NULL COMMENT 'current roommate of invitor',
  `email` varchar(45) DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitee_invitor_idx` (`"invitorId"`),
  CONSTRAINT `"invitee_invitorId"` FOREIGN KEY (`"invitorId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"maxMonthlyRent"` int(5) NOT NULL,
  `"utilitiesIncluded"` tinyint(1) NOT NULL,
  `area` varchar(30) DEFAULT NULL COMMENT 'an area from a fixed list of cities or regions',
  `"distanceToUniv"` float(3,2) DEFAULT NULL COMMENT 'in miles',
  `"moveInDate"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"lengthOfStay"` int(3) unsigned DEFAULT NULL COMMENT 'in months',
  `"openToFullYearLeaseNewRoomates"` tinyint(1) DEFAULT NULL,
  `"roomType"` enum('single','double', 'living room') DEFAULT NULL,
  `"sharedBathroom"` tinyint(1) DEFAULT NULL,
  `gender` enum('no preference','male only','female only') NOT NULL DEFAULT 'no preference',
  `"numRoommates"` int(2) unsigned DEFAULT NULL,
  `furnished` tinyint(1) DEFAULT NULL,
  `"busRouteRequired"` tinyint(1) DEFAULT NULL,
  `"parkingNeeded"` tinyint(1) DEFAULT NULL,
  `"smokingAllowed"` tinyint(1) DEFAULT NULL,
  `"petsAllowed"` tinyint(1) DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
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
  `"userId"` int(10) unsigned NOT NULL,
  `type` enum('cat','dog','bird','fish','other') NOT NULL,
  `breed` varchar(45) NOT NULL,
  `"weightLbs"` int(10) unsigned DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pets_user_idx` (`"userId"`),
  CONSTRAINT `pets_user` FOREIGN KEY (`"userId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property`   TODO add FK to apt complex DEFAULT is null
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `"streetNumeric"` int(5) NOT NULL,
  `"streetAddress"` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `bldg` varchar(10) DEFAULT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
  `type` enum('apt','sfh','townhouse') DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '100 words or less',
  `bedrooms` int(1) unsigned DEFAULT NULL,
  `bathrooms` int(1) unsigned DEFAULT NULL,
  `"parkingSpots"` int(1) unsigned DEFAULT NULL,
  `"livingAreaSqFt"` int(5) unsigned DEFAULT NULL,
  `"hoaFee"` int(4) DEFAULT NULL,
  `"otherFee"` int(4) DEFAULT NULL,
  `status` enum('avail','pending','rented') DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
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
  `"listingId"` int(10) unsigned DEFAULT NULL COMMENT 'listing image may not exist for each property image',
  `"propertyId"` int(10) unsigned NOT NULL COMMENT 'if we decide to have listing images different from property images then create listing image table',
  `location` varchar(255) NOT NULL COMMENT 'location on storage like S3 or cloudfront',
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyimages_property_idx` (`"propertyId"`),
  KEY `propertyimages_listing_idx` (`"listingId"`),
  CONSTRAINT `propertyimages_listing` FOREIGN KEY (`"listingId"`) REFERENCES `property_listing` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyimages_property` FOREIGN KEY (`"propertyId"`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_likes`
--

DROP TABLE IF EXISTS `property_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_likes` (
  `"propertyId"` int(10) unsigned NOT NULL,
  `"userId"` int(10) unsigned NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertylikes_property_idx` (`"propertyId"`),
  KEY `propertylikes_user_idx` (`"userId"`),
  CONSTRAINT `propertylikes_property` FOREIGN KEY (`"propertyId"`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertylikes_user` FOREIGN KEY (`"userId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `room_listing`
--

DROP TABLE IF EXISTS `room_listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room_listing` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `"propertyId"` int(10) unsigned NOT NULL,
  `"creatorId"` int(10) unsigned NOT NULL,
  `"monthlyPrice"` float(5,2) NOT NULL,
  `"securityDeposit"` float(5,2) DEFAULT '0.00',
  `"availableMoveIn"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"leaseEndDate"` datetime DEFAULT NULL,
  `"leaseType"` enum('sub-lease','month-to-month','lease take over') NOT NULL,
  `gender` enum('no preference','male only','female only') NOT NULL DEFAULT 'no preference',
  `"monthlyUtilityCost"` int(4) NOT NULL COMMENT 'utility cost per room',
  `"roomType"` enum('single','double','loft','living room') NOT NULL,
  `"sharedBathroom"` tinyint(1) DEFAULT NULL,
  `"numRoomates"` int(3) unsigned NOT NULL,
  `furnished` tinyint(1) DEFAULT NULL COMMENT 'furnished room',
  `"parkingAvailable"` tinyint(1) DEFAULT NULL COMMENT 'not always the same as the property having parking',
  `"smokingAllowed"` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomlisting_property_idx` (`"propertyId"`),
  KEY `roomlisting_user_idx` (`"creatorId"`),
  CONSTRAINT `roomlisting_property` FOREIGN KEY (`"propertyId"`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `roomlisting_user` FOREIGN KEY (`"creatorId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `property_owner`
--

DROP TABLE IF EXISTS `property_owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `property_owner` (
  `"propertyOwnershipId"` int(10) unsigned NOT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`"propertyOwnershipId"`,`ownerId`),
  KEY `propertyowner_user_idx` (`ownerId`),
  CONSTRAINT `"propertyOwnershipFK"` FOREIGN KEY (`"propertyOwnershipId"`) REFERENCES `property_ownership` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `propertyowner_user` FOREIGN KEY (`ownerId`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"confirmedEmail"` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(128) NOT NULL,
  `"firstName"` varchar(50) NOT NULL,
  `"lastName"` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `"aboutMe"` varchar(255) DEFAULT NULL,
  `"universityId"` tinyint(1) NOT NULL,
  `phone` int(10) DEFAULT NULL COMMENT 'supporting only US number only',
  `"profileImage"` varchar(255) DEFAULT NULL COMMENT 'location on storage like S3 or cloudfront   put a defaut image value here after its on S3',
  `twitter` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `googleplus` varchar(45) DEFAULT NULL,
  `linkedin` varchar(45) DEFAULT NULL,
  `"experianIdToken"` varchar(255) DEFAULT NULL,
  `"creditCheckToken"` varchar(255) DEFAULT NULL,
  `"runIdentityCheck"` tinyint(1) NOT NULL DEFAULT '0',
  `"shareCreditReport"` tinyint(1) NOT NULL DEFAULT '0',
  `"identityDate"` datetime DEFAULT NULL,
  `"creditReportDate"` datetime DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  `role` VARCHAR(45) NULL DEFAULT 'user',
  `provider` VARCHAR(64) NULL,
  `"facebookOAuthId"` VARCHAR(64) NULL,
  `"googleOAuthId"` VARCHAR(64) NULL,
  `"twitterOAuthId"` VARCHAR(64) NULL,
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
  `"userId"` int(10) unsigned NOT NULL,
  `"roommateId"` int(10) unsigned NOT NULL,
  `"fromDate"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"toDate"` datetime DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roommate_user_idx` (`"userId"`),
  KEY `roommate_roomie_idx` (`"roommateId"`),
  CONSTRAINT `"roommate_rommieId"` FOREIGN KEY (`"roommateId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `roommate_user` FOREIGN KEY (`"userId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"academicYearType"` enum('quarter','semester') DEFAULT 'semester',
  `"streetNumeric"` int(5) NOT NULL,
  `"streetAddress"` varchar(255) NOT NULL,
  `apt` varchar(6) DEFAULT NULL,
  `city` varchar(30) NOT NULL COMMENT 'longest city name in US is 22',
  `state` varchar(2) NOT NULL,
  `zip` int(5) unsigned NOT NULL,
  `latitude` decimal(10, 8),
  `longitude` decimal(11, 8),
  `"startDate"` datetime NOT NULL,
  `"endDate"` datetime DEFAULT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
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
  `"universityId"` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `"fallQuaterStartDate"` datetime NOT NULL,
  `"fallQuaterEndDate"` datetime NOT NULL,
  `"winterQuaterStartDate"` datetime NOT NULL,
  `"winterQuaterEndDate"` datetime NOT NULL,
  `"springQuaterStartDate"` datetime NOT NULL,
  `"springQuaterEndDate"` datetime NOT NULL,
  `"summerQuaterStartDate"` datetime NOT NULL,
  `"summerQuaterEndDate"` datetime NOT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalquarter_university_idx` (`"universityId"`),
  CONSTRAINT `univcalquarter_university` FOREIGN KEY (`"universityId"`) REFERENCES `university` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"universityId"` int(10) unsigned NOT NULL,
  `year` int(4) NOT NULL,
  `"fallSemesterStartDate"` datetime NOT NULL,
  `"fallSemesterEndDate"` datetime NOT NULL,
  `"springSemesterStartDate"` datetime NOT NULL,
  `"springSemesterEndDate"` datetime NOT NULL,
  `"summerSemesterStartDate"` datetime NOT NULL,
  `"summerSemesterEndDate"` datetime NOT NULL,
  `"createdAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `univcalsemester_university_idx` (`"universityId"`),
  CONSTRAINT `univcalsemester_university` FOREIGN KEY (`"universityId"`) REFERENCES `university` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `"licensePlate"` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `"userId"` int(10) unsigned DEFAULT NULL,
  `"createdAt"``"createdAt"``"updatedAt"` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `"updatedAt"` datetime DEFAULT NULL,
  `"deletedAt"` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uservehicles_user_idx` (`"userId"`),
  CONSTRAINT `uservehicles_user` FOREIGN KEY (`"userId"`) REFERENCES `rented_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE OR REPLACE VIEW `room_listing_view` AS (
	SELECT  p.`"streetNumeric"`, p.`"streetAddress"`, p.city, p.state,  p.zip,  p.apt,  p.bldg,  p.type,  p.bedrooms,  p.bathrooms,  rl.* FROM PROPERTY p, room_listing rl
    WHERE rl.`"propertyId"` = p.id );
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
