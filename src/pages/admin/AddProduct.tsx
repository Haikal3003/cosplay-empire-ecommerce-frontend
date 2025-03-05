import { IoReturnUpBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AddProductPayload } from '../../utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePrefix } from '../../hooks/usePrefix';
import api from '../../utils/api';
import { toast } from 'react-toastify';

type SizeTypes = 'S' | 'M' | 'L' | 'XL';

export default function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const prefix = usePrefix(); // Panggil hook di luar fungsi

  const [formData, setFormData] = useState<AddProductPayload>({
    name: '',
    description: '',
    price: 0,
    categories: [],
    sizes: [],
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (newProduct: FormData) => {
      return await api.post('/products', newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      toast.success('Add product successfully!!!');

      setImagePreview(null);

      queryClient.invalidateQueries({ queryKey: ['products'] });

      navigate(`${prefix}/products`);
    },
    onError: (error) => {
      const errorMessage = error?.message || 'Failed to add product';
      toast.error(`Error: ${errorMessage}`);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files, type } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        categories: name === 'categories' ? value.split(',').map((c) => c.trim()) : prev.categories,
      }));
    }
  };

  const handleStockChange = (size: SizeTypes, e: ChangeEvent<HTMLInputElement>) => {
    const stockValue = parseInt(e.target.value);
    setFormData((prev) => {
      const updatedSizes = prev.sizes.map((s) => (s.size === size ? { ...s, stock: stockValue } : s));
      return { ...prev, sizes: updatedSizes };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price.toString());
    data.append('categories', JSON.stringify(formData.categories));
    data.append('sizes', JSON.stringify(formData.sizes));
    if (formData.image) data.append('image', formData.image);

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 mb-4">
        <button className="p-3 rounded-lg border border-slate-300 bg-white hover:bg-red-500 cursor-pointer hover:border-transparent hover:text-white" onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline />
        </button>
        <h1 className="text-lg font-bold">Add Product</h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormInput id="name" name="name" label="Name" type="text" labelClassName="text-sm" inputClassName="text-sm" placeholder="Enter product name..." onChange={handleChange} />

        <div>
          <label className="text-sm">Description</label>
          <textarea id="description" name="description" className="w-full bg-white p-2 h-28 rounded-lg border border-slate-300 resize-none text-sm" placeholder="Enter product description..." onChange={handleChange}></textarea>
        </div>

        <FormInput id="price" name="price" label="Price" type="number" labelClassName="text-sm" inputClassName="text-sm" placeholder="Enter product price..." onChange={handleChange} />

        <FormInput id="categories" name="categories" label="Categories" type="text" labelClassName="text-sm" inputClassName="text-sm" placeholder="Electronics, Fashion..." onChange={handleChange} />

        <div>
          <FormInput
            id="image"
            name="image"
            label="Upload Image"
            type="file"
            labelClassName="text-sm cursor-pointer p-2 w-full max-w-[140px] text-center bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
            inputClassName="text-sm "
            onChange={handleChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2 border border-slate-300 rounded-md" />
            </div>
          )}
        </div>

        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4 mt-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <FormInput key={size} id={size} name={size} label={`${size} - Stock`} type="number" labelClassName="text-sm" inputClassName="text-sm" onChange={(e) => handleStockChange(size as SizeTypes, e)} />
            ))}
          </div>
        </div>

        <button type="submit" className="flex text-sm justify-center col-span-2 py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
}
