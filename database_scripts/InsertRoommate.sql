INSERT INTO roommate ("id", "userId", "roommateId", "confirmed")
VALUES
(2,2,10,'true'),
(3,4,2,'true'),
(4,5,6,'true'),
(5,5,9,'true'),
(6,2,5,'true'),
(7,6,7,'true'),
(8,7,5,'true'),
(9,7,3,'true'),
(10,10,17,'true'),
(11,17,12,'true'),
(12,14,15,'true'),
(13,15,8,'true');

--
-- TOC entry 2681 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 13, true);
