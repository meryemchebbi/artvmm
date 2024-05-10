import Product from '../models/ProductModel.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    try {
      const {
        nom,
        description,
        prix,
        quantite,
        categorie,
        type,
        couleur,
        epaisseur,
        image,
        status // Include the status field from req.body
      } = req.body;
  
      // Create a new product instance
      const newProduct = new Product({
        nom,
        description,
        prix,
        quantite,
        categorie,
        type,
        couleur,
        epaisseur,
        image,
        status // Add the status field
      });
  
      // Save the product to the database
      const savedProduct = await newProduct.save();
  
      // Send the saved product in the response
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


  
  
  export const getProduct = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  export const findProductByName = async (req, res) => {
      try {
          const  productName  = req.query.nom;
          console.log(productName);
          const product = await Product.findOne({ nom: productName });
          if (!product) {
              return res.status(404).json({ error: 'Product not found' });
              
          }
          res.status(200).json(product);
      } catch (error) {
          console.error('Error finding product by name:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
     
  };
  export const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Vérifier si l'ID du produit est valide
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'ID de produit invalide' });
      }
  
      // Rechercher le produit par son ID dans la base de données
      const product = await Product.findById(productId);
  
      // Vérifier si le produit existe
      if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
  
      // Si le produit est trouvé, le renvoyer dans la réponse
      res.status(200).json(product);
    } catch (error) {
      console.error('Erreur lors de la recherche du produit par ID :', error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  

  export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params; // ID du produit à mettre à jour
        const { prix, quantite, status } = req.body; // Nouvelles valeurs de prix, quantite et status

        // Vérifier si l'ID du produit est fourni
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(404).json({ message: "ID du produit invalide." });
        }

        // Vérifier si le produit existe dans la base de données
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Produit non trouvé." });
        }

        // Mettre à jour les champs du produit avec les nouvelles valeurs
        existingProduct.prix = prix;
        existingProduct.quantite = quantite;
        existingProduct.status = status;

        // Sauvegarder les modifications dans la base de données
        const updatedProduct = await existingProduct.save();

        // Renvoyer le produit mis à jour dans la réponse
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du produit :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};