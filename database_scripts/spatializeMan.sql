ALTER DATABASE rented OWNER TO postgres;

ALTER SCHEMA public OWNER TO postgres;


-- Enable PostGIS (includes raster)
CREATE EXTENSION postgis;
-- Enable Topology
CREATE EXTENSION postgis_topology;
-- fuzzy matching needed for Tiger
CREATE EXTENSION fuzzystrmatch;
-- Enable US Tiger Geocoder
CREATE EXTENSION postgis_tiger_geocoder;


-- Use 4326 for lat long and 26910  http://epsg.io/26910

ALTER TABLE property ADD COLUMN geoloc GEOMETRY(Point, 4326);
CREATE INDEX property_gix on property USING GIST(geoloc);


ALTER TABLE university ADD COLUMN geoloc GEOMETRY(Point, 4326);
CREATE INDEX university_gix on university USING GIST(geoloc);



DROP TRIGGER property_geo_trig ON property;

CREATE OR REPLACE FUNCTION property_geo() RETURNS trigger AS $property_geo$
    BEGIN
        -- Check that empname and salary are given
        IF NEW.longitude IS NULL THEN
            RAISE EXCEPTION 'longitude cannot be null';
        END IF;
        IF NEW.latitude IS NULL THEN
            RAISE EXCEPTION 'latitude cannot be null';
        END IF;
        NEW.geoloc := ST_Setsrid(ST_Makepoint(NEW.latitude, NEW.longitude), 4326);
        RETURN NEW;
    END;
$property_geo$ LANGUAGE plpgsql;

CREATE TRIGGER property_geo_trig AFTER INSERT OR UPDATE ON property
    FOR EACH ROW EXECUTE PROCEDURE property_geo();
