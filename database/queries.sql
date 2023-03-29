
-- SELECT queries from tables to populate --

/* SELECT all data from all relevant entities */
SELECT * FROM Locations;
SELECT * FROM Experience_packages;
SELECT * FROM Airports;
SELECT * FROM Travelers;
SELECT * FROM Trips;

/* SELECT relevant information associated with all trips */
SELECT Trips_Travelers.trips_travelers_id, Trips_Travelers.trip_id, Trips.date_of_arrival as arrival, Trips.date_of_departure as departure, Travelers.full_name as name
FROM Trips_Travelers 
JOIN Travelers ON Travelers.traveler_id = Trips_Travelers.traveler_id
JOIN Trips ON Trips.trip_id = Trips_Travelers.trip_id
ORDER BY trips_travelers_id;



-- INSERT queries for adding new values to each entity --

/* Locations insert query */
INSERT INTO Locations(location_id, country, city, airport_id, vaccine_required) 
VALUES ('${data['in-location_id']}', '${data['in-country']}', '${data['in-city']}', '${data['in-airport_id']}', '${data['in-vaccine_required']}');
/* Airport insert query */
INSERT INTO Airports(airport_id, country, city, shuttle_available, premium_lounge) 
VALUES ('${data['in-airport_id']}', '${data['in-country']}', '${data['in-city']}', '${data['in-shuttle_available']}', '${data['in-premium_lounge']}');
/* Experience packages insert query */
INSERT INTO Experience_packages(experience_id, cost, all_inclusive, description) 
VALUES ('${data['in-experience_id']}', '${data['in-cost']}', '${data['in-all_inclusive']}', '${data['in-description']}');
/* Traveler's insert query */
INSERT INTO Travelers(name, age, phone_number, email, passport_country, vaccines_updated, preferred_airline) 
VALUES ('${data['in-name']}', '${data['in-age']}', '${data['in-phone_number']}', '${data['in-email']}', '${data['in-passport_country']}', '${data['in-vaccines_updated']}', '${data['in-preferred_airline']}');
/* Trips insert query */
INSERT INTO Trips(date_of_arrival, date_of_departure, experience_id, location_id) 
VALUES ('${data['in-date_of_arrival']}', '${data['in-date_of_departure']}', '${data['in-experience_id']}', '${data['in-location_id']}');



-- SELECT AND UPDATE queries to change existing values --

/* SELECT a specific traveler to UPDATE */
SELECT traveler_id, name, age, phone_number, email, passport_country, vaccines_updated, preferred_airline 
FROM Travelers 
WHERE traeler_id = :traveler_ID_selected_from_browse_traveler_page;
/* UPDATE Traveler information */
UPDATE Travelers SET name = :fnameInput, age = :ageInput, phone_number = :phoneInput, email = :emailInput, passport_country = :passportInput, vaccine_required = :vaccinesInput, preferred_airline = :airlineInput
WHERE traveler_id = :traveler_ID_selected_from_browse_traveler_page;

/* SELECT a specific trip to UPDATE */
SELECT trip_id, date_of_arrival, date_of_departure, experience_id, location_id 
FROM Trips 
WHERE trip_id = :trip_id_selected_from_browse_trips_page;
/* UPDATE Trip information */
UPDATE Trips SET date_of_arrival = :arrivalInput, date_of_departure = :departureInpute, experience_id = :experienceInput, location_id = :locationInput;
WHERE trip_id = :trip_id_selected_from_browse_trips_page;

/* SELECT a specific trip_traveler relationship to UPDATE */
SELECT trips_travelers_id, trip_id, traeler_id
FROM Trips_Travelers
WHERE trips_travlers_id = :trips_travelers_id_selected_from_browse_trips_travelers_page;
/* UPDATE Trip_Traveler information */
UPDATE Trips_Travelers SET trip_id = '${data['in-trip_id']}', traveler_id = '${data['in-traveler_id']}' 
WHERE Trips_Travelers_id = '${data['in-trips_travelers_id']}'


-- DELETE quereies to remove rows from entities --

/* DELETE a trip from Trips */
DELETE FROM Trips
WHERE trip_id = :trip_id_selected_from_browse_trips_page;
/* DELETE a traveler from Travelers */ 
DELETE FROM Travelers
WHERE traveler_id = :traveler_ID_selected_from_browse_traveler_page;
/* DELETE a relationship between a trip and a traveler */
DELETE FROM Trips_Travelers 
WHERE traveler_id = :traveler_ID_selected_from_browse_traveler_page and trip_id = :trip_id_selected_from_browse_trips_page;




