BEGIN TRANSACTION;

CREATE TABLE public.google_login (
    google_id numeric NOT NULL PRIMARY KEY,
    email text NOT NULL
);
COMMIT;