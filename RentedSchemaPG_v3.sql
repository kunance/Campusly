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
-- Name: lease_paymentinterval; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE lease_paymentinterval AS ENUM (
    'weekly',
    'monthly',
    'yearly'
);


ALTER TYPE lease_paymentinterval OWNER TO postgres;

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
-- Name: looking_roomtype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE looking_roomtype AS ENUM (
    'single',
    'double',
    'living room'
);


ALTER TYPE looking_roomtype OWNER TO postgres;

--
-- Name: payment_paymentform; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE payment_paymentform AS ENUM (
    'credit card',
    'ACH',
    'cash'
);


ALTER TYPE payment_paymentform OWNER TO postgres;

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
-- Name: property_lease_defaults_preferredleaseunit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_lease_defaults_preferredleaseunit AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE property_lease_defaults_preferredleaseunit OWNER TO postgres;

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
-- Name: property_listing_leaselengthunit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_leaselengthunit AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE property_listing_leaselengthunit OWNER TO postgres;

--
-- Name: property_listing_leasetype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_leasetype AS ENUM (
    'sub-lease',
    'month-to-month',
    'regular'
);


ALTER TYPE property_listing_leasetype OWNER TO postgres;

--
-- Name: property_listing_roomtype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE property_listing_roomtype AS ENUM (
    'single',
    'double',
    'triple',
    'loft',
    'living room'
);


ALTER TYPE property_listing_roomtype OWNER TO postgres;

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
-- Name: rental_application_preferredleaselengthunit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE rental_application_preferredleaselengthunit AS ENUM (
    'day',
    'week',
    'month',
    'year'
);


ALTER TYPE rental_application_preferredleaselengthunit OWNER TO postgres;

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
-- Name: room_listing_leasetype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE room_listing_leasetype AS ENUM (
    'sub-lease',
    'month-to-month',
    'lease take over'
);


ALTER TYPE room_listing_leasetype OWNER TO postgres;

--
-- Name: room_listing_roomtype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE room_listing_roomtype AS ENUM (
    'single',
    'double',
    'loft',
    'living room'
);


ALTER TYPE room_listing_roomtype OWNER TO postgres;

--
-- Name: university_academicyeartype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE university_academicyeartype AS ENUM (
    'quarter',
    'semester'
);


ALTER TYPE university_academicyeartype OWNER TO postgres;

--
-- Name: user_education_degreetype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE user_education_degreetype AS ENUM (
    'undergraduate',
    'graduate',
    'doctorate',
    'post-doctorate'
);


ALTER TYPE user_education_degreetype OWNER TO postgres;

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
    streetnumeric integer NOT NULL,
    streetaddress text NOT NULL,
    apt text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone,
    userid bigint,
    aboutme text,
    present boolean DEFAULT false,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    streetnumeric integer NOT NULL,
    streetaddress text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    distancetouniv double precision,
    petsallowed boolean DEFAULT false NOT NULL,
    dogsallowed boolean DEFAULT false NOT NULL,
    catsallowed boolean DEFAULT false NOT NULL,
    othersallowed boolean DEFAULT false NOT NULL,
    dogqtyallowed integer DEFAULT 0,
    catqtyallowed integer DEFAULT 0,
    otherqtyallowed integer DEFAULT 0,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
);


ALTER TABLE apartment_complex OWNER TO postgres;

--
-- Name: apartment_complex_floor_plan; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE apartment_complex_floor_plan (
    id bigint NOT NULL,
    complexid bigint NOT NULL,
    bedrooms integer NOT NULL,
    bathrooms integer DEFAULT 1 NOT NULL,
    parking integer DEFAULT 0 NOT NULL,
    living_area integer NOT NULL,
    washer_dryer boolean DEFAULT false NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    complexid bigint NOT NULL,
    location text NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    complexid bigint NOT NULL,
    shuttleroute text NOT NULL,
    busline bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    createdat timestamp with time zone NOT NULL,
    updatedat timestamp with time zone NOT NULL,
    userid bigint
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
    userid bigint NOT NULL,
    friendid bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    firstname text NOT NULL,
    lastname text NOT NULL,
    invitorid bigint NOT NULL,
    roommate boolean,
    email text,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
);


