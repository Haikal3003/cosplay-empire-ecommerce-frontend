import { useNavigate } from 'react-router-dom';
import { Product } from '../../../utils/types';
import { usePrefix } from '../../../hooks/usePrefix';
import { FaEye, FaEdit, FaTrash, FaGalacticSenate } from 'react-icons/fa'; // Import ikon dari react-icons
import { useState } from 'react';
import api from '../../../utils/api';
import DeleteConfirmationModal from '../../modal/DeleteConfirmationModal';

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const navigate = useNavigate();
  const prefix = usePrefix();

  const tableHeaders = ['no', 'product name', 'price', 'actions'];

  const actionButtons = [
    {
      name: 'detail',
      icon: <FaEye />,
      color: 'bg-blue-400',
      hoverColor: 'bg-blue-500',
    },
    {
      name: 'edit',
      icon: <FaEdit />,
      color: 'bg-yellow-400',
      hoverColor: 'bg-yellow-500',
    },
    {
      name: 'delete',
      icon: <FaTrash />,
      color: 'bg-red-400',
      hoverColor: 'bg-red-500',
    },
  ];

  const openModal = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await api.delete(`/products/${id}`);

      if (response) {
        console.log(response.data.message);
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActionClick = (action: string, product: Product) => {
    if (action === 'detail') {
      navigate(`${prefix}/products/detail/${product.id}`);
    } else if (action === 'edit') {
      navigate(`${prefix}/products/edit/${product.id}`);
    } else if (action === 'delete') {
      openModal(product);
    }
  };

  return (
    <>
      <table className="w-full table-auto border border-slate-300 table-layout-auto">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className={`font-semibold text-xs uppercase p-4 border-r border-b border-slate-300 bg-slate-200 ${index === 0 ? 'text-center' : 'text-left'}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product, index: number) => (
            <tr key={product.id} className="border-b border-slate-300">
              <td className="px-4 py-2 border-r border-slate-300 text-center w-[50px]">{index + 1}</td>
              <td className="px-4 py-2 border-r border-slate-300 w-[530px]">{product.name}</td>
              <td className="px-4 py-2 border-r border-slate-300">Rp {product.price}</td>
              <td className="px-4 py-2 space-x-4">
                {actionButtons.map((action, index) => (
                  <button key={index} className={`text-white py-2 px-3 rounded-md ${action.color} hover:${action.hoverColor} cursor-pointer `} onClick={() => handleActionClick(action.name, product)}>
                    {action.icon}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal product={productToDelete} isOpen={isModalOpen} onClose={closeModal} onConfirm={(id) => handleDeleteProduct(id)} />
    </>
  );
}
