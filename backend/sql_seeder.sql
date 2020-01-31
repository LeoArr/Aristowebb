DROP DATABASE IF EXISTS vadlyssnardupa;
CREATE DATABASE vadlyssnardupa;
USE vadlyssnardupa;

CREATE TABLE posts(
    id              INT             NOT NULL    AUTO_INCREMENT,
    posted_date     DATETIME        NOT NULL,
    post_title      VARCHAR(500)    NOT NULL,
    post_text       TEXT            NOT NULL,
    is_episode      BIT,
    episode_url     VARCHAR(1000),             
    PRIMARY KEY (id)
);

CREATE TABLE tokens(
    token           VARCHAR(8)     NOT NULL,
    created_date    DATETIME        NOT NULL,
    PRIMARY KEY (token)
);

SET GLOBAL event_scheduler = ON;

CREATE EVENT Weekly_cleanup
ON SCHEDULE EVERY 1 WEEK
DO
    DELETE FROM tokens
    WHERE DATEDIFF(NOW(), created_date) > 7;