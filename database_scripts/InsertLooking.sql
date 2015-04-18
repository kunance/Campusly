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
  "userId",
  "activeLooking",
  "area")
VALUES
(2,500,'true','2015-03-13','2015-12-21','true','single','true','no preference',2,'true','true','true','true','true',2,'true','Cu mei quas maluisset, apeirian quaerendum eum ei, ut fuisset voluptua suavitate pro. An eum facilisis vulputate, sale meliore scribentur ea ius. An purto graeco appareat qui. An inermis nominati euripidis vim, id vis diam nostrud suscipiantur, ei iuvaret consequat eloquentiam vix. An sea regione tincidunt.'),
(3,600,'false','2015-04-15','2016-06-30','false','double','false','male only',1,'false','false','false','false','false',3,'true','No brute melius sea, agam populo timeam an nam, te quodsi diceret accusam his. Sed ex propriae gubergren, at vero falli moderatius est. Est at labore essent. Quem eirmod referrentur in mei.'),
(4,700,'false','2015-06-30','2016-07-30','false','living room','false','male only',3,'false','false','false','false','false',4,'true','Pri omnesque qualisque ea, diam nobis vim ex, an quo aliquam facilisis. Id cum eruditi argumentum reprimique. Vix ne utroque forensibus adversarium, duis voluptatum quaerendum eam et. No vitae feugiat similique his, qui eu ullamcorper philosophia, ea ferri vivendo quo.'),
(5,800,'true','2015-04-01','2015-09-30','true','single','true','no preference',2,'true','true','true','true','true',5,'true','Cu est nibh accusata, error deserunt corrumpit ex his, iuvaret tincidunt appellantur ne cum. Pro veniam molestie postulant id, duo cu feugait senserit.'),
(6,900,'false','2015-05-02','2015-08-31','false','double','false','female only',1,'false','false','false','false','false',6,'true','cool guy looking roommate'),
(7,1000,'false','2015-03-30','2015-07-30','false','living room','false','no preference',3,'false','false','false','false','false',7,'true', 'awesome guy looking room'),
(8,1100,'false','2015-04-15','2015-09-30','false','single','false','female only',2,'false','false','false','false','false',8,'true',null),
(9,1200,'true','2015-04-20','2016-06-30','true','living room','true','no preference',1,'true','true','true','true','true',9,'true','Et inermis facilisi sea, vel malis scripta id. Ut modo fabulas concludaturque sit. Ne vix simul dissentias, perfecto corrumpit cotidieque eam ut, nisl eirmod sadipscing eu pro. Dicam audire sadipscing vel ei, vix antiopam maiestatis te. Ad errem sapientem adipiscing sea, altera prompta pro ex. Pri ei verear aperiri bonorum, vis facilisi periculis ne, integre luptatum consequuntur eu eum. Quo ea noster posidonium percipitur, in posse graeco suscipit pro.'),
(10,550,'false','2015-04-15','2016-06-30','false','double','false','female only',3,'false','false','false','false','false',10,'true',null),
(11,650,'false','2015-03-30','2015-09-30','false','single','false','no preference',4,'false','false','false','false','false',11,'true','Diam iisque est ex. Per officiis efficiendi et, alterum graecis te has. Qui te populo invidunt sapientem, decore admodum iracundia te quo. Enim meis urbanitas qui ex, esse blandit at cum. Ea tractatos corrumpit per. Percipitur repudiandae ut usu, nec idque repudiandae eu, veri posse alterum no ius.'),
(12,750,'true','2015-04-15','2016-06-30','true','double','true','female only',2,'true','true','true','true','true',12,'true', 'Omnium ponderum oportere ea vix. Purto intellegam cum et. An tation appellantur disputationi pro. Sed no phaedrum intellegebat, eligendi euripidis id vis, eum dicam alterum in. Vis at fastidii efficiantur.'),
(13,850,'false','2015-04-20','2017-07-30','false','double','false','male only',1,'false','false','false','false','false',13,'true','Omnium luptatum perpetua nec no, sint cibo facilisi vix eu, ne mutat molestie apeirian vel. '),
(14,950,'false','2015-03-13','2015-10-02','false','single','false','female only',3,'false','false','false','false','false',14,'true','Et duis conceptam mel. Facer laoreet id qui, te mei assum definitiones, vis ut elit possim reprehendunt. Id ius suscipit definiebas, qui melius temporibus an, sonet habemus oporteat eu vis. In sit solet elaboraret, homero oporteat scriptorem vim ex, quo ne liber tation.'),
(15,1050,'true','2015-04-15','2015-06-15','true','single','true','no preference',4,'true','true','true','true','true',15,'true',null);

--
-- TOC entry 2670 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 16, true);
