--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: lease_paymentInterval; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "lease_paymentInterval" AS ENUM (
    'weekly',
    'monthly',
    'yearly'
);


ALTER TYPE "lease_paymentInterval" OWNER TO postgres;

--
-- Name: looking_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE looking_gender AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE looking_gender OWNER TO postgres;

--
-- Name: looking_roomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "looking_roomType" AS ENUM (
    'single',
    'double',
    'living room'
);


ALTER TYPE "looking_roomType" OWNER TO postgres;

--
-- Name: payment_paymentForm; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "payment_paymentForm" AS ENUM (
    'credit card',
    'ACH',
    'cash'
);


ALTER TYPE "payment_paymentForm" OWNER TO postgres;

--
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
-- Name: property_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "property_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'regular'
);


ALTER TYPE "property_listing_leaseType" OWNER TO postgres;

--
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
-- Name: property_listing_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_status AS ENUM (
    'available',
    'rental pending',
    'rented'
);


ALTER TYPE property_listing_status OWNER TO postgres;

--
-- Name: property_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_status AS ENUM (
    'avail',
    'pending',
    'rented'
);


ALTER TYPE property_status OWNER TO postgres;

--
-- Name: property_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_type AS ENUM (
    'apt',
    'sfh',
    'townhouse'
);


ALTER TYPE property_type OWNER TO postgres;

--
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
-- Name: room_listing_gender; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE room_listing_gender AS ENUM (
    'no preference',
    'male only',
    'female only'
);


ALTER TYPE room_listing_gender OWNER TO postgres;

--
-- Name: room_listing_leaseType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "room_listing_leaseType" AS ENUM (
    'sub-lease',
    'month-to-month',
    'lease take over'
);


ALTER TYPE "room_listing_leaseType" OWNER TO postgres;

--
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
-- Name: university_academicYearType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE "university_academicYearType" AS ENUM (
    'quarter',
    'semester'
);


ALTER TYPE "university_academicYearType" OWNER TO postgres;

--
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
-- Name: user_education_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_education_type AS ENUM (
    'university',
    'trade',
    'military'
);


ALTER TYPE user_education_type OWNER TO postgres;

--
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
-- Name: address_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE address_history_id_seq OWNED BY address_history.id;


--
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
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_floor_plan_id_seq OWNED BY apartment_complex_floor_plan.id;


--
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
-- Name: apartment_complex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_id_seq OWNED BY apartment_complex.id;


--
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
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_image_id_seq OWNED BY apartment_complex_image.id;


--
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
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE apartment_complex_transportation_id_seq OWNED BY apartment_complex_transportation.id;


--
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
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE articles_id_seq OWNED BY articles.id;


--
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
-- Name: friend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE friend_id_seq OWNED BY friend.id;


--
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
-- Name: lease_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE lease_id_seq OWNED BY lease.id;


--
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
    "deletedAt" timestamp with time zone
);


ALTER TABLE looking OWNER TO postgres;

--
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
-- Name: looking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE looking_id_seq OWNED BY looking.id;


--
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
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE payment_id_seq OWNED BY payment.id;


--
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
-- Name: pet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE pet_id_seq OWNED BY pet.id;


--
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
-- Name: property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_id_seq OWNED BY property.id;


--
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
-- Name: property_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_images_id_seq OWNED BY property_images.id;


--
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
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_lease_defaults_id_seq OWNED BY property_lease_defaults.id;


--
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
-- Name: property_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_likes_id_seq OWNED BY property_likes.id;


