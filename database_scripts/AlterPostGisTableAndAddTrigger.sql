--
--   may want to use 26910 instead of 4326  ... investigate
--   Alter tables for property and university
--
ALTER TABLE property ADD COLUMN geoloc GEOMETRY(Point, 4326);
CREATE INDEX property_gix on property USING GIST(geoloc);

ALTER TABLE university ADD COLUMN geoloc GEOMETRY(Point, 4326);
CREATE INDEX university_gix on university USING GIST(geoloc);

ALTER TABLE address_history ADD COLUMN geoloc GEOMETRY(Point, 4326);
CREATE INDEX address_history_gix on address_history USING GIST(geoloc);

--
--   Google uses 3857 coordinate syste. Leaving code to refer back to later
--

--ALTER TABLE property ADD COLUMN geoloc GEOMETRY(Point, 3857);
--CREATE INDEX property_gix on property USING GIST(geoloc);
--
--ALTER TABLE university ADD COLUMN geoloc GEOMETRY(Point, 3857);
--CREATE INDEX university_gix on university USING GIST(geoloc);
--
--ALTER TABLE address_history ADD COLUMN geoloc GEOMETRY(Point, 3857);
--CREATE INDEX address_history_gix on address_history USING GIST(geoloc);

--
--   Update table for property geoloc
--

CREATE OR REPLACE FUNCTION property_geo() RETURNS trigger AS $property_geo$
    BEGIN

        IF NEW.longitude IS NULL THEN
            RAISE EXCEPTION 'longitude cannot be null';
        END IF;
        IF NEW.latitude IS NULL THEN
            RAISE EXCEPTION 'latitude cannot be null';
        END IF;
          UPDATE property SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 4326);
--          UPDATE property SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 3857);
--          UPDATE property SET geoloc = ST_Transform(ST_Setsrid(ST_Makepoint(latitude, longitude), 3857), 4326);
        RETURN NEW;

    END;
$property_geo$ LANGUAGE plpgsql;

CREATE TRIGGER property_geo_trig AFTER INSERT OR UPDATE OF latitude, longitude ON property
    FOR EACH ROW EXECUTE PROCEDURE property_geo();

--
--   Update table for university geoloc
--

CREATE OR REPLACE FUNCTION university_geo() RETURNS trigger AS $university_geo$
    BEGIN

        IF NEW.longitude IS NULL THEN
            RAISE EXCEPTION 'longitude cannot be null';
        END IF;
        IF NEW.latitude IS NULL THEN
            RAISE EXCEPTION 'latitude cannot be null';
        END IF;
        UPDATE university SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 4326);
--        UPDATE university SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 3857);
--        UPDATE university SET geoloc = ST_Transform(ST_Setsrid(ST_Makepoint(latitude, longitude), 3857), 4326);
        RETURN NEW;

    END;
$university_geo$ LANGUAGE plpgsql;

CREATE TRIGGER university_geo_trig AFTER INSERT OR UPDATE OF latitude, longitude ON university
    FOR EACH ROW EXECUTE PROCEDURE university_geo();

--
--   Update table for address history geoloc
--

CREATE OR REPLACE FUNCTION address_history_geo() RETURNS trigger AS $address_history_geo$
    BEGIN

        IF NEW.longitude IS NULL THEN
            RAISE EXCEPTION 'longitude cannot be null';
        END IF;
        IF NEW.latitude IS NULL THEN
            RAISE EXCEPTION 'latitude cannot be null';
        END IF;
        UPDATE address_history SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 4326);
--        UPDATE address_history SET geoloc = ST_Setsrid(ST_Makepoint(latitude, longitude), 3857);
--        UPDATE address_history SET geoloc = ST_Transform(ST_Setsrid(ST_Makepoint(latitude, longitude), 3857), 4326);
        RETURN NEW;

    END;
$address_history_geo$ LANGUAGE plpgsql;

CREATE TRIGGER address_history_geo_trig AFTER INSERT OR UPDATE OF latitude, longitude ON address_history
    FOR EACH ROW EXECUTE PROCEDURE address_history_geo();
