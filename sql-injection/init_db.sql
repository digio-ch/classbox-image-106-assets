DROP DATABASE IF EXISTS sql_injection;
CREATE DATABASE sql_injection;
USE sql_injection;

CREATE TABLE user (
  id INT UNSIGNED AUTO_INCREMENT,
  username VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  secret CHAR(4) NOT NULL,

  PRIMARY KEY(id)
);

INSERT INTO user (username, password, secret) VALUES
  ('admin', 'PaS5W0rd.439', '8722'),
  ('sales', 'S4L3TH22.1W', '2309'),
  ('backoffice', 'Uw8zLhss!', '1274');
