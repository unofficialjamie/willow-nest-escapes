-- Seed About Page
INSERT INTO page_sections (page_name, section_key, section_title, content_type, data, display_order, is_active) VALUES
('about', 'hero', 'Hero Section', 'hero', '{
  "title": "About Us",
  "description": "Discover the story behind Nigeria''s premier hospitality brand",
  "image": "/assets/hero-luxury-hotel.jpg"
}'::jsonb, 1, true),

('about', 'who_we_are', 'Who We Are', 'section_header', '{
  "title": "Who We Are",
  "content": "The Willow Nest Hotel is a proudly Nigerian hospitality brand created to set a new standard of luxury and convenience. With locations in Ibadan, Ogbomosho, and Abuja, we provide personalized service, elegant accommodations, and thoughtfully designed spaces for business, leisure, and cultural exploration."
}'::jsonb, 2, true),

('about', 'vision_mission', 'Vision & Mission', 'section_header', '{
  "vision_title": "Our Vision",
  "vision": "To be Nigeria''s leading hotel group, offering unforgettable stays through exceptional service, modern facilities, and authentic cultural experiences.",
  "mission_title": "Our Mission",
  "mission": "We are committed to delivering comfort, convenience, and class in every detail. From our beautifully designed rooms to our state-of-the-art amenities, we ensure each guest feels at home while enjoying the best of Nigerian hospitality."
}'::jsonb, 3, true),

('about', 'values', 'Core Values', 'section_header', '{
  "title": "Our Core Values",
  "description": "The principles that guide everything we do",
  "items": [
    {"icon": "Award", "title": "Excellence in Service", "description": "We strive to exceed expectations in every guest interaction"},
    {"icon": "Heart", "title": "Authenticity and Culture", "description": "Celebrating Nigerian heritage with modern hospitality"},
    {"icon": "Star", "title": "Comfort and Elegance", "description": "Luxurious accommodations designed for your wellbeing"},
    {"icon": "Lightbulb", "title": "Innovation and Growth", "description": "Continuously evolving to serve you better"},
    {"icon": "Users", "title": "Community and Sustainability", "description": "Building lasting relationships with our communities"}
  ]
}'::jsonb, 4, true),

('about', 'cta', 'Call to Action', 'section_header', '{
  "title": "Experience Our Hospitality",
  "description": "Discover what makes The Willow Nest Hotel special. Book your stay today and become part of our story."
}'::jsonb, 5, true);

-- Seed Contact Page
INSERT INTO page_sections (page_name, section_key, section_title, content_type, data, display_order, is_active) VALUES
('contact', 'hero', 'Hero Section', 'hero', '{
  "title": "Contact Us",
  "description": "Get in touch with us for reservations, inquiries, or any assistance you need",
  "image": "/assets/hero-luxury-hotel.jpg"
}'::jsonb, 1, true),

('contact', 'locations', 'Contact Locations', 'section_header', '{
  "items": [
    {"name": "Head Office", "email": "reservations@thewillowshotels.com", "phone": "+234 (0) 813 111 1808", "address": "Nigeria"},
    {"name": "Ibadan Branch", "email": "reservations.ib@thewillowshotels.com", "phone": "+234 (0) 813 111 1808", "address": "Ibadan, Oyo State"},
    {"name": "Ogbomosho Branch", "email": "reservations.ogb@thewillowshotels.com", "phone": "+234 (0) 813 111 1808", "address": "Ogbomosho, Oyo State"},
    {"name": "Abuja Branch", "email": "reservations.abj@thewillowshotels.com", "phone": "+234 (0) 813 111 1808", "address": "Garki, Abuja"}
  ]
}'::jsonb, 2, true),

('contact', 'social', 'Social Media', 'section_header', '{
  "title": "Follow Us",
  "description": "Stay connected with us for updates, special offers, and behind-the-scenes content."
}'::jsonb, 3, true);

-- Seed FAQ Page
INSERT INTO page_sections (page_name, section_key, section_title, content_type, data, display_order, is_active) VALUES
('faq', 'hero', 'Hero Section', 'hero', '{
  "title": "Frequently Asked Questions",
  "description": "Find answers to common questions about our services, policies, and amenities",
  "image": "/assets/hero-luxury-hotel.jpg"
}'::jsonb, 1, true),

