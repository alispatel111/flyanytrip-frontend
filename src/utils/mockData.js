/*
 * Flyanytrip
 * Authors: Gaurav Thakur, Milan Pandavadara
 *
 * This file contains centralized mock data for the application.
 * It includes lists of airports, destinations, activities, and testimonials
 * used for development and demonstration purposes.
 */

// Airports removed as they are now fetched from Adivaha API

export const tourDestinations = ['Thailand', 'Vietnam', 'Dubai', 'Singapore', 'India', 'Oman', 'Bali'];
export const visaDestinations = ['Thailand', 'Vietnam', 'Dubai', 'Singapore', 'Oman', 'Bali'];
export const activityDestinations = ['Thailand', 'Vietnam', 'Dubai', 'Singapore', 'Vadodara', 'Oman', 'Bali'];

export const allActivities = [
  // Thailand
  {
    id: 1, type: 'activity', name: 'Floating Market & Railway Track Tour', city: 'Thailand', price: '3,800', rating: 4.8, tag: 'Cultural Experience',
    desc: 'Visit the famous Maeklong Railway Market and Damnoen Saduak Floating Market.',
    img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 8, type: 'activity', name: 'Phi Phi Islands Speedboat Tour', city: 'Thailand', price: '4,500', rating: 4.9, tag: 'Nature & Adventure',
    desc: 'Explore the stunning Maya Bay, Monkey Beach, and snorkel in crystal-clear waters.',
    img: 'https://images.unsplash.com/photo-1528181304800-259b08bb73d5?q=80&w=1000&auto=format&fit=crop'
  },
  // Vietnam
  {
    id: 2, type: 'activity', name: 'Ha Long Bay Luxury Day Cruise', city: 'Vietnam', price: '5,500', rating: 4.9, tag: 'Nature & Adventure',
    desc: 'Sail through the iconic limestone karsts of Ha Long Bay with a seafood lunch included.',
    img: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 9, type: 'activity', name: 'Cu Chi Tunnels Half-Day Tour', city: 'Vietnam', price: '1,800', rating: 4.7, tag: 'History',
    desc: 'Discover the vast underground network used during the Vietnam War.',
    img: 'https://images.unsplash.com/photo-1559592413-7a912e75e9f1?q=80&w=1000&auto=format&fit=crop'
  },
  // Dubai
  {
    id: 3, type: 'activity', name: 'Burj Khalifa At The Top (Levels 124 & 125)', city: 'Dubai', price: '3,200', rating: 4.7, tag: 'Must Visit',
    desc: 'Witness breathtaking views of Dubai from the world\'s tallest building.',
    img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 10, type: 'activity', name: 'Premium Red Dunes Camel Safari', city: 'Dubai', price: '4,500', rating: 4.8, tag: 'Adventure',
    desc: 'Experience dune bashing, camel riding, and a traditional BBQ dinner in the desert.',
    img: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1000&auto=format&fit=crop'
  },
  // Vadodara
  {
    id: 4, type: 'activity', name: 'Laxmi Vilas Palace Heritage Tour', city: 'Vadodara', price: '1,200', rating: 4.9, tag: 'History',
    desc: 'Explore the grand architecture and royal history of the world\'s largest private residence.',
    img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 11, type: 'activity', name: 'Statue of Unity Day Trip', city: 'Vadodara', price: '2,500', rating: 4.9, tag: 'Culture & Sightseeing',
    desc: 'Visit the world\'s tallest statue dedicated to the Iron Man of India, Sardar Vallabhbhai Patel.',
    img: 'https://images.unsplash.com/photo-1621217646197-29007c08bca0?q=80&w=1000&auto=format&fit=crop'
  },
  // Singapore
  {
    id: 5, type: 'activity', name: 'Gardens by the Bay Entry Ticket', city: 'Singapore', price: '2,100', rating: 4.8, tag: 'Nature',
    desc: 'Wander through the futuristic Supertrees and the stunning Cloud Forest conservatory.',
    img: 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fe6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 12, type: 'activity', name: 'Universal Studios Singapore', city: 'Singapore', price: '5,800', rating: 4.8, tag: 'Theme Park',
    desc: 'Experience cutting-edge rides, shows, and attractions based on your favorite blockbuster films.',
    img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=1000&auto=format&fit=crop'
  },
  // Oman
  {
    id: 6, type: 'activity', name: 'Wadi Shab & Bimmah Sinkhole Tour', city: 'Oman', price: '6,200', rating: 4.8, tag: 'Adventure',
    desc: 'Hike through breathtaking wadis and swim in the emerald waters of Bimmah Sinkhole.',
    img: 'https://images.unsplash.com/photo-1552554650-dc20ce13b632?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 13, type: 'activity', name: 'Wahiba Sands Desert Safari', city: 'Oman', price: '7,500', rating: 4.9, tag: 'Adventure',
    desc: 'Explore the rolling sand dunes of Wahiba Sands followed by a dip in Wadi Bani Khalid.',
    img: 'https://images.unsplash.com/photo-1551043047-1d2adf00f3fe?q=80&w=1000&auto=format&fit=crop'
  },
  // Bali
  {
    id: 7, type: 'activity', name: 'Ubud Monkey Forest & Swing', city: 'Bali', price: '2,800', rating: 4.7, tag: 'Culture & Nature',
    desc: 'Interact with macaques in lush forests and experience the iconic Bali jungle swing.',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 14, type: 'activity', name: 'Mount Batur Sunrise Trek', city: 'Bali', price: '3,500', rating: 4.8, tag: 'Adventure',
    desc: 'Hike an active volcano under the stars and witness a breathtaking sunrise from the summit.',
    img: 'https://images.unsplash.com/photo-1512100256448-a550d1736000?q=80&w=1000&auto=format&fit=crop'
  }
];

