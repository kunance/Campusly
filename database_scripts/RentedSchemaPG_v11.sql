--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.0
-- Dumped by pg_dump version 9.4.0
-- Started on 2015-03-17 13:04:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP DATABASE rented;
--
-- TOC entry 2627 (class 1262 OID 34537)
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
-- TOC entry 2628 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 242 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2630 (class 0 OID 0)
-- Dependencies: 242
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 594 (class 1247 OID 34539)
-- Name: lease_paymentInterval; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "lease_paymentInterval" AS ENUM (
    'weekly',
    'monthly',
    'yearly'
);


ALTER TYPE "lease_paymentInterval" OWNER TO postgres;

--
-- TOC entry 597 (class 1247 OID 34546)
-- Name: looking_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE looking_gender AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE looking_gender OWNER TO postgres;

--
-- TOC entry 600 (class 1247 OID 34554)
-- Name: looking_roomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "looking_roomType" AS ENUM (
    'single',
    'double',
    'living room'
);


ALTER TYPE "looking_roomType" OWNER TO postgres;

--
-- TOC entry 603 (class 1247 OID 34562)
-- Name: payment_paymentForm; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "payment_paymentForm" AS ENUM (
    'credit card',
    'ACH',
    'cash'
);


ALTER TYPE "payment_paymentForm" OWNER TO postgres;

--
-- TOC entry 606 (class 1247 OID 34570)
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
-- TOC entry 609 (class 1247 OID 34582)
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
-- TOC entry 612 (class 1247 OID 34592)
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
-- TOC entry 615 (class 1247 OID 34604)
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
-- TOC entry 618 (class 1247 OID 34614)
-- Name: property_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'regular'
);


ALTER TYPE "property_listing_leaseType" OWNER TO postgres;

--
-- TOC entry 621 (class 1247 OID 34622)
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
-- TOC entry 624 (class 1247 OID 34634)
-- Name: property_listing_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_status AS ENUM (
    'available',
    'rental pending',
    'rented'
);


ALTER TYPE property_listing_status OWNER TO postgres;

--
-- TOC entry 627 (class 1247 OID 34642)
-- Name: property_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_status AS ENUM (
    'avail',
    'pending',
    'rented'
);


ALTER TYPE property_status OWNER TO postgres;

--
-- TOC entry 630 (class 1247 OID 34650)
-- Name: property_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_type AS ENUM (
    'apt',
    'sfh',
    'townhouse'
);


ALTER TYPE property_type OWNER TO postgres;

--
-- TOC entry 633 (class 1247 OID 34658)
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
-- TOC entry 636 (class 1247 OID 34668)
-- Name: room_listing_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE room_listing_gender AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE room_listing_gender OWNER TO postgres;

--
-- TOC entry 639 (class 1247 OID 34676)
-- Name: room_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "room_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'lease take over'
);


ALTER TYPE "room_listing_leaseType" OWNER TO postgres;

--
-- TOC entry 642 (class 1247 OID 34684)
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
-- TOC entry 645 (class 1247 OID 34694)
-- Name: university_academicYearType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "university_academicYearType" AS ENUM (
    'quarter',
    'semester'
);


ALTER TYPE "university_academicYearType" OWNER TO postgres;

--
-- TOC entry 648 (class 1247 OID 34700)
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
-- TOC entry 651 (class 1247 OID 34710)
-- Name: user_education_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_education_type AS ENUM (
    'university',
    'trade',
    'military'
);


ALTER TYPE user_education_type OWNER TO postgres;

--
-- TOC entry 654 (class 1247 OID 34718)
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
-- TOC entry 172 (class 1259 OID 34731)
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
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL,
    "startDate" timestamp with time zone,
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
-- TOC entry 173 (class 1259 OID 34739)
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
-- TOC entry 2631 (class 0 OID 0)
-- Dependencies: 173
-- Name: address_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE address_history_id_seq OWNED BY address_history.id;


--
-- TOC entry 174 (class 1259 OID 34741)
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
-- TOC entry 175 (class 1259 OID 34755)
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
-- TOC entry 176 (class 1259 OID 34762)
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
-- TOC entry 2632 (class 0 OID 0)
-- Dependencies: 176
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_floor_plan_id_seq OWNED BY apartment_complex_floor_plan.id;


--
-- TOC entry 177 (class 1259 OID 34764)
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
-- TOC entry 2633 (class 0 OID 0)
-- Dependencies: 177
-- Name: apartment_complex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_id_seq OWNED BY apartment_complex.id;


--
-- TOC entry 178 (class 1259 OID 34766)
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
-- TOC entry 179 (class 1259 OID 34773)
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
-- TOC entry 2634 (class 0 OID 0)
-- Dependencies: 179
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_image_id_seq OWNED BY apartment_complex_image.id;


--
-- TOC entry 180 (class 1259 OID 34775)
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
-- TOC entry 181 (class 1259 OID 34782)
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
-- TOC entry 2635 (class 0 OID 0)
-- Dependencies: 181
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_transportation_id_seq OWNED BY apartment_complex_transportation.id;


--
-- TOC entry 182 (class 1259 OID 34784)
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
-- TOC entry 183 (class 1259 OID 34790)
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
-- TOC entry 2636 (class 0 OID 0)
-- Dependencies: 183
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE articles_id_seq OWNED BY articles.id;


--
-- TOC entry 184 (class 1259 OID 34792)
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
-- TOC entry 185 (class 1259 OID 34796)
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
-- TOC entry 2637 (class 0 OID 0)
-- Dependencies: 185
-- Name: friend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE friend_id_seq OWNED BY friend.id;


--
-- TOC entry 186 (class 1259 OID 34798)
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
-- TOC entry 187 (class 1259 OID 34805)
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
-- TOC entry 188 (class 1259 OID 34812)
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
-- TOC entry 2638 (class 0 OID 0)
-- Dependencies: 188
-- Name: lease_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE lease_id_seq OWNED BY lease.id;


