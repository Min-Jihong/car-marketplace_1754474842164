'use client';

import React, { useState, useCallback } from 'react';
import type { Product, User, ProductStatus } from '@/lib/types';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash } from 'lucide-react';

import { AddProductForm } from './add-product-form';
import { EditProductForm } from './edit-product-form';

interface ProductManagementTableProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductManagementTable = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductManagementTableProps) => {
  const currentUser = useAtomValue(currentUserAtom);

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);

  const handleAddProduct = useCallback(
    (newProductData: Omit<Product, 'id' | 'sellerId' | 'status'>) => {
      if (!currentUser) {
        return;
      }
      const newProduct: Product = {
        ...newProductData,
        id: uuidv4(),
        sellerId: currentUser.id,
        status: 'available',
      };
      onAddProduct(newProduct);
      setIsAddProductDialogOpen(false);
    },
    [onAddProduct, currentUser]
  );

  const handleEditProduct = useCallback(
    (updatedProduct: Product) => {
      onUpdateProduct(updatedProduct);
      setIsEditProductDialogOpen(false);
      setSelectedProductForEdit(null);
    },
    [onUpdateProduct]
  );

  const handleDeleteProduct = useCallback(() => {
    if (productToDeleteId) {
      onDeleteProduct(productToDeleteId);
      setIsDeleteDialogOpen(false);
      setProductToDeleteId(null);
    }
  }, [onDeleteProduct, productToDeleteId]);

  const openEditDialog = useCallback((product: Product) => {
    setSelectedProductForEdit(product);
    setIsEditProductDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((productId: string) => {
    setProductToDeleteId(productId);
    setIsDeleteDialogOpen(true);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Your Car Listings</h2>
        <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Car Listing</DialogTitle>
              <DialogDescription>
                Fill in the details for your new car listing.
              </DialogDescription>
            </DialogHeader>
            <AddProductForm onAdd={handleAddProduct} />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No products listed yet.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === 'available'
                        ? 'default'
                        : product.status === 'sold'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => openEditDialog(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(product.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {selectedProductForEdit && (
        <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Car Listing</DialogTitle>
              <DialogDescription>
                Make changes to your car listing here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <EditProductForm product={selectedProductForEdit} onUpdate={handleEditProduct} />
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your product listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};