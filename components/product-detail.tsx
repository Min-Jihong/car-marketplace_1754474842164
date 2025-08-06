'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product, UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface ProductDetailProps {
  product: Product;
  userRole: UserRole | null;
  onBuyNow?: (productId: string) => void;
}

export const ProductDetail = ({ product, userRole, onBuyNow }: ProductDetailProps) => {
  const router = useRouter();

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product.id);
    }
  };

  const handleEditProduct = () => {
    router.push('/seller/dashboard');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-64 object-cover md:h-full"
            priority
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-extrabold text-indigo-600">${product.price.toLocaleString()}</span>
              <span className="ml-2 text-lg text-gray-500">USD</span>
            </div>
            <div className="mb-6">
              <span className="text-sm font-semibold text-gray-600">Status: </span>
              <span className={`text-base font-medium ${product.status === 'available' ? 'text-green-600' : product.status === 'sold' ? 'text-red-600' : 'text-yellow-600'}`}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="mt-auto">
            {userRole === 'buyer' && (
              <Button
                onClick={handleBuyNow}
                className="w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={product.status !== 'available'}
              >
                {product.status === 'available' ? 'Buy Now' : 'Not Available'}
              </Button>
            )}
            {userRole === 'seller' && (
              <Button
                onClick={handleEditProduct}
                className="w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Product
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};