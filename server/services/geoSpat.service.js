ST_Length(A)

ST_Distance(A,B)

ST_DWithin(A,B,r)

ST_Area(A)

ST_Intersects(A,B)


Good references
https://vimeo.com/106836706
http://postgis.net/install
http://postgis.net/docs/manual-2.1/PostGIS_FAQ.html
http://postgis.net/docs/ST_Point.html
http://www.postgis.us/downloads/postgis20_cheatsheet.html


Install PostGIS
brew update
brew install postgis

using psql
rented=# CREATE EXTENSION postgis;
rented=# CREATE EXTENSION postgis_topology;

rented=# CREATE EXTENSION fuzzystrmatch;

rented=# CREATE EXTENSION postgis_tiger_geocoder


// Use 26910  http://epsg.io/26910


ALTER TABLE property ADD COLUMN geoloc GEOMETRY(Point, 26910);
CREATE INDEX property_gix on property USING GIST(geoloc);
UPDATE property SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 26910);


ALTER TABLE university ADD COLUMN geoloc GEOMETRY(Point, 26910);
CREATE INDEX university_gix on university USING GIST(geoloc);
UPDATE university SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 26910);


u.geocolumn needs to be a 'POINT(1000 1000)'
// metersDistance = 5000  // ~ 3 miles


SELECT p.* FROM property p, university u
WHERE u.id = 2 AND ST_DWithin(p.geoloc, u.geoloc, 5000);





using psql
//rented=# select AddGeometryColumn('public','property','geoloc','26910','POINT',2);

http://postgis.net/docs/manual-2.1/PostGIS_FAQ.html


  ,
within: function() {
  var within = "SELECT p.* FROM property p, university u WHERE u.id = 2 AND ST_DWithin(p.geoloc, u.geoloc, 500)";

  sequelize.query(within).then(function (properties) {
    console.log(properties)
  });
}

