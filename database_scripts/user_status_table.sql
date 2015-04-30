CREATE TABLE user_status (
    id bigint NOT NULL,
    "userId" bigint,
    "carpoolingToCampus" boolean DEFAULT false,
    "carpoolingFromCampus" boolean DEFAULT false,
    "carpoolingForGroceries" boolean DEFAULT false,
    "carpoolingForRoadtrip" boolean DEFAULT false,
    "carpoolingSplit" boolean DEFAULT false,
    "walkingToCampus" boolean DEFAULT false,
  	"walkingFromCampus" boolean DEFAULT false,
  	"meetForHangout" boolean DEFAULT false,
  	"meetForStudy" boolean DEFAULT false,
  	"meetForEvents" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone
);

ALTER TABLE user_status OWNER TO postgres;

CREATE SEQUENCE user_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE user_status_id_seq OWNER TO postgres;

ALTER SEQUENCE user_status_id_seq OWNED BY user_status.id;

ALTER TABLE ONLY user_status ALTER COLUMN id SET DEFAULT nextval('user_status_id_seq'::regclass);

COPY user_status (id, "userId", "carpoolingToCampus", "carpoolingFromCampus", "carpoolingForGroceries", "carpoolingForRoadtrip", "carpoolingSplit", "walkingToCampus", "walkingFromCampus", "meetForHangout", "meetForStudy", "meetForEvents", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.

SELECT pg_catalog.setval('user_status_id_seq', 1, true);

ALTER TABLE ONLY user_status
    ADD CONSTRAINT "idx_42380_PRIMARY" PRIMARY KEY (id);

ALTER TABLE ONLY user_status
    ADD CONSTRAINT userstatuses_user FOREIGN KEY ("userId") REFERENCES rented_user(id);

CREATE INDEX idx_42380_userstatuses_user_idx ON user_status USING btree ("userId");
