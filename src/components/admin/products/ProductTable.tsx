import { useNavigate } from 'react-router-dom';
import { Product } from '../../../utils/types';
import { usePrefix } from '../../../hooks/usePrefix';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import ikon dari react-icons

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
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

  return (
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
                <button key={index} className={`text-white py-2 px-3 rounded-md ${action.color} hover:${action.hoverColor} cursor-pointer `}>
                  {action.icon}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
