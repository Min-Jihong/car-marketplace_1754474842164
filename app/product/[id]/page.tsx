'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { currentUserAtom, isLoggedInAtom } from '@/lib/store';
import type { Product, UserRole } from '@/lib/types';
import { mockProducts } from '@/lib/mock-data';
import { ProductDetail } from '@/components/product-detail';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const router = useRouter();
  const currentUser = useAtomValue(currentUserAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPurchaseMessage(null);

    const foundProduct = mockProducts.find((p) => p.id === params.id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError('Product not found.');
    }
    setLoading(false);
  }, [params.id]);

  const handleBuyNow = (productId: string) => {
    if (!isLoggedIn || currentUser?.role !== 'buyer') {
      setPurchaseMessage('Please log in as a buyer to purchase this product.');
      return;
    }

    setPurchaseMessage(`Successfully initiated purchase for product ID: ${productId}. Redirecting to products page...`);
    console.log(`Buyer ${currentUser.username} (ID: ${currentUser.id}) is attempting to buy product ID: ${productId}`);

    setTimeout(() => {
      router.push('/buyer/products');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Link href="/buyer/products" className="mt-4">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>The product you are looking for does not exist.</AlertDescription>
        </Alert>
        <Link href="/buyer/products" className="mt-4">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {purchaseMessage && (
        <Alert className="mb-4">
          <AlertTitle>Purchase Status</AlertTitle>
          <AlertDescription>{purchaseMessage}</AlertDescription>
        </Alert>
      )}
      <ProductDetail
        product={product}
        userRole={currentUser?.role || null}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductDetailPage;