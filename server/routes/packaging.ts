import express from 'express';
import Packaging from '../models/Packaging.js';
import { protect, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Get all packaging items
router.get('/', protect, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.search) {
      filter.$or = [
        { designation: { $regex: req.query.search, $options: 'i' } },
        { internalId: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const packaging = await Packaging.find(filter)
      .populate('createdBy', 'name')
      .populate('lastModifiedBy', 'name')
      .populate('assignedProducts', 'name productId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Packaging.countDocuments(filter);

    res.json({
      success: true,
      data: packaging,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: packaging.length,
        totalItems: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get single packaging item
router.get('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const packaging = await Packaging.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('lastModifiedBy', 'name')
      .populate('assignedProducts', 'name productId');

    if (!packaging) {
      return res.status(404).json({
        success: false,
        message: 'Packaging not found'
      });
    }

    res.json({
      success: true,
      data: packaging
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Create packaging
router.post('/', protect, async (req: AuthRequest, res) => {
  try {
    const packagingData = {
      ...req.body,
      createdBy: req.user._id,
      lastModifiedBy: req.user._id
    };

    const packaging = await Packaging.create(packagingData);
    await packaging.populate('createdBy', 'name');

    res.status(201).json({
      success: true,
      data: packaging
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create packaging',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update packaging
router.put('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const packaging = await Packaging.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastModifiedBy: req.user._id
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name').populate('lastModifiedBy', 'name');

    if (!packaging) {
      return res.status(404).json({
        success: false,
        message: 'Packaging not found'
      });
    }

    res.json({
      success: true,
      data: packaging
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update packaging',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Delete packaging
router.delete('/:id', protect, async (req: AuthRequest, res) => {
  try {
    const packaging = await Packaging.findByIdAndDelete(req.params.id);

    if (!packaging) {
      return res.status(404).json({
        success: false,
        message: 'Packaging not found'
      });
    }

    res.json({
      success: true,
      message: 'Packaging deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