--
-- TOC entry 189 (class 1259 OID 34814)
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
-- TOC entry 190 (class 1259 OID 34818)
-- Name: looking; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE looking (
    id bigint NOT NULL,
    "maxMonthlyRent" integer NOT NULL,
    "utilitiesIncluded" boolean NOT NULL,
    area text,
    "distanceToUniv" double precision,
    "moveInDate" timestamp with time zone DEFAULT now() NOT NULL,
    "moveOutDate" timestamp with time zone DEFAULT now(),
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
-- TOC entry 191 (class 1259 OID 34828)
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
-- TOC entry 2639 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE looking_id_seq OWNED BY looking.id;


--
-- TOC entry 192 (class 1259 OID 34830)
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
-- TOC entry 193 (class 1259 OID 34840)
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
-- TOC entry 2640 (class 0 OID 0)
-- Dependencies: 193
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE payment_id_seq OWNED BY payment.id;


--
-- TOC entry 194 (class 1259 OID 34842)
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
-- TOC entry 195 (class 1259 OID 34849)
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
-- TOC entry 2641 (class 0 OID 0)
-- Dependencies: 195
-- Name: pet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE pet_id_seq OWNED BY pet.id;


--
-- TOC entry 196 (class 1259 OID 34851)
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
-- TOC entry 197 (class 1259 OID 34858)
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
-- TOC entry 2642 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_id_seq OWNED BY property.id;


--
-- TOC entry 198 (class 1259 OID 34860)
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
-- TOC entry 199 (class 1259 OID 34867)
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
-- TOC entry 2643 (class 0 OID 0)
-- Dependencies: 199
-- Name: property_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_images_id_seq OWNED BY property_images.id;


--
-- TOC entry 200 (class 1259 OID 34869)
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
-- TOC entry 201 (class 1259 OID 34878)
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
-- TOC entry 2644 (class 0 OID 0)
-- Dependencies: 201
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_lease_defaults_id_seq OWNED BY property_lease_defaults.id;


--
-- TOC entry 202 (class 1259 OID 34880)
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
-- TOC entry 203 (class 1259 OID 34884)
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
-- TOC entry 2645 (class 0 OID 0)
-- Dependencies: 203
-- Name: property_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_likes_id_seq OWNED BY property_likes.id;


--
-- TOC entry 204 (class 1259 OID 34886)
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
-- TOC entry 205 (class 1259 OID 34898)
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
-- TOC entry 2646 (class 0 OID 0)
-- Dependencies: 205
-- Name: property_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_listing_id_seq OWNED BY property_listing.id;


--
-- TOC entry 206 (class 1259 OID 34900)
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
-- TOC entry 207 (class 1259 OID 34904)
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
-- TOC entry 208 (class 1259 OID 34909)
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
-- TOC entry 2647 (class 0 OID 0)
-- Dependencies: 208
-- Name: property_ownership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_ownership_id_seq OWNED BY property_ownership.id;


--
-- TOC entry 209 (class 1259 OID 34911)
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
-- TOC entry 210 (class 1259 OID 34915)
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
-- TOC entry 2648 (class 0 OID 0)
-- Dependencies: 210
-- Name: rental_applicant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_applicant_id_seq OWNED BY rental_applicant.id;


--
-- TOC entry 211 (class 1259 OID 34917)
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
-- TOC entry 212 (class 1259 OID 34925)
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
-- TOC entry 2649 (class 0 OID 0)
-- Dependencies: 212
-- Name: rental_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_application_id_seq OWNED BY rental_application.id;


--
-- TOC entry 213 (class 1259 OID 34927)
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
-- TOC entry 214 (class 1259 OID 34938)
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
-- TOC entry 2650 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rented_user_id_seq OWNED BY rented_user.id;


--
-- TOC entry 215 (class 1259 OID 34940)
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
    "petsAllowed" boolean,
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE room_listing OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 34950)
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
-- TOC entry 2651 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE room_listing_id_seq OWNED BY room_listing.id;


--
-- TOC entry 217 (class 1259 OID 34952)
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
-- TOC entry 218 (class 1259 OID 34957)
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
-- TOC entry 219 (class 1259 OID 34962)
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
-- TOC entry 2652 (class 0 OID 0)
-- Dependencies: 219
-- Name: roommate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE roommate_id_seq OWNED BY roommate.id;


--
-- TOC entry 220 (class 1259 OID 34964)
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
-- TOC entry 221 (class 1259 OID 34970)
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
-- TOC entry 222 (class 1259 OID 34978)
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
-- TOC entry 223 (class 1259 OID 34982)
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
-- TOC entry 2653 (class 0 OID 0)
-- Dependencies: 223
-- Name: university_calender_quater_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_quater_id_seq OWNED BY university_calender_quater.id;


--
-- TOC entry 224 (class 1259 OID 34984)
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
-- TOC entry 225 (class 1259 OID 34988)
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
-- TOC entry 2654 (class 0 OID 0)
-- Dependencies: 225
-- Name: university_calender_semester_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_semester_id_seq OWNED BY university_calender_semester.id;


--
-- TOC entry 226 (class 1259 OID 34990)
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
-- TOC entry 2655 (class 0 OID 0)
-- Dependencies: 226
-- Name: university_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_id_seq OWNED BY university.id;


--
-- TOC entry 227 (class 1259 OID 34992)
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
-- TOC entry 228 (class 1259 OID 34996)
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
-- TOC entry 2656 (class 0 OID 0)
-- Dependencies: 228
-- Name: user_cosigner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_cosigner_id_seq OWNED BY user_cosigner.id;


--
-- TOC entry 229 (class 1259 OID 34998)
-- Name: user_education; Type: TABLE; Schema: public; Owner: postgres; Tablespace:
--

CREATE TABLE user_education (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "educationCenterName" text NOT NULL,
    type user_education_type DEFAULT 'university'::user_education_type,
    "startDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    graduation boolean,
    "graduationDate" timestamp with time zone,
    major text,
    "degreeType" "user_education_degreeType",
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "universityId" bigint NOT NULL
);


ALTER TABLE user_education OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 35006)
-- Name: user_cur_address_univ_coords; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW user_cur_address_univ_coords AS
 SELECT ah."userId",
    ah.latitude AS address_latitude,
    ah.longitude AS address_longitude,
    univ.latitude AS univ_latitude,
    univ.longitude AS univ_longitude,
    univ.name AS univ_name
   FROM rented_user ru,
    address_history ah,
    user_education ue,
    university univ
  WHERE ((((ah.present = true) AND (ah."userId" = ru.id)) AND (ru.id = ue."userId")) AND (ue."universityId" = univ.id));


ALTER TABLE user_cur_address_univ_coords OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 35010)
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
-- TOC entry 2657 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_education_id_seq OWNED BY user_education.id;


--
-- TOC entry 232 (class 1259 OID 35012)
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
-- TOC entry 233 (class 1259 OID 35019)
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
-- TOC entry 2658 (class 0 OID 0)
-- Dependencies: 233
-- Name: user_financial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_financial_id_seq OWNED BY user_financial.id;


--
-- TOC entry 234 (class 1259 OID 35021)
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
-- TOC entry 235 (class 1259 OID 35029)
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
-- TOC entry 2659 (class 0 OID 0)
-- Dependencies: 235
-- Name: user_occupation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_occupation_id_seq OWNED BY user_occupation.id;


--
-- TOC entry 236 (class 1259 OID 35031)
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
-- TOC entry 237 (class 1259 OID 35039)
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
-- TOC entry 2660 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_recommendation_id_seq OWNED BY user_recommendation.id;


--
-- TOC entry 238 (class 1259 OID 35041)
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
-- TOC entry 239 (class 1259 OID 35049)
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
-- TOC entry 2661 (class 0 OID 0)
-- Dependencies: 239
-- Name: user_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_reference_id_seq OWNED BY user_reference.id;


