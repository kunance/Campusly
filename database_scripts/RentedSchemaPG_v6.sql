--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2015-03-03 10:40:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP DATABASE rented;
--
-- TOC entry 2619 (class 1262 OID 18736)
-- Name: rented; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE rented WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Croatian_Croatia.1250' LC_CTYPE = 'Croatian_Croatia.1250';


ALTER DATABASE rented OWNER TO postgres;

\connect rented

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2620 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 241 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2622 (class 0 OID 0)
-- Dependencies: 241
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 593 (class 1247 OID 18738)
-- Name: lease_paymentInterval; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "lease_paymentInterval" AS ENUM (
    'weekly',
    'monthly',
    'yearly'
);


ALTER TYPE "lease_paymentInterval" OWNER TO postgres;

--
-- TOC entry 596 (class 1247 OID 18746)
-- Name: looking_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "looking_gender" AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE "looking_gender" OWNER TO postgres;

--
-- TOC entry 599 (class 1247 OID 18754)
-- Name: looking_roomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "looking_roomType" AS ENUM (
    'single',
    'double',
    'living room'
);


ALTER TYPE "looking_roomType" OWNER TO postgres;

--
-- TOC entry 602 (class 1247 OID 18762)
-- Name: payment_paymentForm; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "payment_paymentForm" AS ENUM (
    'credit card',
    'ACH',
    'cash'
);


ALTER TYPE "payment_paymentForm" OWNER TO postgres;

--
-- TOC entry 605 (class 1247 OID 18770)
-- Name: pet_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE pet_type AS ENUM (
    'cat',
    'dog',
    'bird',
    'fish',
    'other'
);


ALTER TYPE pet_type OWNER TO postgres;

--
-- TOC entry 608 (class 1247 OID 18782)
-- Name: property_lease_defaults_preferredLeaseUnit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_lease_defaults_preferredLeaseUnit" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE "property_lease_defaults_preferredLeaseUnit" OWNER TO postgres;

--
-- TOC entry 611 (class 1247 OID 18792)
-- Name: property_listing_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_gender AS ENUM (
    'no preference',
    'male preferred',
    'female preferred',
    'male only',
    'female only'
);


ALTER TYPE property_listing_gender OWNER TO postgres;

--
-- TOC entry 614 (class 1247 OID 18804)
-- Name: property_listing_leaseLengthUnit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_listing_leaseLengthUnit" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE "property_listing_leaseLengthUnit" OWNER TO postgres;

--
-- TOC entry 617 (class 1247 OID 18814)
-- Name: property_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'regular'
);


ALTER TYPE "property_listing_leaseType" OWNER TO postgres;

--
-- TOC entry 620 (class 1247 OID 18822)
-- Name: property_listing_roomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_listing_roomType" AS ENUM (
    'single',
    'double',
    'triple',
    'loft',
    'living room'
);


ALTER TYPE "property_listing_roomType" OWNER TO postgres;

--
-- TOC entry 623 (class 1247 OID 18834)
-- Name: property_listing_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_status AS ENUM (
    'available',
    'rental pending',
    'rented'
);


ALTER TYPE property_listing_status OWNER TO postgres;

--
-- TOC entry 626 (class 1247 OID 18842)
-- Name: property_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_status AS ENUM (
    'avail',
    'pending',
    'rented'
);


ALTER TYPE property_status OWNER TO postgres;

--
-- TOC entry 629 (class 1247 OID 18850)
-- Name: property_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_type AS ENUM (
    'apt',
    'sfh',
    'townhouse'
);


ALTER TYPE property_type OWNER TO postgres;

--
-- TOC entry 632 (class 1247 OID 18858)
-- Name: rental_application_preferredLeaseLengthUnit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "rental_application_preferredLeaseLengthUnit" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE "rental_application_preferredLeaseLengthUnit" OWNER TO postgres;

--
-- TOC entry 635 (class 1247 OID 18868)
-- Name: room_listing_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE room_listing_gender AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE room_listing_gender OWNER TO postgres;

--
-- TOC entry 638 (class 1247 OID 18876)
-- Name: room_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "room_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'lease take over'
);


ALTER TYPE "room_listing_leaseType" OWNER TO postgres;

--
-- TOC entry 641 (class 1247 OID 18884)
-- Name: room_listing_roomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "room_listing_roomType" AS ENUM (
    'single',
    'double',
    'loft',
    'living room'
);


ALTER TYPE "room_listing_roomType" OWNER TO postgres;

--
-- TOC entry 644 (class 1247 OID 18894)
-- Name: university_academicYearType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "university_academicYearType" AS ENUM (
    'quarter',
    'semester'
);


ALTER TYPE "university_academicYearType" OWNER TO postgres;

--
-- TOC entry 647 (class 1247 OID 18900)
-- Name: user_education_degreeType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "user_education_degreeType" AS ENUM (
    'undergraduate',
    'graduate',
    'doctorate',
    'post-doctorate'
);


ALTER TYPE "user_education_degreeType" OWNER TO postgres;

--
-- TOC entry 650 (class 1247 OID 18910)
-- Name: user_education_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_education_type AS ENUM (
    'university',
    'trade',
    'military'
);


ALTER TYPE user_education_type OWNER TO postgres;

--
-- TOC entry 653 (class 1247 OID 18918)
-- Name: user_reference_relation; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_reference_relation AS ENUM (
    'relative',
    'roommate',
    'friend',
    'spouse',
    'landlord',
    'colleague'
);


ALTER TYPE user_reference_relation OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 172 (class 1259 OID 18931)
-- Name: address_history; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE address_history (
    id bigint NOT NULL,
    "streetNumeric" integer NOT NULL,
    "streetAddress" text NOT NULL,
    apt text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone,
    "userId" bigint,
    "aboutMe" text,
    present boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE address_history OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 18939)
-- Name: address_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE address_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE address_history_id_seq OWNER TO postgres;

--
-- TOC entry 2623 (class 0 OID 0)
-- Dependencies: 173
-- Name: address_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE address_history_id_seq OWNED BY address_history.id;


--
-- TOC entry 174 (class 1259 OID 18941)
-- Name: apartment_complex; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE apartment_complex (
    id bigint NOT NULL,
    name text NOT NULL,
    "streetNumeric" integer NOT NULL,
    "streetAddress" text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    "distanceToUniv" double precision,
    "petsAllowed" boolean DEFAULT false NOT NULL,
    "dogsAllowed" boolean DEFAULT false NOT NULL,
    "catsAllowed" boolean DEFAULT false NOT NULL,
    "othersAllowed" boolean DEFAULT false NOT NULL,
    "dogQtyAllowed" integer DEFAULT 0,
    "catQtyAllowed" integer DEFAULT 0,
    "otherQtyAllowed" integer DEFAULT 0,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE apartment_complex OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 18955)
-- Name: apartment_complex_floor_plan; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE apartment_complex_floor_plan (
    id bigint NOT NULL,
    "complexId" bigint NOT NULL,
    bedrooms integer NOT NULL,
    bathrooms integer DEFAULT 1 NOT NULL,
    parking integer DEFAULT 0 NOT NULL,
    living_area integer NOT NULL,
    washer_dryer boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE apartment_complex_floor_plan OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 18962)
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE apartment_complex_floor_plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE apartment_complex_floor_plan_id_seq OWNER TO postgres;

--
-- TOC entry 2624 (class 0 OID 0)
-- Dependencies: 176
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_floor_plan_id_seq OWNED BY apartment_complex_floor_plan.id;


--
-- TOC entry 177 (class 1259 OID 18964)
-- Name: apartment_complex_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE apartment_complex_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE apartment_complex_id_seq OWNER TO postgres;

--
-- TOC entry 2625 (class 0 OID 0)
-- Dependencies: 177
-- Name: apartment_complex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_id_seq OWNED BY apartment_complex.id;


--
-- TOC entry 178 (class 1259 OID 18966)
-- Name: apartment_complex_image; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE apartment_complex_image (
    id bigint NOT NULL,
    "complexId" bigint NOT NULL,
    location text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE apartment_complex_image OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 18973)
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE apartment_complex_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE apartment_complex_image_id_seq OWNER TO postgres;

