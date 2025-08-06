'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { currentUserAtom, isLoggedInAtom } from '@/lib/store';
import type { Product, ProductStatus } from '@/lib/types';
import { mockProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/buyer/product-card';
import { ProductFilter } from '@/components/buyer/product-filter';
import { Button } from '@/components/ui/button';

interface ProductFilterCriteria {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
}

export default function BuyerProductsPage() {
  const router = useRouter();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const currentUser = useAtomValue(currentUserAtom);

  const [filters, setFilters] = useState<ProductFilterCriteria>({
    searchTerm: '',
    minPrice: undefined,
    maxPrice: undefined,
    status: 'available',
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }
    if (currentUser && currentUser.role !== 'buyer') {
      router.push('/');
    }
  }, [isLoggedIn, currentUser, router]);

  const handleApplyFilters = useCallback((newFilters: ProductFilterCriteria) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!currentUser || currentUser.role !== 'buyer') {
      return [];
    }

    return mockProducts.filter((product) => {
      const matchesSearchTerm = filters.searchTerm
        ? product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        : true;

      const matchesMinPrice = filters.minPrice ? product.price >= filters.minPrice : true;
      const matchesMaxPrice = filters.maxPrice ? product.price <= filters.maxPrice : true;
      const matchesStatus = filters.status ? product.status === filters.status : true;

      return matchesSearchTerm && matchesMinPrice && matchesMaxPrice && matchesStatus;
    });
  }, [filters, currentUser]);

  if (!isLoggedIn || (currentUser && currentUser.role !== 'buyer')) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg mb-6">You must be logged in as a buyer to view this page.</p>
        <Button onClick={() => router.push('/')}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Available Cars</h1>
      <div className="mb-8">
        <ProductFilter onApplyFilters={handleApplyFilters} />
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-xl text-gray-600 py-10">
          No products found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}