ALTER TABLE invitee OWNER TO postgres;

--
-- Name: lease; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE lease (
    id bigint NOT NULL,
    propertyid bigint NOT NULL,
    approved boolean,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone NOT NULL,
    paymentamount double precision NOT NULL,
    paymentinterval lease_paymentinterval NOT NULL,
    securitydeposit double precision,
    petdeposit double precision,
    payee text,
    built timestamp with time zone,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    leaseid bigint NOT NULL,
    userid bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
);


ALTER TABLE lessee OWNER TO postgres;

--
-- Name: looking; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE looking (
    id bigint NOT NULL,
    maxmonthlyrent integer NOT NULL,
    utilitiesincluded boolean NOT NULL,
    area text,
    distancetouniv double precision,
    moveindate timestamp with time zone DEFAULT now() NOT NULL,
    lengthofstay integer,
    opentofullyearleasenewroomates boolean,
    roomtype looking_roomtype,
    sharedbathroom boolean,
    gender looking_gender DEFAULT 'no preference'::looking_gender NOT NULL,
    numroommates integer,
    furnished boolean,
    busrouterequired boolean,
    parkingneeded boolean,
    smokingallowed boolean,
    petsallowed boolean,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    payerid bigint NOT NULL,
    payeeid bigint NOT NULL,
    dollaramount double precision,
    reason text,
    rentpayment boolean DEFAULT false,
    creditcheckpayment boolean DEFAULT false,
    paymentform payment_paymentform,
    paymentdate timestamp with time zone DEFAULT now() NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    type pet_type NOT NULL,
    breed text NOT NULL,
    weightlbs bigint,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    streetnumeric integer NOT NULL,
    streetaddress text NOT NULL,
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
    parkingspots integer,
    livingareasqft integer,
    hoafee integer,
    otherfee integer,
    status property_status,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    listingid bigint,
    propertyid bigint NOT NULL,
    location text NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    propertyid bigint NOT NULL,
    ownerid bigint NOT NULL,
    qtydogsallowed integer DEFAULT 0 NOT NULL,
    qtycatsallowed integer DEFAULT 0 NOT NULL,
    qtyotherallowed integer DEFAULT 0 NOT NULL,
    animalsizelimitlbs integer DEFAULT 25 NOT NULL,
    fishtankallowed boolean DEFAULT false NOT NULL,
    preferredleaselength integer NOT NULL,
    preferredleaseunit property_lease_defaults_preferredleaseunit NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    propertyid bigint NOT NULL,
    userid bigint NOT NULL,
    id bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    propertyid bigint NOT NULL,
    monthlyprice double precision NOT NULL,
    securitydeposit double precision DEFAULT 0::double precision,
    petdeposit double precision DEFAULT 0::double precision,
    availablemovein timestamp with time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    leaseenddate timestamp with time zone,
    leaselength integer NOT NULL,
    leaselengthunit property_listing_leaselengthunit NOT NULL,
    leasetype property_listing_leasetype NOT NULL,
    gender property_listing_gender DEFAULT 'no preference'::property_listing_gender NOT NULL,
    totalutilitycost integer NOT NULL,
    roomtype property_listing_roomtype NOT NULL,
    sharedbathroom boolean,
    numroomates integer NOT NULL,
    furnished boolean,
    parkingavailable boolean,
    smokingallowed boolean,
    description text,
    status property_listing_status DEFAULT 'available'::property_listing_status,
    contactphone bigint,
    contactemail text NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    propertyownershipid bigint NOT NULL,
    ownerid bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
);


ALTER TABLE property_owner OWNER TO postgres;

