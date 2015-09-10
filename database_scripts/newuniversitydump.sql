--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-04-16 15:35:29 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 4047 (class 0 OID 197539)
-- Dependencies: 224
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university (id, name, "academicYearType", "streetNumeric", "streetAddress", apt, city, state, zip, latitude, longitude, "startDate", "endDate", "createdAt", "updatedAt", "deletedAt", geoloc, "shortName") FROM stdin;
1	University of California - Berkeley	semester	5	South Hall Road	\N	Berkeley	CA	94720	37.87220000	-122.25869800	2012-12-11 15:00:00-08	\N	2015-03-04 14:20:36.338-08	\N	\N	0101000020E61000001DC9E53FA4EF424099620E828E905EC0	UCB
2	University of California - Davis	semester	1	Shields Avenue	\N	Davis	CA	95616	38.53823200	-121.76171300	2012-12-11 15:00:00-08	\N	2015-03-04 14:22:02.394-08	\N	\N	0101000020E610000091D442C9E444434009FCE1E7BF705EC0	UCD
3	University of California - San Diego	semester	9500	Gilman Drive	\N	La Jolla	CA	92093	32.88021900	-117.23585500	2012-12-11 15:00:00-08	\N	2015-03-04 14:23:30.355-08	\N	\N	0101000020E6100000AE282504AB70404047E6913F184F5DC0	UCSD
4	University of California - Santa Cruz	semester	1156	High Street	\N	Santa Cruz	CA	95064	36.99799400	-122.05552400	2012-12-11 15:00:00-08	\N	2015-03-04 14:24:26.332-08	\N	\N	0101000020E610000057CD7344BE7F4240290989B48D835EC0	UCSC
5	University of California - Irvine	semester	311	West Peltason Drive	\N	Irvine	CA	92697	33.64896100	-117.84222400	2012-12-11 15:00:00-08	\N	2015-03-04 14:25:44.922-08	\N	\N	0101000020E610000092B06F2711D3404001FA7DFFE6755DC0	UCI
6	University of California - Los Angeles	semester	308	Westwood Plaza	\N	Los Angeles	CA	90095	34.07044300	-118.44418000	2012-12-11 15:00:00-08	\N	2015-03-04 14:38:25.418-08	\N	\N	0101000020E6100000B69DB646040941406362F3716D9C5DC0	UCLA
7	University of California - Merced	semester	5200	Lake Road	\N	Merced	CA	95340	37.36617500	-120.42435500	2012-12-11 15:00:00-08	\N	2015-03-04 14:39:17.249-08	\N	\N	0101000020E610000070CE88D2DEAE424039B9DFA1281B5EC0	UCM
8	University of California - Riverside	semester	900	University Avenue	\N	Riverside	CA	92521	33.97370200	-117.32806200	2012-12-11 15:00:00-08	\N	2015-03-04 14:40:11.361-08	\N	\N	0101000020E610000060066344A2FC4040DD43C2F7FE545DC0	UCR
9	University of California - Santa Barbara	semester	1	Ucen Road	\N	Santa Barbara	CA	93106	34.41171700	-119.84846300	2012-12-11 15:00:00-08	\N	2015-03-04 14:41:06.721-08	\N	\N	0101000020E6100000871A8524B33441406D37C1374DF65DC0	UCSB
10	University of California - San Francisco	semester	500	Parnassus Avenue	\N	San Francisco	CA	94143	37.76272400	-122.45802000	2012-12-11 15:00:00-08	\N	2015-03-04 14:42:05.53-08	\N	\N	0101000020E6100000E9EFA5F0A0E142407E3A1E33509D5EC0	UCSF
11	California State University - San Jose	semester	1	Washington Square	\N	San Jose	CA	95192	37.33518000	-121.88107300	2012-12-11 15:00:00-08	\N	2015-03-04 14:43:02.066-08	\N	\N	0101000020E6100000FB22A12DE7AA4240DF18028063785EC0	SJSU
12	California State University - San Francisco	semester	1600	Holloway Avenue	\N	San Francisco	CA	94132	37.72188600	-122.47822000	2012-12-11 15:00:00-08	\N	2015-03-04 14:43:53.706-08	\N	\N	0101000020E61000005AB8ACC266DC4240C2120F289B9E5EC0	SFSU
13	California State University - East Bay	semester	25800	Carlos Bee Blvd	\N	Hayward	CA	94542	37.65576200	-122.05662900	2012-12-11 15:00:00-08	\N	2015-03-04 14:44:51.578-08	\N	\N	0101000020E6100000D3FA5B02F0D3424055C03DCF9F835EC0	CSUEB
14	California State University - Northridge	semester	18111	Nordhoff Street	\N	Northridge	CA	91330	34.24071100	-118.52929700	2012-12-11 15:00:00-08	\N	2015-03-04 14:45:39.322-08	\N	\N	0101000020E6100000CB64389ECF1E4140BD378600E0A15DC0	CSUN
15	California State University - Fullterton	semester	800	North State College Blvd	\N	Fullerton	CA	92831	33.88314400	-117.88686300	2012-12-11 15:00:00-08	\N	2015-03-04 14:46:24.233-08	\N	\N	0101000020E61000004ED4D2DC0AF140401442075DC2785DC0	CSUF
16	California State University - Long Beach	semester	1250	Bellflower Blvd	\N	Long Beach	CA	90840	33.78136300	-118.11346000	2012-12-11 15:00:00-08	\N	2015-03-04 14:47:47.61-08	\N	\N	0101000020E6100000F8A6E9B303E44040DE59BBED42875DC0	CSULB
17	California State University - Fresno	semester	5241	North Maple Drive	\N	Fresno	CA	93740	36.81270600	-119.74839800	2012-12-11 15:00:00-08	\N	2015-03-04 14:48:49.211-08	\N	\N	0101000020E6100000A9A10DC0066842401399B9C0E5EF5DC0	CSUFresno
18	California State University - Sacramento	semester	6000	J Street	\N	Sacramento	CA	95819	38.55967300	-121.42228200	2012-12-11 15:00:00-08	\N	2015-03-04 14:49:38.09-08	\N	\N	0101000020E610000023BA675DA347434020EC14AB065B5EC0	CSUS
19	California State University - San Diego	semester	5500	Campanile Drive	\N	San Diego	CA	92182	32.77477500	-117.07165800	2012-12-11 15:00:00-08	\N	2015-03-04 14:50:23.218-08	\N	\N	0101000020E61000001361C3D32B634040CB9F6F0B96445DC0	SDSU
\.


--
-- TOC entry 4053 (class 0 OID 0)
-- Dependencies: 229
-- Name: university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_id_seq', 20, true);


-- Completed on 2015-04-16 15:35:29 PDT

--
-- PostgreSQL database dump complete
--