--
-- TOC entry 240 (class 1259 OID 35051)
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
-- TOC entry 241 (class 1259 OID 35058)
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
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 241
-- Name: user_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_vehicle_id_seq OWNED BY user_vehicle.id;


--
-- TOC entry 2180 (class 2604 OID 35060)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history ALTER COLUMN id SET DEFAULT nextval('address_history_id_seq'::regclass);


--
-- TOC entry 2189 (class 2604 OID 35061)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex ALTER COLUMN id SET DEFAULT nextval('apartment_complex_id_seq'::regclass);


--
-- TOC entry 2194 (class 2604 OID 35062)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan ALTER COLUMN id SET DEFAULT nextval('apartment_complex_floor_plan_id_seq'::regclass);


--
-- TOC entry 2196 (class 2604 OID 35063)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image ALTER COLUMN id SET DEFAULT nextval('apartment_complex_image_id_seq'::regclass);


--
-- TOC entry 2198 (class 2604 OID 35064)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation ALTER COLUMN id SET DEFAULT nextval('apartment_complex_transportation_id_seq'::regclass);


--
-- TOC entry 2199 (class 2604 OID 35065)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY articles ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'::regclass);


--
-- TOC entry 2201 (class 2604 OID 35066)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend ALTER COLUMN id SET DEFAULT nextval('friend_id_seq'::regclass);


--
-- TOC entry 2204 (class 2604 OID 35067)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease ALTER COLUMN id SET DEFAULT nextval('lease_id_seq'::regclass);


--
-- TOC entry 2210 (class 2604 OID 35068)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY looking ALTER COLUMN id SET DEFAULT nextval('looking_id_seq'::regclass);


--
-- TOC entry 2215 (class 2604 OID 35069)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('payment_id_seq'::regclass);


--
-- TOC entry 2217 (class 2604 OID 35070)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet ALTER COLUMN id SET DEFAULT nextval('pet_id_seq'::regclass);


--
-- TOC entry 2219 (class 2604 OID 35071)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property ALTER COLUMN id SET DEFAULT nextval('property_id_seq'::regclass);


--
-- TOC entry 2221 (class 2604 OID 35072)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images ALTER COLUMN id SET DEFAULT nextval('property_images_id_seq'::regclass);


--
-- TOC entry 2228 (class 2604 OID 35073)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults ALTER COLUMN id SET DEFAULT nextval('property_lease_defaults_id_seq'::regclass);


--
-- TOC entry 2230 (class 2604 OID 35074)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes ALTER COLUMN id SET DEFAULT nextval('property_likes_id_seq'::regclass);


--
-- TOC entry 2237 (class 2604 OID 35075)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing ALTER COLUMN id SET DEFAULT nextval('property_listing_id_seq'::regclass);


--
-- TOC entry 2241 (class 2604 OID 35076)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership ALTER COLUMN id SET DEFAULT nextval('property_ownership_id_seq'::regclass);


--
-- TOC entry 2243 (class 2604 OID 35077)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant ALTER COLUMN id SET DEFAULT nextval('rental_applicant_id_seq'::regclass);


--
-- TOC entry 2246 (class 2604 OID 35078)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application ALTER COLUMN id SET DEFAULT nextval('rental_application_id_seq'::regclass);


--
-- TOC entry 2252 (class 2604 OID 35079)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rented_user ALTER COLUMN id SET DEFAULT nextval('rented_user_id_seq'::regclass);


--
-- TOC entry 2257 (class 2604 OID 35080)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing ALTER COLUMN id SET DEFAULT nextval('room_listing_id_seq'::regclass);


--
-- TOC entry 2260 (class 2604 OID 35081)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate ALTER COLUMN id SET DEFAULT nextval('roommate_id_seq'::regclass);


--
-- TOC entry 2263 (class 2604 OID 35082)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university ALTER COLUMN id SET DEFAULT nextval('university_id_seq'::regclass);


--
-- TOC entry 2265 (class 2604 OID 35083)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater ALTER COLUMN id SET DEFAULT nextval('university_calender_quater_id_seq'::regclass);


--
-- TOC entry 2267 (class 2604 OID 35084)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester ALTER COLUMN id SET DEFAULT nextval('university_calender_semester_id_seq'::regclass);


--
-- TOC entry 2269 (class 2604 OID 35085)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner ALTER COLUMN id SET DEFAULT nextval('user_cosigner_id_seq'::regclass);


--
-- TOC entry 2272 (class 2604 OID 35086)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education ALTER COLUMN id SET DEFAULT nextval('user_education_id_seq'::regclass);


--
-- TOC entry 2274 (class 2604 OID 35087)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial ALTER COLUMN id SET DEFAULT nextval('user_financial_id_seq'::regclass);


--
-- TOC entry 2277 (class 2604 OID 35088)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation ALTER COLUMN id SET DEFAULT nextval('user_occupation_id_seq'::regclass);


--
-- TOC entry 2280 (class 2604 OID 35089)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation ALTER COLUMN id SET DEFAULT nextval('user_recommendation_id_seq'::regclass);


--
-- TOC entry 2283 (class 2604 OID 35090)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference ALTER COLUMN id SET DEFAULT nextval('user_reference_id_seq'::regclass);


--
-- TOC entry 2285 (class 2604 OID 35091)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle ALTER COLUMN id SET DEFAULT nextval('user_vehicle_id_seq'::regclass);


