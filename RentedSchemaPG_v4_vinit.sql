CREATE TABLE apartment_complex (
	"id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	""streetNumeric"" int NOT NULL,
	""streetAddress"" varchar(255) NOT NULL,
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	latitude numeric(10,8),
	longitude numeric(11,8),
	""distanceToUniv"" float,
	""petsAllowed"" int NOT NULL,
	""dogsAllowed"" int NOT NULL,
	""catsAllowed"" int NOT NULL,
	""othersAllowed"" int NOT NULL,
	""dogQtyAllowed"" int,
	""catQtyAllowed"" int,
	""otherQtyAllowed"" int,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_floor_plan (
	"id" int NOT NULL,
	""complexId"" int NOT NULL,
	bedrooms int NOT NULL,
	bathrooms int NOT NULL,
	parking int NOT NULL,
	living_area int NOT NULL,
	washer_dryer int NOT NULL,
	""createdAt"`"createdAt"" timestamp NOT NULL,
	""deletedAt"`"updatedAt"" timestamp,
	""streetNumeric"`"deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_image (
	"id" int NOT NULL,
	""complexId"" int NOT NULL,
	"location" varchar(255) NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_transportation (
	"id" int NOT NULL,
	""complexId"" int NOT NULL,
	""shuttleRoute"" varchar(255) NOT NULL,
	busLine int NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE friend (
	"id" int NOT NULL,
	""userId"" int NOT NULL,
	""friendId"" int NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE invitee (
	"id" int NOT NULL,
	""firstName"" varchar(45) NOT NULL,
	""lastName"" varchar(45) NOT NULL,
	""invitorId"" int NOT NULL,
	roommate int,
	email varchar(45),
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE looking (
	"id" int NOT NULL,
	""maxMonthlyRent"" int NOT NULL,
	""utilitiesIncluded"" int NOT NULL,
	area varchar(30),
	""distanceToUniv"" float,
	""moveInDate"" timestamp NOT NULL,
	""lengthOfStay"" int,
	""openToFullYearLeaseNewRoomates"" int,
	""roomType"" varchar(250),
	""sharedBathroom"" int,
	gender varchar(250) NOT NULL,
	""numRoommates"" int,
	furnished int,
	""busRouteRequired"" int,
	""parkingNeeded"" int,
	""smokingAllowed"" int,
	""petsAllowed"" int,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE pet (
	"id" int NOT NULL,
	""userId"" int NOT NULL,
	"type" varchar(250) NOT NULL,
	breed varchar(45) NOT NULL,
	""weightLbs"" int,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property (
	"id" int NOT NULL,
	""streetNumeric"" int NOT NULL,
	""streetAddress"" varchar(255) NOT NULL,
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	apt varchar(6),
	bldg varchar(10),
	latitude numeric(10,8),
	longitude numeric(11,8),
	"type" varchar(250),
	description varchar(255),
	bedrooms int,
	bathrooms int,
	""parkingSpots"" int,
	""livingAreaSqFt"" int,
	""hoaFee"" int,
	""otherFee"" int,
	status varchar(250),
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_images (
	"id" int NOT NULL,
	""listingId"" int,
	""propertyId"" int NOT NULL,
	"location" varchar(255) NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_likes (
	""propertyId"" int NOT NULL,
	""userId"" int NOT NULL,
	"id" int NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_owner (
	""propertyOwnershipId"" int NOT NULL,
	ownerId int NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY (""propertyOwnershipId"",ownerId)
);
CREATE TABLE rented_user (
	"id" int NOT NULL,
	username varchar(50),
	email varchar(255) NOT NULL,
	""confirmedEmail"" int NOT NULL,
	"password" varchar(128) NOT NULL,
	""firstName"" varchar(50) NOT NULL,
	""lastName"" varchar(50) NOT NULL,
	middlename varchar(50),
	""aboutMe"" varchar(255),
	""universityId"" int NOT NULL,
	phone int,
	""profileImage"" varchar(255),
	twitter varchar(45),
	facebook varchar(45),
	googleplus varchar(45),
	linkedin varchar(45),
	""experianIdToken"" varchar(255),
	""creditCheckToken"" varchar(255),
	""runIdentityCheck"" int NOT NULL,
	""shareCreditReport"" int NOT NULL,
	""identityDate"" timestamp,
	""creditReportDate"" timestamp,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	"role" varchar(45),
	provider varchar(64),
	""facebookOAuthId"" varchar(64),
	""googleOAuthId"" varchar(64),
	""twitterOAuthId"" varchar(64),
	salt varchar(128) NOT NULL,
	PRIMARY KEY ("id")
);
CREATE TABLE room_listing (
	"id" int NOT NULL,
	""propertyId"" int NOT NULL,
	""creatorId"" int NOT NULL,
	""monthlyPrice"" float NOT NULL,
	""securityDeposit"" float,
	""availableMoveIn"" timestamp NOT NULL,
	""leaseEndDate"" timestamp,
	""leaseType"" varchar(250) NOT NULL,
	gender varchar(250) NOT NULL,
	""monthlyUtilityCost"" int NOT NULL,
	""roomType"" varchar(250) NOT NULL,
	""sharedBathroom"" int,
	""numRoomates"" int NOT NULL,
	furnished int,
	""parkingAvailable"" int,
	""smokingAllowed"" int,
	description varchar(255),
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE roommate (
	"id" int NOT NULL,
	""userId"" int NOT NULL,
	""roommateId"" int NOT NULL,
	""fromDate"" timestamp NOT NULL,
	""toDate"" timestamp,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE university (
	"id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	""academicYearType"" varchar(250),
	""streetNumeric"" int NOT NULL,
	""streetAddress"" varchar(255) NOT NULL,
	apt varchar(6),
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	latitude numeric(10,8),
	longitude numeric(11,8),
	""startDate"" timestamp NOT NULL,
	""endDate"" timestamp,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE university_calender_quater (
	"id" int NOT NULL,
	""universityId"" int NOT NULL,
	"year" int NOT NULL,
	""fallQuaterStartDate"" timestamp NOT NULL,
	""fallQuaterEndDate"" timestamp NOT NULL,
	""winterQuaterStartDate"" timestamp NOT NULL,
	""winterQuaterEndDate"" timestamp NOT NULL,
	""springQuaterStartDate"" timestamp NOT NULL,
	""springQuaterEndDate"" timestamp NOT NULL,
	""summerQuaterStartDate"" timestamp NOT NULL,
	""summerQuaterEndDate"" timestamp NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE university_calender_semester (
	"id" int NOT NULL,
	""universityId"" int NOT NULL,
	"year" int NOT NULL,
	""fallSemesterStartDate"" timestamp NOT NULL,
	""fallSemesterEndDate"" timestamp NOT NULL,
	""springSemesterStartDate"" timestamp NOT NULL,
	""springSemesterEndDate"" timestamp NOT NULL,
	""summerSemesterStartDate"" timestamp NOT NULL,
	""summerSemesterEndDate"" timestamp NOT NULL,
	""createdAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_vehicle (
	"id" int NOT NULL,
	"year" int NOT NULL,
	make varchar(45) NOT NULL,
	model varchar(45) NOT NULL,
	""licensePlate"" varchar(45) NOT NULL,
	color varchar(45) NOT NULL,
	""userId"" int,
	""createdAt"`"createdAt"`"updatedAt"" timestamp NOT NULL,
	""updatedAt"" timestamp,
	""deletedAt"" timestamp,
	PRIMARY KEY ("id")
);

ALTER TABLE apartment_complex_floor_plan
	ADD FOREIGN KEY (""complexId"")
	REFERENCES apartment_complex ("id");


ALTER TABLE apartment_complex_image
	ADD FOREIGN KEY (""complexId"")
	REFERENCES apartment_complex ("id");


ALTER TABLE apartment_complex_transportation
	ADD FOREIGN KEY (""complexId"")
	REFERENCES apartment_complex ("id");


ALTER TABLE friend
	ADD FOREIGN KEY (""userId"")
	REFERENCES rented_user ("id");

ALTER TABLE friend
	ADD FOREIGN KEY (""friendId"")
	REFERENCES rented_user ("id");


ALTER TABLE invitee
	ADD FOREIGN KEY (""invitorId"")
	REFERENCES rented_user ("id");

ALTER TABLE pet
	ADD FOREIGN KEY (""userId"")
	REFERENCES rented_user ("id");


ALTER TABLE property_images
	ADD FOREIGN KEY (""propertyId"")
	REFERENCES property ("id");

ALTER TABLE property_images
	ADD FOREIGN KEY (""listingId"")
	REFERENCES property_listing ("id");

ALTER TABLE property_likes
	ADD FOREIGN KEY (""userId"")
	REFERENCES rented_user ("id");

ALTER TABLE property_likes
	ADD FOREIGN KEY (""propertyId"")
	REFERENCES property ("id");

ALTER TABLE property_owner
	ADD FOREIGN KEY (""propertyOwnershipId"")
	REFERENCES property_ownership ("id");

ALTER TABLE room_listing
	ADD FOREIGN KEY (""creatorId"")
	REFERENCES rented_user ("id");

ALTER TABLE room_listing
	ADD FOREIGN KEY (""propertyId"")
	REFERENCES property ("id");

ALTER TABLE roommate
	ADD FOREIGN KEY (""userId"")
	REFERENCES rented_user ("id");

ALTER TABLE roommate
	ADD FOREIGN KEY (""roommateId"")
	REFERENCES rented_user ("id");


ALTER TABLE university_calender_quater
	ADD FOREIGN KEY (""universityId"")
	REFERENCES university ("id");


ALTER TABLE university_calender_semester
	ADD FOREIGN KEY (""universityId"")
	REFERENCES university ("id");

ALTER TABLE user_vehicle
	ADD FOREIGN KEY (""userId"")
	REFERENCES rented_user ("id");

INSERT INTO rented_user("id", username, email, ""confirmedEmail"", "password", ""firstName"", ""lastName"", middlename, ""aboutMe"", phone, ""profileImage"", twitter, facebook, googleplus, linkedin, ""experianIdToken"", ""creditCheckToken"", ""runIdentityCheck"", ""shareCreditReport"", ""identityDate"", ""creditReportDate"", ""createdAt"", ""updatedAt"", ""deletedAt"", "role", provider, ""facebookOAuthId"", ""googleOAuthId"", ""twitterOAuthId"", salt) VALUES (23, null, 'john@rented.co', 0, 'MQaMWu+2yhSKBHwaaeNNK/ZASOodBSu/Moc0AFCHRHv4HGbxiHM+IQ5EtVxvFjeMzbuqbwKGv5EsYUzX4hl4ZQ==', 'John', 'Raber', null, null, null, null, null, null, null, null, null, null, 0, 0, null, null, '2015-02-25 00:44:56', '2015-02-25 00:44:56', null, 'user', 'local', null, null, null, 'dF/GQy+R5AQw8h5m9lUcKg==');

CREATE OR REPLACE VIEW room_listing_view AS
	SELECT  p.""streetNumeric"", p.""streetAddress"", p.city, p.state,  p.zip,  p.apt,  p.bldg,  p.type,  p.bedrooms,  p.bathrooms,  rl.* FROM PROPERTY p, room_listing rl
    WHERE rl.""propertyId"" = p.id;
