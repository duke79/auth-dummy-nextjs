-- CREATE TABLE auth_user (
--   id serial PRIMARY KEY NOT NULL,
-- 	username VARCHAR(50) UNIQUE NOT NULL,
-- 	password VARCHAR(50) NOT NULL,
--   phone VARCHAR (50),
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

INSERT INTO auth_user (username, password, phone) VALUES ('pulkit', 'empty', '82325435234');