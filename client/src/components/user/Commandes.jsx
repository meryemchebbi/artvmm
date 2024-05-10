import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/commande/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCommandes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching commandes:', error);
        setIsLoading(false);
      }
    };

    fetchCommandes();

  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Mes Commandes</h1>
      {isLoading ? (
        <p className="text-gray-500">Chargement des commandes...</p>
      ) : commandes.length === 0 ? (
        <p className="text-gray-500">Vous n'avez pas encore de commandes.</p>
      ) : (
        <div className="space-y-6">
          {commandes.map((commande) => (
            <div key={commande._id} className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-bold">Commande du {new Date(commande.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-500">
                    {commande.firstName} {commande.lastName}
                  </p>
                  <p className="text-gray-500">{commande.address}</p>
                  <p className="text-gray-500">{commande.phone}</p>
                </div>
                <p className="text-gray-700 font-bold">{commande.totalPrice} dt</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">Produits commandés:</h3>
                <ul className="list-disc pl-6 space-y-2">
  {commande.cart.map((item) => (
    <li key={item._id}>
      {item.product && (
        <>
          {item.product.nom} - Quantité: {item.quantite} - Prix: {item.product.prix * item.quantite} dt
        </>
      )}
    </li>
  ))}
</ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Commandes;
