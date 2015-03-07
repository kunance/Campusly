INSERT INTO property ("id", "streetNumeric",
  "streetAddress",
  "city",
  "state",
  "zip",
  "apt",
  "bldg",
  "latitude",
  "longitude",
  "type",
  "description",
  "bedrooms",
  "bathrooms",
  "parkingSpots",
  "livingAreaSqFt",
  "hoaFee",
  "otherFee",
  "status")
VALUES (3, 1290, 'Playmor Ave', 'San Jose', 'CA', 95126, '', '', 37.3161403, -121.91009730000002, 'sfh', 'a cool space', 3, 2, 2, 1500, 100, 0, 'rented'),
(4, 1400, 'Playmor Ave', 'San Diego', 'CA', 92121, '', '', 36.3161403, -122.91009730000002, 'apt', 'a cool space', 4, 2, 2, 1600, 100, 0, 'rented');


INSERT INTO room_listing ("propertyId",
  "creatorId",
  "monthlyPrice",
  "securityDeposit",
  "availableMoveIn",
  "leaseEndDate",
  "leaseType",
  "gender",
  "monthlyUtilityCost",
  "roomType",
  "numRoomates",
  "sharedBathroom",
  "furnished",
  "parkingAvailable",
  "smokingAllowed",
  "description")
VALUES (3, 17, 1000, 100, 'now', '2015-12-31 11:59:59-01', 'month-to-month', 'no preference', 100, 'single', 3, 'true', 'false', 'true', 'false', 'a spacious room 10 X 20'),
(4, 17, 600, 600, 'now', '2015-4-15 11:59:59-01', 'month-to-month', 'no preference', 50, 'double', 2, 'true', 'true', 'true', 'false', 'Furnished room to share with great roommates');


