import mongoose from 'mongoose';

const packagingSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true
  },
  internalId: {
    type: String,
    required: true,
    unique: true
  },
  gtinArticleNumber: {
    type: String,
    required: true
  },
  countryOfAssembly: [{
    type: String,
    required: true
  }],
  salesCountries: [{
    type: String,
    required: true
  }],
  materials: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  weight: {
    type: String,
    required: true
  },
  ppwrLevels: [{
    type: String,
    enum: ['levelA', 'levelB', 'levelC', 'salesBan']
  }],
  conformityDeclaration: {
    type: String,
    enum: ['available', 'notAvailable'],
    default: 'notAvailable'
  },
  assignedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Packaging', packagingSchema);
