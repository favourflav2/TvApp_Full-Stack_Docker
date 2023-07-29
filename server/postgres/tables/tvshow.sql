BEGIN TRANSACTION;

CREATE TABLE public.tvshow (
    tv_id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    show_id integer NOT NULL,
    loggedinuser_id smallint,
    loggedingoogle_id numeric,
    imgpath character varying(100) NOT NULL
);

COMMIT;