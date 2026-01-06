
import { Room, Review } from './types';

// Asset helper to standardize local paths
const local = (name: string) => `/assets/images/${name}`;

export const RESORT_ASSETS = {
  HERO: {
    local: local('hero.jpg'),
    remote: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1920'
  },
  ABOUT_MAIN: {
    local: local('about-main.jpg'),
    remote: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1920'
  },
  FACILITY_POOL: {
    local: local('facility-pool.jpg'),
    remote: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
  }
};

export const ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Standard Couple Suite',
    description: 'Perfect for a romantic getaway with a garden view and private balcony.',
    capacity: '2 Adults',
    price: 3500,
    inclusions: ['Air Conditioning', 'Queen Bed', 'Free Breakfast', 'Wi-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    localImage: local('rooms/couple-suite.jpg'),
    category: 'Couple'
  },
  {
    id: 'room-2',
    name: 'Family Garden Villa',
    description: 'Spacious villa designed for families, featuring direct access to the kids pool.',
    capacity: '4-6 Pax',
    price: 7500,
    inclusions: ['2 Double Beds', 'Mini Fridge', 'Free Breakfast', 'Pool Access'],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    localImage: local('rooms/family-villa.jpg'),
    category: 'Family'
  },
  {
    id: 'room-3',
    name: 'Barkada Dormitory',
    description: 'The ultimate bonding space for large groups and friends.',
    capacity: '10-12 Pax',
    price: 12000,
    inclusions: ['Bunk Beds', 'Locker Space', 'Private Bathroom', 'Common Lounge'],
    imageUrl: 'https://images.unsplash.com/photo-1555854817-5b2247a8175f?auto=format&fit=crop&q=80&w=800',
    localImage: local('rooms/barkada-dorm.jpg'),
    category: 'Barkada'
  },
  {
    id: 'room-4',
    name: 'Exclusive Private Pavilion',
    description: 'Complete privacy with its own pool and dedicated staff.',
    capacity: 'Up to 20 Pax',
    price: 25000,
    inclusions: ['Private Pool', 'Kitchen Access', 'Karaoke', 'Billiards'],
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    localImage: local('rooms/pavilion.jpg'),
    category: 'Private'
  }
];

export const GALLERY_ITEMS = [
  { url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6', local: local('gallery/pool-main.jpg'), title: 'Main Infinity Pool', category: 'Pools' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', local: local('gallery/villa-interior.jpg'), title: 'Luxury Villa Interior', category: 'Rooms' },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', local: local('gallery/event-space.jpg'), title: 'Outdoor Event Space', category: 'Events' },
  { url: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877', local: local('gallery/garden.jpg'), title: 'Lush Garden Walkway', category: 'Nature' },
  { url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7', local: local('gallery/sunset.jpg'), title: 'Poolside Sunset', category: 'Pools' },
  { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', local: local('gallery/suite.jpg'), title: 'Couples Suite', category: 'Rooms' },
];

export const FACILITIES_DATA = [
  { id: 'f1', name: 'Infinity Pools', desc: '4 clusters of pristine pools for all ages.', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7', localImage: local('facilities/pool.jpg'), icon: 'Waves' },
  { id: 'f2', name: 'Event Pavilions', desc: 'Spacious areas for weddings and team building.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', localImage: local('facilities/pavilion.jpg'), icon: 'Layout' },
  { id: 'f3', name: 'Resort Cafe', desc: 'Enjoy local Antipolo delicacies and fresh coffee.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874', localImage: local('facilities/cafe.jpg'), icon: 'Coffee' },
  { id: 'f4', name: 'Secure Parking', desc: 'Spacious and safe parking for all our guests.', image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877', localImage: local('facilities/parking.jpg'), icon: 'Car' },
];

export const PROMOS = [
  { title: "Weekday Serenity", discount: "20% OFF", desc: "Book from Monday to Thursday and enjoy exclusive rates on all private pavilions.", tag: "Most Popular" },
  { title: "Barkada Splash", discount: "₱1,000 OFF", desc: "Group bookings of 10+ people get a complimentary BBQ set and late check-out.", tag: "Group Deal" },
  { title: "Early Bird", discount: "FREE BREAKFAST", desc: "Book 30 days in advance to get our premium Filipino breakfast platter for free.", tag: "Value Deal" }
];

export const JOURNEY_STEPS = [
  { title: "Warm Welcome", desc: "Arrive at our lush reception and get a refreshing local welcome drink.", icon: "Leaf" },
  { title: "Infinite Splash", desc: "Dive into any of our 4 pool clusters, including the famous Corazon Infinity.", icon: "Waves" },
  { title: "Local Feast", desc: "Savor authentic Antipolo cuisine at our Al Fresco dining areas.", icon: "Utensils" },
  { title: "Peaceful Rest", desc: "Sleep soundly in our nature-integrated, fully air-conditioned rooms.", icon: "Moon" }
];

export const NEARBY_SPOTS = [
  { name: "Pinto Art Museum", time: "12 mins", img: "https://images.unsplash.com/photo-1518998053502-519086c5c868" },
  { name: "Antipolo Cathedral", time: "8 mins", img: "https://images.unsplash.com/photo-1548013146-72479768bbaa" },
  { name: "Cloud 9 Viewpoint", time: "15 mins", img: "https://images.unsplash.com/photo-1506466010722-395aa2bef877" }
];

export const REVIEWS: Review[] = [
  { id: '1', author: 'Rostom Siervo', rating: 5, comment: 'The ambiance is so relaxing. Best private resort in Antipolo! Perfect for quick escapes.', date: '2024-01-15' },
  { id: '2', author: 'Rio Surio', rating: 4, comment: 'Great family vibes. My kids loved the pool. Staff were very accommodating and friendly.', date: '2024-02-10' },
  { id: '3', author: 'Rhea Adora', rating: 5, comment: 'Perfect for our corporate teambuilding. The facilities are top-notch and the air is so fresh.', date: '2024-03-05' },
  { id: '4', author: 'Coco Martin', rating: 5, comment: 'Ang ganda dito! Probinsya feels na malapit lang sa Manila. Bagay sa mga gustong mag-relax talaga.', date: '2024-04-12' }
];

export const FAQS = [
  { q: "What is your check-in and check-out time?", a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM the next day." },
  { q: "Do you allow pets?", a: "We are pet-friendly! Small to medium-sized pets are welcome in our private pavilion areas." },
  { q: "Is there free Wi-Fi?", a: "Yes, we provide free high-speed Wi-Fi in all rooms and common areas." },
  { q: "Can we bring our own food?", a: "Yes, guests can bring food. Cooking is allowed in designated areas like the Private Pavilion." }
];
