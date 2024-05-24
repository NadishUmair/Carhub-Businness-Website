import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  dealerName: {
    type: String,
  },
}, {
  timestamps: true,
});

// Check if the model is already defined to prevent OverwriteModelError
const dealerModel = mongoose.models.dealer || mongoose.model('dealer', dealerSchema);

export default dealerModel;
