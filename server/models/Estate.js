import mongoose from 'mongoose';

const EstateSchema = new mongoose.Schema({
  estateType: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\b\w+\b\s+\b\w+\b/.test(v.trim());
      },
      message: props => `${props.value} should contain at least two words.`,
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(601|602|603|604|605|606|607|608|609|72[0-9]|73[0-9]|77[0-9]|79[0-9])\d{6}$/.test(v);
      },
      message: props => `${props.value} is not a valid Czech mobile number.`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
}, { timestamps: true });

const Estate = mongoose.model('Estate', EstateSchema);

export default Estate;
