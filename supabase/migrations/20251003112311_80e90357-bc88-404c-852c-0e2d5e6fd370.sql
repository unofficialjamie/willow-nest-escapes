-- First, delete any existing home page sections to start fresh
DELETE FROM page_sections WHERE page_name = 'home';

-- Insert all homepage sections with complete data
INSERT INTO page_sections (page_name, section_key, section_title, content_type, data, display_order, is_active) VALUES
-- Hero Section
('home', 'hero', 'Hero Section', 'hero', '{
  "title": "The Willow Nest Hotel",
  "subtitle": "Redefining Hospitality in Nigeria",
  "description": "Experience timeless elegance, modern luxury, and authentic cultural touches across our locations in Ibadan, Ogbomosho, and Abuja — with more destinations coming soon.",
  "image": "/assets/hero-luxury-hotel.jpg",
  "cta_primary": "Book Your Stay",
  "cta_secondary": "Explore Locations"
}'::jsonb, 1, true),

-- Highlights Section
('home', 'highlights', 'Quick Highlights', 'section_header', '{
  "title": "Discover Comfort, Culture, and Class",
  "description": "At The Willow Nest Hotel, we blend sophistication with comfort to create unforgettable stays for business travelers, leisure guests, and families.",
  "items": [
    {"icon": "MapPin", "title": "142 Premium Rooms", "description": "81 rooms in Ibadan, 34 rooms in Ogbomosho, and 27 rooms in Abuja"},
    {"icon": "Utensils", "title": "Fine Dining", "description": "Restaurants serving international and local cuisines"},
    {"icon": "Waves", "title": "Luxury Amenities", "description": "Swimming pools, fitness centers, and rooftop lounges"},
    {"icon": "Users", "title": "Event Facilities", "description": "Conference and event facilities with modern equipment"},
    {"icon": "Shield", "title": "Premium Service", "description": "24/7 security, free Wi-Fi, and professional concierge services"}
  ]
}'::jsonb, 2, true),

-- Featured Facilities Section
('home', 'facilities', 'Featured Facilities', 'section_header', '{
  "title": "Featured Facilities",
  "description": "Experience world-class amenities designed to exceed your expectations at every location",
  "cta_text": "Explore All Facilities",
  "cta_link": "/facilities",
  "items": [
    {
      "title": "Fine Dining Restaurant",
      "description": "Award-winning cuisine with local and international flavors, crafted by expert chefs in an elegant atmosphere.",
      "image": "/assets/facility-restaurant.jpg",
      "features": ["Local & International Cuisine", "Expert Chefs", "Elegant Atmosphere", "Room Service Available"]
    },
    {
      "title": "State-of-the-Art Fitness Center",
      "description": "Premium gym facilities with modern equipment, personal training, and wellness programs for all fitness levels.",
      "image": "/assets/facility-gym.jpg",
      "features": ["Modern Equipment", "Personal Training", "Wellness Programs", "Flexible Hours"]
    },
    {
      "title": "Executive Conference Facilities",
      "description": "Professional meeting rooms and event spaces equipped with cutting-edge audio-visual technology for business success.",
      "image": "/assets/facility-conference.jpg",
      "features": ["Audio-Visual Technology", "Flexible Layouts", "Business Services", "Catering Available"]
    },
    {
      "title": "Rooftop Lounge & Pool",
      "description": "Exclusive rooftop experience with panoramic city views, poolside service, and sophisticated ambiance for relaxation.",
      "image": "/assets/facility-rooftop.jpg",
      "features": ["Panoramic Views", "Poolside Service", "Evening Ambiance", "VIP Experience"]
    }
  ]
}'::jsonb, 3, true),

-- Locations Section
('home', 'locations', 'Our Locations', 'section_header', '{
  "title": "Our Locations",
  "description": "Three distinctive properties across Nigeria, each offering unique experiences",
  "items": [
    {
      "name": "Ibadan",
      "rooms": "81 Rooms",
      "description": "Historic charm meets modern hospitality in Nigeria''s largest city by area.",
      "image": "/assets/room-elegant.jpg",
      "link": "/locations/ibadan"
    },
    {
      "name": "Ogbomosho",
      "rooms": "34 Rooms",
      "description": "Traditional elegance in the rich cultural heritage of Oyo State.",
      "image": "/assets/pool-area.jpg",
      "link": "/locations/ogbomosho"
    },
    {
      "name": "Abuja",
      "rooms": "27 Rooms",
      "description": "Modern luxury in the heart of Nigeria''s capital.",
      "image": "/assets/restaurant.jpg",
      "link": "/locations/abuja"
    }
  ]
}'::jsonb, 4, true),

