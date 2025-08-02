import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import packagingRoutes from './routes/packaging.js';
import productsRoutes from './routes/products.js';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ppwrify';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

if (mongoose.connection.readyState === 0) {
  connectDB();
}

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/packaging', packagingRoutes);
  app.use('/api/products', productsRoutes);

  app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const dbStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStates[dbStatus as keyof typeof dbStates] || 'unknown',
        connected: dbStatus === 1
      }
    });
  });

  app.post('/api/seed', async (req, res) => {
    try {
      const { default: User } = await import('./models/User.js');
      const { default: Product } = await import('./models/Product.js');
      const { default: Packaging } = await import('./models/Packaging.js');

      const adminExists = await User.findOne({ email: 'admin@ppwrify.com' });
      if (!adminExists) {
        await User.create({
          email: 'admin@ppwrify.com',
          password: 'password123',
          name: 'Olivia Rhye',
          role: 'admin'
        });
      }

      const sampleProducts = [
        {
          name: 'Erdbeere Joghurt',
          productId: 'P00011',
          description: 'Strawberry yogurt product',
          category: 'Dairy'
        },
        {
          name: 'Vanille Joghurt',
          productId: 'P00012',
          description: 'Vanilla yogurt product',
          category: 'Dairy'
        }
      ];

      for (const productData of sampleProducts) {
        const exists = await Product.findOne({ productId: productData.productId });
        if (!exists) {
          await Product.create(productData);
        }
      }

      const user = await User.findOne({ email: 'admin@ppwrify.com' });
      const products = await Product.find({});

      const samplePackaging = [
        {
          designation: 'Kaffeetasse mit Deckel',
          internalId: 'SDF-12343',
          gtinArticleNumber: 'FL10232',
          countryOfAssembly: ['DE'],
          salesCountries: ['DE', 'ES'],
          materials: ['PET-T', 'PET-U', 'PET-V'],
          status: 'active',
          weight: '300g',
          ppwrLevels: ['levelA', 'levelB', 'levelC'],
          conformityDeclaration: 'available',
          assignedProducts: products.slice(0, 1).map(p => p._id),
          createdBy: user!._id,
          lastModifiedBy: user!._id
        },
        {
          designation: 'Tee-Set aus Porzellan',
          internalId: 'SDF-12344',
          gtinArticleNumber: 'FL10233',
          countryOfAssembly: ['DE'],
          salesCountries: ['DE', 'ES'],
          materials: ['PET-H', 'PET-I', 'PET-J'],
          status: 'draft',
          weight: '300g',
          ppwrLevels: ['levelA', 'levelB'],
          conformityDeclaration: 'available',
          assignedProducts: products.slice(0, 1).map(p => p._id),
          createdBy: user!._id,
          lastModifiedBy: user!._id
        },
        {
          designation: 'Glasflasche mit Korken',
          internalId: 'SDF-12345',
          gtinArticleNumber: 'FL10234',
          countryOfAssembly: ['DE'],
          salesCountries: ['DE', 'ES'],
          materials: ['PET-AL', 'PET-AM', 'PET-AN', 'PET-AQ'],
          status: 'inactive',
          weight: '300g',
          ppwrLevels: ['levelA', 'levelB', 'levelC'],
          conformityDeclaration: 'available',
          assignedProducts: products.slice(0, 1).map(p => p._id),
          createdBy: user!._id,
          lastModifiedBy: user!._id
        }
      ];

      for (const packagingData of samplePackaging) {
        const exists = await Packaging.findOne({ internalId: packagingData.internalId });
        if (!exists) {
          await Packaging.create(packagingData);
        }
      }

      res.json({
        success: true,
        message: 'Sample data created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to seed data',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  return app;
}

  const app = createServer();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

export default createServer();
