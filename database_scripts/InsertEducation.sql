INSERT INTO user_education ("id",
  "userId",
  "educationCenterName",
  "type",
  "graduationDate",
  "major" ,
  "degreeType",
  "universityId")
VALUES
(2,2,'University of California - San Diego','university','2015-06-30','biology','undergraduate',3),
(3,3,'University of California - San Diego','university','2015-12-30','Electrical Eng','undergraduate',3),
(4,4,'University of California - San Diego','university','2016-06-30','Communications','undergraduate',3),
(5,5,'University of California - San Diego','university','2016-12-30','biology','undergraduate',3),
(6,6,'University of California - San Diego','university','2017-06-30','Electrical Eng','undergraduate',3),
(7,7,'University of California - San Diego','university','2017-12-30','Communications','undergraduate',3),
(8,8,'University of California - San Diego','university','2015-06-30','biology','undergraduate',3),
(9,9,'University of California - San Diego','university','2015-12-30','Electrical Eng','graduate',3),
(10,10,'California State University - San Jose','university','2016-06-30','Communications','graduate',19),
(11,11,'California State University - San Jose','university','2016-12-30','biology','graduate',19),
(12,12,'California State University - San Jose','university','2017-06-30','Electrical Eng','graduate',19),
(13,13,'California State University - San Jose','university','2017-12-30','Communications','graduate',19),
(14,14,'California State University - San Jose','university','2015-06-30','biology','graduate',19),
(15,15,'California State University - San Jose','university','2015-12-30','Electrical Eng','graduate',19),
(16,16,'California State University - San Jose','university','2016-06-30','Communications','undergraduate',19),
(17,17,'California State University - San Jose','university','2017-12-30','biology','undergraduate',19);


--
-- TOC entry 2688 (class 0 OID 0)
-- Dependencies: 230
-- Name: user_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_education_id_seq', 18, true);
