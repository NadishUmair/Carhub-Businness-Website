import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  email:{
    type:String
  },
  password:{
    type:String
  }
}, {
  timestamps: true,
});
const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;
