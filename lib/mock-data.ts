import { v4 as uuidv4 } from 'uuid';
import type { User, Product, Order, UserRole, ProductStatus, OrderStatus } from '@/lib/types';

export const mockUsers: User[] = [
  {
    id: uuidv4(),
    username: 'seller_john',
    email: 'john@example.com',
    password: 'password123',
    role: 'seller',
  },
  {
    id: uuidv4(),
    username: 'buyer_jane',
    email: 'jane@example.com',
    password: 'password123',
    role: 'buyer',
  },
  {
    id: uuidv4(),
    username: 'seller_mike',
    email: 'mike@example.com',
    password: 'password123',
    role: 'seller',
  },
  {
    id: uuidv4(),
    username: 'buyer_sara',
    email: 'sara@example.com',
    password: 'password123',
    role: 'buyer',
  },
];

const sellerJohnId = mockUsers.find(u => u.email === 'john@example.com')?.id || uuidv4();
const buyerJaneId = mockUsers.find(u => u.email === 'jane@example.com')?.id || uuidv4();

export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Tesla Model 3',
    description: '2022 Long Range, excellent condition, low mileage.',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1617704541003-87b0d12686d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: sellerJohnId,
    status: 'available',
  },
  {
    id: uuidv4(),
    name: 'Ford F-150',
    description: '2020 XLT, powerful V8 engine, perfect for work.',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1621996384390-e17777777777?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: sellerJohnId,
    status: 'available',
  },
  {
    id: uuidv4(),
    name: 'Toyota Camry',
    description: '2018 LE, reliable and fuel-efficient, great for daily commute.',
    price: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: sellerJohnId,
    status: 'sold',
  },
  {
    id: uuidv4(),
    name: 'BMW X5',
    description: '2021 M Sport, luxury SUV with advanced features.',
    price: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1621996384390-e17777777777?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    sellerId: sellerJohnId,
    status: 'available',
  },
];

export const mockOrders: Order[] = [
  {
    id: uuidv4(),
    productId: mockProducts[0]?.id || uuidv4(),
    buyerId: buyerJaneId,
    orderDate: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: uuidv4(),
    productId: mockProducts[1]?.id || uuidv4(),
    buyerId: buyerJaneId,
    orderDate: new Date(Date.now() - 86400000).toISOString(),
    status: 'completed',
  },
  {
    id: uuidv4(),
    productId: mockProducts[2]?.id || uuidv4(),
    buyerId: buyerJaneId,
    orderDate: new Date(Date.now() - 172800000).toISOString(),
    status: 'cancelled',
  },
];