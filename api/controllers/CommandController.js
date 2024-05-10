import Commande from '../models/CommandeModel.js'; // Assurez-vous de pointer vers le bon chemin pour votre modèle Commande
import User from '../models/user.model.js';
import Cart from '../models/CartModel.js';

export const createCommande = async (req, res) => {
  try {
    const { cart, firstName, lastName, address, phone } = req.body;
console.log(cart , firstName , lastName ,address , phone);
    // Vérifier si les champs obligatoires sont présents
    if ( !cart || !firstName || !lastName || !address || !phone) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }


    const newCommande = new Commande({
     
      cart,
      firstName,
      lastName,
      address,
      phone,
     
    });

    await newCommande.save();

    res.status(201).json(newCommande);
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);

    // Gérer les différents types d'erreurs
    if (error.name === 'ValidationError') {
      // Erreur de validation des champs
      return res.status(400).json({ message: error.message });
    } else if (error.name === 'CastError') {
      // Erreur de conversion de type de données
      return res.status(400).json({ message: 'ID d\'utilisateur ou de panier invalide.' });
    } else {
      // Autres types d'erreurs
      return res.status(500).json({ message: 'Une erreur est survenue lors de la création de la commande.' });
    }
  }
};

export const getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate(['cart']);
    res.status(200).json(commandes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getCardByIds = async (req, res) => {
  try {
    const { cartId } = req.params;
        const Cart = await Cart.findById(cartId).populate("product");
      
    res.status(200).json(Cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};