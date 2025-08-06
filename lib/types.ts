// Defines the possible roles for a user in the application (seller or buyer). Used in User interface and for role-based access control.
export type UserRole = 'seller' | 'buyer';
export const USER_ROLES = ['seller', 'buyer'] as const;

// Represents a user in the system, including their unique ID, username, email, and assigned role. Used for authentication and authorization.
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Only for mock data, not for actual storage
  role: UserRole;
}

// Defines the possible statuses for a car product listing (available, sold, pending). Used in Product interface and for product management.
export type ProductStatus = 'available' | 'sold' | 'pending';
export const PRODUCT_STATUSES = ['available', 'sold', 'pending'] as const;

// Represents a car product listed for sale, including its unique ID, details, price, image, and current status. Used for product listings and management.
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  status: ProductStatus;
}

// Defines the possible statuses for a purchase order (pending, completed, cancelled). Used in Order interface and for tracking purchases.
export type OrderStatus = 'pending' | 'completed' | 'cancelled';
export const ORDER_STATUSES = ['pending', 'completed', 'cancelled'] as const;

// Represents a purchase order made by a buyer for a specific product. Used for tracking buyer purchases.
export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  orderDate: string;
  status: OrderStatus;
}