('faq', 'faqs', 'FAQ List', 'section_header', '{
  "items": [
    {"question": "What time is check-in and check-out?", "answer": "Check-in starts at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability."},
    {"question": "Do you offer airport shuttle services?", "answer": "Yes, shuttle services are available at selected branches. Please contact the front desk to arrange transportation. Additional charges may apply."},
    {"question": "Are pets allowed?", "answer": "Currently, pets are not permitted at any of our locations. We apologize for any inconvenience this may cause."},
    {"question": "Do you host weddings and events?", "answer": "Yes, we offer event spaces and banquet halls for weddings, conferences, and private events. Our dedicated events team can help you plan the perfect celebration."},
    {"question": "Is parking available?", "answer": "Yes, we provide complimentary valet and self-parking across all branches. Parking is available on a first-come, first-served basis."},
    {"question": "What payment methods do you accept?", "answer": "We accept major credit cards, debit cards, and bank transfers. Cash payments are also accepted in Nigerian Naira."},
    {"question": "Do you offer room service?", "answer": "Yes, we provide 24/7 room service at all our locations. Our extensive menu features both local and international cuisine."},
    {"question": "Is Wi-Fi available?", "answer": "Complimentary high-speed Wi-Fi is available throughout all our properties, including guest rooms, public areas, and business facilities."},
    {"question": "What is your cancellation policy?", "answer": "Free cancellation up to 24 hours before arrival. Later cancellations may incur charges equivalent to one night''s stay."},
    {"question": "Do you have fitness facilities?", "answer": "Yes, all our locations feature fully equipped fitness centers with modern equipment. Some locations also offer personal training services."},
    {"question": "Can you arrange local tours and activities?", "answer": "Our concierge team can help arrange local tours, cultural experiences, and activities. We''re happy to help you explore the best of each destination."},
    {"question": "Do you offer conference facilities?", "answer": "Yes, we have modern conference halls and meeting rooms equipped with audio-visual technology at all locations. Perfect for business meetings and corporate events."}
  ]
}'::jsonb, 2, true),

('faq', 'cta', 'Contact CTA', 'section_header', '{
  "title": "Still Have Questions?",
  "description": "Can''t find what you''re looking for? Our friendly staff is always ready to help.",
  "email": "reservations@thewillowshotels.com",
  "phone": "+2348131111808"
}'::jsonb, 3, true);

-- Seed Facilities Page
INSERT INTO page_sections (page_name, section_key, section_title, content_type, data, display_order, is_active) VALUES
('facilities', 'hero', 'Hero Section', 'hero', '{
  "title": "Facilities & Amenities",
  "description": "World-class facilities and premium services designed to exceed your expectations across all our locations",
  "image": "/assets/hero-luxury-hotel.jpg"
}'::jsonb, 1, true),

('facilities', 'main_facilities', 'Premium Amenities', 'section_header', '{
  "title": "Premium Amenities",
  "description": "Every facility is carefully designed to provide comfort, convenience, and luxury throughout your stay",
  "items": [
    {"icon": "Bed", "title": "Luxury Accommodations", "description": "Elegant rooms with modern décor, premium bedding, and city or garden views across all locations."},
    {"icon": "Utensils", "title": "Fine Dining Restaurants", "description": "Local and international cuisine prepared by expert chefs, showcasing the best of Nigerian and global flavors."},
    {"icon": "Users", "title": "Conference & Event Facilities", "description": "Spacious halls and meeting rooms equipped with modern audio-visual technology for business and social events."},
    {"icon": "Dumbbell", "title": "Fitness Centers", "description": "Fully equipped gyms with state-of-the-art equipment and personal training services available."},
    {"icon": "Waves", "title": "Swimming Pools", "description": "Outdoor pools with poolside service, perfect for relaxation and recreation in all our properties."},
    {"icon": "Coffee", "title": "Concierge & Room Service", "description": "24/7 concierge services, room service, and valet parking to ensure your comfort at all times."},
    {"icon": "Shield", "title": "Security & Connectivity", "description": "24-hour surveillance systems and complimentary high-speed Wi-Fi throughout all properties."},
    {"icon": "Wifi", "title": "High-Speed Internet", "description": "Complimentary Wi-Fi access in all rooms, public areas, and business facilities."},
    {"icon": "Car", "title": "Parking Services", "description": "Complimentary valet and self-parking options available at all locations."},
    {"icon": "Phone", "title": "Business Services", "description": "Full business center with printing, copying, and secretarial services for corporate guests."},
    {"icon": "Sparkles", "title": "Spa & Wellness", "description": "Relaxation and wellness services to rejuvenate your body and mind during your stay."},
    {"icon": "Building", "title": "Rooftop Lounges", "description": "Exclusive rooftop spaces with panoramic views, perfect for evening relaxation and social gatherings."}
  ]
}'::jsonb, 2, true),

('facilities', 'additional_services', 'Additional Services', 'section_header', '{
  "title": "Additional Services",
  "categories": [
    {
      "title": "Business & Corporate",
      "items": ["Professional meeting rooms with AV equipment", "High-speed internet and Wi-Fi", "Business center with printing and copying", "Corporate event planning services", "Executive lounge access"]
    },
    {
      "title": "Leisure & Recreation",
      "items": ["Swimming pools with poolside service", "Fitness centers with modern equipment", "Spa and wellness treatments", "Rooftop lounges with city views", "Cultural tour arrangements"]
    },
    {
      "title": "Dining & Entertainment",
      "items": ["Fine dining restaurants", "Local and international cuisine", "24/7 room service", "Private dining arrangements", "Bar and lounge facilities"]
    },
    {
      "title": "Guest Services",
      "items": ["24/7 concierge services", "Airport shuttle arrangements", "Laundry and dry cleaning", "Currency exchange assistance", "Tour and activity bookings"]
    }
  ]
}'::jsonb, 3, true),

('facilities', 'cta', 'Call to Action', 'section_header', '{
  "title": "Experience Premium Hospitality",
  "description": "From luxury accommodations to world-class amenities, we provide everything you need for an exceptional stay."
}'::jsonb, 4, true);