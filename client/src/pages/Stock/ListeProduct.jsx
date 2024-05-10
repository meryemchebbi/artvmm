import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
function ListeProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [currentPageMiroir, setCurrentPageMiroir] = useState(1);
  const [currentPageChagrin, setCurrentPageChagrin] = useState(1);
  const [currentPageLisse, setCurrentPageLisse] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:3000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUpdate = (productId) => {
    const productToUpdate = products.find(product => product.id === productId);
    setSelectedProduct(productToUpdate);
    setUpdatedQuantity(productToUpdate.quantite);
    setUpdatedPrice(productToUpdate.prix);
    setUpdatedStatus(productToUpdate.status);
    setIsModalOpen(true);
  };

  const handleDetail = (productId) => {
    const productDetail = products.find(product => product.id === productId);
    setProductDetails(productDetail);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/api/products/product/${selectedProduct.id}`, {
      prix: updatedPrice,
      quantite: updatedQuantity,
      status: updatedStatus
    })
    .then(response => {
      console.log('Product updated successfully:', response.data);
      setSelectedProduct(null);
      setUpdatedQuantity(0);
      setUpdatedPrice(0);
      setUpdatedStatus("");
      setIsModalOpen(false);
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setUpdatedQuantity(0);
    setUpdatedPrice(0);
    setUpdatedStatus("");
    setIsModalOpen(false);
  };

  const renderProducts = (filteredProducts) => (
    <tbody>
      {filteredProducts.map((product, index) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
          <td className="px-6 py-4 text-gray-500"><strong>{product.nom}</strong></td>
          <td className="px-6 py-4">{product.epaisseur}</td>
          <td className="px-6 py-4">{product.prix}</td>
          <td className="px-6 py-4">{product.quantite}</td>
          <td className="px-6 py-4">{product.status}</td>
          {product.categorie === 'chagrin' && <td className="px-6 py-4">{product.type}</td>}
          {product.categorie === 'lisse' && <td className="px-6 py-4">{product.couleur}</td>}
          <td>
            
          <div className="flex">
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  me-2 mb-2 dark:bg-blue-600 px-2 py-1 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
      onClick={() => handleUpdate(product.id)} ><FaRegEdit/></button>
    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      onClick={() => handleDetail(product.id)}><FaEye/></button>
  </div>
              
          </td>
         
        </tr>
      ))}
    </tbody>
  );

  const getCurrentProductsMiroir = () => {
    const indexOfLastProduct = currentPageMiroir * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.filter(product => product.categorie === 'miroir').slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const totalPagesMiroir = Math.ceil(products.filter(product => product.categorie === 'miroir').length / productsPerPage);

  const getCurrentProductsChagrin = () => {
    const indexOfLastProduct = currentPageChagrin * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.filter(product => product.categorie === 'chagrin').slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const totalPagesChagrin = Math.ceil(products.filter(product => product.categorie === 'chagrin').length / productsPerPage);

  const getCurrentProductsLisse = () => {
    const indexOfLastProduct = currentPageLisse * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.filter(product => product.categorie === 'lisse').slice(indexOfFirstProduct, indexOfLastProduct);
  };

  const totalPagesLisse = Math.ceil(products.filter(product => product.categorie === 'lisse').length / productsPerPage);

  return (
    <div className='w-3/5 mx-auto p-4'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className="text-2xl font-bold text-blue-700">Liste de Produits</h2>
        <a href='/dashboard?tab=addproduct'><IoIosAddCircle className="text-blue-700 text-3xl" /> </a>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-center text-blue-700 bg-gray-50">Miroir</h3>
        <table className="w-full text-sm text-center rtl:text-right text-gray-700 dark:text-gray-400 mb-4">
          <thead>
            <tr className="bg-gray-100 ">
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Nom</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Epaisseur</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Prix</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Quantité</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Action</th>
            </tr>
          </thead>
          {renderProducts(getCurrentProductsMiroir())}
        </table>
        <div className="flex justify-center space-x-4 py-4">
        
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageMiroir(currentPageMiroir - 1)}
            disabled={currentPageMiroir === 1}
          >
            
            <GrFormPrevious />
          </button>
          <span className="text-gray-700"><strong>Page {currentPageMiroir} sur {totalPagesMiroir}</strong></span>
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageMiroir(currentPageMiroir + 1)}
            disabled={currentPageMiroir === totalPagesMiroir}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-center text-blue-700 bg-gray-50">Chagrin</h3>
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Nom</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Epaisseur</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Prix</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Quantité</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Type</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Action</th>
            </tr>
          </thead>
          {renderProducts(getCurrentProductsChagrin())}
        </table>
        <div className="flex justify-center space-x-4 py-4">
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageChagrin(currentPageChagrin - 1)}
            disabled={currentPageChagrin === 1}
          >
           <GrFormPrevious />
          </button>
          <span className="text-gray-700">
            <strong>Page {currentPageChagrin} sur {totalPagesChagrin}</strong>
            </span>
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageChagrin(currentPageChagrin + 1)}
            disabled={currentPageChagrin === totalPagesChagrin}
          >
           <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-center text-blue-700 bg-gray-50">Lisse</h3>
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
          <thead >
            <tr className="bg-gray-100 text-gray-700">
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Nom</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Epaisseur</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Prix</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Quantité</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Couleur</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">Action</th>
            </tr>
          </thead>
          {renderProducts(getCurrentProductsLisse())}
        </table>
        <div className="flex justify-center space-x-4 py-4">
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageLisse(currentPageLisse - 1)}
            disabled={currentPageLisse === 1}
          >
            <GrFormPrevious />
          </button>
          <strong><span className="text-gray-700">Page {currentPageLisse} sur {totalPagesLisse}</span></strong>
          <button 
            className="btn-primary bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setCurrentPageLisse(currentPageLisse + 1)}
            disabled={currentPageLisse === totalPagesLisse}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
      {selectedProduct && isModalOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="modal-container bg-white w-96 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-cyan-600">Modifier Produit "{selectedProduct && selectedProduct.nom}"</h3>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <label className="block ">
                Quantité:
                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
              </label>
              <label className="block">
                Prix:
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                />
              </label>
              <label className="block">
                Status:
                <select
                  name="status"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  required
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="En stock">En stock</option>
                  <option value="Épuisé">Épuisé</option>
                </select>
              </label>
              <div className="flex justify-between">
                <button type="submit" onClick={handleSubmit} className="btn-primary bg-cyan-600 text-white px-2 py-2 rounded-lg">Enregistrer</button>
                <button type="button" onClick={handleCancel} className="btn-primary bg-red-600 text-white px-2 py-2 rounded-lg">Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListeProduct;
