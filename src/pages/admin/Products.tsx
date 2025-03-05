import { useNavigate } from 'react-router-dom';
import { usePrefix } from '../../hooks/usePrefix';

export default function ProductsPage() {
  const prefix = usePrefix();
  const navigate = useNavigate();

  return (
    <div className="relative text-sm ">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <input type="text" placeholder="Search product..." className="w-full h-[42px] py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        <button className="w-full sm:w-auto h-[42px] bg-black text-white border border-slate-300  px-10 rounded-lg  transition-all text-xs cursor-pointer" onClick={() => navigate(`${prefix}/products/add-product`)}>
          Add
        </button>
      </div>
    </div>
  );
}