--
-- TOC entry 2626 (class 0 OID 0)
-- Dependencies: 179
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_image_id_seq OWNED BY apartment_complex_image.id;


--
-- TOC entry 180 (class 1259 OID 18975)
-- Name: apartment_complex_transportation; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE apartment_complex_transportation (
    id bigint NOT NULL,
    "complexId" bigint NOT NULL,
    "shuttleRoute" text NOT NULL,
    "busLine" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE apartment_complex_transportation OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 18982)
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE apartment_complex_transportation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE apartment_complex_transportation_id_seq OWNER TO postgres;

--
-- TOC entry 2627 (class 0 OID 0)
-- Dependencies: 181
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_transportation_id_seq OWNED BY apartment_complex_transportation.id;


--
-- TOC entry 182 (class 1259 OID 18984)
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE articles (
    id bigint NOT NULL,
    title text,
    content text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" bigint
);


ALTER TABLE articles OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 18990)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE articles_id_seq OWNER TO postgres;

--
-- TOC entry 2628 (class 0 OID 0)
-- Dependencies: 183
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE articles_id_seq OWNED BY articles.id;


--
-- TOC entry 184 (class 1259 OID 18992)
-- Name: friend; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE friend (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "friendId" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE friend OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 18996)
-- Name: friend_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE friend_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE friend_id_seq OWNER TO postgres;

--
-- TOC entry 2629 (class 0 OID 0)
-- Dependencies: 185
-- Name: friend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE friend_id_seq OWNED BY friend.id;


--
-- TOC entry 186 (class 1259 OID 18998)
-- Name: invitee; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE invitee (
    id bigint NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "invitorId" bigint NOT NULL,
    roommate boolean,
    email text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE invitee OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 19005)
-- Name: lease; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE lease (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    approved boolean,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "paymentAmount" double precision NOT NULL,
    "paymentInterval" "lease_paymentInterval" NOT NULL,
    "securityDeposit" double precision,
    "petDeposit" double precision,
    payee text,
    built timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE lease OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 19012)
-- Name: lease_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE lease_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lease_id_seq OWNER TO postgres;

--
-- TOC entry 2630 (class 0 OID 0)
-- Dependencies: 188
-- Name: lease_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE lease_id_seq OWNED BY lease.id;


--
-- TOC entry 189 (class 1259 OID 19014)
-- Name: lessee; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE lessee (
    "leaseId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE lessee OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 19018)
-- Name: looking; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE looking (
    id bigint NOT NULL,
    "maxMonthlyRent" integer NOT NULL,
    "utilitiesIncluded" boolean NOT NULL,
    area text,
    "distanceToUniv" double precision,
    "moveInDate" timestamp with time zone DEFAULT now() NOT NULL,
    "lengthOfStay" integer,
    "openToFullYearLeaseNewRoomates" boolean,
    "roomType" "looking_roomType",
    "sharedBathroom" boolean,
    gender looking_gender DEFAULT 'no preference'::looking_gender NOT NULL,
    "numRoommates" integer,
    furnished boolean,
    "busRouteRequired" boolean,
    "parkingNeeded" boolean,
    "smokingAllowed" boolean,
    "petsAllowed" boolean,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "userId" bigint NOT NULL
);


ALTER TABLE looking OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 19027)
-- Name: looking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE looking_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE looking_id_seq OWNER TO postgres;

--
-- TOC entry 2631 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE looking_id_seq OWNED BY looking.id;


--
-- TOC entry 192 (class 1259 OID 19029)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE payment (
    id bigint NOT NULL,
    "payerId" bigint NOT NULL,
    "payeeId" bigint NOT NULL,
    "dollarAmount" double precision,
    reason text,
    "rentPayment" boolean DEFAULT false,
    "creditCheckPayment" boolean DEFAULT false,
    "paymentForm" "payment_paymentForm",
    "paymentDate" timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE payment OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 19039)
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment_id_seq OWNER TO postgres;

--
-- TOC entry 2632 (class 0 OID 0)
-- Dependencies: 193
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE payment_id_seq OWNED BY payment.id;


--
-- TOC entry 194 (class 1259 OID 19041)
-- Name: pet; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE pet (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    type pet_type NOT NULL,
    breed text NOT NULL,
    "weightLbs" bigint,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE pet OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 19048)
-- Name: pet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE pet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pet_id_seq OWNER TO postgres;

--
-- TOC entry 2633 (class 0 OID 0)
-- Dependencies: 195
-- Name: pet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE pet_id_seq OWNED BY pet.id;


--
-- TOC entry 196 (class 1259 OID 19050)
-- Name: property; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property (
    id bigint NOT NULL,
    "streetNumeric" integer NOT NULL,
    "streetAddress" text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    apt text,
    bldg text,
    latitude numeric(10,8),
    longitude numeric(11,8),
    type property_type,
    description text,
    bedrooms integer,
    bathrooms integer,
    "parkingSpots" integer,
    "livingAreaSqFt" integer,
    "hoaFee" integer,
    "otherFee" integer,
    status property_status,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 19057)
-- Name: property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_id_seq OWNER TO postgres;

--
-- TOC entry 2634 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_id_seq OWNED BY property.id;


--
-- TOC entry 198 (class 1259 OID 19059)
-- Name: property_images; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_images (
    id bigint NOT NULL,
    "listingId" bigint,
    "propertyId" bigint NOT NULL,
    location text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_images OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 19066)
-- Name: property_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_images_id_seq OWNER TO postgres;

--
-- TOC entry 2635 (class 0 OID 0)
-- Dependencies: 199
-- Name: property_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_images_id_seq OWNED BY property_images.id;


--
-- TOC entry 200 (class 1259 OID 19068)
-- Name: property_lease_defaults; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_lease_defaults (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    "ownerId" bigint NOT NULL,
    "qtyDogsAllowed" integer DEFAULT 0 NOT NULL,
    "qtyCatsAllowed" integer DEFAULT 0 NOT NULL,
    "qtyOtherAllowed" integer DEFAULT 0 NOT NULL,
    "animalSizeLimitLbs" integer DEFAULT 25 NOT NULL,
    "fishTankAllowed" boolean DEFAULT false NOT NULL,
    "preferredLeaseLength" integer NOT NULL,
    "preferredLeaseUnit" "property_lease_defaults_preferredLeaseUnit" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_lease_defaults OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 19077)
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_lease_defaults_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_lease_defaults_id_seq OWNER TO postgres;

--
-- TOC entry 2636 (class 0 OID 0)
-- Dependencies: 201
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_lease_defaults_id_seq OWNED BY property_lease_defaults.id;