-- About Section
('home', 'about', 'About The Willow Nest Hotel', 'section_header', '{
  "title": "About The Willow Nest Hotel",
  "subtitle": "A proudly Nigerian hospitality brand setting new standards of luxury and convenience",
  "who_we_are": "The Willow Nest Hotel is a proudly Nigerian hospitality brand created to set a new standard of luxury and convenience. With locations in Ibadan, Ogbomosho, and Abuja, we provide personalized service, elegant accommodations, and thoughtfully designed spaces for business, leisure, and cultural exploration.",
  "vision": "To be Nigeria''s leading hotel group, offering unforgettable stays through exceptional service, modern facilities, and authentic cultural experiences.",
  "mission": "We are committed to delivering comfort, convenience, and class in every detail. From our beautifully designed rooms to our state-of-the-art amenities.",
  "values": [
    {"icon": "Star", "title": "Excellence in Service", "description": "Personalized attention and world-class hospitality standards"},
    {"icon": "Heart", "title": "Authenticity and Culture", "description": "Rich Nigerian heritage blended with modern luxury"},
    {"icon": "Award", "title": "Comfort and Elegance", "description": "Elegantly designed spaces for ultimate relaxation"},
    {"icon": "Users", "title": "Innovation and Growth", "description": "Continuous improvement and expanding our reach"}
  ],
  "cta_text": "Learn More About Our Story",
  "cta_link": "/about"
}'::jsonb, 5, true),

-- Testimonials Section
('home', 'testimonials', 'What Our Guests Say', 'section_header', '{
  "title": "What Our Guests Say",
  "description": "Discover why travelers choose The Willow Nest Hotel for their Nigerian adventures",
  "items": [
    {
      "name": "Adebayo Johnson",
      "location": "Lagos, Nigeria",
      "rating": 5,
      "comment": "Exceptional service and stunning facilities. The rooftop lounge in Ibadan offers breathtaking views, and the staff went above and beyond to make our stay memorable."
    },
    {
      "name": "Dr. Fatima Aliyu",
      "location": "Abuja, Nigeria",
      "rating": 5,
      "comment": "Perfect location for business meetings. The conference facilities are world-class, and being minutes from the airport made our corporate event seamless."
    },
    {
      "name": "Michael Thompson",
      "location": "London, UK",
      "rating": 5,
      "comment": "An authentic taste of Nigerian hospitality with international standards. The cultural touches in Ogbomosho combined with modern luxury created an unforgettable experience."
    }
  ]
}'::jsonb, 6, true),

-- Amenities Section
('home', 'amenities', 'Premium Amenities', 'section_header', '{
  "title": "Premium Amenities",
  "description": "Enjoy world-class facilities and services designed to make your stay unforgettable",
  "items": [
    {"icon": "Wifi", "title": "Free Wi-Fi", "description": "High-speed internet throughout the property"},
    {"icon": "Car", "title": "Free Parking", "description": "Complimentary valet and self-parking available"},
    {"icon": "Coffee", "title": "24/7 Room Service", "description": "Gourmet dining delivered to your room"},
    {"icon": "Utensils", "title": "Fine Dining", "description": "Award-winning restaurant with local and international cuisine"},
    {"icon": "Dumbbell", "title": "Fitness Center", "description": "State-of-the-art gym with personal training"},
    {"icon": "Waves", "title": "Swimming Pool", "description": "Outdoor pool with poolside service"},
    {"icon": "Shield", "title": "24/7 Security", "description": "Round-the-clock security and concierge services"},
    {"icon": "Users", "title": "Conference Facilities", "description": "Modern meeting rooms and event spaces"}
  ]
}'::jsonb, 7, true),

-- Special Offers Section
('home', 'special_offers', 'Special Offers & Packages', 'section_header', '{
  "title": "Special Offers & Packages",
  "description": "Discover exclusive deals and create unforgettable memories with our carefully curated packages",
  "packages": [
    {
      "title": "Business Traveler Package",
      "description": "Perfect for executives: Airport transfers, meeting room access, and premium Wi-Fi included.",
      "features": [
        "Complimentary airport shuttle",
        "4 hours of meeting room access",
        "Premium business center access",
        "Late checkout until 2 PM"
      ],
      "cta": "Book Business Package"
    },
    {
      "title": "Cultural Explorer Package",
      "description": "Immerse yourself in Nigerian culture with guided tours and authentic dining experiences.",
      "features": [
        "Local cultural tour guide",
        "Traditional Nigerian breakfast",
        "Artisan craft workshop",
        "Complimentary cultural souvenirs"
      ],
      "cta": "Book Cultural Package"
    }
  ]
}'::jsonb, 8, true),

-- Newsletter Section
('home', 'newsletter', 'Stay Connected', 'section_header', '{
  "title": "Stay Connected with The Willow Nest",
  "description": "Subscribe to receive exclusive offers, travel tips, and updates about our luxury accommodations across Nigeria.",
  "cta": "Subscribe",
  "privacy_text": "We respect your privacy. Unsubscribe at any time."
}'::jsonb, 9, true),

-- CTA Section
('home', 'cta', 'Call to Action', 'section_header', '{
  "title": "Ready to Experience Excellence?",
  "description": "Plan your next stay with us and discover comfort, culture, and class at The Willow Nest Hotel.",
  "cta_primary": "Book Now",
  "cta_secondary": "Contact Us"
}'::jsonb, 10, true);