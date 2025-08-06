'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-primary">${product.price.toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/product/${product.id}`} passHref className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};