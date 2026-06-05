require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const MOCK_PRODUCTS = [
  {
    title: 'Nordic Oak Lounge Chair',
    category: 'Chairs',
    price: 349,
    description: 'Crafted from premium sustainable solid European Oak and upholstered in heavy-weight natural linen fabric. The Nordic Oak Lounge Chair brings organic warmth, high-resilience support, and a timeless Danish modern aesthetic to any living space.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    title: 'Velvet Emerald Chesterfield Sofa',
    category: 'Sofas',
    price: 1299,
    description: 'A luxurious interpretation of a classic silhouette. Features button-tufted high-density foam seating wrapped in rich emerald green velvet. Hand-turned dark eucalyptus legs with brass accents provide structural stability and elegant styling.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    title: 'Minimalist Walnut Dining Table',
    category: 'Tables',
    price: 899,
    description: 'Clean profiles and organic walnut wood grain patterns make this mid-century dining table the perfect centerpoint of your dining space. Comfortably seats six to eight. Highly durable matte clear protective topcoat.',
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    title: 'Bouclé Floating Bed Frame',
    category: 'Beds',
    price: 950,
    description: 'Create a serene oasis with our floating platform bed. Enveloped in high-texture white bouclé fabric with a fully upholstered headboard. Features sturdy internal steel reinforcement framework and solid pine slats.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    title: 'Brass Arching Floor Lamp',
    category: 'Lighting',
    price: 189,
    description: 'Illuminate your reading nook with this hand-finished solid brass arching floor lamp. Heavy circular black marble base ensures excellent stability. Includes a dimmable LED Edison bulb for warm vintage ambiance.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop',
    isAvailable: true
  },
  {
    title: 'Modular Walnut Bookshelf',
    category: 'Storage',
    price: 649,
    description: 'An architectural modular shelving unit made of premium American walnut veneer. Features asymmetrical open-back cubbies and two slow-close utility drawers for modern versatile storage combinations.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop',
    isAvailable: false
  }
];

const seedProducts = async () => {
  await connectDB();

  // Check if products already exist
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} products. Skipping seeding.`);
    await mongoose.disconnect();
    return;
  }

  await Product.insertMany(MOCK_PRODUCTS);
  console.log(`Seeded ${MOCK_PRODUCTS.length} products successfully!`);
  await mongoose.disconnect();
};

seedProducts().catch(async (error) => {
  console.error(`Product seeding failed: ${error.message}`);
  await mongoose.disconnect();
  process.exit(1);
});