--
-- Name: property_ownership; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE property_ownership (
    startdate timestamp with time zone DEFAULT now() NOT NULL,
    enddate timestamp with time zone NOT NULL,
    propertyfk bigint NOT NULL,
    id bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    id bigint NOT NULL,
    rentalappid bigint NOT NULL,
    sharecredit boolean,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    propertyid bigint NOT NULL,
    preferredleaselength integer,
    preferredmovein timestamp with time zone NOT NULL,
    numoccupants bigint DEFAULT 1::bigint NOT NULL,
    movereason text,
    preferredleaselengthunit rental_application_preferredleaselengthunit,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    confirmedemail boolean DEFAULT false NOT NULL,
    password text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    middlename text,
    aboutme text,
    phone bigint,
    profileimage text,
    twitter text,
    facebook text,
    googleplus text,
    linkedin text,
    experianidtoken text,
    creditchecktoken text,
    runidentitycheck boolean DEFAULT false NOT NULL,
    sharecreditreport boolean DEFAULT false NOT NULL,
    identitydate timestamp with time zone,
    creditreportdate timestamp with time zone,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone,
    role text DEFAULT 'user'::text,
    provider text,
    facebookoauthid text,
    googleoauthid text,
    twitteroauthid text,
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
    propertyid bigint NOT NULL,
    creatorid bigint NOT NULL,
    monthlyprice double precision NOT NULL,
    securitydeposit double precision DEFAULT 0::double precision,
    availablemovein timestamp with time zone DEFAULT now() NOT NULL,
    leaseenddate timestamp with time zone,
    leasetype room_listing_leasetype NOT NULL,
    gender room_listing_gender DEFAULT 'no preference'::room_listing_gender NOT NULL,
    monthlyutilitycost integer NOT NULL,
    roomtype room_listing_roomtype NOT NULL,
    sharedbathroom boolean,
    numroomates integer NOT NULL,
    furnished boolean,
    parkingavailable boolean,
    smokingallowed boolean,
    description text,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    roommateid bigint NOT NULL,
    fromdate timestamp with time zone DEFAULT now() NOT NULL,
    todate timestamp with time zone,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    street text NOT NULL,
    city text NOT NULL
);


ALTER TABLE student OWNER TO postgres;

--
-- Name: university; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE university (
    id bigint NOT NULL,
    name text NOT NULL,
    academicyeartype university_academicyeartype DEFAULT 'semester'::university_academicyeartype,
    streetnumeric integer NOT NULL,
    streetaddress text NOT NULL,
    apt text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    latitude numeric(10,8),
    longitude numeric(11,8),
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
);


ALTER TABLE university OWNER TO postgres;

