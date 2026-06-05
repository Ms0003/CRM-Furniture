const Product = require("../models/Product");

let mockProducts = [
  {
    _id: 'mock1',
    title: 'Nordic Oak Lounge Chair',
    category: 'Chairs',
    price: 349,
    description: 'Crafted from premium sustainable solid European Oak and upholstered in heavy-weight natural linen fabric. The Nordic Oak Lounge Chair brings organic warmth, high-resilience support, and a timeless Danish modern aesthetic to any living space.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock2',
    title: 'Velvet Emerald Chesterfield Sofa',
    category: 'Sofas',
    price: 1299,
    description: 'A luxurious interpretation of a classic silhouette. Features button-tufted high-density foam seating wrapped in rich emerald green velvet. Hand-turned dark eucalyptus legs with brass accents provide structural stability and elegant styling.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock3',
    title: 'Minimalist Walnut Dining Table',
    category: 'Tables',
    price: 899,
    description: 'Clean profiles and organic walnut wood grain patterns make this mid-century dining table the perfect centerpoint of your dining space. Comfortably seats six to eight. Highly durable matte clear protective topcoat.',
    imageUrl: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock4',
    title: 'Bouclé Floating Bed Frame',
    category: 'Beds',
    price: 950,
    description: 'Create a serene oasis with our floating platform bed. Enveloped in high-texture white bouclé fabric with a fully upholstered headboard. Features sturdy internal steel reinforcement framework and solid pine slats.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock5',
    title: 'Brass Arching Floor Lamp',
    category: 'Lighting',
    price: 189,
    description: 'Illuminate your reading nook with this hand-finished solid brass arching floor lamp. Heavy circular black marble base ensures excellent stability. Includes a dimmable LED Edison bulb for warm vintage ambiance.',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop',
    isAvailable: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock6',
    title: 'Modular Walnut Bookshelf',
    category: 'Storage',
    price: 649,
    description: 'An architectural modular shelving unit made of premium American walnut veneer. Features asymmetrical open-back cubbies and two slow-close utility drawers for modern versatile storage combinations.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop',
    isAvailable: false,
    createdAt: new Date().toISOString()
  }
];

const getProducts = async (req, res, next) => {
  try {
    if (global.useMockDB) {
      let filtered = [...mockProducts];
      if (req.query.category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
        );
      }
      if (req.query.available === "true") {
        filtered = filtered.filter((p) => p.isAvailable);
      }
      return res.json({ products: filtered });
    }

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.available === "true") {
      filter.isAvailable = true;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json({ products });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    if (global.useMockDB) {
      const product = {
        _id: "mock_" + Date.now(),
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isAvailable: req.body.isAvailable !== false,
        createdAt: new Date().toISOString(),
      };
      mockProducts.unshift(product);
      return res.status(201).json({ product });
    }

    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    if (global.useMockDB) {
      const idx = mockProducts.findIndex((p) => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ message: "Product not found" });
      }
      mockProducts[idx] = {
        ...mockProducts[idx],
        title: req.body.title !== undefined ? req.body.title : mockProducts[idx].title,
        category: req.body.category !== undefined ? req.body.category : mockProducts[idx].category,
        price: req.body.price !== undefined ? Number(req.body.price) : mockProducts[idx].price,
        description: req.body.description !== undefined ? req.body.description : mockProducts[idx].description,
        imageUrl: req.body.imageUrl !== undefined ? req.body.imageUrl : mockProducts[idx].imageUrl,
        isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : mockProducts[idx].isAvailable,
      };
      return res.json({ product: mockProducts[idx] });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (global.useMockDB) {
      const idx = mockProducts.findIndex((p) => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ message: "Product not found" });
      }
      mockProducts.splice(idx, 1);
      return res.json({ message: "Product deleted successfully" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    if (global.useMockDB) {
      const product = mockProducts.find((p) => p._id === req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ product });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
