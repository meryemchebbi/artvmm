import Cart from '../models/CartModel.js';
import Product from '../models/ProductModel.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, hauteur, largeur, quantite } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    const cart = new Cart({
      product: product._id,
      hauteur,
      largeur,
      quantite,
    });

    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    res.status(500).json({ message: error.message });
  }
};
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find().populate('product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createCartForUser = async (req, res) => {
  try {
    const user = req.user;
    const cart = new Cart({
      user: user._id,
      product: null,
      hauteur: null,
      largeur: null,
      quantite: null
    });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Erreur lors de la création du panier pour l\'utilisateur:', error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    // Utilisez findByIdAndDelete() au lieu de cart.remove()
    await Cart.findByIdAndDelete(cartId);

    res.status(200).json({ message: 'Élément du panier supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément du panier:', error);
    res.status(500).json({ message: error.message });
  }
};
export const updateQuantity = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const quantity = req.body.quantite;
    const response = await Cart.findByIdAndUpdate(cartId, { quantite: quantity }, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error('Erreur lors de la modification de la quantité:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId;

    const cart = await Cart.findById(cartId).populate('product');

    if (!cart) {
      return res.status(404).json({ message: 'Élément du panier non trouvé' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'élément du panier par ID:', error);
    res.status(500).json({ message: error.message });
  }
};