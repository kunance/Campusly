INSERT INTO address_history ("id",
  "streetNumeric",
  "streetAddress",
  "city",
  "state",
  "zip",
  "latitude" ,
  "longitude",
  "userId" ,
  present)

VALUES
(2,9604,'Easter Way','San Diego','CA',92121,32.88051,-117.211912,2,'true'),
(3,11103,'Caminito Alvarez','San Diego','CA',92126,32.907468,-117.166323,3,'true'),
(4,5220,'Fiore Terrace','San Diego','CA',92121,32.87081,-117.204412,4,'true'),
(5,7846,'Camino Huerta','San Diego','CA',92122,32.861302,-117.216845,5,'true'),
(6,155,'Camino Lindo','San Diego','CA',92122,32.859381,-117.219927,6,'true'),
(7,3801,'Boone St','San Diego','CA',92117,32.812636,-117.206093,7,'true'),
(8,1259,'Emerald St','San Diego','CA',92109,32.800052,-117.247384,8,'true'),
(9,1505,'Buckingham Dr','San Diego','CA',92037,32.826587,117.259186,9,'true'),
(10,99,'South 4th St','San Jose','CA',95112,37.336404,-121.88649,10,'true'),
(11,246,'South 14th St','San Jose','CA',95112,37.338444,-121.873739,11,'true'),
(12,463,'Hull Ave','San Jose','CA',95125,37.317238,-121.894819,12,'true'),
(13,463,'Windsor Hills Circle','San Jose','CA',95123,37.244219,-121.865537,13,'true'),
(14,2985,'Knights Bridge Rd','San Jose','CA',95132,37.405544,-121.865126,14,'true'),
(15,133,'Vargas Ct','Milpitas','CA',95035,37.452681,-121.907789,15,'true'),
(16,555,'E Duane Ave','Sunnyvale','CA',94085,37.389373,-122.017143,16,'true'),
(17,1185,'Lincoln St','Santa Clara','CA',95050,37.348906,-121.952265,17,'true');

--
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 173
-- Name: address_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('address_history_id_seq', 18, true);
