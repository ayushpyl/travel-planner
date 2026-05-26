-- =============================================
-- Travel Planner - Sample Data
-- =============================================

-- Demo User (password: password123)
INSERT INTO users (name, email, password, created_at) VALUES
('Demo User', 'demo@travel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW());

-- ============ TRANSPORT OPTIONS ============

-- Delhi to Goa
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Delhi', 'Goa', 'FLIGHT', 'IndiGo Airlines', 4500, 2.5, 4.3),
('Delhi', 'Goa', 'FLIGHT', 'Air India', 5200, 2.5, 4.1),
('Delhi', 'Goa', 'FLIGHT', 'SpiceJet', 3800, 3.0, 3.9),
('Delhi', 'Goa', 'TRAIN', 'Rajdhani Express', 2100, 24.0, 4.5),
('Delhi', 'Goa', 'TRAIN', 'Goa Express', 1200, 30.0, 3.8),
('Delhi', 'Goa', 'BUS', 'Volvo Sleeper', 1800, 28.0, 3.5),
('Delhi', 'Goa', 'BUS', 'RedBus Premium', 1500, 30.0, 3.2);

-- Mumbai to Goa
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Mumbai', 'Goa', 'FLIGHT', 'IndiGo Airlines', 2800, 1.0, 4.4),
('Mumbai', 'Goa', 'FLIGHT', 'Vistara', 3500, 1.0, 4.6),
('Mumbai', 'Goa', 'TRAIN', 'Jan Shatabdi', 800, 9.0, 4.2),
('Mumbai', 'Goa', 'TRAIN', 'Konkan Kanya', 650, 11.0, 3.9),
('Mumbai', 'Goa', 'BUS', 'Paulo Travels', 1200, 10.0, 4.0),
('Mumbai', 'Goa', 'BUS', 'Neeta Travels', 900, 12.0, 3.7);

-- Delhi to Jaipur
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Delhi', 'Jaipur', 'FLIGHT', 'IndiGo Airlines', 3200, 1.0, 4.2),
('Delhi', 'Jaipur', 'TRAIN', 'Shatabdi Express', 900, 4.5, 4.6),
('Delhi', 'Jaipur', 'TRAIN', 'Ajmer Superfast', 500, 5.5, 4.0),
('Delhi', 'Jaipur', 'BUS', 'RSRTC Volvo', 800, 5.0, 3.8),
('Delhi', 'Jaipur', 'BUS', 'RedBus AC', 600, 6.0, 3.5);

-- Delhi to Mumbai
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Delhi', 'Mumbai', 'FLIGHT', 'Air India', 4800, 2.0, 4.3),
('Delhi', 'Mumbai', 'FLIGHT', 'IndiGo Airlines', 3900, 2.0, 4.4),
('Delhi', 'Mumbai', 'FLIGHT', 'Vistara', 5500, 2.0, 4.7),
('Delhi', 'Mumbai', 'TRAIN', 'Rajdhani Express', 2200, 16.0, 4.6),
('Delhi', 'Mumbai', 'TRAIN', 'Duronto Express', 1800, 17.0, 4.3);

-- Bangalore to Goa
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Bangalore', 'Goa', 'FLIGHT', 'IndiGo Airlines', 3200, 1.0, 4.2),
('Bangalore', 'Goa', 'TRAIN', 'Vasco Express', 750, 13.0, 3.9),
('Bangalore', 'Goa', 'BUS', 'VRL Travels', 1100, 10.0, 4.1),
('Bangalore', 'Goa', 'BUS', 'SRS Travels', 900, 11.0, 3.8);

-- Mumbai to Jaipur
INSERT INTO transport_options (source, destination, type, provider, price, duration_hours, rating) VALUES
('Mumbai', 'Jaipur', 'FLIGHT', 'SpiceJet', 4100, 2.0, 4.0),
('Mumbai', 'Jaipur', 'TRAIN', 'Jaipur Superfast', 1500, 18.0, 4.1),
('Mumbai', 'Jaipur', 'BUS', 'Volvo Sleeper', 1300, 16.0, 3.6);

-- ============ HOTELS ============

-- Goa Hotels
INSERT INTO hotels (city, name, type, price_per_night, rating, location, amenities, image_url) VALUES
('Goa', 'Taj Fort Aguada Resort', 'HOTEL', 8500, 4.8, 'Sinquerim Beach', 'Pool, Spa, Restaurant, Beach Access, WiFi', NULL),
('Goa', 'The Leela Goa', 'HOTEL', 12000, 4.9, 'Cavelossim Beach', 'Pool, Golf, Spa, Restaurant, Bar, WiFi', NULL),
('Goa', 'Goa Marriott Resort', 'HOTEL', 7000, 4.5, 'Miramar Beach', 'Pool, Casino, Restaurant, Gym, WiFi', NULL),
('Goa', 'Zostel Goa', 'HOSTEL', 600, 4.2, 'Calangute', 'WiFi, Common Kitchen, Lockers, Events', NULL),
('Goa', 'The Hostel Crowd', 'HOSTEL', 500, 4.0, 'Anjuna', 'WiFi, Pool, Bar, Events, Lockers', NULL),
('Goa', 'Casa Cottage', 'HOMESTAY', 2500, 4.4, 'Panjim', 'WiFi, Kitchen, Garden, Parking', NULL),
('Goa', 'Palolem Beach Resort', 'HOTEL', 3500, 4.1, 'Palolem Beach', 'Beach Access, Restaurant, WiFi, Garden', NULL),
('Goa', 'Olaulim Backyards', 'HOMESTAY', 4000, 4.6, 'Olaulim', 'Kayaking, Bird Watching, Organic Food, WiFi', NULL);

-- Jaipur Hotels
INSERT INTO hotels (city, name, type, price_per_night, rating, location, amenities, image_url) VALUES
('Jaipur', 'Rambagh Palace', 'HOTEL', 25000, 4.9, 'Bhawani Singh Road', 'Heritage, Pool, Spa, Restaurant, Garden, WiFi', NULL),
('Jaipur', 'ITC Rajputana', 'HOTEL', 6500, 4.5, 'Palace Road', 'Pool, Spa, Restaurant, Bar, WiFi', NULL),
('Jaipur', 'Hotel Pearl Palace', 'HOTEL', 2000, 4.3, 'Hathroi Fort', 'Rooftop Restaurant, WiFi, Parking', NULL),
('Jaipur', 'Zostel Jaipur', 'HOSTEL', 500, 4.1, 'MI Road', 'WiFi, Common Area, Lockers, Tours', NULL),
('Jaipur', 'Haveli Heritage Inn', 'HOMESTAY', 3000, 4.4, 'Old City', 'Heritage Architecture, WiFi, Home Cooked Food', NULL);

-- Mumbai Hotels
INSERT INTO hotels (city, name, type, price_per_night, rating, location, amenities, image_url) VALUES
('Mumbai', 'Taj Mahal Palace', 'HOTEL', 18000, 4.9, 'Gateway of India', 'Heritage, Pool, Spa, Multiple Restaurants, WiFi', NULL),
('Mumbai', 'The Oberoi Mumbai', 'HOTEL', 15000, 4.8, 'Marine Drive', 'Pool, Spa, Fine Dining, Sea View, WiFi', NULL),
('Mumbai', 'Trident Nariman Point', 'HOTEL', 9000, 4.5, 'Nariman Point', 'Pool, Restaurant, Bar, Gym, WiFi', NULL),
('Mumbai', 'Backpacker Panda', 'HOSTEL', 800, 4.0, 'Colaba', 'WiFi, Common Area, Lockers, Breakfast', NULL),
('Mumbai', 'Sea Shore Hotel', 'HOTEL', 3500, 3.8, 'Marine Lines', 'WiFi, Restaurant, Sea View', NULL);

-- Delhi Hotels
INSERT INTO hotels (city, name, type, price_per_night, rating, location, amenities, image_url) VALUES
('Delhi', 'The Imperial', 'HOTEL', 16000, 4.8, 'Janpath', 'Heritage, Pool, Spa, Restaurants, WiFi', NULL),
('Delhi', 'ITC Maurya', 'HOTEL', 12000, 4.7, 'Diplomatic Enclave', 'Pool, Spa, Bukhara Restaurant, WiFi', NULL),
('Delhi', 'Zostel Delhi', 'HOSTEL', 600, 4.1, 'Paharganj', 'WiFi, Rooftop, Common Kitchen, Events', NULL),
('Delhi', 'Haveli Dharampura', 'HOMESTAY', 8000, 4.6, 'Chandni Chowk', 'Heritage Haveli, Rooftop, WiFi, Restaurant', NULL);

-- Bangalore Hotels
INSERT INTO hotels (city, name, type, price_per_night, rating, location, amenities, image_url) VALUES
('Bangalore', 'The Leela Palace', 'HOTEL', 14000, 4.8, 'Old Airport Road', 'Pool, Spa, Fine Dining, Garden, WiFi', NULL),
('Bangalore', 'Taj West End', 'HOTEL', 10000, 4.7, 'Race Course Road', 'Heritage, Pool, Garden, Restaurant, WiFi', NULL),
('Bangalore', 'Zostel Bangalore', 'HOSTEL', 550, 4.0, 'Indiranagar', 'WiFi, Common Area, Events, Lockers', NULL),
('Bangalore', 'GoStops Bangalore', 'HOSTEL', 700, 4.2, 'Koramangala', 'WiFi, Cafe, Events, Workspace', NULL);

-- ============ TOURIST PLACES ============

-- Goa Places
INSERT INTO tourist_places (city, name, description, rating, entry_fee, image_url) VALUES
('Goa', 'Basilica of Bom Jesus', 'A UNESCO World Heritage Site, this 16th-century baroque church holds the mortal remains of St. Francis Xavier.', 4.6, 0, NULL),
('Goa', 'Fort Aguada', 'A well-preserved 17th-century Portuguese fort overlooking the Arabian Sea with a lighthouse.', 4.4, 25, NULL),
('Goa', 'Dudhsagar Falls', 'One of the tallest waterfalls in India at 310m, surrounded by lush forest. Best visited during monsoon.', 4.7, 400, NULL),
('Goa', 'Calangute Beach', 'The largest and most popular beach in North Goa, known for water sports and nightlife.', 4.2, 0, NULL),
('Goa', 'Se Cathedral', 'One of the largest churches in Asia, known for its Portuguese-Gothic architecture and golden bell.', 4.3, 0, NULL),
('Goa', 'Anjuna Flea Market', 'Famous Wednesday flea market offering everything from handicrafts to spices to clothing.', 4.1, 0, NULL),
('Goa', 'Spice Plantation Tour', 'Guided tour through aromatic spice gardens with traditional Goan lunch included.', 4.5, 500, NULL);

-- Jaipur Places
INSERT INTO tourist_places (city, name, description, rating, entry_fee, image_url) VALUES
('Jaipur', 'Amber Fort', 'A majestic hilltop fort known for artistic Hindu-Rajput architecture, with elephant rides available.', 4.8, 500, NULL),
('Jaipur', 'Hawa Mahal', 'The iconic Palace of Winds with 953 small windows, built in 1799 of red and pink sandstone.', 4.6, 200, NULL),
('Jaipur', 'City Palace', 'A grand complex of courtyards, gardens and buildings blending Rajasthani and Mughal architecture.', 4.5, 500, NULL),
('Jaipur', 'Jantar Mantar', 'A UNESCO World Heritage Site housing the worlds largest stone sundial and astronomical instruments.', 4.4, 200, NULL),
('Jaipur', 'Nahargarh Fort', 'Perched on Aravalli Hills, offering panoramic views of Jaipur city, especially stunning at sunset.', 4.3, 200, NULL),
('Jaipur', 'Albert Hall Museum', 'Rajasthans oldest museum housing an Egyptian mummy, collection of artifacts, and stunning architecture.', 4.2, 150, NULL);

-- Mumbai Places
INSERT INTO tourist_places (city, name, description, rating, entry_fee, image_url) VALUES
('Mumbai', 'Gateway of India', 'Iconic monument built in 1924 overlooking the Arabian Sea, a symbol of Mumbai.', 4.5, 0, NULL),
('Mumbai', 'Elephanta Caves', 'UNESCO World Heritage rock-cut cave temples dedicated to Lord Shiva, accessible by ferry.', 4.6, 600, NULL),
('Mumbai', 'Marine Drive', 'A 3.6km promenade along the coast known as the Queens Necklace for its nighttime appearance.', 4.4, 0, NULL),
('Mumbai', 'Chhatrapati Shivaji Terminus', 'UNESCO World Heritage Victorian Gothic railway station, an architectural masterpiece.', 4.5, 0, NULL),
('Mumbai', 'Sanjay Gandhi National Park', 'A sprawling urban park with ancient Kanheri Caves, lion safari, and rich biodiversity.', 4.3, 150, NULL);

-- Delhi Places
INSERT INTO tourist_places (city, name, description, rating, entry_fee, image_url) VALUES
('Delhi', 'Red Fort', 'Magnificent Mughal fort built in 1638, a UNESCO World Heritage Site and symbol of India.', 4.6, 500, NULL),
('Delhi', 'Qutub Minar', 'The tallest brick minaret in the world at 72.5m, built in 1193, UNESCO World Heritage Site.', 4.5, 500, NULL),
('Delhi', 'India Gate', 'A war memorial arch standing 42m tall, surrounded by lush gardens, illuminated beautifully at night.', 4.4, 0, NULL),
('Delhi', 'Humayuns Tomb', 'A UNESCO World Heritage Site, this Mughal garden tomb inspired the design of the Taj Mahal.', 4.7, 500, NULL),
('Delhi', 'Lotus Temple', 'A Bahai House of Worship shaped like a lotus flower, known for its stunning architecture.', 4.3, 0, NULL),
('Delhi', 'Chandni Chowk', 'One of the oldest and busiest markets in India, famous for street food and shopping.', 4.2, 0, NULL);

-- Bangalore Places
INSERT INTO tourist_places (city, name, description, rating, entry_fee, image_url) VALUES
('Bangalore', 'Bangalore Palace', 'A Tudor-style palace inspired by Englands Windsor Castle, with beautiful woodcarvings.', 4.3, 460, NULL),
('Bangalore', 'Lalbagh Botanical Garden', 'A 240-acre botanical garden with rare plants, a glass house, and a stunning lake.', 4.5, 25, NULL),
('Bangalore', 'Cubbon Park', 'A sprawling green park in the heart of the city with museums, libraries and walking trails.', 4.2, 0, NULL),
('Bangalore', 'ISKCON Temple', 'One of the largest ISKCON temples in the world with stunning architecture and spiritual ambiance.', 4.4, 0, NULL),
('Bangalore', 'Nandi Hills', 'A hilltop fortress 60km from the city, famous for sunrise views and cycling trails.', 4.5, 20, NULL);

-- ============ SAMPLE REVIEWS ============
INSERT INTO reviews (user_id, user_name, entity_type, entity_id, entity_name, rating, comment, created_at) VALUES
(1, 'Demo User', 'TRANSPORT', 1, 'IndiGo Airlines (Delhi-Goa)', 4, 'Great service and on-time departure. Comfortable seats.', NOW()),
(1, 'Demo User', 'HOTEL', 1, 'Taj Fort Aguada Resort', 5, 'Absolutely stunning property! The beach access and pool area are world-class.', NOW()),
(1, 'Demo User', 'ATTRACTION', 3, 'Dudhsagar Falls', 5, 'Breathtaking waterfall! The jeep ride through the forest was an adventure in itself.', NOW()),
(1, 'Demo User', 'HOTEL', 4, 'Zostel Goa', 4, 'Amazing vibe and great community. Perfect for solo travelers on a budget.', NOW()),
(1, 'Demo User', 'ATTRACTION', 8, 'Amber Fort', 5, 'Magnificent architecture! Spend at least 3-4 hours here to fully explore.', NOW());
