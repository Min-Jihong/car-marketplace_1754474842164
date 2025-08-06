'use client';

import React, { useState } from 'react';
import type { ProductStatus } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { PRODUCT_STATUSES } from '@/lib/types';

interface ProductFilterProps {
  onApplyFilters: (filters: {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    status?: ProductStatus;
  }) => void;
}

export const ProductFilter = ({ onApplyFilters }: ProductFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [status, setStatus] = useState<ProductStatus | 'all'>('all');

  const handleApplyFilters = () => {
    const filters = {
      searchTerm: searchTerm.trim() !== '' ? searchTerm.trim() : undefined,
      minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined,
      status: status !== 'all' ? status : undefined,
    };
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setStatus('all');
    onApplyFilters({});
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search-term">Search Term</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search-term"
              placeholder="Search by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-price">Min Price</Label>
          <Input
            id="min-price"
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price">Max Price</Label>
          <Input
            id="max-price"
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={status} onValueChange={(value: ProductStatus | 'all') => setStatus(value)}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {PRODUCT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleResetFilters} variant="outline">
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        <Button onClick={handleApplyFilters}>
          <Search className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};