set schema 'rented';

CREATE TABLE address_history (
	"id" int NOT NULL,
	streetNumeric int NOT NULL,
	streetAddress varchar(255) NOT NULL,
	apt varchar(6),
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	startDate timestamp NOT NULL,
	endDate timestamp,
	userId int,
	aboutMe varchar(255),
	present int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex (
	"id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	streetNumeric int NOT NULL,
	streetAddress varchar(255) NOT NULL,
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	latitude numeric(10,8),
	longitude numeric(11,8),
	distanceToUniv float,
	petsAllowed int NOT NULL,
	dogsAllowed int NOT NULL,
	catsAllowed int NOT NULL,
	othersAllowed int NOT NULL,
	dogQtyAllowed int,
	catQtyAllowed int,
	otherQtyAllowed int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_floor_plan (
	"id" int NOT NULL,
	complexId int NOT NULL,
	bedrooms int NOT NULL,
	bathrooms int NOT NULL,
	parking int NOT NULL,
	living_area int NOT NULL,
	washer_dryer int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_image (
	"id" int NOT NULL,
	complexId int NOT NULL,
	"location" varchar(255) NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE apartment_complex_transportation (
	"id" int NOT NULL,
	complexId int NOT NULL,
	shuttleRoute varchar(255) NOT NULL,
	busLine int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE articles (
	"id" int NOT NULL,
	title varchar(255),
	"content" text,
	createdAt timestamp NOT NULL,
	updatedAt timestamp NOT NULL,
	UserId int,
	PRIMARY KEY ("id")
);
CREATE TABLE friend (
	"id" int NOT NULL,
	userId int NOT NULL,
	friendId int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE invitee (
	"id" int NOT NULL,
	firstName varchar(45) NOT NULL,
	lastName varchar(45) NOT NULL,
	invitorId int NOT NULL,
	email varchar(45),
	phone int,
	facebook varchar(45),
	twitter varchar(45),
	googlePlus varchar(45),
	linkedIn varchar(45),
	viewProperty int,
	viewPropertyId int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE lease (
	"id" int NOT NULL,
	propertyId int NOT NULL,
	approved int,
	startDate timestamp NOT NULL,
	endDate timestamp NOT NULL,
	paymentAmount float NOT NULL,
	paymentInterval varchar(250) NOT NULL,
	securityDeposit float,
	petDeposit float,
	payee varchar(45),
	built timestamp,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE lessee (
	leaseId int NOT NULL,
	userId int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY (leaseId,userId)
);
CREATE TABLE looking (
	"id" int NOT NULL,
	maxMonthlyRent int NOT NULL,
	utilitiesIncluded int NOT NULL,
	area varchar(30),
	distanceToUniv float,
	moveInDate timestamp NOT NULL,
	lengthOfStay int,
	longTermIntention int,
	openToFullYearLeaseNewRoomates int,
	roomType varchar(250),
	sharedBathroom int,
	gender varchar(250) NOT NULL,
	numRoommates int,
	furnished int,
	busRouteRequired int,
	parkingNeeded int,
	smokingAllowed int,
	petsAllowed int,
	coupleAllowed int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE payment (
	"id" int NOT NULL,
	payerId int NOT NULL,
	payeeId int NOT NULL,
	dollarAmount float,
	reason varchar(255),
	rentPayment int,
	creditCheckPayment int,
	paymentForm varchar(250),
	paymentDate timestamp NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE pet (
	"id" int NOT NULL,
	userId int NOT NULL,
	"type" varchar(250) NOT NULL,
	breed varchar(45) NOT NULL,
	weightLbs int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property (
	"id" int NOT NULL,
	"streetNumeric" int NOT NULL,
	"streetAddress" varchar(255) NOT NULL,
	"city" varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip" int NOT NULL,
	"apt" varchar(6),
	"bldg" varchar(10),
	latitude numeric(10,8),
	longitude numeric(11,8),
	"type" varchar(250),
	description varchar(255),
	bedrooms int,
	bathrooms int,
	parkingSpots int,
	livingAreaSqFt int,
	hoaFee int,
	otherFee int,
	status varchar(250),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_images (
	"id" int NOT NULL,
	listingId int,
	propertyId int NOT NULL,
	"location" varchar(255) NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_lease_defaults (
	"id" int NOT NULL,
	propertyId int NOT NULL,
	ownerId int NOT NULL,
	qtyDogsAllowed int NOT NULL,
	qtyCatsAllowed int NOT NULL,
	qtyOtherAllowed int NOT NULL,
	animalSizeLimitLbs int NOT NULL,
	fishTankAllowed int NOT NULL,
	preferredLeaseLength int NOT NULL,
	preferredLeaseUnit varchar(250) NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_likes (
	propertyId int NOT NULL,
	userId int NOT NULL,
	"id" int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_listing (
	propertyId int NOT NULL,
	monthlyPrice float NOT NULL,
	securityDeposit float,
	petDeposit float,
	availableMoveIn timestamp NOT NULL,
	"id" int NOT NULL,
	leaseEndDate timestamp,
	leaseLength int NOT NULL,
	leaseLengthUnit varchar(250) NOT NULL,
	leaseType varchar(250) NOT NULL,
	gender varchar(250) NOT NULL,
	totalUtilityCost int NOT NULL,
	roomType varchar(250) NOT NULL,
	sharedBathroom int,
	numRoomates int NOT NULL,
	furnished int,
	parkingAvailable int,
	smokingAllowed int,
	description varchar(255),
	status varchar(250),
	contactPhone int,
	contactEmail varchar(45) NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE property_owner (
	propertyOwnershipId int NOT NULL,
	ownerId int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY (propertyOwnershipId,ownerId)
);
CREATE TABLE property_ownership (
	startDate timestamp NOT NULL,
	endDate timestamp NOT NULL,
	propertyFK int NOT NULL,
	"id" int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE rental_applicant (
	userId int NOT NULL,
	"id" int NOT NULL,
	rentalAppId int NOT NULL,
	shareCredit int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE rental_application (
	"id" int NOT NULL,
	propertyId int NOT NULL,
	preferredLeaseLength int,
	preferredMoveIn timestamp NOT NULL,
	numOccupants int NOT NULL,
	moveReason varchar(255),
	preferredLeaseLengthUnit varchar(250),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE rented_user (
	"id" int NOT NULL,
	username varchar(50),
	email varchar(255) NOT NULL,
	confirmedEmail int NOT NULL,
	"password" varchar(128) NOT NULL,
	firstname varchar(50) NOT NULL,
	lastname varchar(50) NOT NULL,
	middlename varchar(50),
	aboutMe varchar(255),
	phone int,
	profileImage varchar(255),
	twitter varchar(45),
	facebook varchar(45),
	googleplus varchar(45),
	linkedin varchar(45),
	experianIdToken varchar(255),
	creditCheckToken varchar(255),
	runIdentityCheck int NOT NULL,
	shareCreditReport int NOT NULL,
	identityDate timestamp,
	creditReportDate timestamp,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	"role" varchar(45),
	provider varchar(64),
	facebookOAuthId varchar(64),
	googleOAuthId varchar(64),
	twitterOAuthId varchar(64),
	salt varchar(128) NOT NULL,
	PRIMARY KEY ("id")
);
CREATE TABLE room_listing (
	"id" int NOT NULL,
	propertyId int NOT NULL,
	creatorId int NOT NULL,
	monthlyPrice float NOT NULL,
	securityDeposit float,
	availableMoveIn timestamp NOT NULL,
	leaseEndDate timestamp,
	leaseType varchar(250) NOT NULL,
	gender varchar(250) NOT NULL,
	monthlyUtilityCost int NOT NULL,
	roomType varchar(250) NOT NULL,
	sharedBathroom int,
	numRoomates int NOT NULL,
	furnished int,
	parkingAvailable int,
	smokingAllowed int,
	description varchar(255),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE roommate (
	"id" int NOT NULL,
	userId int NOT NULL,
	roommateId int NOT NULL,
	fromDate timestamp NOT NULL,
	toDate timestamp,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE student (
	firstname varchar(30) NOT NULL,
	lastname varchar(30) NOT NULL,
	email varchar(60),
	Street varchar(50) NOT NULL,
	city varchar(40) NOT NULL
);
CREATE TABLE university (
	"id" int NOT NULL,
	"name" varchar(255) NOT NULL,
	academicYearType varchar(250),
	streetNumeric int NOT NULL,
	streetAddress varchar(255) NOT NULL,
	apt varchar(6),
	city varchar(30) NOT NULL,
	"state" varchar(2) NOT NULL,
	zip int NOT NULL,
	latitude numeric(10,8),
	longitude numeric(11,8),
	startDate timestamp NOT NULL,
	endDate timestamp,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE university_calender_quater (
	"id" int NOT NULL,
	universityId int NOT NULL,
	"year" int NOT NULL,
	fallQuaterStartDate timestamp NOT NULL,
	fallQuaterEndDate timestamp NOT NULL,
	winterQuaterStartDate timestamp NOT NULL,
	winterQuaterEndDate timestamp NOT NULL,
	springQuaterStartDate timestamp NOT NULL,
	springQuaterEndDate timestamp NOT NULL,
	summerQuaterStartDate timestamp NOT NULL,
	summerQuaterEndDate timestamp NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE university_calender_semester (
	"id" int NOT NULL,
	universityId int NOT NULL,
	"year" int NOT NULL,
	fallSemesterStartDate timestamp NOT NULL,
	fallSemesterEndDate timestamp NOT NULL,
	springSemesterStartDate timestamp NOT NULL,
	springSemesterEndDate timestamp NOT NULL,
	summerSemesterStartDate timestamp NOT NULL,
	summerSemesterEndDate timestamp NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_cosigner (
	"id" int NOT NULL,
	cosingeeId int NOT NULL,
	cosginerId int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_education (
	"id" int NOT NULL,
	userId int NOT NULL,
	educationCenterName varchar(45) NOT NULL,
	"type" varchar(250),
	startDate timestamp NOT NULL,
	endDate timestamp,
	graduation int NOT NULL,
	graduationDate timestamp,
	major varchar(45),
	degreeType varchar(250),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_financial (
	"id" int NOT NULL,
	userId int NOT NULL,
	startDate timestamp NOT NULL,
	endDate timestamp,
	individualAnnualIncom int,
	householdAnnualIncome int,
	spouseAnnualIncome int,
	incomeProof varchar(255),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_occupation (
	"id" int NOT NULL,
	"role" varchar(45) NOT NULL,
	company varchar(45) NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp,
	presentlyEmployeed int NOT NULL,
	userId int NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_recommendation (
	"id" int NOT NULL,
	recommendedId int NOT NULL,
	recommendorId int NOT NULL,
	recommendedApproved int NOT NULL,
	"content" varchar(255),
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_reference (
	"id" int NOT NULL,
	userId int NOT NULL,
	email varchar(255) NOT NULL,
	phone int NOT NULL,
	firstName varchar(45) NOT NULL,
	lastName varchar(45) NOT NULL,
	relation varchar(250) NOT NULL,
	startDate timestamp NOT NULL,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
CREATE TABLE user_vehicle (
	"id" int NOT NULL,
	"year" int NOT NULL,
	make varchar(45) NOT NULL,
	model varchar(45) NOT NULL,
	licensePlate varchar(45) NOT NULL,
	color varchar(45) NOT NULL,
	userId int,
	createdAt timestamp NOT NULL,
	updatedAt timestamp,
	deletedAt timestamp,
	PRIMARY KEY ("id")
);
ALTER TABLE address_history
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE apartment_complex_floor_plan
	ADD FOREIGN KEY (complexId)
	REFERENCES apartment_complex ("id");


ALTER TABLE apartment_complex_image
	ADD FOREIGN KEY (complexId)
	REFERENCES apartment_complex ("id");


ALTER TABLE apartment_complex_transportation
	ADD FOREIGN KEY (complexId)
	REFERENCES apartment_complex ("id");


ALTER TABLE friend
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

ALTER TABLE friend
	ADD FOREIGN KEY (friendId)
	REFERENCES rented_user ("id");


ALTER TABLE invitee
	ADD FOREIGN KEY (invitorId)
	REFERENCES rented_user ("id");


ALTER TABLE lease
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");


ALTER TABLE lessee
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

ALTER TABLE lessee
	ADD FOREIGN KEY (leaseId)
	REFERENCES lease ("id");


ALTER TABLE payment
	ADD FOREIGN KEY (payerId)
	REFERENCES rented_user ("id");

ALTER TABLE payment
	ADD FOREIGN KEY (payeeId)
	REFERENCES rented_user ("id");


ALTER TABLE pet
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE property_images
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");

ALTER TABLE property_images
	ADD FOREIGN KEY (listingId)
	REFERENCES property_listing ("id");


ALTER TABLE property_lease_defaults
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");

ALTER TABLE property_lease_defaults
	ADD FOREIGN KEY (ownerId)
	REFERENCES rented_user ("id");


ALTER TABLE property_likes
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

ALTER TABLE property_likes
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");


ALTER TABLE property_listing
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");


ALTER TABLE property_owner
	ADD FOREIGN KEY (ownerId)
	REFERENCES rented_user ("id");

ALTER TABLE property_owner
	ADD FOREIGN KEY (propertyOwnershipId)
	REFERENCES property_ownership ("id");


ALTER TABLE property_ownership
	ADD FOREIGN KEY (propertyFK)
	REFERENCES property ("id");


ALTER TABLE rental_applicant
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

ALTER TABLE rental_applicant
	ADD FOREIGN KEY (rentalAppId)
	REFERENCES rental_application ("id");


ALTER TABLE rental_application
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");


ALTER TABLE room_listing
	ADD FOREIGN KEY (creatorId)
	REFERENCES rented_user ("id");

ALTER TABLE room_listing
	ADD FOREIGN KEY (propertyId)
	REFERENCES property ("id");


ALTER TABLE roommate
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

ALTER TABLE roommate
	ADD FOREIGN KEY (roommateId)
	REFERENCES rented_user ("id");


ALTER TABLE university_calender_quater
	ADD FOREIGN KEY (universityId)
	REFERENCES university ("id");


ALTER TABLE university_calender_semester
	ADD FOREIGN KEY (universityId)
	REFERENCES university ("id");


ALTER TABLE user_cosigner
	ADD FOREIGN KEY (cosingeeId)
	REFERENCES rented_user ("id");

ALTER TABLE user_cosigner
	ADD FOREIGN KEY (cosginerId)
	REFERENCES rented_user ("id");


ALTER TABLE user_education
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE user_financial
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE user_occupation
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE user_recommendation
	ADD FOREIGN KEY (recommendorId)
	REFERENCES rented_user ("id");

ALTER TABLE user_recommendation
	ADD FOREIGN KEY (recommendedId)
	REFERENCES rented_user ("id");


ALTER TABLE user_reference
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");


ALTER TABLE user_vehicle
	ADD FOREIGN KEY (userId)
	REFERENCES rented_user ("id");

INSERT INTO rented_user("id", username, email, confirmedEmail, "password", firstname, lastname, middlename, aboutMe, phone, profileImage, twitter, facebook, googleplus, linkedin, experianIdToken, creditCheckToken, runIdentityCheck, shareCreditReport, identityDate, creditReportDate, createdAt, updatedAt, deletedAt, "role", provider, facebookOAuthId, googleOAuthId, twitterOAuthId, salt) VALUES (23, null, 'john@rented.co', 0, 'MQaMWu+2yhSKBHwaaeNNK/ZASOodBSu/Moc0AFCHRHv4HGbxiHM+IQ5EtVxvFjeMzbuqbwKGv5EsYUzX4hl4ZQ==', 'John', 'Raber', null, null, null, null, null, null, null, null, null, null, 0, 0, null, null, '2015-02-25 00:44:56', '2015-02-25 00:44:56', null, 'user', 'local', null, null, null, 'dF/GQy+R5AQw8h5m9lUcKg==');

CREATE OR REPLACE VIEW room_listing_view AS
	SELECT  p.streetNumeric, p.streetAddress, p.city, p.state,  p.zip,  p.apt,  p.bldg,  p.type,  p.bedrooms,  p.bathrooms,  rl.* FROM PROPERTY p, room_listing rl
    WHERE rl.propertyId = p.id;
