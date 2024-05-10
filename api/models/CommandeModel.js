import mongoose from 'mongoose';

const CommandeSchema = new mongoose.Schema({
 
  cart: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Cart',
      required: true
    }
  ],
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
 
 
});

const Commande = mongoose.model('Commande', CommandeSchema);

export default Commande;