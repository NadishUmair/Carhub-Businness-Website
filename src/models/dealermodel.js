import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  dealerName: {
    type: String,
  },
  dealerlogo:{
    type:String
  }
}, {
  timestamps: true,
});
const dealerModel = mongoose.models.dealer || mongoose.model('dealer', dealerSchema);

export default dealerModel;