--
-- Name: university_calender_quater; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE university_calender_quater (
    id bigint NOT NULL,
    universityid bigint NOT NULL,
    year integer NOT NULL,
    fallquaterstartdate timestamp with time zone NOT NULL,
    fallquaterenddate timestamp with time zone NOT NULL,
    winterquaterstartdate timestamp with time zone NOT NULL,
    winterquaterenddate timestamp with time zone NOT NULL,
    springquaterstartdate timestamp with time zone NOT NULL,
    springquaterenddate timestamp with time zone NOT NULL,
    summerquaterstartdate timestamp with time zone NOT NULL,
    summerquaterenddate timestamp with time zone NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    universityid bigint NOT NULL,
    year integer NOT NULL,
    fallsemesterstartdate timestamp with time zone NOT NULL,
    fallsemesterenddate timestamp with time zone NOT NULL,
    springsemesterstartdate timestamp with time zone NOT NULL,
    springsemesterenddate timestamp with time zone NOT NULL,
    summersemesterstartdate timestamp with time zone NOT NULL,
    summersemesterenddate timestamp with time zone NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    cosingeeid bigint NOT NULL,
    cosginerid bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    educationcentername text NOT NULL,
    type user_education_type DEFAULT 'university'::user_education_type,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone,
    graduation boolean DEFAULT false NOT NULL,
    graduationdate timestamp with time zone,
    major text,
    degreetype user_education_degreetype,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    startdate timestamp with time zone NOT NULL,
    enddate timestamp with time zone,
    individualannualincom bigint,
    householdannualincome bigint,
    spouseannualincome bigint,
    incomeproof text,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    presentlyemployeed boolean DEFAULT false NOT NULL,
    userid bigint NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    recommendedid bigint NOT NULL,
    recommendorid bigint NOT NULL,
    recommendedapproved boolean DEFAULT false NOT NULL,
    content text,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    userid bigint NOT NULL,
    email text NOT NULL,
    phone bigint NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    relation user_reference_relation NOT NULL,
    startdate timestamp with time zone DEFAULT now() NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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
    licenseplate text NOT NULL,
    color text NOT NULL,
    userid bigint,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone,
    deletedat timestamp with time zone
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

COPY address_history (id, streetnumeric, streetaddress, apt, city, state, zip, startdate, enddate, userid, aboutme, present, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: address_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('address_history_id_seq', 1, true);


--
-- Data for Name: apartment_complex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex (id, name, streetnumeric, streetaddress, city, state, zip, latitude, longitude, distancetouniv, petsallowed, dogsallowed, catsallowed, othersallowed, dogqtyallowed, catqtyallowed, otherqtyallowed, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: apartment_complex_floor_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_floor_plan (id, complexid, bedrooms, bathrooms, parking, living_area, washer_dryer, createdat, updatedat, deletedat) FROM stdin;
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

COPY apartment_complex_image (id, complexid, location, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: apartment_complex_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_image_id_seq', 1, true);


--
-- Data for Name: apartment_complex_transportation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY apartment_complex_transportation (id, complexid, shuttleroute, busline, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: apartment_complex_transportation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('apartment_complex_transportation_id_seq', 1, true);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY articles (id, title, content, createdat, updatedat, userid) FROM stdin;
\.


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('articles_id_seq', 1, true);


--
-- Data for Name: friend; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY friend (id, userid, friendid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: friend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('friend_id_seq', 1, true);


--
-- Data for Name: invitee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY invitee (id, firstname, lastname, invitorid, roommate, email, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: lease; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lease (id, propertyid, approved, startdate, enddate, paymentamount, paymentinterval, securitydeposit, petdeposit, payee, built, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: lease_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('lease_id_seq', 1, true);


--
-- Data for Name: lessee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lessee (leaseid, userid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: looking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY looking (id, maxmonthlyrent, utilitiesincluded, area, distancetouniv, moveindate, lengthofstay, opentofullyearleasenewroomates, roomtype, sharedbathroom, gender, numroommates, furnished, busrouterequired, parkingneeded, smokingallowed, petsallowed, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: looking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('looking_id_seq', 1, true);


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY payment (id, payerid, payeeid, dollaramount, reason, rentpayment, creditcheckpayment, paymentform, paymentdate, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('payment_id_seq', 1, true);


--
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY pet (id, userid, type, breed, weightlbs, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('pet_id_seq', 1, true);


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property (id, streetnumeric, streetaddress, city, state, zip, apt, bldg, latitude, longitude, type, description, bedrooms, bathrooms, parkingspots, livingareasqft, hoafee, otherfee, status, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_id_seq', 1, true);


--
-- Data for Name: property_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_images (id, listingid, propertyid, location, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_images_id_seq', 1, true);


--
-- Data for Name: property_lease_defaults; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_lease_defaults (id, propertyid, ownerid, qtydogsallowed, qtycatsallowed, qtyotherallowed, animalsizelimitlbs, fishtankallowed, preferredleaselength, preferredleaseunit, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_lease_defaults_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_lease_defaults_id_seq', 1, true);


--
-- Data for Name: property_likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_likes (propertyid, userid, id, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_likes_id_seq', 1, true);


--
-- Data for Name: property_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_listing (propertyid, monthlyprice, securitydeposit, petdeposit, availablemovein, id, leaseenddate, leaselength, leaselengthunit, leasetype, gender, totalutilitycost, roomtype, sharedbathroom, numroomates, furnished, parkingavailable, smokingallowed, description, status, contactphone, contactemail, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_listing_id_seq', 1, true);


--
-- Data for Name: property_owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_owner (propertyownershipid, ownerid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: property_ownership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY property_ownership (startdate, enddate, propertyfk, id, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: property_ownership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('property_ownership_id_seq', 1, true);


--
-- Data for Name: rental_applicant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_applicant (userid, id, rentalappid, sharecredit, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: rental_applicant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_applicant_id_seq', 1, true);


--
-- Data for Name: rental_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rental_application (id, propertyid, preferredleaselength, preferredmovein, numoccupants, movereason, preferredleaselengthunit, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: rental_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rental_application_id_seq', 1, true);


--
-- Data for Name: rented_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rented_user (id, username, email, confirmedemail, password, firstname, lastname, middlename, aboutme, phone, profileimage, twitter, facebook, googleplus, linkedin, experianidtoken, creditchecktoken, runidentitycheck, sharecreditreport, identitydate, creditreportdate, createdat, updatedat, deletedat, role, provider, facebookoauthid, googleoauthid, twitteroauthid, salt) FROM stdin;
\.


--
-- Name: rented_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rented_user_id_seq', 1, true);


--
-- Data for Name: room_listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY room_listing (id, propertyid, creatorid, monthlyprice, securitydeposit, availablemovein, leaseenddate, leasetype, gender, monthlyutilitycost, roomtype, sharedbathroom, numroomates, furnished, parkingavailable, smokingallowed, description, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: room_listing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('room_listing_id_seq', 1, true);


--
-- Data for Name: roommate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY roommate (id, userid, roommateid, fromdate, todate, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: roommate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('roommate_id_seq', 1, true);


--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY student (firstname, lastname, email, street, city) FROM stdin;
\.


--
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university (id, name, academicyeartype, streetnumeric, streetaddress, apt, city, state, zip, latitude, longitude, startdate, enddate, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: university_calender_quater; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_quater (id, universityid, year, fallquaterstartdate, fallquaterenddate, winterquaterstartdate, winterquaterenddate, springquaterstartdate, springquaterenddate, summerquaterstartdate, summerquaterenddate, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: university_calender_quater_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('university_calender_quater_id_seq', 1, true);


--
-- Data for Name: university_calender_semester; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY university_calender_semester (id, universityid, year, fallsemesterstartdate, fallsemesterenddate, springsemesterstartdate, springsemesterenddate, summersemesterstartdate, summersemesterenddate, createdat, updatedat, deletedat) FROM stdin;
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

COPY user_cosigner (id, cosingeeid, cosginerid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_cosigner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_cosigner_id_seq', 1, true);


--
-- Data for Name: user_education; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_education (id, userid, educationcentername, type, startdate, enddate, graduation, graduationdate, major, degreetype, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_education_id_seq', 1, true);


--
-- Data for Name: user_financial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_financial (id, userid, startdate, enddate, individualannualincom, householdannualincome, spouseannualincome, incomeproof, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_financial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_financial_id_seq', 1, true);


--
-- Data for Name: user_occupation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_occupation (id, role, company, start, "end", presentlyemployeed, userid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_occupation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_occupation_id_seq', 1, true);


--
-- Data for Name: user_recommendation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_recommendation (id, recommendedid, recommendorid, recommendedapproved, content, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_recommendation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_recommendation_id_seq', 1, true);


--
-- Data for Name: user_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_reference (id, userid, email, phone, firstname, lastname, relation, startdate, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_reference_id_seq', 1, true);


--
-- Data for Name: user_vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY user_vehicle (id, year, make, model, licenseplate, color, userid, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Name: user_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_vehicle_id_seq', 1, true);


--
-- Name: idx_26179_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT idx_26179_primary PRIMARY KEY (id);


--
-- Name: idx_26190_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex
    ADD CONSTRAINT idx_26190_primary PRIMARY KEY (id);


--
-- Name: idx_26207_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT idx_26207_primary PRIMARY KEY (id);


--
-- Name: idx_26217_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT idx_26217_primary PRIMARY KEY (id);


--
-- Name: idx_26227_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT idx_26227_primary PRIMARY KEY (id);


--
-- Name: idx_26237_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY articles
    ADD CONSTRAINT idx_26237_primary PRIMARY KEY (id);


--
-- Name: idx_26246_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT idx_26246_primary PRIMARY KEY (id);


--
-- Name: idx_26251_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT idx_26251_primary PRIMARY KEY (id);


--
-- Name: idx_26267_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT idx_26267_primary PRIMARY KEY (id);


--
-- Name: idx_26275_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT idx_26275_primary PRIMARY KEY (leaseid, userid);


--
-- Name: idx_26297_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY looking
    ADD CONSTRAINT idx_26297_primary PRIMARY KEY (id);


--
-- Name: idx_26317_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT idx_26317_primary PRIMARY KEY (id);


--
-- Name: idx_26341_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT idx_26341_primary PRIMARY KEY (id);


--
-- Name: idx_26367_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property
    ADD CONSTRAINT idx_26367_primary PRIMARY KEY (id);


--
-- Name: idx_26377_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT idx_26377_primary PRIMARY KEY (id);


--
-- Name: idx_26397_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT idx_26397_primary PRIMARY KEY (id);


--
-- Name: idx_26409_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT idx_26409_primary PRIMARY KEY (id);


--
-- Name: idx_26465_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT idx_26465_primary PRIMARY KEY (id);


--
-- Name: idx_26478_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT idx_26478_primary PRIMARY KEY (propertyownershipid, ownerid);


--
-- Name: idx_26484_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT idx_26484_primary PRIMARY KEY (id);


--
-- Name: idx_26492_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT idx_26492_primary PRIMARY KEY (id);


--
-- Name: idx_26509_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT idx_26509_primary PRIMARY KEY (id);


--
-- Name: idx_26520_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rented_user
    ADD CONSTRAINT idx_26520_primary PRIMARY KEY (id);


--
-- Name: idx_26534_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT idx_26534_primary PRIMARY KEY (id);


--
-- Name: idx_26567_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT idx_26567_primary PRIMARY KEY (id);


--
-- Name: idx_26591_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university
    ADD CONSTRAINT idx_26591_primary PRIMARY KEY (id);


--
-- Name: idx_26602_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT idx_26602_primary PRIMARY KEY (id);


--
-- Name: idx_26609_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT idx_26609_primary PRIMARY KEY (id);


--
-- Name: idx_26616_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT idx_26616_primary PRIMARY KEY (id);


--
-- Name: idx_26641_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT idx_26641_primary PRIMARY KEY (id);


--
-- Name: idx_26653_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT idx_26653_primary PRIMARY KEY (id);


--
-- Name: idx_26663_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT idx_26663_primary PRIMARY KEY (id);


--
-- Name: idx_26674_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT idx_26674_primary PRIMARY KEY (id);


--
-- Name: idx_26699_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT idx_26699_primary PRIMARY KEY (id);


--
-- Name: idx_26710_primary; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT idx_26710_primary PRIMARY KEY (id);


--
-- Name: idx_26179_addresshistory_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26179_addresshistory_user_idx ON address_history USING btree (userid);


--
-- Name: idx_26207_aptcomplexfloorplan_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26207_aptcomplexfloorplan_complex_idx ON apartment_complex_floor_plan USING btree (complexid);


--
-- Name: idx_26217_aptcompleximage_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26217_aptcompleximage_complex_idx ON apartment_complex_image USING btree (complexid);


--
-- Name: idx_26227_aptcomplextrans_complex_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26227_aptcomplextrans_complex_idx ON apartment_complex_transportation USING btree (complexid);


--
-- Name: idx_26246_friend_friend_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26246_friend_friend_idx ON friend USING btree (friendid);


--
-- Name: idx_26246_friend_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26246_friend_user_idx ON friend USING btree (userid);


--
-- Name: idx_26251_invitee_invitor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26251_invitee_invitor_idx ON invitee USING btree (invitorid);


--
-- Name: idx_26267_propertyid_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26267_propertyid_idx ON lease USING btree (propertyid);


--
-- Name: idx_26275_leaseid_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26275_leaseid_idx ON lessee USING btree (leaseid);


--
-- Name: idx_26275_lessee_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26275_lessee_user_idx ON lessee USING btree (userid);


--
-- Name: idx_26317_payment_payee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26317_payment_payee_idx ON payment USING btree (payeeid);


--
-- Name: idx_26317_payment_payer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26317_payment_payer_idx ON payment USING btree (payerid);


--
-- Name: idx_26341_pets_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26341_pets_user_idx ON pet USING btree (userid);


--
-- Name: idx_26377_propertyimages_listing_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26377_propertyimages_listing_idx ON property_images USING btree (listingid);


--
-- Name: idx_26377_propertyimages_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26377_propertyimages_property_idx ON property_images USING btree (propertyid);


--
-- Name: idx_26397_propertyleasedefaults_owner_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26397_propertyleasedefaults_owner_idx ON property_lease_defaults USING btree (ownerid);


--
-- Name: idx_26397_propertyleasedefaults_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26397_propertyleasedefaults_property_idx ON property_lease_defaults USING btree (propertyid);


--
-- Name: idx_26409_propertylikes_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26409_propertylikes_property_idx ON property_likes USING btree (propertyid);


--
-- Name: idx_26409_propertylikes_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26409_propertylikes_user_idx ON property_likes USING btree (userid);


--
-- Name: idx_26465_propertylisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26465_propertylisting_property_idx ON property_listing USING btree (propertyid);


--
-- Name: idx_26478_propertyowner_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26478_propertyowner_user_idx ON property_owner USING btree (ownerid);


--
-- Name: idx_26484_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26484_property_idx ON property_ownership USING btree (propertyfk);


--
-- Name: idx_26484_proptime; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26484_proptime ON property_ownership USING btree (startdate, enddate, propertyfk);


--
-- Name: idx_26492_rentalappid_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26492_rentalappid_idx ON rental_applicant USING btree (rentalappid);


--
-- Name: idx_26492_rentalapplicant_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26492_rentalapplicant_user_idx ON rental_applicant USING btree (userid);


--
-- Name: idx_26509_id_unique; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE UNIQUE INDEX idx_26509_id_unique ON rental_application USING btree (id);


--
-- Name: idx_26509_propfk_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26509_propfk_idx ON rental_application USING btree (propertyid);


--
-- Name: idx_26534_roommate_roomie_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26534_roommate_roomie_idx ON roommate USING btree (roommateid);


--
-- Name: idx_26534_roommate_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26534_roommate_user_idx ON roommate USING btree (userid);


--
-- Name: idx_26567_roomlisting_property_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26567_roomlisting_property_idx ON room_listing USING btree (propertyid);


--
-- Name: idx_26567_roomlisting_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26567_roomlisting_user_idx ON room_listing USING btree (creatorid);


--
-- Name: idx_26602_univcalquarter_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26602_univcalquarter_university_idx ON university_calender_quater USING btree (universityid);


--
-- Name: idx_26609_univcalsemester_university_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26609_univcalsemester_university_idx ON university_calender_semester USING btree (universityid);


--
-- Name: idx_26616_usercosigner_cosginer_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26616_usercosigner_cosginer_idx ON user_cosigner USING btree (cosginerid);


--
-- Name: idx_26616_usercosigner_cosingee_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26616_usercosigner_cosingee_idx ON user_cosigner USING btree (cosingeeid);


--
-- Name: idx_26641_usereducation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26641_usereducation_user_idx ON user_education USING btree (userid);


--
-- Name: idx_26653_userfinancials_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26653_userfinancials_user_idx ON user_financial USING btree (userid);


--
-- Name: idx_26663_useroccupation_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26663_useroccupation_user_idx ON user_occupation USING btree (userid);


--
-- Name: idx_26674_userrecommendations_recommended_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26674_userrecommendations_recommended_idx ON user_recommendation USING btree (recommendedid);


--
-- Name: idx_26674_userrecommendations_recommendor_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26674_userrecommendations_recommendor_idx ON user_recommendation USING btree (recommendorid);


--
-- Name: idx_26699_userreferences_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26699_userreferences_user_idx ON user_reference USING btree (userid);


--
-- Name: idx_26710_uservehicles_user_idx; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_26710_uservehicles_user_idx ON user_vehicle USING btree (userid);


--
-- Name: addresshistory_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address_history
    ADD CONSTRAINT addresshistory_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: aptcomplexfloorplan_complexid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_floor_plan
    ADD CONSTRAINT aptcomplexfloorplan_complexid FOREIGN KEY (complexid) REFERENCES apartment_complex(id);


--
-- Name: aptcompleximage_complexid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_image
    ADD CONSTRAINT aptcompleximage_complexid FOREIGN KEY (complexid) REFERENCES apartment_complex(id);


--
-- Name: aptcomplextrans_complexid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY apartment_complex_transportation
    ADD CONSTRAINT aptcomplextrans_complexid FOREIGN KEY (complexid) REFERENCES apartment_complex(id);


--
-- Name: friend_friendid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT friend_friendid FOREIGN KEY (friendid) REFERENCES rented_user(id);


--
-- Name: friend_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY friend
    ADD CONSTRAINT friend_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: invitee_invitorid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invitee
    ADD CONSTRAINT invitee_invitorid FOREIGN KEY (invitorid) REFERENCES rented_user(id);


--
-- Name: leaseid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT leaseid FOREIGN KEY (leaseid) REFERENCES lease(id);


--
-- Name: lessee_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lessee
    ADD CONSTRAINT lessee_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: payment_payee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payee FOREIGN KEY (payeeid) REFERENCES rented_user(id);


--
-- Name: payment_payer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT payment_payer FOREIGN KEY (payerid) REFERENCES rented_user(id);


--
-- Name: pets_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY pet
    ADD CONSTRAINT pets_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: propertyfk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_ownership
    ADD CONSTRAINT propertyfk FOREIGN KEY (propertyfk) REFERENCES property(id);


--
-- Name: propertyid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lease
    ADD CONSTRAINT propertyid FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: propertyimages_listing; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_listing FOREIGN KEY (listingid) REFERENCES property_listing(id);


--
-- Name: propertyimages_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_images
    ADD CONSTRAINT propertyimages_property FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: propertyleasedefaults_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_owner FOREIGN KEY (ownerid) REFERENCES rented_user(id);


--
-- Name: propertyleasedefaults_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_lease_defaults
    ADD CONSTRAINT propertyleasedefaults_property FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: propertylikes_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_property FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: propertylikes_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_likes
    ADD CONSTRAINT propertylikes_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: propertylisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_listing
    ADD CONSTRAINT propertylisting_property FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: propertyowner_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT propertyowner_user FOREIGN KEY (ownerid) REFERENCES rented_user(id);


--
-- Name: propertyownershipfk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY property_owner
    ADD CONSTRAINT propertyownershipfk FOREIGN KEY (propertyownershipid) REFERENCES property_ownership(id);


--
-- Name: propfk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_application
    ADD CONSTRAINT propfk FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: rentalappid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT rentalappid FOREIGN KEY (rentalappid) REFERENCES rental_application(id);


--
-- Name: rentalapplicant_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rental_applicant
    ADD CONSTRAINT rentalapplicant_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: roomlisting_property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_property FOREIGN KEY (propertyid) REFERENCES property(id);


--
-- Name: roomlisting_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY room_listing
    ADD CONSTRAINT roomlisting_user FOREIGN KEY (creatorid) REFERENCES rented_user(id);


--
-- Name: roommate_rommieid; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT roommate_rommieid FOREIGN KEY (roommateid) REFERENCES rented_user(id);


--
-- Name: roommate_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY roommate
    ADD CONSTRAINT roommate_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: univcalquarter_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_quater
    ADD CONSTRAINT univcalquarter_university FOREIGN KEY (universityid) REFERENCES university(id);


--
-- Name: univcalsemester_university; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY university_calender_semester
    ADD CONSTRAINT univcalsemester_university FOREIGN KEY (universityid) REFERENCES university(id);


--
-- Name: usercosigner_cosginer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosginer FOREIGN KEY (cosginerid) REFERENCES rented_user(id);


--
-- Name: usercosigner_cosingee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_cosigner
    ADD CONSTRAINT usercosigner_cosingee FOREIGN KEY (cosingeeid) REFERENCES rented_user(id);


--
-- Name: usereducation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_education
    ADD CONSTRAINT usereducation_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: userfinancials_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_financial
    ADD CONSTRAINT userfinancials_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: useroccupation_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_occupation
    ADD CONSTRAINT useroccupation_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: userrecommendations_recommended; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommended FOREIGN KEY (recommendedid) REFERENCES rented_user(id);


--
-- Name: userrecommendations_recommendor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_recommendation
    ADD CONSTRAINT userrecommendations_recommendor FOREIGN KEY (recommendorid) REFERENCES rented_user(id);


--
-- Name: userreferences_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_reference
    ADD CONSTRAINT userreferences_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: uservehicles_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_vehicle
    ADD CONSTRAINT uservehicles_user FOREIGN KEY (userid) REFERENCES rented_user(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

