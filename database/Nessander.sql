/* Group: Amy Henderson & Andrew Nesseth */

SET FOREIGN_KEY_CHECKS=0;                   /* Turns off foregin key checks to minimize errors during table creation */
SET AUTOCOMMIT = 0;

/* Locations table creation */
CREATE OR REPLACE TABLE Locations(
    location_id VARCHAR(45) NOT NULL DEFAULT '99',
    country VARCHAR(45) NOT NULL,
    city VARCHAR(45),
    airport_id VARCHAR(45) NOT NULL,
    vaccine_required BOOLEAN NOT NULL,
    PRIMARY KEY (location_id),
    FOREIGN KEY (airport_id) REFERENCES Airports(airport_id) ON DELETE CASCADE
);

/* Airports table creation */
CREATE OR REPLACE TABLE Airports(
    airport_id VARCHAR(45) NOT NULL DEFAULT '99',
    country VARCHAR(45) NOT NULL,
    city VARCHAR(45) NOT NULL,
    shuttle_available BOOLEAN,
    premium_lounge BOOLEAN,
    PRIMARY KEY (airport_id)
);

/* Experience_packages table creation */
CREATE OR REPLACE TABLE Experience_packages(
    experience_id VARCHAR(45) NOT NULL,
    cost DECIMAL(19,2),
    all_inclusive BOOLEAN NOT NULL,
    ex_description VARCHAR(255) NOT NULL,
    PRIMARY KEY (experience_id)
);

/* Travelers table creation */
CREATE OR REPLACE TABLE Travelers(
    traveler_id INT AUTO_INCREMENT NOT NULL,
    full_name VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    phone_number VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    passport_country VARCHAR(45) NOT NULL,
    vaccines_updated BOOLEAN NOT NULL,
    preferred_airline VARCHAR(45),
    PRIMARY KEY (traveler_id)
);

/* Trips table creation */
CREATE OR REPLACE TABLE Trips(
    trip_id INT AUTO_INCREMENT NOT NULL,
    date_of_arrival DATE NOT NULL,
    date_of_departure DATE NOT NULL,
    experience_id VARCHAR(45),
    location_id VARCHAR(45) NOT NULL,
    PRIMARY KEY (trip_id),
    FOREIGN KEY (experience_id) REFERENCES Experience_packages(experience_id),
    FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE CASCADE
);

/* Trips_Travelers table creation */
CREATE OR REPLACE TABLE Trips_Travelers(
    trips_travelers_id INT NOT NULL AUTO_INCREMENT,
    trip_id INT NOT NULL,
    traveler_id INT NOT NULL,
    PRIMARY KEY (trips_travelers_id),
    FOREIGN KEY (trip_id) REFERENCES Trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (traveler_id) REFERENCES Travelers(traveler_id) ON DELETE CASCADE,
    UNIQUE (trip_id, traveler_id)
);


/* Test values for Locations table */
INSERT INTO Locations(location_id, country, city, airport_id, vaccine_required)
VALUES('catalonya02', 'Spain', NULL, 'BCN', TRUE),
('tokyo01', 'Japan', 'Tokyo', 'HDN', TRUE),
('narakyoto02', 'Japan', NULL, 'HDN', TRUE),
('bangkok02', 'Thailand', NULL, 'BKK', TRUE),
('incatrail03', 'Peru', NULL, 'CUZ', TRUE),
('vancouver01', 'Canada', 'Vancouver', 'YVR', TRUE);

/* Test values for Airports table */
INSERT INTO Airports(airport_id, country, city, shuttle_available, premium_lounge)
VALUES('BCN', 'Spain', 'Barcelona', TRUE, TRUE),
('CUZ', 'Peru', 'Cuzco', TRUE, FALSE),
('HDN', 'Japan', 'Tokyo', TRUE, TRUE),
('BKK', 'Thailand', 'Bangkok', FALSE, TRUE),
('YVR', 'Canada', 'Vancouver', TRUE, TRUE),
('PDX', 'USA', 'Portland', TRUE, TRUE);

/* Test values for Experience_packages table */
INSERT INTO Experience_packages(experience_id, cost, all_inclusive, ex_description)
VALUES('Gold Adventure', 10000.00, FALSE, 'Access to unique experiences and high-adventures in a given location, 5-star restaurants, and luxury transportation.'),
('Gold Traveler', 8000.00, TRUE, 'Access to major tourist attractions in a given location, 5-star restaurants, and luxury transportation.'),
('Silver Adventure', 6500.00, FALSE, 'Access to unique experiences and high-adventures in a given location and 4-star restaurants.'),
('Silver Traveler', 5000.00, TRUE, 'Access to major tourist attractions in a given location and 4-star restaurants.'),
('Bronze Adventure', 3000.00, FALSE, 'Access to select tourist attractions or experiences in a given location.');

/* Test values for Travelers table */
INSERT INTO Travelers(full_name, age, phone_number, email, passport_country, vaccines_updated, preferred_airline)
VALUES('Cassandra Shakespeare', 37, '44  (020) 7565 - 8543', 'shakespeare.cass@gmail.com', 'United Kingdom', TRUE, 'British Airways'),
('Jerome Merrit', 54, '1 (808) 334 - 3934', 'merrit.man@aol.com', 'USA', TRUE, 'Delta'),
('Tristan Merrit', 52, '1 (808) 334 - 9871', 'tristan.merrit778@yahoo.com', 'USA', TRUE, 'Delta'),
('Caladonia Campbell', 25, '44 (020) 7784 - 4479', 'everything_caladonia@gmail.com', 'United Kingdom', TRUE, 'British Airways'),
('Justin Arlington', 43, '1 (512) 445 - 6636', 'ja23451@gmail.com', 'USA', TRUE, 'United');

/* Test values for Trips table */
INSERT INTO Trips(date_of_arrival, date_of_departure, experience_id, location_id)
VALUES('2017-04-05', '2017-04-21', 1, 'bangkok02'),
('2018-09-12', '2018-09-24', 4, 'catalonya02'),
('2019-04-04', '2019-04-25', NULL, 'tokyo01'),
('2021-04-08', '2021-04-16', 5, 'catalonya02'),
('2023-06-14', '2023-06-31', 1, 'incatrail03');

/* Test values for Trips_Travelers table */
INSERT INTO Trips_Travelers(trip_id, traveler_id)
VALUES(5, 5),
(1, 1),
(1, 2),
(2, 1),
(3, 4),
(4, 3);

/* Print table structures to check for accuracy */
DESCRIBE Locations;
DESCRIBE Airports;
DESCRIBE Experience_packages;
DESCRIBE Travelers;
DESCRIBE Trips;
DESCRIBE Trips_Travelers;

/* Print table contents to check for accuracy */
SELECT * FROM Locations;
SELECT * FROM Airports;
SELECT * FROM Experience_packages;
SELECT * FROM Travelers;
SELECT * FROM Trips;
SELECT * FROM Trips_Travelers;

SET FOREIGN_KEY_CHECKS=1;                   /* Turns foregin key checks back on after table creation */
COMMIT;