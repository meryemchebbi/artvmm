import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
import { FaCheck, FaTimes } from 'react-icons/fa';
export default function Dashcommandes() {
  const [commandes, setCommandes] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/commande/ss');
        const data = await res.json();
        if (res.ok) {
          setCommandes(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchCommande();
    }
  }, [currentUser]);
  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'yellow-700';
      case 'Confirmé':
        return 'green-700';
      case 'Refusé':
        return 'red-700';
      default:
        return 'gray-700'; 
    }
  };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && commandes.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Client</Table.HeadCell>
            <Table.HeadCell>Produit</Table.HeadCell>
            <Table.HeadCell>Hauteur</Table.HeadCell>
            <Table.HeadCell>Largeur</Table.HeadCell>
            <Table.HeadCell>Quantite</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {commandes.map((commande) => (
              <Table.Row key={commande._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{commande.client.username}</Table.Cell>
                <Table.Cell>{commande.cart.product.nom}</Table.Cell>
                <Table.Cell>{commande.cart.hauteur}</Table.Cell>
                <Table.Cell>{commande.cart.largeur}</Table.Cell>
                <Table.Cell>{commande.cart.quantite}</Table.Cell>
                <Table.Cell>
                <Table.Cell>
                <span className={`text-${getStatusColor(commande.Status)}`}>
                  {commande.Status}
                </span>
              </Table.Cell>
              </Table.Cell>
                <div className='flex  my-6'>
                <button className='bg-blue-700 rounded px-2 py-2 text-white'>Confirmer</button>
                <button className='bg-red-700 rounded px-4 py-2 mx-4 text-white'>Refuser</button>
            </div>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