--
-- TOC entry 2555 (class 0 OID 34731)
-- Dependencies: 172
-- Data for Name: address_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY address_history (id, "streetNumeric", "streetAddress", apt, city, state, zip, latitude, longitude, "startDate", "endDate", "userId", "aboutMe", present, "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	1	Grabova ulica	9	Split	Splitsko-dalmatinska županija	21000	43.51715140	16.49958100	\N	\N	2	\N	f	2015-03-15 10:10:27.975+01	\N	\N
\.


--
-- TOC entry 2663 (class 0 OID 0)
-- Dependencies: 173
-- Name: address_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('address_history_id_seq', 2, true);


--
-- TOC entry 2557 (class 0 OID 34741)
-- Dependencies: 174
-- Data for Name: apartment_complex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex (id, name, "streetNumeric", "streetAddress", city, state, zip, latitude, longitude, "distanceToUniv", "petsAllowed", "dogsAllowed", "catsAllowed", "othersAllowed", "dogQtyAllowed", "catQtyAllowed", "otherQtyAllowed", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2558 (class 0 OID 34755)
-- Dependencies: 175
-- Data for Name: apartment_complex_floor_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_floor_plan (id, "complexId", bedrooms, bathrooms, parking, living_area, washer_dryer, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2664 (class 0 OID 0)
-- Dependencies: 176
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_floor_plan_id_seq', 1, true);


--
-- TOC entry 2665 (class 0 OID 0)
-- Dependencies: 177
-- Name: apartment_complex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_id_seq', 1, true);


--
-- TOC entry 2561 (class 0 OID 34766)
-- Dependencies: 178
-- Data for Name: apartment_complex_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_image (id, "complexId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2666 (class 0 OID 0)
-- Dependencies: 179
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_image_id_seq', 1, true);


--
-- TOC entry 2563 (class 0 OID 34775)
-- Dependencies: 180
-- Data for Name: apartment_complex_transportation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_transportation (id, "complexId", "shuttleRoute", "busLine", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2667 (class 0 OID 0)
-- Dependencies: 181
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_transportation_id_seq', 1, true);


--
-- TOC entry 2565 (class 0 OID 34784)
-- Dependencies: 182
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY articles (id, title, content, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- TOC entry 2668 (class 0 OID 0)
-- Dependencies: 183
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('articles_id_seq', 1, true);


--
-- TOC entry 2567 (class 0 OID 34792)
-- Dependencies: 184
-- Data for Name: friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY friend (id, "userId", "friendId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2669 (class 0 OID 0)
-- Dependencies: 185
-- Name: friend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('friend_id_seq', 1, true);


--
-- TOC entry 2569 (class 0 OID 34798)
-- Dependencies: 186
-- Data for Name: invitee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY invitee (id, "firstName", "lastName", "invitorId", roommate, email, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2570 (class 0 OID 34805)
-- Dependencies: 187
-- Data for Name: lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lease (id, "propertyId", approved, "startDate", "endDate", "paymentAmount", "paymentInterval", "securityDeposit", "petDeposit", payee, built, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2670 (class 0 OID 0)
-- Dependencies: 188
-- Name: lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('lease_id_seq', 1, true);


--
-- TOC entry 2572 (class 0 OID 34814)
-- Dependencies: 189
-- Data for Name: lessee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lessee ("leaseId", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2573 (class 0 OID 34818)
-- Dependencies: 190
-- Data for Name: looking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY looking (id, "maxMonthlyRent", "utilitiesIncluded", area, "distanceToUniv", "moveInDate", "moveOutDate", "lengthOfStay", "openToFullYearLeaseNewRoomates", "roomType", "sharedBathroom", gender, "numRoommates", furnished, "busRouteRequired", "parkingNeeded", "smokingAllowed", "petsAllowed", "createdAt", "updatedAt", "deletedAt", "userId") FROM stdin;
2	234	t	\N	\N	2015-03-01 00:00:00+01	2015-03-02 00:00:00+01	\N	t	single	t	male only	2	t	t	t	t	t	2015-03-14 21:13:23.857+01	\N	\N	3
3	56	t	\N	\N	2015-03-01 00:00:00+01	2015-03-24 00:00:00+01	\N	t	single	t	male only	2	t	t	t	t	t	2015-03-15 09:53:43.893+01	\N	\N	2
4	56	t	\N	\N	2015-03-01 00:00:00+01	2015-03-17 00:00:00+01	\N	t	single	t	male only	3	t	t	t	t	t	2015-03-15 10:39:57.648+01	\N	\N	2
5	354	t	\N	\N	2015-03-01 00:00:00+01	2015-03-22 00:00:00+01	\N	t	single	t	male only	3	t	t	t	t	t	2015-03-15 11:21:16.04+01	\N	\N	3
\.


--
-- TOC entry 2671 (class 0 OID 0)
-- Dependencies: 191
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 5, true);


--
-- TOC entry 2575 (class 0 OID 34830)
-- Dependencies: 192
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY payment (id, "payerId", "payeeId", "dollarAmount", reason, "rentPayment", "creditCheckPayment", "paymentForm", "paymentDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2672 (class 0 OID 0)
-- Dependencies: 193
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('payment_id_seq', 1, true);


--
-- TOC entry 2577 (class 0 OID 34842)
-- Dependencies: 194
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY pet (id, "userId", type, breed, "weightLbs", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2673 (class 0 OID 0)
-- Dependencies: 195
-- Name: pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('pet_id_seq', 3, true);


--
-- TOC entry 2579 (class 0 OID 34851)
-- Dependencies: 196
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property (id, "streetNumeric", "streetAddress", city, state, zip, apt, bldg, latitude, longitude, type, description, bedrooms, bathrooms, "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	1	Grabova ulica	Split	Splitsko-dalmatinska županija	21000	\N	\N	43.51715140	16.49958100	apt	\N	2	2	\N	\N	\N	\N	\N	2015-03-14 21:10:49.49+01	\N	\N
3	1	Grabova ulica	Split	Splitsko-dalmatinska županija	21000	\N	\N	43.51715140	16.49958100	apt	\N	3	3	\N	\N	\N	\N	\N	2015-03-14 21:14:10.131+01	\N	\N
4	1	Frank H Ogawa Plaza	Oakland	CA	94612	\N	\N	37.80541600	-122.27261700	apt	\N	2	2	\N	\N	\N	\N	\N	2015-03-16 15:16:49.545+01	\N	\N
5	12	Eve Ln	Rye	NY	10580	\N	\N	40.97409400	-73.67931100	apt	\N	2	2	\N	\N	\N	\N	\N	2015-03-16 18:57:25.637+01	\N	\N
6	773	Vista Grande Ave	Los Altos	CA	94024	\N	\N	37.38442200	-122.09302000	apt	\N	3	3	\N	\N	\N	\N	\N	2015-03-16 19:02:15.593+01	\N	\N
\.


--
-- TOC entry 2674 (class 0 OID 0)
-- Dependencies: 197
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 6, true);


--
-- TOC entry 2581 (class 0 OID 34860)
-- Dependencies: 198
-- Data for Name: property_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_images (id, "listingId", "propertyId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2675 (class 0 OID 0)
-- Dependencies: 199
-- Name: property_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_images_id_seq', 1, true);


--
-- TOC entry 2583 (class 0 OID 34869)
-- Dependencies: 200
-- Data for Name: property_lease_defaults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_lease_defaults (id, "propertyId", "ownerId", "qtyDogsAllowed", "qtyCatsAllowed", "qtyOtherAllowed", "animalSizeLimitLbs", "fishTankAllowed", "preferredLeaseLength", "preferredLeaseUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2676 (class 0 OID 0)
-- Dependencies: 201
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_lease_defaults_id_seq', 1, true);


--
-- TOC entry 2585 (class 0 OID 34880)
-- Dependencies: 202
-- Data for Name: property_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_likes ("propertyId", "userId", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2677 (class 0 OID 0)
-- Dependencies: 203
-- Name: property_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_likes_id_seq', 1, true);


--
-- TOC entry 2587 (class 0 OID 34886)
-- Dependencies: 204
-- Data for Name: property_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_listing ("propertyId", "monthlyPrice", "securityDeposit", "petDeposit", "availableMoveIn", id, "leaseEndDate", "leaseLength", "leaseLengthUnit", "leaseType", gender, "totalUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", description, status, "contactPhone", "contactEmail", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2678 (class 0 OID 0)
-- Dependencies: 205
-- Name: property_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_listing_id_seq', 1, true);


--
-- TOC entry 2589 (class 0 OID 34900)
-- Dependencies: 206
-- Data for Name: property_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_owner ("propertyOwnershipId", "ownerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2590 (class 0 OID 34904)
-- Dependencies: 207
-- Data for Name: property_ownership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_ownership ("startDate", "endDate", "propertyFK", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2679 (class 0 OID 0)
-- Dependencies: 208
-- Name: property_ownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_ownership_id_seq', 1, true);


--
-- TOC entry 2592 (class 0 OID 34911)
-- Dependencies: 209
-- Data for Name: rental_applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_applicant ("userId", id, "rentalAppId", "shareCredit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2680 (class 0 OID 0)
-- Dependencies: 210
-- Name: rental_applicant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_applicant_id_seq', 1, true);


--
-- TOC entry 2594 (class 0 OID 34917)
-- Dependencies: 211
-- Data for Name: rental_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_application (id, "propertyId", "preferredLeaseLength", "preferredMoveIn", "numOccupants", "moveReason", "preferredLeaseLengthUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2681 (class 0 OID 0)
-- Dependencies: 212
-- Name: rental_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_application_id_seq', 1, true);


--
-- TOC entry 2596 (class 0 OID 34927)
-- Dependencies: 213
-- Data for Name: rented_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rented_user (id, username, email, "confirmedEmail", password, firstname, lastname, middlename, "aboutMe", phone, "profileImage", twitter, facebook, googleplus, linkedin, "experianIdToken", "creditCheckToken", "runIdentityCheck", "shareCreditReport", "identityDate", "creditReportDate", "createdAt", "updatedAt", "deletedAt", role, provider, "facebookOAuthId", "googleOAuthId", "twitterOAuthId", salt) FROM stdin;
3	\N	jmornar@gmail.edu	f	NH1S/Wk4Ql5IbsjewdNW1QzA1NCO5la6f3iR8YTWWZ0DwMfJVaxk2mm45ukXJYfptIS0Z10+ttOcEqenTagB0g==	jure	juric	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-14 21:06:48.528+01	\N	\N	user	local	\N	\N	\N	S+cKIvFx+2v1uqR6V6YSLA==
2	\N	imornar@gmail.edu	f	u4Br4Tag7ask5OrzjdR1KKS99TjslU3rqGi2IFCbniykA7tycNMbVzYqJiJYzSnOXmVwp2vzvVcimh1fuJsnyQ==	ivan	mor	\N	1fds	1111111111	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-14 21:06:34.632+01	2015-03-15 10:10:10.323+01	\N	user	local	\N	\N	\N	nQEwluFuB0zPSGmoJxgGvA==
6	\N	a.a@sd.edu	f	zgHXPszMeHV97fymucgN31JkvxKk7zVxeu6q90vIrSU0vqr+qkEsqAyNovs8xFfXhnwRnq4bxmH2IPK222uFLQ==	aa	aa	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-17 09:36:16.757+01	\N	\N	user	local	\N	\N	\N	KV3izIiW8etdKE8phPypSA==
7	\N	bb.b@b.edu	f	jJ0GE4sELi9gn5kujE7geJQltzHbVbKYrF/afiJDu/qfF3q5Y0ALQO8vFAgsmi01fRUteKILWn+8S1tLgYc9sw==	bb	bb	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	f	\N	\N	2015-03-17 09:42:41.787+01	\N	\N	user	local	\N	\N	\N	H/UU3bvrOwPKoS97CgyBqg==
\.


--
-- TOC entry 2682 (class 0 OID 0)
-- Dependencies: 214
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rented_user_id_seq', 52, true);


--
-- TOC entry 2598 (class 0 OID 34940)
-- Dependencies: 215
-- Data for Name: room_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY room_listing (id, "propertyId", "creatorId", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", gender, "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", "petsAllowed", description, "createdAt", "updatedAt", "deletedAt") FROM stdin;
2	2	3	432	432	2015-03-01 00:00:00+01	2015-03-08 00:00:00+01	sub-lease	no preference	432	single	t	2	t	t	t	t	sometrhing	2015-03-14 21:10:49.515+01	\N	\N
5	5	2	234	234	2015-03-01 00:00:00+01	2015-03-16 00:00:00+01	sub-lease	no preference	234	single	t	1	t	t	t	t	tre	2015-03-16 18:57:25.669+01	\N	\N
6	6	2	999	999	2015-03-01 00:00:00+01	2015-03-25 00:00:00+01	month-to-month	no preference	999	single	t	1	t	t	t	t	tretre	2015-03-16 19:02:15.619+01	\N	\N
\.


--
-- TOC entry 2683 (class 0 OID 0)
-- Dependencies: 216
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 6, true);


--
-- TOC entry 2600 (class 0 OID 34957)
-- Dependencies: 218
-- Data for Name: roommate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY roommate (id, "userId", "roommateId", "fromDate", "toDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
4	3	2	2015-03-14 21:11:02.121+01	\N	2015-03-14 21:11:02.121+01	\N	\N
9	2	3	2015-03-16 20:40:08.201+01	\N	2015-03-16 20:40:08.201+01	\N	\N
\.


--
-- TOC entry 2684 (class 0 OID 0)
-- Dependencies: 219
-- Name: roommate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 9, true);


--
-- TOC entry 2602 (class 0 OID 34964)
-- Dependencies: 220
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (firstname, lastname, email, "Street", city) FROM stdin;
\.


--
-- TOC entry 2603 (class 0 OID 34970)
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
-- TOC entry 2604 (class 0 OID 34978)
-- Dependencies: 222
-- Data for Name: university_calender_quater; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_quater (id, "universityId", year, "fallQuaterStartDate", "fallQuaterEndDate", "winterQuaterStartDate", "winterQuaterEndDate", "springQuaterStartDate", "springQuaterEndDate", "summerQuaterStartDate", "summerQuaterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2685 (class 0 OID 0)
-- Dependencies: 223
-- Name: university_calender_quater_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_quater_id_seq', 1, true);


--
-- TOC entry 2606 (class 0 OID 34984)
-- Dependencies: 224
-- Data for Name: university_calender_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_semester (id, "universityId", year, "fallSemesterStartDate", "fallSemesterEndDate", "springSemesterStartDate", "springSemesterEndDate", "summerSemesterStartDate", "summerSemesterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2686 (class 0 OID 0)
-- Dependencies: 225
-- Name: university_calender_semester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_semester_id_seq', 1, true);


--
-- TOC entry 2687 (class 0 OID 0)
-- Dependencies: 226
-- Name: university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_id_seq', 20, true);


--
-- TOC entry 2609 (class 0 OID 34992)
-- Dependencies: 227
-- Data for Name: user_cosigner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_cosigner (id, "cosingeeId", "cosginerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2688 (class 0 OID 0)
-- Dependencies: 228
-- Name: user_cosigner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_cosigner_id_seq', 1, true);


--
-- TOC entry 2611 (class 0 OID 34998)
-- Dependencies: 229
-- Data for Name: user_education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_education (id, "userId", "educationCenterName", type, "startDate", "endDate", graduation, "graduationDate", major, "degreeType", "createdAt", "updatedAt", "deletedAt", "universityId") FROM stdin;
3	3	California State University - San Diego	university	\N	\N	f	\N	\N	\N	2015-03-16 19:43:53.731+01	\N	\N	19
2	2	University of California - San Francisco	university	\N	\N	f	2015-12-05 00:00:00+01	heelo	\N	2015-03-15 10:10:20.695+01	\N	\N	10
4	6	University of California - Irvine	university	\N	\N	f	\N	\N	\N	2015-03-17 09:41:19.418+01	\N	\N	5
5	7	University of California - Irvine	university	\N	\N	f	\N	\N	\N	2015-03-17 09:42:57.672+01	\N	\N	5
\.


--
-- TOC entry 2689 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_education_id_seq', 5, true);


--
-- TOC entry 2613 (class 0 OID 35012)
-- Dependencies: 232
-- Data for Name: user_financial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_financial (id, "userId", "startDate", "endDate", "individualAnnualIncom", "householdAnnualIncome", "spouseAnnualIncome", "incomeProof", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2690 (class 0 OID 0)
-- Dependencies: 233
-- Name: user_financial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_financial_id_seq', 1, true);


--
-- TOC entry 2615 (class 0 OID 35021)
-- Dependencies: 234
-- Data for Name: user_occupation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_occupation (id, role, company, start, "end", "presentlyEmployeed", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2691 (class 0 OID 0)
-- Dependencies: 235
-- Name: user_occupation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_occupation_id_seq', 1, true);


--
-- TOC entry 2617 (class 0 OID 35031)
-- Dependencies: 236
-- Data for Name: user_recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_recommendation (id, "recommendedId", "recommendorId", "recommendedApproved", content, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2692 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_recommendation_id_seq', 1, true);


--
-- TOC entry 2619 (class 0 OID 35041)
-- Dependencies: 238
-- Data for Name: user_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_reference (id, "userId", email, phone, "firstName", "lastName", relation, "startDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2693 (class 0 OID 0)
-- Dependencies: 239
-- Name: user_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_reference_id_seq', 1, true);


--
-- TOC entry 2621 (class 0 OID 35051)
-- Dependencies: 240
-- Data for Name: user_vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_vehicle (id, year, make, model, "licensePlate", color, "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- TOC entry 2694 (class 0 OID 0)
-- Dependencies: 241
-- Name: user_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_vehicle_id_seq', 3, true);


--
-- TOC entry 2287 (class 2606 OID 35093)
-- Name: idx_41618_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT "idx_41618_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2290 (class 2606 OID 35095)
-- Name: idx_41629_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex
    ADD CONSTRAINT "idx_41629_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2292 (class 2606 OID 35097)
-- Name: idx_41646_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "idx_41646_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2295 (class 2606 OID 35099)
-- Name: idx_41656_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "idx_41656_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2298 (class 2606 OID 35101)
-- Name: idx_41666_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "idx_41666_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2301 (class 2606 OID 35103)
-- Name: idx_41676_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY articles
    ADD CONSTRAINT "idx_41676_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2303 (class 2606 OID 35105)
-- Name: idx_41685_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "idx_41685_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2307 (class 2606 OID 35107)
-- Name: idx_41690_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "idx_41690_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2310 (class 2606 OID 35109)
-- Name: idx_41707_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "idx_41707_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2313 (class 2606 OID 35111)
-- Name: idx_41715_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "idx_41715_PRIMARY" PRIMARY KEY ("leaseId", "userId");


--
-- TOC entry 2317 (class 2606 OID 35113)
-- Name: idx_41737_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT "idx_41737_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2320 (class 2606 OID 35115)
-- Name: idx_41757_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "idx_41757_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2324 (class 2606 OID 35117)
-- Name: idx_41781_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT "idx_41781_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2327 (class 2606 OID 35119)
-- Name: idx_41807_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property
    ADD CONSTRAINT "idx_41807_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2329 (class 2606 OID 35121)
-- Name: idx_41817_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT "idx_41817_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2333 (class 2606 OID 35123)
-- Name: idx_41837_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT "idx_41837_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2337 (class 2606 OID 35125)
-- Name: idx_41849_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT "idx_41849_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2341 (class 2606 OID 35127)
-- Name: idx_41905_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT "idx_41905_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2344 (class 2606 OID 35129)
-- Name: idx_41918_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "idx_41918_PRIMARY" PRIMARY KEY ("propertyOwnershipId", "ownerId");


--
-- TOC entry 2347 (class 2606 OID 35131)
-- Name: idx_41924_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "idx_41924_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2351 (class 2606 OID 35133)
-- Name: idx_41932_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "idx_41932_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2355 (class 2606 OID 35135)
-- Name: idx_41949_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "idx_41949_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2359 (class 2606 OID 35137)
-- Name: idx_41960_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rented_user
    ADD CONSTRAINT "idx_41960_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2367 (class 2606 OID 35139)
-- Name: idx_41974_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "idx_41974_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2363 (class 2606 OID 35141)
-- Name: idx_42007_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT "idx_42007_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2371 (class 2606 OID 35143)
-- Name: idx_42031_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university
    ADD CONSTRAINT "idx_42031_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2373 (class 2606 OID 35145)
-- Name: idx_42042_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT "idx_42042_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2376 (class 2606 OID 35147)
-- Name: idx_42049_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT "idx_42049_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2379 (class 2606 OID 35149)
-- Name: idx_42056_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT "idx_42056_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2384 (class 2606 OID 35151)
-- Name: idx_42081_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT "idx_42081_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2387 (class 2606 OID 35153)
-- Name: idx_42093_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT "idx_42093_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2390 (class 2606 OID 35155)
-- Name: idx_42103_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT "idx_42103_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2393 (class 2606 OID 35157)
-- Name: idx_42114_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT "idx_42114_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2397 (class 2606 OID 35159)
-- Name: idx_42139_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT "idx_42139_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2400 (class 2606 OID 35161)
-- Name: idx_42150_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT "idx_42150_PRIMARY" PRIMARY KEY (id);


--
-- TOC entry 2361 (class 2606 OID 35420)
-- Name: unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace:
--

ALTER TABLE ONLY rented_user
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 2382 (class 1259 OID 35162)
-- Name: fki_FKtoUniversity; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "fki_FKtoUniversity" ON user_education USING btree ("universityId");


--
-- TOC entry 2288 (class 1259 OID 35163)
-- Name: idx_41618_addresshistory_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41618_addresshistory_user_idx ON address_history USING btree ("userId");


--
-- TOC entry 2293 (class 1259 OID 35164)
-- Name: idx_41646_aptComplexFloorPlan_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41646_aptComplexFloorPlan_complex_idx" ON apartment_complex_floor_plan USING btree ("complexId");


--
-- TOC entry 2296 (class 1259 OID 35165)
-- Name: idx_41656_aptComplexImage_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41656_aptComplexImage_complex_idx" ON apartment_complex_image USING btree ("complexId");


--
-- TOC entry 2299 (class 1259 OID 35166)
-- Name: idx_41666_aptComplexTrans_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41666_aptComplexTrans_complex_idx" ON apartment_complex_transportation USING btree ("complexId");


--
-- TOC entry 2304 (class 1259 OID 35167)
-- Name: idx_41685_friend_friend_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41685_friend_friend_idx ON friend USING btree ("friendId");


--
-- TOC entry 2305 (class 1259 OID 35168)
-- Name: idx_41685_friend_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41685_friend_user_idx ON friend USING btree ("userId");


--
-- TOC entry 2308 (class 1259 OID 35169)
-- Name: idx_41690_invitee_invitor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41690_invitee_invitor_idx ON invitee USING btree ("invitorId");


--
-- TOC entry 2311 (class 1259 OID 35170)
-- Name: idx_41707_propertyId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41707_propertyId_idx" ON lease USING btree ("propertyId");


--
-- TOC entry 2314 (class 1259 OID 35171)
-- Name: idx_41715_leaseId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41715_leaseId_idx" ON lessee USING btree ("leaseId");


--
-- TOC entry 2315 (class 1259 OID 35172)
-- Name: idx_41715_lessee_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41715_lessee_user_idx ON lessee USING btree ("userId");


--
-- TOC entry 2318 (class 1259 OID 35173)
-- Name: idx_41737_looking_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41737_looking_user_idx ON looking USING btree ("userId");


--
-- TOC entry 2321 (class 1259 OID 35174)
-- Name: idx_41757_payment_payee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41757_payment_payee_idx ON payment USING btree ("payeeId");


--
-- TOC entry 2322 (class 1259 OID 35175)
-- Name: idx_41757_payment_payer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41757_payment_payer_idx ON payment USING btree ("payerId");


--
-- TOC entry 2325 (class 1259 OID 35176)
-- Name: idx_41781_pets_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41781_pets_user_idx ON pet USING btree ("userId");


--
-- TOC entry 2330 (class 1259 OID 35177)
-- Name: idx_41817_propertyimages_listing_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41817_propertyimages_listing_idx ON property_images USING btree ("listingId");


--
-- TOC entry 2331 (class 1259 OID 35178)
-- Name: idx_41817_propertyimages_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41817_propertyimages_property_idx ON property_images USING btree ("propertyId");


--
-- TOC entry 2334 (class 1259 OID 35179)
-- Name: idx_41837_propertyleasedefaults_owner_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41837_propertyleasedefaults_owner_idx ON property_lease_defaults USING btree ("ownerId");


--
-- TOC entry 2335 (class 1259 OID 35180)
-- Name: idx_41837_propertyleasedefaults_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41837_propertyleasedefaults_property_idx ON property_lease_defaults USING btree ("propertyId");


--
-- TOC entry 2338 (class 1259 OID 35181)
-- Name: idx_41849_propertylikes_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41849_propertylikes_property_idx ON property_likes USING btree ("propertyId");


--
-- TOC entry 2339 (class 1259 OID 35182)
-- Name: idx_41849_propertylikes_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41849_propertylikes_user_idx ON property_likes USING btree ("userId");


--
-- TOC entry 2342 (class 1259 OID 35183)
-- Name: idx_41905_propertylisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41905_propertylisting_property_idx ON property_listing USING btree ("propertyId");


--
-- TOC entry 2345 (class 1259 OID 35184)
-- Name: idx_41918_propertyowner_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41918_propertyowner_user_idx ON property_owner USING btree ("ownerId");


--
-- TOC entry 2348 (class 1259 OID 35185)
-- Name: idx_41924_propTime; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41924_propTime" ON property_ownership USING btree ("startDate", "endDate", "propertyFK");


--
-- TOC entry 2349 (class 1259 OID 35186)
-- Name: idx_41924_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41924_property_idx ON property_ownership USING btree ("propertyFK");


--
-- TOC entry 2352 (class 1259 OID 35187)
-- Name: idx_41932_rentalAppId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41932_rentalAppId_idx" ON rental_applicant USING btree ("rentalAppId");


--
-- TOC entry 2353 (class 1259 OID 35188)
-- Name: idx_41932_rentalapplicant_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41932_rentalapplicant_user_idx ON rental_applicant USING btree ("userId");


--
-- TOC entry 2356 (class 1259 OID 35189)
-- Name: idx_41949_id_UNIQUE; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE UNIQUE INDEX "idx_41949_id_UNIQUE" ON rental_application USING btree (id);


--
-- TOC entry 2357 (class 1259 OID 35190)
-- Name: idx_41949_propFK_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX "idx_41949_propFK_idx" ON rental_application USING btree ("propertyId");


--
-- TOC entry 2368 (class 1259 OID 35191)
-- Name: idx_41974_roommate_roomie_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41974_roommate_roomie_idx ON roommate USING btree ("roommateId");


--
-- TOC entry 2369 (class 1259 OID 35192)
-- Name: idx_41974_roommate_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_41974_roommate_user_idx ON roommate USING btree ("userId");


--
-- TOC entry 2364 (class 1259 OID 35193)
-- Name: idx_42007_roomlisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42007_roomlisting_property_idx ON room_listing USING btree ("propertyId");


--
-- TOC entry 2365 (class 1259 OID 35194)
-- Name: idx_42007_roomlisting_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42007_roomlisting_user_idx ON room_listing USING btree ("creatorId");


--
-- TOC entry 2374 (class 1259 OID 35195)
-- Name: idx_42042_univcalquarter_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42042_univcalquarter_university_idx ON university_calender_quater USING btree ("universityId");


--
-- TOC entry 2377 (class 1259 OID 35196)
-- Name: idx_42049_univcalsemester_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42049_univcalsemester_university_idx ON university_calender_semester USING btree ("universityId");


--
-- TOC entry 2380 (class 1259 OID 35197)
-- Name: idx_42056_usercosigner_cosginer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42056_usercosigner_cosginer_idx ON user_cosigner USING btree ("cosginerId");


--
-- TOC entry 2381 (class 1259 OID 35198)
-- Name: idx_42056_usercosigner_cosingee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42056_usercosigner_cosingee_idx ON user_cosigner USING btree ("cosingeeId");


--
-- TOC entry 2385 (class 1259 OID 35199)
-- Name: idx_42081_usereducation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42081_usereducation_user_idx ON user_education USING btree ("userId");


--
-- TOC entry 2388 (class 1259 OID 35200)
-- Name: idx_42093_userfinancials_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42093_userfinancials_user_idx ON user_financial USING btree ("userId");


--
-- TOC entry 2391 (class 1259 OID 35201)
-- Name: idx_42103_useroccupation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42103_useroccupation_user_idx ON user_occupation USING btree ("userId");


--
-- TOC entry 2394 (class 1259 OID 35202)
-- Name: idx_42114_userrecommendations_recommended_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42114_userrecommendations_recommended_idx ON user_recommendation USING btree ("recommendedId");


--
-- TOC entry 2395 (class 1259 OID 35203)
-- Name: idx_42114_userrecommendations_recommendor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42114_userrecommendations_recommendor_idx ON user_recommendation USING btree ("recommendorId");


--
-- TOC entry 2398 (class 1259 OID 35204)
-- Name: idx_42139_userreferences_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42139_userreferences_user_idx ON user_reference USING btree ("userId");


--
-- TOC entry 2401 (class 1259 OID 35205)
-- Name: idx_42150_uservehicles_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace:
--

CREATE INDEX idx_42150_uservehicles_user_idx ON user_vehicle USING btree ("userId");


--
-- TOC entry 2436 (class 2606 OID 35206)
-- Name: FKtoUniversity; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT "FKtoUniversity" FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- TOC entry 2402 (class 2606 OID 35211)
-- Name: addresshistory_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT addresshistory_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2403 (class 2606 OID 35216)
-- Name: aptComplexFloorPlan_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "aptComplexFloorPlan_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2404 (class 2606 OID 35221)
-- Name: aptComplexImage_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "aptComplexImage_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2405 (class 2606 OID 35226)
-- Name: aptComplexTrans_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "aptComplexTrans_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- TOC entry 2406 (class 2606 OID 35231)
-- Name: friend_friendId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "friend_friendId" FOREIGN KEY ("friendId") REFERENCES rented_user(id);


--
-- TOC entry 2407 (class 2606 OID 35236)
-- Name: friend_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT friend_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2408 (class 2606 OID 35241)
-- Name: invitee_invitorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "invitee_invitorId" FOREIGN KEY ("invitorId") REFERENCES rented_user(id);


--
-- TOC entry 2410 (class 2606 OID 35246)
-- Name: leaseId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "leaseId" FOREIGN KEY ("leaseId") REFERENCES lease(id);


--
-- TOC entry 2411 (class 2606 OID 35251)
-- Name: lessee_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT lessee_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2412 (class 2606 OID 35256)
-- Name: looking_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT looking_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2413 (class 2606 OID 35261)
-- Name: payment_payee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payee FOREIGN KEY ("payeeId") REFERENCES rented_user(id);


--
-- TOC entry 2414 (class 2606 OID 35266)
-- Name: payment_payer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payer FOREIGN KEY ("payerId") REFERENCES rented_user(id);


--
-- TOC entry 2415 (class 2606 OID 35271)
-- Name: pets_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT pets_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2427 (class 2606 OID 35276)
-- Name: propFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "propFK" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2424 (class 2606 OID 35281)
-- Name: propertyFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "propertyFK" FOREIGN KEY ("propertyFK") REFERENCES property(id);


--
-- TOC entry 2409 (class 2606 OID 35286)
-- Name: propertyId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "propertyId" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2423 (class 2606 OID 35291)
-- Name: propertyOwnershipFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "propertyOwnershipFK" FOREIGN KEY ("propertyOwnershipId") REFERENCES property_ownership(id);


--
-- TOC entry 2416 (class 2606 OID 35296)
-- Name: propertyimages_listing; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_listing FOREIGN KEY ("listingId") REFERENCES property_listing(id);


--
-- TOC entry 2417 (class 2606 OID 35301)
-- Name: propertyimages_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2418 (class 2606 OID 35306)
-- Name: propertyleasedefaults_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_owner FOREIGN KEY ("ownerId") REFERENCES rented_user(id);


--
-- TOC entry 2419 (class 2606 OID 35311)
-- Name: propertyleasedefaults_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2420 (class 2606 OID 35316)
-- Name: propertylikes_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2421 (class 2606 OID 35321)
-- Name: propertylikes_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2422 (class 2606 OID 35326)
-- Name: propertylisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT propertylisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2425 (class 2606 OID 35331)
-- Name: rentalAppId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "rentalAppId" FOREIGN KEY ("rentalAppId") REFERENCES rental_application(id);


--
-- TOC entry 2426 (class 2606 OID 35336)
-- Name: rentalapplicant_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT rentalapplicant_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2428 (class 2606 OID 35341)
-- Name: roomlisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- TOC entry 2429 (class 2606 OID 35346)
-- Name: roomlisting_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_user FOREIGN KEY ("creatorId") REFERENCES rented_user(id);


--
-- TOC entry 2430 (class 2606 OID 35351)
-- Name: roommate_rommieId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "roommate_rommieId" FOREIGN KEY ("roommateId") REFERENCES rented_user(id);


--
-- TOC entry 2431 (class 2606 OID 35356)
-- Name: roommate_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT roommate_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2432 (class 2606 OID 35361)
-- Name: univcalquarter_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT univcalquarter_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- TOC entry 2433 (class 2606 OID 35366)
-- Name: univcalsemester_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT univcalsemester_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- TOC entry 2434 (class 2606 OID 35371)
-- Name: usercosigner_cosginer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosginer FOREIGN KEY ("cosginerId") REFERENCES rented_user(id);


--
-- TOC entry 2435 (class 2606 OID 35376)
-- Name: usercosigner_cosingee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosingee FOREIGN KEY ("cosingeeId") REFERENCES rented_user(id);


--
-- TOC entry 2437 (class 2606 OID 35381)
-- Name: usereducation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT usereducation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2438 (class 2606 OID 35386)
-- Name: userfinancials_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT userfinancials_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2439 (class 2606 OID 35391)
-- Name: useroccupation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT useroccupation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2440 (class 2606 OID 35396)
-- Name: userrecommendations_recommended; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommended FOREIGN KEY ("recommendedId") REFERENCES rented_user(id);


--
-- TOC entry 2441 (class 2606 OID 35401)
-- Name: userrecommendations_recommendor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommendor FOREIGN KEY ("recommendorId") REFERENCES rented_user(id);


--
-- TOC entry 2442 (class 2606 OID 35406)
-- Name: userreferences_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT userreferences_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2443 (class 2606 OID 35411)
-- Name: uservehicles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT uservehicles_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- TOC entry 2629 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-03-17 13:04:45

--
-- PostgreSQL database dump complete
--

