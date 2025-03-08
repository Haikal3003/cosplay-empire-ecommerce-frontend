import { Product } from '../../utils/types';

interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function DeleteConfirmationModal({ product, isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50  z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <p>Are you sure you want delete this product?</p>
        <p>"{product?.name}"</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer" onClick={() => product && onConfirm(product.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
