BEGIN TRANSACTION;

CREATE TABLE public.users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username character varying(100) NOT NULL,
    email text NOT NULL UNIQUE,
    joined timestamp without time zone NOT NULL,
    google_id numeric UNIQUE
);

COMMIT;