--
-- Name: property_listing; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE property_listing (
    "propertyId" bigint NOT NULL,
    "monthlyPrice" double precision NOT NULL,
    "securityDeposit" double precision DEFAULT 0::double precision,
    "petDeposit" double precision DEFAULT 0::double precision,
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
-- Name: property_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_listing_id_seq OWNED BY property_listing.id;


--
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
-- Name: property_ownership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE property_ownership_id_seq OWNED BY property_ownership.id;


--
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
-- Name: rental_applicant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_applicant_id_seq OWNED BY rental_applicant.id;


--
-- Name: rental_application; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE rental_application (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    "preferredLeaseLength" integer,
    "preferredMoveIn" timestamp with time zone NOT NULL,
    "numOccupants" bigint DEFAULT 1::bigint NOT NULL,
    "moveReason" text,
    "preferredLeaseLengthUnit" "rental_application_preferredLeaseLengthUnit",
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);


ALTER TABLE rental_application OWNER TO postgres;

--
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
-- Name: rental_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rental_application_id_seq OWNED BY rental_application.id;


--
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
-- Name: rented_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rented_user_id_seq OWNED BY rented_user.id;


--
-- Name: room_listing; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE room_listing (
    id bigint NOT NULL,
    "propertyId" bigint NOT NULL,
    "creatorId" bigint NOT NULL,
    "monthlyPrice" double precision NOT NULL,
    "securityDeposit" double precision DEFAULT 0::double precision,
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
-- Name: room_listing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE room_listing_id_seq OWNED BY room_listing.id;


--
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
-- Name: roommate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE roommate_id_seq OWNED BY roommate.id;


--
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
-- Name: university_calender_quater_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_quater_id_seq OWNED BY university_calender_quater.id;


--
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
-- Name: university_calender_semester_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_calender_semester_id_seq OWNED BY university_calender_semester.id;


--
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
-- Name: university_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE university_id_seq OWNED BY university.id;


--
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
-- Name: user_cosigner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_cosigner_id_seq OWNED BY user_cosigner.id;


--
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
-- Name: user_education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_education_id_seq OWNED BY user_education.id;


--
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
-- Name: user_financial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_financial_id_seq OWNED BY user_financial.id;


--
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
-- Name: user_occupation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_occupation_id_seq OWNED BY user_occupation.id;


--
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
-- Name: user_recommendation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_recommendation_id_seq OWNED BY user_recommendation.id;


--
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
-- Name: user_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_reference_id_seq OWNED BY user_reference.id;


--
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
-- Name: user_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_vehicle_id_seq OWNED BY user_vehicle.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history ALTER COLUMN id SET DEFAULT nextval('address_history_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex ALTER COLUMN id SET DEFAULT nextval('apartment_complex_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan ALTER COLUMN id SET DEFAULT nextval('apartment_complex_floor_plan_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image ALTER COLUMN id SET DEFAULT nextval('apartment_complex_image_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation ALTER COLUMN id SET DEFAULT nextval('apartment_complex_transportation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY articles ALTER COLUMN id SET DEFAULT nextval('articles_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend ALTER COLUMN id SET DEFAULT nextval('friend_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease ALTER COLUMN id SET DEFAULT nextval('lease_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY looking ALTER COLUMN id SET DEFAULT nextval('looking_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('payment_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet ALTER COLUMN id SET DEFAULT nextval('pet_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property ALTER COLUMN id SET DEFAULT nextval('property_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images ALTER COLUMN id SET DEFAULT nextval('property_images_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults ALTER COLUMN id SET DEFAULT nextval('property_lease_defaults_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes ALTER COLUMN id SET DEFAULT nextval('property_likes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing ALTER COLUMN id SET DEFAULT nextval('property_listing_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership ALTER COLUMN id SET DEFAULT nextval('property_ownership_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant ALTER COLUMN id SET DEFAULT nextval('rental_applicant_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application ALTER COLUMN id SET DEFAULT nextval('rental_application_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rented_user ALTER COLUMN id SET DEFAULT nextval('rented_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing ALTER COLUMN id SET DEFAULT nextval('room_listing_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate ALTER COLUMN id SET DEFAULT nextval('roommate_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university ALTER COLUMN id SET DEFAULT nextval('university_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater ALTER COLUMN id SET DEFAULT nextval('university_calender_quater_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester ALTER COLUMN id SET DEFAULT nextval('university_calender_semester_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner ALTER COLUMN id SET DEFAULT nextval('user_cosigner_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education ALTER COLUMN id SET DEFAULT nextval('user_education_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial ALTER COLUMN id SET DEFAULT nextval('user_financial_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation ALTER COLUMN id SET DEFAULT nextval('user_occupation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation ALTER COLUMN id SET DEFAULT nextval('user_recommendation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference ALTER COLUMN id SET DEFAULT nextval('user_reference_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle ALTER COLUMN id SET DEFAULT nextval('user_vehicle_id_seq'::regclass);


--
-- Data for Name: address_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY address_history (id, "streetNumeric", "streetAddress", apt, city, state, zip, "startDate", "endDate", "userId", "aboutMe", present, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: address_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('address_history_id_seq', 1, true);


--
-- Data for Name: apartment_complex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex (id, name, "streetNumeric", "streetAddress", city, state, zip, latitude, longitude, "distanceToUniv", "petsAllowed", "dogsAllowed", "catsAllowed", "othersAllowed", "dogQtyAllowed", "catQtyAllowed", "otherQtyAllowed", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: apartment_complex_floor_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_floor_plan (id, "complexId", bedrooms, bathrooms, parking, living_area, washer_dryer, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: apartment_complex_floor_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_floor_plan_id_seq', 1, true);


--
-- Name: apartment_complex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_id_seq', 1, true);


--
-- Data for Name: apartment_complex_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_image (id, "complexId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_image_id_seq', 1, true);


--
-- Data for Name: apartment_complex_transportation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_transportation (id, "complexId", "shuttleRoute", "busLine", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_transportation_id_seq', 1, true);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY articles (id, title, content, "createdAt", "updatedAt", "UserId") FROM stdin;
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('articles_id_seq', 1, true);


--
-- Data for Name: friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY friend (id, "userId", "friendId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: friend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('friend_id_seq', 1, true);


--
-- Data for Name: invitee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY invitee (id, "firstName", "lastName", "invitorId", roommate, email, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lease (id, "propertyId", approved, "startDate", "endDate", "paymentAmount", "paymentInterval", "securityDeposit", "petDeposit", payee, built, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('lease_id_seq', 1, true);


--
-- Data for Name: lessee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lessee ("leaseId", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: looking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY looking (id, "maxMonthlyRent", "utilitiesIncluded", area, "distanceToUniv", "moveInDate", "lengthOfStay", "openToFullYearLeaseNewRoomates", "roomType", "sharedBathroom", gender, "numRoommates", furnished, "busRouteRequired", "parkingNeeded", "smokingAllowed", "petsAllowed", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 1, true);


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY payment (id, "payerId", "payeeId", "dollarAmount", reason, "rentPayment", "creditCheckPayment", "paymentForm", "paymentDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('payment_id_seq', 1, true);


--
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY pet (id, "userId", type, breed, "weightLbs", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('pet_id_seq', 1, true);


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property (id, "streetNumeric", "streetAddress", city, state, zip, apt, bldg, latitude, longitude, type, description, bedrooms, bathrooms, "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 1, true);


--
-- Data for Name: property_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_images (id, "listingId", "propertyId", location, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_images_id_seq', 1, true);


--
-- Data for Name: property_lease_defaults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_lease_defaults (id, "propertyId", "ownerId", "qtyDogsAllowed", "qtyCatsAllowed", "qtyOtherAllowed", "animalSizeLimitLbs", "fishTankAllowed", "preferredLeaseLength", "preferredLeaseUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_lease_defaults_id_seq', 1, true);


--
-- Data for Name: property_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_likes ("propertyId", "userId", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_likes_id_seq', 1, true);


--
-- Data for Name: property_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_listing ("propertyId", "monthlyPrice", "securityDeposit", "petDeposit", "availableMoveIn", id, "leaseEndDate", "leaseLength", "leaseLengthUnit", "leaseType", gender, "totalUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", description, status, "contactPhone", "contactEmail", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_listing_id_seq', 1, true);


--
-- Data for Name: property_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_owner ("propertyOwnershipId", "ownerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: property_ownership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_ownership ("startDate", "endDate", "propertyFK", id, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: property_ownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_ownership_id_seq', 1, true);


--
-- Data for Name: rental_applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_applicant ("userId", id, "rentalAppId", "shareCredit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: rental_applicant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_applicant_id_seq', 1, true);


--
-- Data for Name: rental_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_application (id, "propertyId", "preferredLeaseLength", "preferredMoveIn", "numOccupants", "moveReason", "preferredLeaseLengthUnit", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: rental_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_application_id_seq', 1, true);


--
-- Data for Name: rented_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rented_user (id, username, email, "confirmedEmail", password, firstname, lastname, middlename, "aboutMe", phone, "profileImage", twitter, facebook, googleplus, linkedin, "experianIdToken", "creditCheckToken", "runIdentityCheck", "shareCreditReport", "identityDate", "creditReportDate", "createdAt", "updatedAt", "deletedAt", role, provider, "facebookOAuthId", "googleOAuthId", "twitterOAuthId", salt) FROM stdin;
\.


--
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rented_user_id_seq', 1, true);


--
-- Data for Name: room_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY room_listing (id, "propertyId", "creatorId", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", gender, "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", furnished, "parkingAvailable", "smokingAllowed", description, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 1, true);


--
-- Data for Name: roommate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY roommate (id, "userId", "roommateId", "fromDate", "toDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: roommate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 1, true);


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (firstname, lastname, email, "Street", city) FROM stdin;
\.


--
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university (id, name, "academicYearType", "streetNumeric", "streetAddress", apt, city, state, zip, latitude, longitude, "startDate", "endDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Data for Name: university_calender_quater; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_quater (id, "universityId", year, "fallQuaterStartDate", "fallQuaterEndDate", "winterQuaterStartDate", "winterQuaterEndDate", "springQuaterStartDate", "springQuaterEndDate", "summerQuaterStartDate", "summerQuaterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: university_calender_quater_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_quater_id_seq', 1, true);


--
-- Data for Name: university_calender_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_semester (id, "universityId", year, "fallSemesterStartDate", "fallSemesterEndDate", "springSemesterStartDate", "springSemesterEndDate", "summerSemesterStartDate", "summerSemesterEndDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: university_calender_semester_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_semester_id_seq', 1, true);


--
-- Name: university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_id_seq', 1, true);


--
-- Data for Name: user_cosigner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_cosigner (id, "cosingeeId", "cosginerId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_cosigner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_cosigner_id_seq', 1, true);


--
-- Data for Name: user_education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_education (id, "userId", "educationCenterName", type, "startDate", "endDate", graduation, "graduationDate", major, "degreeType", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_education_id_seq', 1, true);


--
-- Data for Name: user_financial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_financial (id, "userId", "startDate", "endDate", "individualAnnualIncom", "householdAnnualIncome", "spouseAnnualIncome", "incomeProof", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_financial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_financial_id_seq', 1, true);


--
-- Data for Name: user_occupation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_occupation (id, role, company, start, "end", "presentlyEmployeed", "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_occupation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_occupation_id_seq', 1, true);


--
-- Data for Name: user_recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_recommendation (id, "recommendedId", "recommendorId", "recommendedApproved", content, "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_recommendation_id_seq', 1, true);


--
-- Data for Name: user_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_reference (id, "userId", email, phone, "firstName", "lastName", relation, "startDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_reference_id_seq', 1, true);


--
-- Data for Name: user_vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_vehicle (id, year, make, model, "licensePlate", color, "userId", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: user_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_vehicle_id_seq', 1, true);


--
-- Name: idx_41618_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT "idx_41618_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41629_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex
    ADD CONSTRAINT "idx_41629_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41646_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "idx_41646_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41656_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "idx_41656_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41666_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "idx_41666_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41676_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY articles
    ADD CONSTRAINT "idx_41676_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41685_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "idx_41685_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41690_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "idx_41690_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41707_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "idx_41707_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41715_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "idx_41715_PRIMARY" PRIMARY KEY ("leaseId", "userId");


--
-- Name: idx_41737_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT "idx_41737_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41757_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "idx_41757_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41781_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT "idx_41781_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41807_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property
    ADD CONSTRAINT "idx_41807_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41817_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT "idx_41817_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41837_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT "idx_41837_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41849_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT "idx_41849_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41905_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT "idx_41905_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41918_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "idx_41918_PRIMARY" PRIMARY KEY ("propertyOwnershipId", "ownerId");


--
-- Name: idx_41924_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "idx_41924_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41932_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "idx_41932_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41949_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "idx_41949_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41960_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rented_user
    ADD CONSTRAINT "idx_41960_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41974_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "idx_41974_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42007_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT "idx_42007_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42031_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university
    ADD CONSTRAINT "idx_42031_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42042_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT "idx_42042_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42049_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT "idx_42049_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42056_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT "idx_42056_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42081_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT "idx_42081_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42093_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT "idx_42093_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42103_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT "idx_42103_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42114_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT "idx_42114_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42139_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT "idx_42139_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_42150_PRIMARY; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT "idx_42150_PRIMARY" PRIMARY KEY (id);


--
-- Name: idx_41618_addresshistory_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41618_addresshistory_user_idx ON address_history USING btree ("userId");


--
-- Name: idx_41646_aptComplexFloorPlan_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41646_aptComplexFloorPlan_complex_idx" ON apartment_complex_floor_plan USING btree ("complexId");


--
-- Name: idx_41656_aptComplexImage_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41656_aptComplexImage_complex_idx" ON apartment_complex_image USING btree ("complexId");


--
-- Name: idx_41666_aptComplexTrans_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41666_aptComplexTrans_complex_idx" ON apartment_complex_transportation USING btree ("complexId");


--
-- Name: idx_41685_friend_friend_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41685_friend_friend_idx ON friend USING btree ("friendId");


--
-- Name: idx_41685_friend_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41685_friend_user_idx ON friend USING btree ("userId");


--
-- Name: idx_41690_invitee_invitor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41690_invitee_invitor_idx ON invitee USING btree ("invitorId");


--
-- Name: idx_41707_propertyId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41707_propertyId_idx" ON lease USING btree ("propertyId");


--
-- Name: idx_41715_leaseId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41715_leaseId_idx" ON lessee USING btree ("leaseId");


--
-- Name: idx_41715_lessee_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41715_lessee_user_idx ON lessee USING btree ("userId");


--
-- Name: idx_41757_payment_payee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41757_payment_payee_idx ON payment USING btree ("payeeId");


--
-- Name: idx_41757_payment_payer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41757_payment_payer_idx ON payment USING btree ("payerId");


--
-- Name: idx_41781_pets_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41781_pets_user_idx ON pet USING btree ("userId");


--
-- Name: idx_41817_propertyimages_listing_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41817_propertyimages_listing_idx ON property_images USING btree ("listingId");


--
-- Name: idx_41817_propertyimages_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41817_propertyimages_property_idx ON property_images USING btree ("propertyId");


--
-- Name: idx_41837_propertyleasedefaults_owner_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41837_propertyleasedefaults_owner_idx ON property_lease_defaults USING btree ("ownerId");


--
-- Name: idx_41837_propertyleasedefaults_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41837_propertyleasedefaults_property_idx ON property_lease_defaults USING btree ("propertyId");


--
-- Name: idx_41849_propertylikes_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41849_propertylikes_property_idx ON property_likes USING btree ("propertyId");


--
-- Name: idx_41849_propertylikes_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41849_propertylikes_user_idx ON property_likes USING btree ("userId");


--
-- Name: idx_41905_propertylisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41905_propertylisting_property_idx ON property_listing USING btree ("propertyId");


--
-- Name: idx_41918_propertyowner_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41918_propertyowner_user_idx ON property_owner USING btree ("ownerId");


--
-- Name: idx_41924_propTime; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41924_propTime" ON property_ownership USING btree ("startDate", "endDate", "propertyFK");


--
-- Name: idx_41924_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41924_property_idx ON property_ownership USING btree ("propertyFK");


--
-- Name: idx_41932_rentalAppId_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41932_rentalAppId_idx" ON rental_applicant USING btree ("rentalAppId");


--
-- Name: idx_41932_rentalapplicant_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41932_rentalapplicant_user_idx ON rental_applicant USING btree ("userId");


--
-- Name: idx_41949_id_UNIQUE; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE UNIQUE INDEX "idx_41949_id_UNIQUE" ON rental_application USING btree (id);


--
-- Name: idx_41949_propFK_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "idx_41949_propFK_idx" ON rental_application USING btree ("propertyId");


--
-- Name: idx_41974_roommate_roomie_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41974_roommate_roomie_idx ON roommate USING btree ("roommateId");


--
-- Name: idx_41974_roommate_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_41974_roommate_user_idx ON roommate USING btree ("userId");


--
-- Name: idx_42007_roomlisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42007_roomlisting_property_idx ON room_listing USING btree ("propertyId");


--
-- Name: idx_42007_roomlisting_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42007_roomlisting_user_idx ON room_listing USING btree ("creatorId");


--
-- Name: idx_42042_univcalquarter_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42042_univcalquarter_university_idx ON university_calender_quater USING btree ("universityId");


--
-- Name: idx_42049_univcalsemester_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42049_univcalsemester_university_idx ON university_calender_semester USING btree ("universityId");


--
-- Name: idx_42056_usercosigner_cosginer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42056_usercosigner_cosginer_idx ON user_cosigner USING btree ("cosginerId");


--
-- Name: idx_42056_usercosigner_cosingee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42056_usercosigner_cosingee_idx ON user_cosigner USING btree ("cosingeeId");


--
-- Name: idx_42081_usereducation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42081_usereducation_user_idx ON user_education USING btree ("userId");


--
-- Name: idx_42093_userfinancials_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42093_userfinancials_user_idx ON user_financial USING btree ("userId");


--
-- Name: idx_42103_useroccupation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42103_useroccupation_user_idx ON user_occupation USING btree ("userId");


--
-- Name: idx_42114_userrecommendations_recommended_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42114_userrecommendations_recommended_idx ON user_recommendation USING btree ("recommendedId");


--
-- Name: idx_42114_userrecommendations_recommendor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42114_userrecommendations_recommendor_idx ON user_recommendation USING btree ("recommendorId");


--
-- Name: idx_42139_userreferences_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42139_userreferences_user_idx ON user_reference USING btree ("userId");


--
-- Name: idx_42150_uservehicles_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_42150_uservehicles_user_idx ON user_vehicle USING btree ("userId");


--
-- Name: addresshistory_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT addresshistory_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: aptComplexFloorPlan_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT "aptComplexFloorPlan_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- Name: aptComplexImage_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT "aptComplexImage_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- Name: aptComplexTrans_complexId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT "aptComplexTrans_complexId" FOREIGN KEY ("complexId") REFERENCES apartment_complex(id);


--
-- Name: friend_friendId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT "friend_friendId" FOREIGN KEY ("friendId") REFERENCES rented_user(id);


--
-- Name: friend_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT friend_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: invitee_invitorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT "invitee_invitorId" FOREIGN KEY ("invitorId") REFERENCES rented_user(id);


--
-- Name: leaseId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT "leaseId" FOREIGN KEY ("leaseId") REFERENCES lease(id);


--
-- Name: lessee_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT lessee_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: payment_payee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payee FOREIGN KEY ("payeeId") REFERENCES rented_user(id);


--
-- Name: payment_payer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payer FOREIGN KEY ("payerId") REFERENCES rented_user(id);


--
-- Name: pets_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT pets_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: propFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT "propFK" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertyFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT "propertyFK" FOREIGN KEY ("propertyFK") REFERENCES property(id);


--
-- Name: propertyId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT "propertyId" FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertyOwnershipFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT "propertyOwnershipFK" FOREIGN KEY ("propertyOwnershipId") REFERENCES property_ownership(id);


--
-- Name: propertyimages_listing; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_listing FOREIGN KEY ("listingId") REFERENCES property_listing(id);


--
-- Name: propertyimages_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertyleasedefaults_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_owner FOREIGN KEY ("ownerId") REFERENCES rented_user(id);


--
-- Name: propertyleasedefaults_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertylikes_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertylikes_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: propertylisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT propertylisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: propertyowner_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT propertyowner_user FOREIGN KEY ("ownerId") REFERENCES rented_user(id);


--
-- Name: rentalAppId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT "rentalAppId" FOREIGN KEY ("rentalAppId") REFERENCES rental_application(id);


--
-- Name: rentalapplicant_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT rentalapplicant_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: roomlisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_property FOREIGN KEY ("propertyId") REFERENCES property(id);


--
-- Name: roomlisting_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_user FOREIGN KEY ("creatorId") REFERENCES rented_user(id);


--
-- Name: roommate_rommieId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT "roommate_rommieId" FOREIGN KEY ("roommateId") REFERENCES rented_user(id);


--
-- Name: roommate_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT roommate_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: univcalquarter_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT univcalquarter_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- Name: univcalsemester_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT univcalsemester_university FOREIGN KEY ("universityId") REFERENCES university(id);


--
-- Name: usercosigner_cosginer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosginer FOREIGN KEY ("cosginerId") REFERENCES rented_user(id);


--
-- Name: usercosigner_cosingee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosingee FOREIGN KEY ("cosingeeId") REFERENCES rented_user(id);


--
-- Name: usereducation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT usereducation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: userfinancials_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT userfinancials_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: useroccupation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT useroccupation_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: userrecommendations_recommended; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommended FOREIGN KEY ("recommendedId") REFERENCES rented_user(id);


--
-- Name: userrecommendations_recommendor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommendor FOREIGN KEY ("recommendorId") REFERENCES rented_user(id);


--
-- Name: userreferences_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT userreferences_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: uservehicles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT uservehicles_user FOREIGN KEY ("userId") REFERENCES rented_user(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--
CREATE OR REPLACE VIEW room_listing_view AS
    SELECT  p."streetNumeric", p."streetAddress", p.city, p.state,  p.zip,  p.apt,  p.bldg,  p.type,  p.bedrooms,  p.bathrooms,  rl.* FROM property p, room_listing rl
    WHERE rl."propertyId" = p.id;

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