export const trendingDestinations = [
  { name: 'Vietnam', price: '48,000', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Bali', price: '42,500', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Oman', price: '85,000', img: 'https://images.unsplash.com/photo-1616035287790-255d644781bb?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Thailand', price: '38,900', img: 'https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Singapore', price: '52,000', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop' }
];

export const popularActivities = [
  { name: 'Heritage Walk', city: 'Vadodara', price: '1,200', tag: 'Cultural', img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Desert Safari', city: 'Dubai', price: '4,500', tag: 'Adventure', img: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Island Hopping', city: 'Thailand', price: '3,800', tag: 'Leisure', img: 'https://images.unsplash.com/photo-1528181304800-259b08bb73d5?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Skydeck Views', city: 'Singapore', price: '2,900', tag: 'Must Visit', img: 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fe6?q=80&w=1000&auto=format&fit=crop' }
];

export const testimonials = [
  { name: "Ananya Sharma", role: "Software Engineer, Google", text: "FlyAnyTrip made my international work trip completely seamless. From visas to flights, they handled everything with absolute professional precision.", rating: 5 },
  { name: "Rahul Malhotra", role: "CEO, TechSphere", text: "The corporate travel services are unmatched. They understand the value of time and provide a level of service that is truly premium.", rating: 5 },
  { name: "Priya Patel", role: "Travel Enthusiast", text: "I've used many platforms, but the curated tours here are something else. They find those hidden gems that make every trip truly unforgettable.", rating: 4.9 }
];

export const partners = [
  { name: "AIR INDIA", logo: "https://www.logo.wine/a/logo/Air_India/Air_India-Logo.wine.svg" },
  { name: "LUFTHANSA", logo: "https://www.logo.wine/a/logo/Lufthansa/Lufthansa-Logo.wine.svg" },
  { name: "SINGAPORE AIRLINES", logo: "https://www.logo.wine/a/logo/Singapore_Airlines/Singapore_Airlines-Logo.wine.svg" },
  { name: "UNITED", logo: "https://www.logo.wine/a/logo/United_Airlines/United_Airlines-Logo.wine.svg" },
  { name: "EMIRATES", logo: "https://www.logo.wine/a/logo/Emirates_(airline)/Emirates_(airline)-Logo.wine.svg" },
  { name: "VISTARA", logo: "https://www.logo.wine/a/logo/Vistara/Vistara-Logo.wine.svg" },
  { name: "SWISS", logo: "https://www.logo.wine/a/logo/Swiss_International_Air_Lines/Swiss_International_Air_Lines-Logo.wine.svg" },
  { name: "THAI AIRWAYS", logo: "https://www.logo.wine/a/logo/Thai_Airways_International/Thai_Airways_International-Logo.wine.svg" },
  { name: "TURKISH", logo: "https://www.logo.wine/a/logo/Turkish_Airlines/Turkish_Airlines-Logo.wine.svg" },
  { name: "AIR CANADA", logo: "https://www.logo.wine/a/logo/Air_Canada/Air_Canada-Logo.wine.svg" },
  { name: "ANA", logo: "https://www.logo.wine/a/logo/All_Nippon_Airways/All_Nippon_Airways-Logo.wine.svg" },
  { name: "STAR ALLIANCE", logo: "https://www.logo.wine/a/logo/Star_Alliance/Star_Alliance-Logo.wine.svg" }
];
