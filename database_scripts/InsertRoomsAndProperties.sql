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
  "bathrooms")
 -- "parkingSpots",
 -- "livingAreaSqFt",
 -- "hoaFee",
 -- "otherFee",
 -- "status")
VALUES (1, 1310, 'Elm Street', 'Chula Vista', 'CA', 91911, '', '',32.607664,-117.061291, 'sfh', 'a cool space', 3, 2),
(2, 2107, 'San Antonio Pl', 'Santa Clara', 'CA', 95051, '', '',37.359211,-121.983289, 'apt', 'a cool space', 4, 2),
(3,6741,'Lonicera St','Carlsbad','CA',92011,'','',33.111397,-117.301221,'apt','',3,1),
(4,8683,'Via Mallorca','La Jolla','CA',92037,'','',32.865001,-117.234182,'apt','',4,2),
(5,3417,'Lebon Dr','San Diego','CA',92122,'','',32.867008,-117.224705,'apt','',2,1),
(6,5280,'Fiore Terrace','San Diego','CA',92122,'','',32.870453,-117.20322,'apt','',2,2),
(7,9085,'Judicial Dr','San Diego','CA',92122,'','',32.872169,-117.20372,'apt','',2,2),
(8,8720,'Costa Verde Blvd','San Diego','CA',92122,'','',32.870408,-117.216815,'apt','',3,1),
(9,7936,'Avenida Navidad','San Diego','CA',92122,'','',32.863543,-117.209386,'apt','',2,2),
(10,12301,'Wilshire Boulevard','Los Angeles','CA',90025,'','',34.042761,-118.469829,'apt','',1,1),
(11,11102,'Caminito Alvarez','San Diego','CA',92126,'','',32.907477,-117.166516,'apt','',2,2),
(12,475,'Valencia Street','San Francisco','CA',94103,'','',37.765348,-122.421753,'apt','',2,1),
(13,8880,'Villa La Jolla Dr','La Jolla','CA',92037,'','',32.86953,-117.235024,'apt','',2,2);

--
-- TOC entry 2673 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 14, true);


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
  "description",
  "activeRoom",
  "petsAllowed")
