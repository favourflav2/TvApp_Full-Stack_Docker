BEGIN TRANSACTION;

CREATE TABLE public.login (
    id SERIAL NOT NULL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    hash character varying(100) NOT NULL
);
COMMIT;