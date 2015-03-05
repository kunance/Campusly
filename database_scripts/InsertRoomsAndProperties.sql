INSERT INTO property ("streetNumeric",
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
VALUES (1290, 'Playmor Ave', 'San Jose', 'CA', 95126, '', '', 37.3161403, -121.91009730000002, 'townhouse', 'a cool space', 3, 2, 2, 1500, 100, 0, 'rented');


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
VALUES (3, 17, 1000, 100, 'now', '2015-12-31 11:59:59-01', 'month-to-month', 'no preference', 100, 'single', 3, 'true', 'false', 'true', 'false', 'a spacious room 10 X 20');


