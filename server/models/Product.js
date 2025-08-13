const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Product description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  price: {
    cost: {
      type: Number,
      required: [true, 'Cost price is required'],
      min: [0, 'Cost price cannot be negative']
    },
    selling: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Selling price cannot be negative']
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%']
    }
  },
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    minStock: {
      type: Number,
      default: 10,
      min: [0, 'Minimum stock cannot be negative']
    },
    maxStock: {
      type: Number,
      min: [0, 'Maximum stock cannot be negative']
    },
    reserved: {
      type: Number,
      default: 0,
      min: [0, 'Reserved quantity cannot be negative']
    },
    location: {
      warehouse: {
        type: String,
        trim: true
      },
      shelf: {
        type: String,
        trim: true
      },
      bin: {
        type: String,
        trim: true
      }
    }
  },
  supplier: {
    name: {
      type: String,
      trim: true
    },
    contact: {
      name: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        trim: true
      }
    },
    leadTime: {
      type: Number,
      min: [0, 'Lead time cannot be negative']
    },
    minimumOrder: {
      type: Number,
      min: [0, 'Minimum order cannot be negative']
    }
  },
  specifications: {
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    },
    dimensions: {
      length: {
        type: Number,
        min: [0, 'Length cannot be negative']
      },
      width: {
        type: Number,
        min: [0, 'Width cannot be negative']
      },
      height: {
        type: Number,
        min: [0, 'Height cannot be negative']
      }
    },
    color: {
      type: String,
      trim: true
    },
    material: {
      type: String,
      trim: true
    },
    warranty: {
      type: String,
      trim: true
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      trim: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued', 'out-of-stock'],
    default: 'active'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  digitalFile: {
    type: String
  },
  variants: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },
    price: {
      cost: {
        type: Number,
        min: 0
      },
      selling: {
        type: Number,
        min: 0
      }
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0
    },
    attributes: {
      type: Map,
      of: String
    }
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  purchaseHistory: [{
    date: {
      type: Date,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    cost: {
      type: Number,
      required: true,
      min: 0
    },
    supplier: {
      type: String,
      trim: true
    },
    orderNumber: {
      type: String,
      trim: true
    }
  }],
  salesHistory: [{
    date: {
      type: Date,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    revenue: {
      type: Number,
      required: true,
      min: 0
    },
    orderId: {
      type: String,
      trim: true
    }
  }],
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for available stock
productSchema.virtual('availableStock').get(function() {
  return Math.max(0, this.inventory.quantity - this.inventory.reserved);
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (this.inventory.quantity <= 0) return 'out-of-stock';
  if (this.inventory.quantity <= this.inventory.minStock) return 'low-stock';
  return 'in-stock';
});

// Virtual for profit margin
productSchema.virtual('profitMargin').get(function() {
  if (this.price.cost === 0) return 0;
  return (((this.price.selling - this.price.cost) / this.price.cost) * 100).toFixed(2);
});

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
  if (!this.reviews || this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / this.reviews.length).toFixed(1);
});

// Virtual for total reviews
productSchema.virtual('totalReviews').get(function() {
  return this.reviews ? this.reviews.length : 0;
});

// Indexes for better query performance
productSchema.index({ sku: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ status: 1 });
productSchema.index({ 'inventory.quantity': 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ createdAt: -1 });

// Pre-save middleware to update status based on stock
productSchema.pre('save', function(next) {
  if (this.inventory.quantity <= 0 && this.status !== 'discontinued') {
    this.status = 'out-of-stock';
  } else if (this.inventory.quantity > 0 && this.status === 'out-of-stock') {
    this.status = 'active';
  }
  next();
});

// Instance method to update stock
productSchema.methods.updateStock = function(quantity, type = 'add') {
  if (type === 'add') {
    this.inventory.quantity += quantity;
  } else if (type === 'subtract') {
    this.inventory.quantity = Math.max(0, this.inventory.quantity - quantity);
  } else if (type === 'set') {
    this.inventory.quantity = Math.max(0, quantity);
  }
  
  return this.save();
};

// Instance method to reserve stock
productSchema.methods.reserveStock = function(quantity) {
  if (this.availableStock < quantity) {
    throw new Error('Insufficient available stock');
  }
  
  this.inventory.reserved += quantity;
  return this.save();
};

// Instance method to release reserved stock
productSchema.methods.releaseReservedStock = function(quantity) {
  this.inventory.reserved = Math.max(0, this.inventory.reserved - quantity);
  return this.save();
};

// Instance method to add review
productSchema.methods.addReview = function(userId, rating, comment) {
  this.reviews.push({
    user: userId,
    rating: rating,
    comment: comment
  });
  return this.save();
};

// Instance method to add purchase record
productSchema.methods.addPurchaseRecord = function(purchaseData) {
  this.purchaseHistory.push(purchaseData);
  return this.save();
};

// Instance method to add sales record
productSchema.methods.addSalesRecord = function(salesData) {
  this.salesHistory.push(salesData);
  return this.save();
};

// Static method to get low stock products
productSchema.statics.getLowStock = function() {
  return this.find({
    $expr: {
      $lte: ['$inventory.quantity', '$inventory.minStock']
    },
    status: { $ne: 'discontinued' }
  })
  .populate('createdBy', 'firstName lastName')
  .sort({ 'inventory.quantity': 1 });
};

// Static method to get out of stock products
productSchema.statics.getOutOfStock = function() {
  return this.find({
    'inventory.quantity': 0,
    status: { $ne: 'discontinued' }
  })
  .populate('createdBy', 'firstName lastName')
  .sort({ updatedAt: -1 });
};

// Static method to search products
productSchema.statics.search = function(query) {
  return this.find({
    $text: { $search: query },
    status: 'active'
  })
  .populate('createdBy', 'firstName lastName')
  .sort({ score: { $meta: 'textScore' } });
};

// Static method to get products by category
productSchema.statics.getByCategory = function(category) {
  return this.find({
    category: category,
    status: 'active'
  })
  .populate('createdBy', 'firstName lastName')
  .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Product', productSchema);
