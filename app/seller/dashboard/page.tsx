'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

import type { Product, UserRole } from '@/lib/types';
import { currentUserAtom, isLoggedInAtom } from '@/lib/store';
import { mockProducts as initialMockProducts } from '@/lib/mock-data';

import { ProductManagementTable } from '@/components/seller/product-management-table';
import { AddProductForm } from '@/components/seller/add-product-form';
import { EditProductForm } from '@/components/seller/edit-product-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

export default function SellerDashboardPage() {
  const router = useRouter();
  const currentUser = useAtomValue(currentUserAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { toast } = useToast();

  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }
    if (currentUser?.role !== 'seller') {
      router.push('/');
      return;
    }

    if (currentUser) {
      const productsForSeller = initialMockProducts.filter(
        (product) => product.sellerId === currentUser.id
      );
      setSellerProducts(productsForSeller);
    }
  }, [isLoggedIn, currentUser, router]);

  const handleAddProduct = (
    newProductData: Omit<Product, 'id' | 'sellerId' | 'status'>
  ) => {
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add a product.',
        variant: 'destructive',
      });
      return;
    }

    const newProduct: Product = {
      id: uuidv4(),
      sellerId: currentUser.id,
      status: 'available',
      ...newProductData,
    };

    initialMockProducts.push(newProduct);
    setSellerProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsAddProductDialogOpen(false);
    toast({
      title: 'Product Added',
      description: `${newProduct.name} has been successfully added.`,
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const productIndex = initialMockProducts.findIndex(
      (p) => p.id === updatedProduct.id
    );
    if (productIndex !== -1) {
      initialMockProducts[productIndex] = updatedProduct;
    }

    setSellerProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setIsEditProductDialogOpen(false);
    setEditingProduct(null);
    toast({
      title: 'Product Updated',
      description: `${updatedProduct.name} has been successfully updated.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const productIndex = initialMockProducts.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      initialMockProducts.splice(productIndex, 1);
    }

    setSellerProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    toast({
      title: 'Product Deleted',
      description: 'The product has been successfully deleted.',
    });
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditProductDialogOpen(true);
  };

  if (!isLoggedIn || currentUser?.role !== 'seller') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Seller Dashboard</h1>

      <div className="mb-4 flex justify-end">
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Car Listing</DialogTitle>
              <DialogDescription>
                Fill in the details for your new car product.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm onAdd={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <ProductManagementTable
        products={sellerProducts}
        onAddProduct={() => setIsAddProductDialogOpen(true)}
        onUpdateProduct={handleEditClick}
        onDeleteProduct={handleDeleteProduct}
      />

      {editingProduct && (
        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Car Listing</DialogTitle>
              <DialogDescription>
                Make changes to your product details here.
              </DialogDescription>
            </DialogHeader>
            <EditProductForm product={editingProduct} onUpdate={handleUpdateProduct} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}