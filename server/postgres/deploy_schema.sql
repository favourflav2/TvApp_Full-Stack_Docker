-- Deploy fresh database 
-- Order matter here if your tables depend on each other

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/googleLogin.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/tvshow.sql'
\i '/docker-entrypoint-initdb.d/tables/alterTable.sql'