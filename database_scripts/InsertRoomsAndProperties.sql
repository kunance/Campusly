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
VALUES (3, 1290, 'Playmor Ave', 'San Jose', 'CA', 95126, '', '', 37.316140, -121.910097, 'sfh', 'a cool space', 3, 2),
(4, 1400, 'Playmor Ave', 'San Diego', 'CA', 92121, '', '', 36.316140, -122.910097, 'apt', 'a cool space', 4, 2),
(5,8720,'Costa Verde Blvd','San Diego','CA',92122,'','',32.870408,-117.216815,'apt','',3,1),
(6,8683,'Via Mallorca','La Jolla','CA',92037,'','',32.865001,-117.234182,'apt','',4,2),
(7,3417,'Lebon Dr','San Diego','CA',92122,'','',32.867008,-117.224705,'apt','',2,1),
(8,5280,'Fiore Terrace','San Diego','CA',92122,'','',32.870453,-117.20322,'apt','',2,2),
(9,9085,'Judicial Dr','San Diego','CA',92122,'','',32.872169,-117.20372,'apt','',2,2),
(10,8720,'Costa Verde Blvd','San Diego','CA',92122,'','',32.870408,-117.216815,'apt','',3,1),
(11,7936,'Avenida Navidad','San Diego','CA',92122,'','',32.863543,-117.209386,'apt','',2,2),
(12,8720,'Costa Verde Blvd','San Diego','CA',92122,'','',32.870408,-117.216815,'apt','',1,1),
(13,11102,'Caminito Alvarez','San Diego','CA',92126,'','',32.907477,-117.166516,'apt','',2,2),
(14,8720,'Costa Verde Blvd','San Diego','CA',92122,'','',32.870408,-117.216815,'apt','',2,1),
(15,8880,'Villa La Jolla Dr','La Jolla','CA',92037,'','',32.86953,-117.235024,'apt','',2,2);

--
-- TOC entry 2673 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 16, true);


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
  "activeRoom")
