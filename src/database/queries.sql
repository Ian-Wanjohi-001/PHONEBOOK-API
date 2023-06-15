CREATE DATABASE phonebook;

USE phonebook;

CREATE TABLE contacts
(
    id int IDENTITY(1,1),
    fullname VARCHAR(50),
    mobilenumber VARCHAR (50),
    worknumber VARCHAR(50),
    email VARCHAR(50),
    homeaddress VARCHAR(50),
    groupid INT DEFAULT NULL,
    FOREIGN KEY(groupid) REFERENCES groups(groupid),
    PRIMARY KEY (mobilenumber),

)

CREATE TABLE groups
(
    groupidid INT IDENTITY(1,1) PRIMARY KEY,
    groupname VARCHAR(50),
)

INSERT INTO groups
VALUES
    ('family'),
    ('friend'),
    ('colleague'),
    ('classmate');

-- GET ALL CONTACTS
SELECT * FROM contacts;

-- GET GROUP ID
SELECT groupid FROM groups WHERE groupname = @name;

-- ASSIGN GROUP
UPDATE contacts SET groupid = @groupid WHERE id = @id;