DROP DATABASE IF EXISTS aristowebb;
CREATE DATABASE aristowebb;

SET NAMES 'utf8';

USE aristowebb;

CREATE TABLE cats(
    id              INT             NOT NULL    AUTO_INCREMENT,
    cat_name        VARCHAR(200)    NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tasks(
    id              INT             NOT NULL    AUTO_INCREMENT,
    task_title      VARCHAR(200)    NOT NULL,
    task_description VARCHAR(500)   NOT NULL,
    points          INT             NOT NULL,
    more_than_one   BIT,
    PRIMARY KEY (id)
);

CREATE TABLE completions(
    id              INT             NOT NULL    AUTO_INCREMENT,
    cat_id          INT             NOT NULL,
    task_id         INT             NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE timetable(
    id              INT             NOT NULL    AUTO_INCREMENT,
    timetable       TEXT            NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO timetable (timetable) VALUES ("<b>Lorem ipsum dolor sit amet</b> \n eum at suavitate sadipscing, elit dolorem efficiantur ex vix, pro paulo facilis vulputate ut. Usu no homero meliore, est ei hinc tota paulo. Mollis intellegat disputationi sea et. Pro bonorum habemus ut, &#129409;");

INSERT INTO cats (cat_name) VALUES
("MM"),
("Mugg Mupp"),
("Kupp Mupp"),
("96:an Mupp");

INSERT INTO tasks (task_title, task_description, points, more_than_one) VALUES
("Först på däck", "Var den första som däckar på konferensen", 50, false),
("Sångfågel", "Sjung en sång med några locals", 20, true),
("Generös", "Bjud en local på en grasshopper", 20, true);

INSERT INTO completions (cat_id, task_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3);