--
-- TOC entry 202 (class 1259 OID 19079)
-- Name: property_likes; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_likes (
    "propertyId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    id bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_likes OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 19083)
-- Name: property_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_likes_id_seq OWNER TO postgres;

--
-- TOC entry 2637 (class 0 OID 0)
-- Dependencies: 203
-- Name: property_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_likes_id_seq OWNED BY property_likes.id;


--
-- TOC entry 204 (class 1259 OID 19085)
-- Name: property_listing; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_listing (
    "propertyId" bigint NOT NULL,
    "monthlyPrice" double precision NOT NULL,
    "securityDeposit" double precision DEFAULT (0)::double precision,
    "petDeposit" double precision DEFAULT (0)::double precision,
    "availableMoveIn" timestamp with time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    "leaseEndDate" timestamp with time zone,
    "leaseLength" integer NOT NULL,
    "leaseLengthUnit" "property_listing_leaseLengthUnit" NOT NULL,
    "leaseType" "property_listing_leaseType" NOT NULL,
    gender property_listing_gender DEFAULT 'no preference'::property_listing_gender NOT NULL,
    "totalUtilityCost" integer NOT NULL,
    "roomType" "property_listing_roomType" NOT NULL,
    "sharedBathroom" boolean,
    "numRoomates" integer NOT NULL,
    furnished boolean,
    "parkingAvailable" boolean,
    "smokingAllowed" boolean,
    description text,
    status property_listing_status DEFAULT 'available'::property_listing_status,
    "contactPhone" bigint,
    "contactEmail" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_listing OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 19097)
-- Name: property_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_listing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_listing_id_seq OWNER TO postgres;

--
-- TOC entry 2638 (class 0 OID 0)
-- Dependencies: 205
-- Name: property_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_listing_id_seq OWNED BY property_listing.id;


--
-- TOC entry 206 (class 1259 OID 19099)
-- Name: property_owner; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_owner (
    "propertyOwnershipId" bigint NOT NULL,
    "ownerId" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_owner OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 19103)
-- Name: property_ownership; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE property_ownership (
    "startDate" timestamp with time zone DEFAULT now() NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    "propertyFK" bigint NOT NULL,
    id bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE property_ownership OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 19108)
-- Name: property_ownership_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE property_ownership_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE property_ownership_id_seq OWNER TO postgres;

--
-- TOC entry 2639 (class 0 OID 0)
-- Dependencies: 208
-- Name: property_ownership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_ownership_id_seq OWNED BY property_ownership.id;


--
-- TOC entry 209 (class 1259 OID 19110)
-- Name: rental_applicant; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE rental_applicant (
    "userId" bigint NOT NULL,
    id bigint NOT NULL,
    "rentalAppId" bigint NOT NULL,
    "shareCredit" boolean,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE rental_applicant OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 19114)
-- Name: rental_applicant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rental_applicant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rental_applicant_id_seq OWNER TO postgres;

--
-- TOC entry 2640 (class 0 OID 0)
-- Dependencies: 210
-- Name: rental_applicant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_applicant_id_seq OWNED BY rental_applicant.id;


--
-- TOC entry 211 (class 1259 OID 19116)
-- Name: rental_application; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE rental_application (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    "preferredLeaseLength" integer,
    "preferredMoveIn" timestamp with time zone NOT NULL,
    "numOccupants" bigint DEFAULT (1)::bigint NOT NULL,
    "moveReason" text,
    "preferredLeaseLengthUnit" "rental_application_preferredLeaseLengthUnit",
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE rental_application OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 19124)
-- Name: rental_application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rental_application_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rental_application_id_seq OWNER TO postgres;

--
-- TOC entry 2641 (class 0 OID 0)
-- Dependencies: 212
-- Name: rental_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_application_id_seq OWNED BY rental_application.id;


--
-- TOC entry 213 (class 1259 OID 19126)
-- Name: rented_user; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE rented_user (
    id bigint NOT NULL,
    username text,
    email text NOT NULL,
    "confirmedEmail" boolean DEFAULT false NOT NULL,
    password text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    middlename text,
    "aboutMe" text,
    phone bigint,
    "profileImage" text,
    twitter text,
    facebook text,
    googleplus text,
    linkedin text,
    "experianIdToken" text,
    "creditCheckToken" text,
    "runIdentityCheck" boolean DEFAULT false NOT NULL,
    "shareCreditReport" boolean DEFAULT false NOT NULL,
    "identityDate" timestamp with time zone,
    "creditReportDate" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    role text DEFAULT 'user'::text,
    provider text,
    "facebookOAuthId" text,
    "googleOAuthId" text,
    "twitterOAuthId" text,
    salt text NOT NULL
);


ALTER TABLE rented_user OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 19137)
-- Name: rented_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rented_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rented_user_id_seq OWNER TO postgres;

--
-- TOC entry 2642 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rented_user_id_seq OWNED BY rented_user.id;


--
-- TOC entry 215 (class 1259 OID 19139)
-- Name: room_listing; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE room_listing (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    "creatorId" bigint NOT NULL,
    "monthlyPrice" double precision NOT NULL,
    "securityDeposit" double precision DEFAULT (0)::double precision,
    "availableMoveIn" timestamp with time zone DEFAULT now() NOT NULL,
    "leaseEndDate" timestamp with time zone,
    "leaseType" "room_listing_leaseType" NOT NULL,
    gender room_listing_gender DEFAULT 'no preference'::room_listing_gender NOT NULL,
    "monthlyUtilityCost" integer NOT NULL,
    "roomType" "room_listing_roomType" NOT NULL,
    "sharedBathroom" boolean,
    "numRoomates" integer NOT NULL,
    furnished boolean,
    "parkingAvailable" boolean,
    "smokingAllowed" boolean,
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE room_listing OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 19149)
-- Name: room_listing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE room_listing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE room_listing_id_seq OWNER TO postgres;

--
-- TOC entry 2643 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE room_listing_id_seq OWNED BY room_listing.id;


--
-- TOC entry 240 (class 1259 OID 19600)
-- Name: room_listing_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW room_listing_view AS
 SELECT p."streetNumeric",
    p."streetAddress",
    p.city,
    p.state,
    p.zip,
    p.apt,
    p.bldg,
    p.type,
    p.bedrooms,
    p.bathrooms,
    rl.id,
    rl."propertyId",
    rl."creatorId",
    rl."monthlyPrice",
    rl."securityDeposit",
    rl."availableMoveIn",
    rl."leaseEndDate",
    rl."leaseType",
    rl.gender,
    rl."monthlyUtilityCost",
    rl."roomType",
    rl."sharedBathroom",
    rl."numRoomates",
    rl.furnished,
    rl."parkingAvailable",
    rl."smokingAllowed",
    rl.description,
    rl."createdAt",
    rl."updatedAt",
    rl."deletedAt"
   FROM property p,
    room_listing rl
  WHERE (rl."propertyId" = p.id);


ALTER TABLE room_listing_view OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 19151)
-- Name: roommate; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE roommate (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "roommateId" bigint NOT NULL,
    "fromDate" timestamp with time zone DEFAULT now() NOT NULL,
    "toDate" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE roommate OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 19156)
-- Name: roommate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE roommate_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE roommate_id_seq OWNER TO postgres;

--
-- TOC entry 2644 (class 0 OID 0)
-- Dependencies: 218
-- Name: roommate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE roommate_id_seq OWNED BY roommate.id;


--
-- TOC entry 219 (class 1259 OID 19158)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE student (
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text,
    "Street" text NOT NULL,
    city text NOT NULL
);


ALTER TABLE student OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 19164)
-- Name: university; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE university (
    id bigint NOT NULL,
    name text NOT NULL,
    "academicYearType" "university_academicYearType" DEFAULT 'semester'::"university_academicYearType",
    "streetNumeric" integer NOT NULL,
    "streetAddress" text NOT NULL,
    apt text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE university OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 19172)
