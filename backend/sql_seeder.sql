DROP DATABASE IF EXISTS aristowebb;
CREATE DATABASE aristowebb;
USE aristowebb;

CREATE TABLE cats(
    id              INT             NOT NULL    AUTO_INCREMENT,
    cat_name        VARCHAR(200)    NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tasks(
    id              INT             NOT NULL    AUTO_INCREMENT,
    title           VARCHAR(200)    NOT NULL,
    task_description VARCHAR(200)    NOT NULL,
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