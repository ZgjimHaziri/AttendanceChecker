-- Attendance Checker schema (overhauled)
-- Import into MySQL/MariaDB, then copy .env.example → .env

CREATE DATABASE IF NOT EXISTS pd CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pd;

DROP TABLE IF EXISTS presence;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(191) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(128) NOT NULL,
  lastName VARCHAR(128) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE presence (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT UNSIGNED NOT NULL,
  course VARCHAR(128) NOT NULL,
  week1 VARCHAR(16) NOT NULL DEFAULT '',
  week2 VARCHAR(16) NOT NULL DEFAULT '',
  week3 VARCHAR(16) NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  KEY idx_presence_user (user_id),
  CONSTRAINT fk_presence_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Demo password for every seed user: 0000
-- Hash generated with bcrypt (cost 12). Re-generate with: npm run hash-password -- 0000
INSERT INTO users (id, email, password, name, lastName) VALUES
(1, 'loreta.shala@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Loreta', 'Shala'),
(2, 'zgjim.haziri@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Zgjim', 'Haziri'),
(3, 'qendresa.bekaj@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Qëndresa', 'Bekaj'),
(4, 'rea.kasumi@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Rea', 'Kasumi'),
(5, 'vegim.shala@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Vegim', 'Shala'),
(6, 'behar.rexhepi@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Behar', 'Rexhepi'),
(7, 'erona.vrapcani@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Erona', 'Vrapcani'),
(8, 'arti.sadikaj@student.uni-pr.edu', '$2a$12$85gBFiulDQ.Ux/Z58Ug/9uEGHlT1aLQ49xvfQdSkMhalXcrSORGNu', 'Arti', 'Sadikaj');

INSERT INTO presence (user_id, course, week1, week2, week3)
SELECT u.id, c.course, '', '', ''
FROM users u
CROSS JOIN (
  SELECT 'PD' AS course UNION ALL
  SELECT 'PD Ushtrime' UNION ALL
  SELECT 'BI' UNION ALL
  SELECT 'BI Ushtrime' UNION ALL
  SELECT 'PI' UNION ALL
  SELECT 'PI Ushtrime' UNION ALL
  SELECT 'IS' UNION ALL
  SELECT 'IS Ushtrime' UNION ALL
  SELECT 'Shkrim Akademik' UNION ALL
  SELECT 'Shkrim Akademik Ushtrime'
) c;
