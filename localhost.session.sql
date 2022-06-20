-- CREATE TABLE auth_user (
--   id serial PRIMARY KEY NOT NULL,
-- 	username VARCHAR(50) UNIQUE NOT NULL,
-- 	password VARCHAR(50) NOT NULL,
--   phone VARCHAR (50),
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- INSERT INTO auth_user (username, password, phone) VALUES ('pulkit', 'empty', '82325435234');
-- ALTER TABLE auth_user ALTER COLUMN password TYPE VARCHAR(250);
-- UPDATE auth_user SET password='$argon2i$v=19$m=4096,t=3,p=1$P0Ria6WS3DxAe4L03LiQAQ$+j9/sHsEmxATpTjJegImRZbJLqL/jFANLCW+dfHFRU0' WHERE username = 'pulkit';

-- CREATE TABLE role (
--   id serial PRIMARY KEY NOT NULL,
-- 	title VARCHAR(50) UNIQUE NOT NULL,
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );
-- INSERT INTO role (title) VALUES ('default');
-- INSERT INTO role (title) VALUES ('admin');
-- INSERT INTO role (title) VALUES ('super-admin');

-- CREATE TABLE user_role (
-- 	user_id INTEGER NOT NULL,
--   role_id INTEGER NOT NULL,
-- 	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   FOREIGN KEY (user_id) REFERENCES auth_user(id),
--   FOREIGN KEY (role_id) REFERENCES role(id),
--   PRIMARY KEY (user_id, role_id)
-- );

-- INSERT INTO auth_user (username, password, phone) (SELECT 'raju', password, phone FROM auth_user WHERE username='pulkit');
-- INSERT INTO auth_user (username, password, phone) (SELECT 'samy', password, phone FROM auth_user WHERE username='pulkit');

-- INSERT INTO user_role (user_id,role_id) VALUES (1,1);
-- INSERT INTO user_role (user_id,role_id) VALUES (3,2);
-- INSERT INTO user_role (user_id,role_id) VALUES (4,3);