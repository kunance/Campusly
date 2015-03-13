INSERT INTO looking ("id", "maxMonthlyRent",
  "utilitiesIncluded",
  "moveInDate",
  "moveOutDate",
  "openToFullYearLeaseNewRoomates",
  "roomType",
  "sharedBathroom",
  "gender",
  "numRoommates",
  "furnished",
  "busRouteRequired",
  "parkingNeeded",
  "smokingAllowed",
  "petsAllowed",
  "userId")
VALUES
(2,500,'true','2015-03-13','2015-12-21','true','single','true','no preference',2,'true','true','true','true','true',2),
(3,600,'false','2015-04-15','2016-06-30','false','double','false','male only',1,'false','false','false','false','false',3),
(4,700,'false','2015-06-30','2016-07-30','false','living room','false','male only',3,'false','false','false','false','false',4),
(5,800,'true','2015-04-01','2015-09-30','true','single','true','no preference',2,'true','true','true','true','true',5),
(6,900,'false','2015-05-02','2015-08-31','false','double','false','female only',1,'false','false','false','false','false',6),
(7,1000,'false','2015-03-30','2015-07-30','false','living room','false','no preference',3,'false','false','false','false','false',7),
(8,1100,'false','2015-04-15','2015-09-30','false','single','false','female only',2,'false','false','false','false','false',8),
(9,1200,'true','2015-04-20','2016-06-30','true','living room','true','no preference',1,'true','true','true','true','true',9),
(10,550,'false','2015-04-15','2016-06-30','false','double','false','female only',3,'false','false','false','false','false',10),
(11,650,'false','2015-03-30','2015-09-30','false','single','false','no preference',4,'false','false','false','false','false',11),
(12,750,'true','2015-04-15','2016-06-30','true','double','true','female only',2,'true','true','true','true','true',12),
(13,850,'false','2015-04-20','2017-07-30','false','double','false','male only',1,'false','false','false','false','false',13),
(14,950,'false','2015-03-13','2015-10-02','false','single','false','female only',3,'false','false','false','false','false',14),
(15,1050,'true','2015-04-15','2015-06-15','true','single','true','no preference',4,'true','true','true','true','true',15);

--
-- TOC entry 2670 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 16, true);
