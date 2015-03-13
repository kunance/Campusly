INSERT INTO roommate ("id", "userId", "roommateId")
VALUES
(2,2,4),
(3,4,2),
(4,5,6),
(5,5,7),
(6,6,5),
(7,6,7),
(8,7,5),
(9,7,6),
(10,10,17),
(11,17,10),
(12,14,15),
(13,15,14);

--
-- TOC entry 2681 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 13, true);