VALUES (3, 2, 1000, 100, 'now', '2015-12-31 11:59:59-01', 'month-to-month', 'no preference', 100, 'single', 3, 'true', 'false', 'true', 'false', 'a spacious room 10 X 20','true'),
(4, 4, 600, 600, 'now', '2015-4-15 11:59:59-01', 'month-to-month', 'no preference', 50, 'double', 2, 'true', 'true', 'true', 'false', 'Furnished room to share with great roommates','true'),
(5,2,500,0,'2015-03-07','2015-05-30','sub-lease','female only',0,'double',2,'true','false','true','true','looking for someone to occupy a single bedroom at Costa Verde North Village (8730) for April 1st - May 30th. Personal Parking space included. You will be sharing a bathroom with 1 guy who lives in the living room. Extremely quiet unit, respectful roommates. Non-smoker, no partying','true'),
(6,7,360,360,'2015-03-07','2015-07-31','sub-lease','no preference',30,'living room',4,'true','false','false','false','AVAILABLE: Living room spot at costa verde towers got $360 a month + utilities around $30. Living room is already sectioned off for you msg me','true'),
(7,5,770,770,'2015-03-07','2015-06-30','sub-lease','no preference',0,'single',3,'false','true','false','false','Subleasing a masteroom in Costa verde 770+utilities( fully furnished). From right now to summer!','true'),
(8,17,400,0,'2015-03-23','2015-07-31','lease take over','female only',0,'double',2,'true','false','true','false','Looking for a MALE roommate for a Double. $400 + Ultilities Car Port Parking & Down the street Parking MTS 41 bus stops to UCSD and back across the street from each other. Walking distance to UTC Costa Verde and UTC Mall AVAILABLE on MARCH 23rd Address: 7866 Camino Kiosco San Diego 92122.','true'),
(9,5,925,925,'2015-06-30','2015-07-31','sub-lease','no preference',0,'single',1,'false','false','false','false','-LARGE master bedroom w/ bathroom in Costa Verde. Quiet and 1 min walk to the shuttle/202 stop. 2 mins walk to Costa Verde Center. 5 mins walk to UTC! Enough parking space and guest parking. Available from late June to the end of July or summer session 1. Monthly rent $925 including utilities and internet. $1100 if you wanna stay from middle June till the end of July. Also including utilities and internet! Price negotiable! can help with moving! ','true'),
(10,17,493.75,0,'2015-03-23','2015-05-30','lease take over','female only',20,'double',1,'false','false','false','false','AVAILABLE for Spring Quarter 2015 Female ONLY! A spot in a double, master bedroom with private bath and walk-in closet $493.75/mo + utilities or internet (divided by 4) Will be sharing the room with an awesome roommate Very quiet, spacious apartment at Costa Verde Apt (South) Could be partially furnished (upon request) Near bus & shuttle stop for UCSD (202/201/N shuttle) Msg for details and questions','true'),
(11,5,493.75,0,'2015-03-23','2015-06-30','lease take over','female only',30,'double',2,'true','false','true','true','AVAILABLE for Spring Quarter 2015 Female only A spot in a double, master bedroom with private bath $493.75/mo, not including utilities or internet Will be sharing the room with an active, funny, and down to earth roommate (couldnt ask for a better roommate!) Very quiet, spacious apartment at Costa Verde Apt (South) Could be partially furnished Near bus & shuttle stop for UCSD (202/201/N shuttle) Msg for details and questions','true'),
(12,17,740,0,'2015-06-30','2015-06-30','lease take over','female only',40,'single',1,'true','false','false','true','For Rent: Single in Costa Verde Towers. (Fully furnished for $100.) The rest of apartment furnished with washer and dryer.  Gym, tennis court, pool, jacuzzi, private school shuttle, and more all included (more staycation than college living!) Female preferred. Summer and preferably for the 2015-2016 school year. $740 + utilities.','true'),
(13,6,800,0,'2015-03-01','2015-06-30','sub-lease','female only',0,'single',2,'false','false','false','false','Available Starting March 1st- June 31st or Aug 31. Single Room 800$ utilities included, Negotiable. Female Only. Located at Costa Verde Apartments. Building right on the corner of Regents and Nobel. Less than a 5 min walk to the First Ariba/Nobel Shuttle and the 202/201 Bus stop. Seating on the buses are almost always guaranteed since its the very first stop.Its about a 15 min bus ride to school. Amenities Included: Gym, Pool, Spa, and an in unit washer and dryer. The bathroom would be shared with one person in the living room. The living room person owns a very friendly cat. (picture included below) There are two rooms total and there are two other girls in the other room although they are rarely home. Very quiet environment great for studying with a view of the pool.','true'),
(14,8,950,0,'2015-03-10','2015-06-30','month-to-month','no preference',50,'single',2,'false','true','false','false','AVAILABLE Available starting March 10th.$950 a month Large single bedroom in a 2Br apartment. The other room is occupied by one Grad student. Your own full bathroom. Full kitchen with stove, fridge, microwave and dishwasher. Private parking spot. Outdoor patio. Next door to laundry room. Right by the mts 41 bus line. Bus stop just outside development and 2 blocks from Nobel/Arriba shuttle. One block from the UTC Westfield mall and Costa Verde Center. Address is 8032 Avenida Navidad 92122','true'),
(15,9,660,660,'2015-03-01','2015-07-31','month-to-month','no preference',60,'single',1,'false','false','true','false','Single for $660+utility @ Tower at Costa verde. Available from Mar 1. Shared bathroom with the occupants in another single and in the living room. Floor plan as attached, the room avaliable is the on the top right. Notice that the washing machine is actually placed inside the master bedroom, which might caused minor inconvenience. Message me if interested.','true');

--
-- TOC entry 2682 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 16, true);