VALUES (1, 2, 1000, 100, 'now', '2015-12-31 11:59:59-01', 'All Summer', 'no preference', 100, 'Single Room', 3, 'true', 'false', 'true', 'false', 'a spacious room 10 X 20','true','true'),
(2, 4, 600, 600, 'now', '2015-4-15 11:59:59-01', 'Fall', 'no preference', 50, 'Double Room', 2, 'true', 'true', 'true', 'false', 'Furnished room to share with great roommates','true','true'),
(3,2,500,0,'2015-03-07','2015-05-30','Winter','female only',0,'Double Room',2,'true','false','true','true','looking for someone to occupy a single bedroom at Costa Verde North Village (8730) for April 1st - May 30th. Personal Parking space included. You will be sharing a bathroom with 1 guy who lives in the living room. Extremely quiet unit, respectful roommates. Non-smoker, no partying','true','true'),
(4,7,360,360,'2015-03-07','2015-07-31','Spring','no preference',30,'Living Room',4,'true','false','false','false','AVAILABLE: Living room spot at costa verde towers got $360 a month + utilities around $30. Living room is already sectioned off for you msg me','true','true'),
(5,5,770,770,'2015-03-07','2015-06-30','1-year','no preference',0,'Entire Apartment',3,'false','true','false','false','Subleasing a masteroom in Costa verde 770+utilities( fully furnished). From right now to summer!','true','true'),
(6,17,400,0,'2015-03-23','2015-07-31','2-years','female only',0,'Entire Apartment',2,'true','false','true','false','Looking for a MALE roommate for a Double. $400 + Ultilities Car Port Parking & Down the street Parking MTS 41 bus stops to UCSD and back across the street from each other. Walking distance to UTC Costa Verde and UTC Mall AVAILABLE on MARCH 23rd Address: 7866 Camino Kiosco San Diego 92122.','true','false'),
(7,5,925,925,'2015-06-30','2015-07-31','Summer Session I','no preference',0,'Entire House',1,'false','false','false','false','-LARGE master bedroom w/ bathroom in Costa Verde. Quiet and 1 min walk to the shuttle/202 stop. 2 mins walk to Costa Verde Center. 5 mins walk to UTC! Enough parking space and guest parking. Available from late June to the end of July or summer session 1. Monthly rent $925 including utilities and internet. $1100 if you wanna stay from middle June till the end of July. Also including utilities and internet! Price negotiable! can help with moving! ','true','false'),
(8,17,493.75,0,'2015-03-23','2015-05-30','Summer Session II','female only',20,'Entire House',1,'false','false','false','false','AVAILABLE for Spring Quarter 2015 Female ONLY! A spot in a double, master bedroom with private bath and walk-in closet $493.75/mo + utilities or internet (divided by 4) Will be sharing the room with an awesome roommate Very quiet, spacious apartment at Costa Verde Apt (South) Could be partially furnished (upon request) Near bus & shuttle stop for UCSD (202/201/N shuttle) Msg for details and questions','true','false'),
(9,5,493.75,0,'2015-03-23','2015-06-30','Fall','female only',30,'Entire House',2,'true','false','true','true','AVAILABLE for Spring Quarter 2015 Female only A spot in a double, master bedroom with private bath $493.75/mo, not including utilities or internet Will be sharing the room with an active, funny, and down to earth roommate (couldnt ask for a better roommate!) Very quiet, spacious apartment at Costa Verde Apt (South) Could be partially furnished Near bus & shuttle stop for UCSD (202/201/N shuttle) Msg for details and questions','true','false'),
(10,17,740,0,'2015-06-30','2015-06-30','Winter','female only',40,'Living Room',1,'true','false','false','true','For Rent: Single in Costa Verde Towers. (Fully furnished for $100.) The rest of apartment furnished with washer and dryer.  Gym, tennis court, pool, jacuzzi, private school shuttle, and more all included (more staycation than college living!) Female preferred. Summer and preferably for the 2015-2016 school year. $740 + utilities.','true','false'),
(11,6,800,0,'2015-03-01','2015-06-30','Spring','female only',0,'Single Room',2,'false','false','false','false','Available Starting March 1st- June 31st or Aug 31. Single Room 800$ utilities included, Negotiable. Female Only. Located at Costa Verde Apartments. Building right on the corner of Regents and Nobel. Less than a 5 min walk to the First Ariba/Nobel Shuttle and the 202/201 Bus stop. Seating on the buses are almost always guaranteed since its the very first stop.Its about a 15 min bus ride to school. Amenities Included: Gym, Pool, Spa, and an in unit washer and dryer. The bathroom would be shared with one person in the living room. The living room person owns a very friendly cat. (picture included below) There are two rooms total and there are two other girls in the other room although they are rarely home. Very quiet environment great for studying with a view of the pool.','true','false'),
(12,8,950,0,'2015-03-10','2015-06-30','All Summer','no preference',50,'Double Room',2,'false','true','false','false','AVAILABLE Available starting March 10th.$950 a month Large single bedroom in a 2Br apartment. The other room is occupied by one Grad student. Your own full bathroom. Full kitchen with stove, fridge, microwave and dishwasher. Private parking spot. Outdoor patio. Next door to laundry room. Right by the mts 41 bus line. Bus stop just outside development and 2 blocks from Nobel/Arriba shuttle. One block from the UTC Westfield mall and Costa Verde Center. Address is 8032 Avenida Navidad 92122','true','true'),
(13,9,660,660,'2015-03-01','2015-07-31','Summer Session I','no preference',60,'Single Room',1,'false','false','true','false','Single for $660+utility @ Tower at Costa verde. Available from Mar 1. Shared bathroom with the occupants in another single and in the living room. Floor plan as attached, the room avaliable is the on the top right. Notice that the washing machine is actually placed inside the master bedroom, which might caused minor inconvenience. Message me if interested.','true','true');

--
-- TOC entry 2682 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 14, true);
