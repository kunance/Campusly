--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2015-03-04 23:50:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2231 (class 0 OID 25317)
-- Dependencies: 221
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university (id, name, "academicYearType", "streetNumeric", "streetAddress", apt, city, state, zip, latitude, longitude, "startDate", "endDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	University of California - Berkeley	semester	5	South Hall Road	\N	Berkeley	CA	94720	37.87220000	-122.25869800	2012-12-12 00:00:00+01	\N	2015-03-04 23:20:36.338+01	\N	\N
2	University of California - Davis	semester	1	Shields Avenue	\N	Davis	CA	95616	38.53823200	-121.76171300	2012-12-12 00:00:00+01	\N	2015-03-04 23:22:02.394+01	\N	\N
3	University of California - San Diego	semester	9500	Gilman Drive	\N	La Jolla	CA	92093	32.88021900	-117.23585500	2012-12-12 00:00:00+01	\N	2015-03-04 23:23:30.355+01	\N	\N
4	University of California - Santa Cruz	semester	1156	High Street	\N	Santa Cruz	CA	95064	36.99799400	-122.05552400	2012-12-12 00:00:00+01	\N	2015-03-04 23:24:26.332+01	\N	\N
5	University of California - Irvine	semester	311	West Peltason Drive	\N	Irvine	CA	92697	33.64896100	-117.84222400	2012-12-12 00:00:00+01	\N	2015-03-04 23:25:44.922+01	\N	\N
6	University of California - Los Angeles	semester	308	Westwood Plaza	\N	Los Angeles	CA	90095	34.07044300	-118.44418000	2012-12-12 00:00:00+01	\N	2015-03-04 23:38:25.418+01	\N	\N
7	University of California - Merced	semester	5200	Lake Road	\N	Merced	CA	95340	37.36617500	-120.42435500	2012-12-12 00:00:00+01	\N	2015-03-04 23:39:17.249+01	\N	\N
8	University of California - Riverside	semester	900	University Avenue	\N	Riverside	CA	92521	33.97370200	-117.32806200	2012-12-12 00:00:00+01	\N	2015-03-04 23:40:11.361+01	\N	\N
9	University of California - Santa Barbara	semester	1	Ucen Road	\N	Santa Barbara	CA	93106	34.41171700	-119.84846300	2012-12-12 00:00:00+01	\N	2015-03-04 23:41:06.721+01	\N	\N
10	University of California - San Francisco	semester	500	Parnassus Avenue	\N	San Francisco	CA	94143	37.76272400	-122.45802000	2012-12-12 00:00:00+01	\N	2015-03-04 23:42:05.53+01	\N	\N
11	California State University - San Jose	semester	1	Washington Square	\N	San Jose	CA	95192	37.33518000	-121.88107300	2012-12-12 00:00:00+01	\N	2015-03-04 23:43:02.066+01	\N	\N
12	California State University - San Francisco	semester	1600	Holloway Avenue	\N	San Francisco	CA	94132	37.72188600	-122.47822000	2012-12-12 00:00:00+01	\N	2015-03-04 23:43:53.706+01	\N	\N
13	California State University - East Bay	semester	25800	Carlos Bee Blvd	\N	Hayward	CA	94542	37.65576200	-122.05662900	2012-12-12 00:00:00+01	\N	2015-03-04 23:44:51.578+01	\N	\N
14	California State University - Northridge	semester	18111	Nordhoff Street	\N	Northridge	CA	91330	34.24071100	-118.52929700	2012-12-12 00:00:00+01	\N	2015-03-04 23:45:39.322+01	\N	\N
15	California State University - Fullterton	semester	800	North State College Blvd	\N	Fullerton	CA	92831	33.88314400	-117.88686300	2012-12-12 00:00:00+01	\N	2015-03-04 23:46:24.233+01	\N	\N
16	California State University - Long Beach	semester	1250	Bellflower Blvd	\N	Long Beach	CA	90840	33.78136300	-118.11346000	2012-12-12 00:00:00+01	\N	2015-03-04 23:47:47.61+01	\N	\N
17	California State University - Fresno	semester	5241	North Maple Drive	\N	Fresno	CA	93740	36.81270600	-119.74839800	2012-12-12 00:00:00+01	\N	2015-03-04 23:48:49.211+01	\N	\N
18	California State University - Sacramento	semester	6000	J Street	\N	Sacramento	CA	95819	38.55967300	-121.42228200	2012-12-12 00:00:00+01	\N	2015-03-04 23:49:38.09+01	\N	\N
19	California State University - San Diego	semester	5500	Campanile Drive	\N	San Diego	CA	92182	32.77477500	-117.07165800	2012-12-12 00:00:00+01	\N	2015-03-04 23:50:23.218+01	\N	\N
\.


--
-- TOC entry 2238 (class 0 OID 0)
-- Dependencies: 226
-- Name: university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_id_seq', 20, true);


-- Completed on 2015-03-04 23:50:54

--
-- PostgreSQL database dump complete
--