-- Name: university_calender_quater; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE university_calender_quater (
    id bigint NOT NULL,
    "universityId" bigint NOT NULL,
    year integer NOT NULL,
    "fallQuaterStartDate" timestamp with time zone NOT NULL,
    "fallQuaterEndDate" timestamp with time zone NOT NULL,
    "winterQuaterStartDate" timestamp with time zone NOT NULL,
    "winterQuaterEndDate" timestamp with time zone NOT NULL,
    "springQuaterStartDate" timestamp with time zone NOT NULL,
    "springQuaterEndDate" timestamp with time zone NOT NULL,
    "summerQuaterStartDate" timestamp with time zone NOT NULL,
    "summerQuaterEndDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE university_calender_quater OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 19176)
-- Name: university_calender_quater_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE university_calender_quater_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE university_calender_quater_id_seq OWNER TO postgres;

--
-- TOC entry 2645 (class 0 OID 0)
-- Dependencies: 222
-- Name: university_calender_quater_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_quater_id_seq OWNED BY university_calender_quater.id;


--
-- TOC entry 223 (class 1259 OID 19178)
-- Name: university_calender_semester; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE university_calender_semester (
    id bigint NOT NULL,
    "universityId" bigint NOT NULL,
    year integer NOT NULL,
    "fallSemesterStartDate" timestamp with time zone NOT NULL,
    "fallSemesterEndDate" timestamp with time zone NOT NULL,
    "springSemesterStartDate" timestamp with time zone NOT NULL,
    "springSemesterEndDate" timestamp with time zone NOT NULL,
    "summerSemesterStartDate" timestamp with time zone NOT NULL,
    "summerSemesterEndDate" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE university_calender_semester OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 19182)
-- Name: university_calender_semester_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE university_calender_semester_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE university_calender_semester_id_seq OWNER TO postgres;

--
-- TOC entry 2646 (class 0 OID 0)
-- Dependencies: 224
-- Name: university_calender_semester_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_semester_id_seq OWNED BY university_calender_semester.id;


--
-- TOC entry 225 (class 1259 OID 19184)
-- Name: university_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE university_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE university_id_seq OWNER TO postgres;

--
-- TOC entry 2647 (class 0 OID 0)
-- Dependencies: 225
-- Name: university_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_id_seq OWNED BY university.id;


--
-- TOC entry 226 (class 1259 OID 19186)
-- Name: user_cosigner; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_cosigner (
    id bigint NOT NULL,
    "cosingeeId" bigint NOT NULL,
    "cosginerId" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_cosigner OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 19190)
-- Name: user_cosigner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_cosigner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_cosigner_id_seq OWNER TO postgres;

--
-- TOC entry 2648 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_cosigner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_cosigner_id_seq OWNED BY user_cosigner.id;


--
-- TOC entry 228 (class 1259 OID 19192)
-- Name: user_education; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_education (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "educationCenterName" text NOT NULL,
    type user_education_type DEFAULT 'university'::user_education_type,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone,
    graduation boolean DEFAULT false NOT NULL,
    "graduationDate" timestamp with time zone,
    major text,
    "degreeType" "user_education_degreeType",
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_education OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 19201)
-- Name: user_education_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_education_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_education_id_seq OWNER TO postgres;

--
-- TOC entry 2649 (class 0 OID 0)
-- Dependencies: 229
-- Name: user_education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_education_id_seq OWNED BY user_education.id;


--
-- TOC entry 230 (class 1259 OID 19203)
-- Name: user_financial; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_financial (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone,
    "individualAnnualIncom" bigint,
    "householdAnnualIncome" bigint,
    "spouseAnnualIncome" bigint,
    "incomeProof" text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_financial OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 19210)
-- Name: user_financial_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_financial_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_financial_id_seq OWNER TO postgres;

--
-- TOC entry 2650 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_financial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_financial_id_seq OWNED BY user_financial.id;


--
-- TOC entry 232 (class 1259 OID 19212)
-- Name: user_occupation; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_occupation (
    id bigint NOT NULL,
    role text NOT NULL,
    company text NOT NULL,
    start timestamp with time zone NOT NULL,
    "end" timestamp with time zone,
    "presentlyEmployeed" boolean DEFAULT false NOT NULL,
    "userId" bigint NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_occupation OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 19220)
-- Name: user_occupation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_occupation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_occupation_id_seq OWNER TO postgres;

--
-- TOC entry 2651 (class 0 OID 0)
-- Dependencies: 233
-- Name: user_occupation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_occupation_id_seq OWNED BY user_occupation.id;


--
-- TOC entry 234 (class 1259 OID 19222)
-- Name: user_recommendation; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_recommendation (
    id bigint NOT NULL,
    "recommendedId" bigint NOT NULL,
    "recommendorId" bigint NOT NULL,
    "recommendedApproved" boolean DEFAULT false NOT NULL,
    content text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_recommendation OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 19230)
-- Name: user_recommendation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_recommendation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_recommendation_id_seq OWNER TO postgres;

--
-- TOC entry 2652 (class 0 OID 0)
-- Dependencies: 235
-- Name: user_recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_recommendation_id_seq OWNED BY user_recommendation.id;


--
-- TOC entry 236 (class 1259 OID 19232)
-- Name: user_reference; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_reference (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    email text NOT NULL,
    phone bigint NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    relation user_reference_relation NOT NULL,
    "startDate" timestamp with time zone DEFAULT now() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_reference OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 19240)
-- Name: user_reference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_reference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_reference_id_seq OWNER TO postgres;

--
-- TOC entry 2653 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_reference_id_seq OWNED BY user_reference.id;


--
-- TOC entry 238 (class 1259 OID 19242)
-- Name: user_vehicle; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_vehicle (
    id bigint NOT NULL,
    year bigint NOT NULL,
    make text NOT NULL,
    model text NOT NULL,
    "licensePlate" text NOT NULL,
    color text NOT NULL,
    "userId" bigint,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE user_vehicle OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 19249)
-- Name: user_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_vehicle_id_seq OWNER TO postgres;

--
-- TOC entry 2654 (class 0 OID 0)
-- Dependencies: 239
-- Name: user_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_vehicle_id_seq OWNED BY user_vehicle.id;


--
-- TOC entry 2176 (class 2604 OID 19251)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history ALTER COLUMN id SET DEFAULT nextval('address_history_id_seq'::regclass);


--
-- TOC entry 2185 (class 2604 OID 19252)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex ALTER COLUMN id SET DEFAULT nextval('apartment_complex_id_seq'::regclass);


--
-- TOC entry 2190 (class 2604 OID 19253)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan ALTER COLUMN id SET DEFAULT nextval('apartment_complex_floor_plan_id_seq'::regclass);


--
-- TOC entry 2192 (class 2604 OID 19254)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image ALTER COLUMN id SET DEFAULT nextval('apartment_complex_image_id_seq'::regclass);


--
-- TOC entry 2194 (class 2604 OID 19255)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation ALTER COLUMN id SET DEFAULT nextval('apartment_complex_transportation_id_seq'::regclass);


--
-- TOC entry 2195 (class 2604 OID 19256)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY articles ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'::regclass);


--
-- TOC entry 2197 (class 2604 OID 19257)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend ALTER COLUMN id SET DEFAULT nextval('friend_id_seq'::regclass);


--
-- TOC entry 2200 (class 2604 OID 19258)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease ALTER COLUMN id SET DEFAULT nextval('lease_id_seq'::regclass);


--
-- TOC entry 2205 (class 2604 OID 19259)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY looking ALTER COLUMN id SET DEFAULT nextval('looking_id_seq'::regclass);


--
-- TOC entry 2210 (class 2604 OID 19260)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('payment_id_seq'::regclass);


--
-- TOC entry 2212 (class 2604 OID 19261)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet ALTER COLUMN id SET DEFAULT nextval('pet_id_seq'::regclass);


--
-- TOC entry 2214 (class 2604 OID 19262)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property ALTER COLUMN id SET DEFAULT nextval('property_id_seq'::regclass);


--
-- TOC entry 2216 (class 2604 OID 19263)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images ALTER COLUMN id SET DEFAULT nextval('property_images_id_seq'::regclass);


--
-- TOC entry 2223 (class 2604 OID 19264)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults ALTER COLUMN id SET DEFAULT nextval('property_lease_defaults_id_seq'::regclass);


--
-- TOC entry 2225 (class 2604 OID 19265)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes ALTER COLUMN id SET DEFAULT nextval('property_likes_id_seq'::regclass);


--
-- TOC entry 2232 (class 2604 OID 19266)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing ALTER COLUMN id SET DEFAULT nextval('property_listing_id_seq'::regclass);


--
-- TOC entry 2236 (class 2604 OID 19267)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership ALTER COLUMN id SET DEFAULT nextval('property_ownership_id_seq'::regclass);


--
-- TOC entry 2238 (class 2604 OID 19268)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant ALTER COLUMN id SET DEFAULT nextval('rental_applicant_id_seq'::regclass);


--
-- TOC entry 2241 (class 2604 OID 19269)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application ALTER COLUMN id SET DEFAULT nextval('rental_application_id_seq'::regclass);


--
-- TOC entry 2247 (class 2604 OID 19270)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rented_user ALTER COLUMN id SET DEFAULT nextval('rented_user_id_seq'::regclass);


--
-- TOC entry 2252 (class 2604 OID 19271)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing ALTER COLUMN id SET DEFAULT nextval('room_listing_id_seq'::regclass);


--
-- TOC entry 2255 (class 2604 OID 19272)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate ALTER COLUMN id SET DEFAULT nextval('roommate_id_seq'::regclass);


--
-- TOC entry 2258 (class 2604 OID 19273)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university ALTER COLUMN id SET DEFAULT nextval('university_id_seq'::regclass);


--
-- TOC entry 2260 (class 2604 OID 19274)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater ALTER COLUMN id SET DEFAULT nextval('university_calender_quater_id_seq'::regclass);


--
-- TOC entry 2262 (class 2604 OID 19275)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester ALTER COLUMN id SET DEFAULT nextval('university_calender_semester_id_seq'::regclass);


--
-- TOC entry 2264 (class 2604 OID 19276)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner ALTER COLUMN id SET DEFAULT nextval('user_cosigner_id_seq'::regclass);


--
-- TOC entry 2268 (class 2604 OID 19277)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education ALTER COLUMN id SET DEFAULT nextval('user_education_id_seq'::regclass);


--
-- TOC entry 2270 (class 2604 OID 19278)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial ALTER COLUMN id SET DEFAULT nextval('user_financial_id_seq'::regclass);


--
-- TOC entry 2273 (class 2604 OID 19279)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation ALTER COLUMN id SET DEFAULT nextval('user_occupation_id_seq'::regclass);


--
-- TOC entry 2276 (class 2604 OID 19280)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation ALTER COLUMN id SET DEFAULT nextval('user_recommendation_id_seq'::regclass);


--
-- TOC entry 2279 (class 2604 OID 19281)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference ALTER COLUMN id SET DEFAULT nextval('user_reference_id_seq'::regclass);


--
-- TOC entry 2281 (class 2604 OID 19282)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle ALTER COLUMN id SET DEFAULT nextval('user_vehicle_id_seq'::regclass);


--
-- TOC entry 2547 (class 0 OID 18931)
-- Dependencies: 172
-- Data for Name: address_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY address_history (id, "streetNumeric", "streetAddress", apt, city, state, zip, "startDate", "endDate", "userId", "aboutMe", present, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2655 (class 0 OID 0)
-- Dependencies: 173
-- Name: address_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('address_history_id_seq', 1, true);


--
-- TOC entry 2549 (class 0 OID 18941)
-- Dependencies: 174
-- Data for Name: apartment_complex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex (id, name, "streetNumeric", "streetAddress", city, state, zip, latitude, longitude, "distanceToUniv", "petsAllowed", "dogsAllowed", "catsAllowed", "othersAllowed", "dogQtyAllowed", "catQtyAllowed", "otherQtyAllowed", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2550 (class 0 OID 18955)
-- Dependencies: 175
-- Data for Name: apartment_complex_floor_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_floor_plan (id, "complexId", bedrooms, bathrooms, parking, living_area, washer_dryer, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2656 (class 0 OID 0)
-- Dependencies: 176
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_floor_plan_id_seq', 1, true);


--
-- TOC entry 2657 (class 0 OID 0)
-- Dependencies: 177
-- Name: apartment_complex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_id_seq', 1, true);


--
-- TOC entry 2553 (class 0 OID 18966)
-- Dependencies: 178
-- Data for Name: apartment_complex_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_image (id, "complexId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2658 (class 0 OID 0)
-- Dependencies: 179
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_image_id_seq', 1, true);


--
-- TOC entry 2555 (class 0 OID 18975)
-- Dependencies: 180
-- Data for Name: apartment_complex_transportation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_transportation (id, "complexId", "shuttleRoute", "busLine", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2659 (class 0 OID 0)
-- Dependencies: 181
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_transportation_id_seq', 1, true);


--
-- TOC entry 2557 (class 0 OID 18984)
-- Dependencies: 182
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY articles (id, title, content, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- TOC entry 2660 (class 0 OID 0)
-- Dependencies: 183
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('articles_id_seq', 1, true);


--
-- TOC entry 2559 (class 0 OID 18992)
-- Dependencies: 184
-- Data for Name: friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY friend (id, "userId", "friendId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2661 (class 0 OID 0)
-- Dependencies: 185
-- Name: friend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('friend_id_seq', 1, true);


--
-- TOC entry 2561 (class 0 OID 18998)
-- Dependencies: 186
-- Data for Name: invitee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY invitee (id, "firstName", "lastName", "invitorId", roommate, email, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2562 (class 0 OID 19005)
-- Dependencies: 187
-- Data for Name: lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lease (id, "propertyId", approved, "startDate", "endDate", "paymentAmount", "paymentInterval", "securityDeposit", "petDeposit", payee, built, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 188
-- Name: lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('lease_id_seq', 1, true);


--
-- TOC entry 2564 (class 0 OID 19014)
-- Dependencies: 189
-- Data for Name: lessee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lessee ("leaseId", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2565 (class 0 OID 19018)
-- Dependencies: 190
-- Data for Name: looking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY looking (id, "maxMonthlyRent", "utilitiesIncluded", area, "distanceToUniv", "moveInDate", "lengthOfStay", "openToFullYearLeaseNewRoomates", "roomType", "sharedBathroom", gender, "numRoommates", furnished, "busRouteRequired", "parkingNeeded", "smokingAllowed", "petsAllowed", "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
\.


--
-- TOC entry 2663 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 1, true);


--
-- TOC entry 2567 (class 0 OID 19029)
-- Dependencies: 192
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY payment (id, "payerId", "payeeId", "dollarAmount", reason, "rentPayment", "creditCheckPayment", "paymentForm", "paymentDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2664 (class 0 OID 0)
-- Dependencies: 193
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('payment_id_seq', 1, true);


--
-- TOC entry 2569 (class 0 OID 19041)
-- Dependencies: 194
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY pet (id, "userId", type, breed, "weightLbs", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2665 (class 0 OID 0)
-- Dependencies: 195
-- Name: pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('pet_id_seq', 1, true);


--
-- TOC entry 2571 (class 0 OID 19050)
-- Dependencies: 196
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property (id, "streetNumeric", "streetAddress", city, state, zip, apt, bldg, latitude, longitude, type, description, bedrooms, bathrooms, "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	1	Grabova ulica	Split	HR	21000	8	8	43.51715140	16.49958100	townhouse	alo	8	8	8	8	8	8	pending	2015-02-28 02:00:07.899+01	\N	\N
\.


--
-- TOC entry 2666 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 2, true);


--
-- TOC entry 2573 (class 0 OID 19059)
-- Dependencies: 198
-- Data for Name: property_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_images (id, "listingId", "propertyId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2667 (class 0 OID 0)
-- Dependencies: 199
-- Name: property_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_images_id_seq', 1, true);


--
-- TOC entry 2575 (class 0 OID 19068)
-- Dependencies: 200
-- Data for Name: property_lease_defaults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_lease_defaults (id, "propertyId", "ownerId", "qtyDogsAllowed", "qtyCatsAllowed", "qtyOtherAllowed", "animalSizeLimitLbs", "fishTankAllowed", "preferredLeaseLength", "preferredLeaseUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2668 (class 0 OID 0)
-- Dependencies: 201
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_lease_defaults_id_seq', 1, true);


--
-- TOC entry 2577 (class 0 OID 19079)
-- Dependencies: 202
-- Data for Name: property_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_likes ("propertyId", "userId", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2669 (class 0 OID 0)
-- Dependencies: 203
-- Name: property_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_likes_id_seq', 1, true);


--
-- TOC entry 2579 (class 0 OID 19085)
-- Dependencies: 204
-- Data for Name: property_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_listing ("propertyId", "monthlyPrice", "securityDeposit", "petDeposit", "availableMoveIn", id, "leaseEndDate", "leaseLength", "leaseLengthUnit", "leaseType", gender, "totalUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", description, status, "contactPhone", "contactEmail", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2670 (class 0 OID 0)
-- Dependencies: 205
-- Name: property_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_listing_id_seq', 1, true);


--
-- TOC entry 2581 (class 0 OID 19099)
-- Dependencies: 206
-- Data for Name: property_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_owner ("propertyOwnershipId", "ownerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	2	2015-02-28 02:00:08.342+01	\N	\N
\.


--
-- TOC entry 2582 (class 0 OID 19103)
-- Dependencies: 207
-- Data for Name: property_ownership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_ownership ("startDate", "endDate", "propertyFK", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
2015-02-28 02:00:08.094+01	2015-02-28 02:00:08.094+01	2	2	2015-02-28 02:00:08.094+01	\N	\N
\.


--
-- TOC entry 2671 (class 0 OID 0)
-- Dependencies: 208
-- Name: property_ownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_ownership_id_seq', 2, true);


--
-- TOC entry 2584 (class 0 OID 19110)
-- Dependencies: 209
-- Data for Name: rental_applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_applicant ("userId", id, "rentalAppId", "shareCredit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2672 (class 0 OID 0)
-- Dependencies: 210
-- Name: rental_applicant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_applicant_id_seq', 1, true);


--
-- TOC entry 2586 (class 0 OID 19116)
-- Dependencies: 211
-- Data for Name: rental_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_application (id, "propertyId", "preferredLeaseLength", "preferredMoveIn", "numOccupants", "moveReason", "preferredLeaseLengthUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2673 (class 0 OID 0)
-- Dependencies: 212
-- Name: rental_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_application_id_seq', 1, true);


--
-- TOC entry 2588 (class 0 OID 19126)
-- Dependencies: 213
-- Data for Name: rented_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rented_user (id, username, email, "confirmedEmail", password, firstname, lastname, middlename, "aboutMe", phone, "profileImage", twitter, facebook, googleplus, linkedin, "experianIdToken", "creditCheckToken", "runIdentityCheck", "shareCreditReport", "identityDate", "creditReportDate", "createdAt", "updatedAt", "deletedAt", role, provider, "facebookOAuthId", "googleOAuthId", "twitterOAuthId", salt) FROM stdin;
2	\N	imornar@gmail.com	f	21Bu7CgEAeKc2h/IfWbBfBmkS597Jg+/MDT8AMgRWDHQRvJxzVpHdoNkZeLalmoun1o3c5K4NzvUi3rE0UQ+sQ==	Ivan	Mornar	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-02-28 01:59:27.445+01	\N	\N	user	local	\N	\N	\N	3gpKmpfUWUDm5ua9YOBtBA==
13	Ivan Mornar	ivan.mornar@toptal.com	f	95CfpADwWqUs8rsoqa/H3GWkxNW6DkVTxcJzWEOPRwlNlccXxO7n1qYp8wjQqcTyyZ291yrtiV5vGwI2dJ0SnQ==	Ivan	Mornar	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-02 11:58:34.804+01	\N	\N	user	google	\N	106535586697542841615	\N	183dUYJ6gq3mLiXXribxwg==
14	Ivan Kraljina Mornar	imornar@gmail.com	f	2oG2UFdyTK71ypGdniYJjXU0cJqI/5RpRnidKHegcVcWLr3QN5wcClTmwyTr5PSzhimw1us6JAmFLNj6QrQB1g==	Ivan	Mornar	Kraljina	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-02 12:49:53.207+01	\N	\N	user	facebook	10204963775268656	\N	\N	tHucC6SA3+FJPpdywgMvDg==
15	Andrea Aljinović	andrea.aljinovic@efst.hr	f	tlwQuX4hNCiayiWTknlsgmSKICAUTcEfRcIv1cygfaXL2uMgxWAYnS6MJN9/6fRGBpCIK+8CmPlcSrckKRtaOQ==	Andrea	Aljinović	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-02 13:25:10.77+01	\N	\N	user	facebook	10204393293206034	\N	\N	HXm2ELgOmSW3790KL+sVIA==
16	\N	a@a.com	f	xdlLQaQ8Xok593nNfCA7FeG8nxxpcV0Dq8pWymQVfdEYuljP+igHAqpxlixDRY3xz/vxqktd3+TC0dc4cH+wfA==	a	a	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-02 21:30:36.418+01	\N	\N	user	local	\N	\N	\N	VyDQp2XgtW/4NVyKKZgj2A==
\.


--
-- TOC entry 2674 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rented_user_id_seq', 16, true);


--
-- TOC entry 2590 (class 0 OID 19139)
-- Dependencies: 215
-- Data for Name: room_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY room_listing (id, "propertyId", "creatorId", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", gender, "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", description, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2675 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 1, true);


--
-- TOC entry 2592 (class 0 OID 19151)
-- Dependencies: 217
-- Data for Name: roommate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY roommate (id, "userId", "roommateId", "fromDate", "toDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2676 (class 0 OID 0)
-- Dependencies: 218
-- Name: roommate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 1, true);


--
-- TOC entry 2594 (class 0 OID 19158)
-- Dependencies: 219
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (firstname, lastname, email, "Street", city) FROM stdin;
\.


--
-- TOC entry 2595 (class 0 OID 19164)
-- Dependencies: 220
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university (id, name, "academicYearType", "streetNumeric", "streetAddress", apt, city, state, zip, latitude, longitude, "startDate", "endDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2596 (class 0 OID 19172)
-- Dependencies: 221
-- Data for Name: university_calender_quater; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_quater (id, "universityId", year, "fallQuaterStartDate", "fallQuaterEndDate", "winterQuaterStartDate", "winterQuaterEndDate", "springQuaterStartDate", "springQuaterEndDate", "summerQuaterStartDate", "summerQuaterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2677 (class 0 OID 0)
-- Dependencies: 222
-- Name: university_calender_quater_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_quater_id_seq', 1, true);


--
-- TOC entry 2598 (class 0 OID 19178)
-- Dependencies: 223
-- Data for Name: university_calender_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_semester (id, "universityId", year, "fallSemesterStartDate", "fallSemesterEndDate", "springSemesterStartDate", "springSemesterEndDate", "summerSemesterStartDate", "summerSemesterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2678 (class 0 OID 0)
-- Dependencies: 224
-- Name: university_calender_semester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_semester_id_seq', 1, true);


--
-- TOC entry 2679 (class 0 OID 0)
-- Dependencies: 225
-- Name: university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_id_seq', 1, true);


--
-- TOC entry 2601 (class 0 OID 19186)
-- Dependencies: 226
-- Data for Name: user_cosigner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_cosigner (id, "cosingeeId", "cosginerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2680 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_cosigner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_cosigner_id_seq', 1, true);


--
-- TOC entry 2603 (class 0 OID 19192)
-- Dependencies: 228
-- Data for Name: user_education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_education (id, "userId", "educationCenterName", type, "startDate", "endDate", graduation, "graduationDate", major, "degreeType", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2681 (class 0 OID 0)
-- Dependencies: 229
-- Name: user_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_education_id_seq', 1, true);


--
-- TOC entry 2605 (class 0 OID 19203)
-- Dependencies: 230
-- Data for Name: user_financial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_financial (id, "userId", "startDate", "endDate", "individualAnnualIncom", "householdAnnualIncome", "spouseAnnualIncome", "incomeProof", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2682 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_financial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_financial_id_seq', 1, true);


--
-- TOC entry 2607 (class 0 OID 19212)
-- Dependencies: 232
-- Data for Name: user_occupation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_occupation (id, role, company, start, "end", "presentlyEmployeed", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2683 (class 0 OID 0)
-- Dependencies: 233
-- Name: user_occupation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_occupation_id_seq', 1, true);


--
-- TOC entry 2609 (class 0 OID 19222)
-- Dependencies: 234
-- Data for Name: user_recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_recommendation (id, "recommendedId", "recommendorId", "recommendedApproved", content, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2684 (class 0 OID 0)
-- Dependencies: 235
-- Name: user_recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_recommendation_id_seq', 1, true);


--
-- TOC entry 2611 (class 0 OID 19232)
-- Dependencies: 236
-- Data for Name: user_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_reference (id, "userId", email, phone, "firstName", "lastName", relation, "startDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2685 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_reference_id_seq', 1, true);


--
-- TOC entry 2613 (class 0 OID 19242)
-- Dependencies: 238
-- Data for Name: user_vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_vehicle (id, year, make, model, "licensePlate", color, "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2686 (class 0 OID 0)
-- Dependencies: 239
-- Name: user_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_vehicle_id_seq', 1, true);


--
-- TOC entry 2283 (class 2606 OID 19284)
-- Name: idx_41618_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT "idx_41618_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2286 (class 2606 OID 19286)
-- Name: idx_41629_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex
    ADD CONSTRAINT "idx_41629_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2288 (class 2606 OID 19288)
-- Name: idx_41646_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "idx_41646_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2291 (class 2606 OID 19290)
-- Name: idx_41656_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "idx_41656_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2294 (class 2606 OID 19292)
-- Name: idx_41666_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "idx_41666_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2297 (class 2606 OID 19294)
-- Name: idx_41676_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY articles
    ADD CONSTRAINT "idx_41676_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2299 (class 2606 OID 19296)
-- Name: idx_41685_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "idx_41685_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2303 (class 2606 OID 19298)
-- Name: idx_41690_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "idx_41690_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2306 (class 2606 OID 19300)
-- Name: idx_41707_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "idx_41707_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2309 (class 2606 OID 19302)
-- Name: idx_41715_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "idx_41715_PRIMARY" PRIMARY KEY ("leaseId", "userId");


--
-- TOC entry 2313 (class 2606 OID 19304)
-- Name: idx_41737_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT "idx_41737_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2316 (class 2606 OID 19306)
-- Name: idx_41757_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "idx_41757_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2320 (class 2606 OID 19308)
-- Name: idx_41781_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT "idx_41781_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2323 (class 2606 OID 19310)
-- Name: idx_41807_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property
    ADD CONSTRAINT "idx_41807_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2325 (class 2606 OID 19312)
-- Name: idx_41817_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT "idx_41817_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2329 (class 2606 OID 19314)
-- Name: idx_41837_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT "idx_41837_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2333 (class 2606 OID 19316)
-- Name: idx_41849_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT "idx_41849_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2337 (class 2606 OID 19318)
-- Name: idx_41905_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT "idx_41905_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2340 (class 2606 OID 19320)
-- Name: idx_41918_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "idx_41918_PRIMARY" PRIMARY KEY ("propertyOwnershipId", "ownerId");


--
-- TOC entry 2343 (class 2606 OID 19322)
-- Name: idx_41924_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "idx_41924_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2347 (class 2606 OID 19324)
-- Name: idx_41932_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "idx_41932_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2351 (class 2606 OID 19326)
-- Name: idx_41949_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "idx_41949_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2355 (class 2606 OID 19328)
-- Name: idx_41960_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rented_user
    ADD CONSTRAINT "idx_41960_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2361 (class 2606 OID 19330)
-- Name: idx_41974_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "idx_41974_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2357 (class 2606 OID 19332)
-- Name: idx_42007_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT "idx_42007_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2365 (class 2606 OID 19334)
-- Name: idx_42031_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university
    ADD CONSTRAINT "idx_42031_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2367 (class 2606 OID 19336)
-- Name: idx_42042_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT "idx_42042_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2370 (class 2606 OID 19338)
-- Name: idx_42049_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT "idx_42049_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2373 (class 2606 OID 19340)
-- Name: idx_42056_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT "idx_42056_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2377 (class 2606 OID 19342)
-- Name: idx_42081_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT "idx_42081_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2380 (class 2606 OID 19344)
-- Name: idx_42093_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT "idx_42093_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2383 (class 2606 OID 19346)
-- Name: idx_42103_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT "idx_42103_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2386 (class 2606 OID 19348)
-- Name: idx_42114_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT "idx_42114_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2390 (class 2606 OID 19350)
-- Name: idx_42139_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT "idx_42139_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2393 (class 2606 OID 19352)
-- Name: idx_42150_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT "idx_42150_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2284 (class 1259 OID 19353)
-- Name: idx_41618_addresshistory_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41618_addresshistory_user_idx ON address_history USING btree ("userId");


--
-- TOC entry 2289 (class 1259 OID 19354)
-- Name: idx_41646_aptComplexFloorPlan_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41646_aptComplexFloorPlan_complex_idx" ON apartment_complex_floor_plan USING btree ("complexId");


--
-- TOC entry 2292 (class 1259 OID 19355)
-- Name: idx_41656_aptComplexImage_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41656_aptComplexImage_complex_idx" ON apartment_complex_image USING btree ("complexId");


--
-- TOC entry 2295 (class 1259 OID 19356)
-- Name: idx_41666_aptComplexTrans_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41666_aptComplexTrans_complex_idx" ON apartment_complex_transportation USING btree ("complexId");


--
-- TOC entry 2300 (class 1259 OID 19357)
-- Name: idx_41685_friend_friend_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41685_friend_friend_idx ON friend USING btree ("friendId");


--
-- TOC entry 2301 (class 1259 OID 19358)
-- Name: idx_41685_friend_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41685_friend_user_idx ON friend USING btree ("userId");


--
-- TOC entry 2304 (class 1259 OID 19359)
-- Name: idx_41690_invitee_invitor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41690_invitee_invitor_idx ON invitee USING btree ("invitorId");


--
-- TOC entry 2307 (class 1259 OID 19360)
-- Name: idx_41707_propertyId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41707_propertyId_idx" ON lease USING btree ("propertyId");


--
-- TOC entry 2310 (class 1259 OID 19361)
-- Name: idx_41715_leaseId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41715_leaseId_idx" ON lessee USING btree ("leaseId");


--
-- TOC entry 2311 (class 1259 OID 19362)
-- Name: idx_41715_lessee_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41715_lessee_user_idx ON lessee USING btree ("userId");


--
-- TOC entry 2314 (class 1259 OID 19621)
-- Name: idx_41737_looking_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41737_looking_user_idx ON looking USING btree ("userId");


--
-- TOC entry 2317 (class 1259 OID 19363)
-- Name: idx_41757_payment_payee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41757_payment_payee_idx ON payment USING btree ("payeeId");


--
-- TOC entry 2318 (class 1259 OID 19364)
-- Name: idx_41757_payment_payer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41757_payment_payer_idx ON payment USING btree ("payerId");


--
-- TOC entry 2321 (class 1259 OID 19365)
-- Name: idx_41781_pets_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41781_pets_user_idx ON pet USING btree ("userId");


--
-- TOC entry 2326 (class 1259 OID 19366)
-- Name: idx_41817_propertyimages_listing_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41817_propertyimages_listing_idx ON property_images USING btree ("listingId");


--
-- TOC entry 2327 (class 1259 OID 19367)
-- Name: idx_41817_propertyimages_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41817_propertyimages_property_idx ON property_images USING btree ("propertyId");


--
-- TOC entry 2330 (class 1259 OID 19368)
-- Name: idx_41837_propertyleasedefaults_owner_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41837_propertyleasedefaults_owner_idx ON property_lease_defaults USING btree ("ownerId");


--
-- TOC entry 2331 (class 1259 OID 19369)
-- Name: idx_41837_propertyleasedefaults_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41837_propertyleasedefaults_property_idx ON property_lease_defaults USING btree ("propertyId");


--
-- TOC entry 2334 (class 1259 OID 19370)
-- Name: idx_41849_propertylikes_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41849_propertylikes_property_idx ON property_likes USING btree ("propertyId");


--
-- TOC entry 2335 (class 1259 OID 19371)
-- Name: idx_41849_propertylikes_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41849_propertylikes_user_idx ON property_likes USING btree ("userId");


--
-- TOC entry 2338 (class 1259 OID 19372)
-- Name: idx_41905_propertylisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41905_propertylisting_property_idx ON property_listing USING btree ("propertyId");


--
-- TOC entry 2341 (class 1259 OID 19373)
-- Name: idx_41918_propertyowner_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41918_propertyowner_user_idx ON property_owner USING btree ("ownerId");


--
-- TOC entry 2344 (class 1259 OID 19374)
-- Name: idx_41924_propTime; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41924_propTime" ON property_ownership USING btree ("startDate", "endDate", "propertyFK");


--
-- TOC entry 2345 (class 1259 OID 19375)
-- Name: idx_41924_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41924_property_idx ON property_ownership USING btree ("propertyFK");


--
-- TOC entry 2348 (class 1259 OID 19376)
-- Name: idx_41932_rentalAppId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41932_rentalAppId_idx" ON rental_applicant USING btree ("rentalAppId");


--
-- TOC entry 2349 (class 1259 OID 19377)
-- Name: idx_41932_rentalapplicant_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41932_rentalapplicant_user_idx ON rental_applicant USING btree ("userId");


--
-- TOC entry 2352 (class 1259 OID 19378)
-- Name: idx_41949_id_UNIQUE; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE UNIQUE INDEX "idx_41949_id_UNIQUE" ON rental_application USING btree (id);


--
-- TOC entry 2353 (class 1259 OID 19379)
-- Name: idx_41949_propFK_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41949_propFK_idx" ON rental_application USING btree ("propertyId");


--
-- TOC entry 2362 (class 1259 OID 19380)
-- Name: idx_41974_roommate_roomie_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41974_roommate_roomie_idx ON roommate USING btree ("roommateId");


--
-- TOC entry 2363 (class 1259 OID 19381)
-- Name: idx_41974_roommate_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41974_roommate_user_idx ON roommate USING btree ("userId");


--
-- TOC entry 2358 (class 1259 OID 19382)
-- Name: idx_42007_roomlisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42007_roomlisting_property_idx ON room_listing USING btree ("propertyId");


--
-- TOC entry 2359 (class 1259 OID 19383)
-- Name: idx_42007_roomlisting_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42007_roomlisting_user_idx ON room_listing USING btree ("creatorId");


--
-- TOC entry 2368 (class 1259 OID 19384)
-- Name: idx_42042_univcalquarter_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42042_univcalquarter_university_idx ON university_calender_quater USING btree ("universityId");


--
-- TOC entry 2371 (class 1259 OID 19385)
-- Name: idx_42049_univcalsemester_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42049_univcalsemester_university_idx ON university_calender_semester USING btree ("universityId");


--
-- TOC entry 2374 (class 1259 OID 19386)
-- Name: idx_42056_usercosigner_cosginer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42056_usercosigner_cosginer_idx ON user_cosigner USING btree ("cosginerId");


--
-- TOC entry 2375 (class 1259 OID 19387)
-- Name: idx_42056_usercosigner_cosingee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42056_usercosigner_cosingee_idx ON user_cosigner USING btree ("cosingeeId");


--
-- TOC entry 2378 (class 1259 OID 19388)
-- Name: idx_42081_usereducation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42081_usereducation_user_idx ON user_education USING btree ("userId");


--
-- TOC entry 2381 (class 1259 OID 19389)
-- Name: idx_42093_userfinancials_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42093_userfinancials_user_idx ON user_financial USING btree ("userId");


--
-- TOC entry 2384 (class 1259 OID 19390)
-- Name: idx_42103_useroccupation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42103_useroccupation_user_idx ON user_occupation USING btree ("userId");


--
-- TOC entry 2387 (class 1259 OID 19391)
-- Name: idx_42114_userrecommendations_recommended_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42114_userrecommendations_recommended_idx ON user_recommendation USING btree ("recommendedId");


--
-- TOC entry 2388 (class 1259 OID 19392)
-- Name: idx_42114_userrecommendations_recommendor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42114_userrecommendations_recommendor_idx ON user_recommendation USING btree ("recommendorId");


--
-- TOC entry 2391 (class 1259 OID 19393)
-- Name: idx_42139_userreferences_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42139_userreferences_user_idx ON user_reference USING btree ("userId");


--
-- TOC entry 2394 (class 1259 OID 19394)
-- Name: idx_42150_uservehicles_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42150_uservehicles_user_idx ON user_vehicle USING btree ("userId");


--
-- TOC entry 2395 (class 2606 OID 19395)
-- Name: addresshistory_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT addresshistory_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2396 (class 2606 OID 19400)
-- Name: aptComplexFloorPlan_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "aptComplexFloorPlan_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2397 (class 2606 OID 19405)
-- Name: aptComplexImage_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "aptComplexImage_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2398 (class 2606 OID 19410)
-- Name: aptComplexTrans_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "aptComplexTrans_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2399 (class 2606 OID 19415)
-- Name: friend_friendId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "friend_friendId" FOREIGN KEY ("friendId") REFERENCES rented_user(id);


--
-- TOC entry 2400 (class 2606 OID 19420)
-- Name: friend_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT friend_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2401 (class 2606 OID 19425)
-- Name: invitee_invitorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "invitee_invitorId" FOREIGN KEY ("invitorId") REFERENCES rented_user(id);


--
-- TOC entry 2403 (class 2606 OID 19430)
-- Name: leaseId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "leaseId" FOREIGN KEY ("leaseId") REFERENCES lease(id);


--
-- TOC entry 2404 (class 2606 OID 19435)
-- Name: lessee_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT lessee_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2405 (class 2606 OID 19616)
-- Name: looking_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT looking_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2406 (class 2606 OID 19440)
-- Name: payment_payee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payee FOREIGN KEY ("payeeId") REFERENCES rented_user(id);


--
-- TOC entry 2407 (class 2606 OID 19445)
-- Name: payment_payer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payer FOREIGN KEY ("payerId") REFERENCES rented_user(id);


--
-- TOC entry 2408 (class 2606 OID 19450)
-- Name: pets_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT pets_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2421 (class 2606 OID 19455)
-- Name: propFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "propFK" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2418 (class 2606 OID 19460)
-- Name: propertyFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "propertyFK" FOREIGN KEY ("propertyFK") REFERENCES property(id);


--
-- TOC entry 2402 (class 2606 OID 19465)
-- Name: propertyId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "propertyId" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2416 (class 2606 OID 19470)
-- Name: propertyOwnershipFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "propertyOwnershipFK" FOREIGN KEY ("propertyOwnershipId") REFERENCES property_ownership(id);


--
-- TOC entry 2409 (class 2606 OID 19475)
-- Name: propertyimages_listing; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_listing FOREIGN KEY ("listingId") REFERENCES property_listing(id);


--
-- TOC entry 2410 (class 2606 OID 19480)
-- Name: propertyimages_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2411 (class 2606 OID 19485)
-- Name: propertyleasedefaults_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_owner FOREIGN KEY ("ownerId") REFERENCES rented_user(id);


--
-- TOC entry 2412 (class 2606 OID 19490)
-- Name: propertyleasedefaults_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2413 (class 2606 OID 19495)
-- Name: propertylikes_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2414 (class 2606 OID 19500)
-- Name: propertylikes_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2415 (class 2606 OID 19505)
-- Name: propertylisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT propertylisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2417 (class 2606 OID 19510)
-- Name: propertyowner_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT propertyowner_user FOREIGN KEY ("ownerId") REFERENCES rented_user(id);


--
-- TOC entry 2419 (class 2606 OID 19515)
-- Name: rentalAppId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "rentalAppId" FOREIGN KEY ("rentalAppId") REFERENCES rental_application(id);


--
-- TOC entry 2420 (class 2606 OID 19520)
-- Name: rentalapplicant_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT rentalapplicant_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2422 (class 2606 OID 19525)
-- Name: roomlisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2423 (class 2606 OID 19530)
-- Name: roomlisting_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_user FOREIGN KEY ("creatorId") REFERENCES rented_user(id);


--
-- TOC entry 2424 (class 2606 OID 19535)
-- Name: roommate_rommieId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "roommate_rommieId" FOREIGN KEY ("roommateId") REFERENCES rented_user(id);


--
-- TOC entry 2425 (class 2606 OID 19540)
-- Name: roommate_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT roommate_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2426 (class 2606 OID 19545)
-- Name: univcalquarter_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT univcalquarter_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- TOC entry 2427 (class 2606 OID 19550)
-- Name: univcalsemester_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT univcalsemester_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- TOC entry 2428 (class 2606 OID 19555)
-- Name: usercosigner_cosginer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosginer FOREIGN KEY ("cosginerId") REFERENCES rented_user(id);


--
-- TOC entry 2429 (class 2606 OID 19560)
-- Name: usercosigner_cosingee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosingee FOREIGN KEY ("cosingeeId") REFERENCES rented_user(id);


--
-- TOC entry 2430 (class 2606 OID 19565)
-- Name: usereducation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT usereducation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2431 (class 2606 OID 19570)
-- Name: userfinancials_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT userfinancials_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2432 (class 2606 OID 19575)
-- Name: useroccupation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT useroccupation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2433 (class 2606 OID 19580)
-- Name: userrecommendations_recommended; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommended FOREIGN KEY ("recommendedId") REFERENCES rented_user(id);


--
-- TOC entry 2434 (class 2606 OID 19585)
-- Name: userrecommendations_recommendor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommendor FOREIGN KEY ("recommendorId") REFERENCES rented_user(id);


--
-- TOC entry 2435 (class 2606 OID 19590)
-- Name: userreferences_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT userreferences_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2436 (class 2606 OID 19595)
-- Name: uservehicles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT uservehicles_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2621 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-03-03 10:40:38

--
-- PostgreSQL database dump complete
--

