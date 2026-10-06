export interface Product {
  id: string;
  name: string;
  category: 'seasonal' | 'shagun' | 'bedsheets' | 'lifestyle';
  categoryLabel: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  image: string;
  galleryImages: string[];
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  discountBadge?: string;
  specifications: Record<string, string>;
  features: string[];
  occasion?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'seasonal'
  | 'shagun'
  | 'bedsheets'
  | 'offers'
  | 'about'
  | 'contact';

export interface RewardTransaction {
  id: string;
  type: 'earned' | 'redeemed' | 'bonus';
  points: number;
  description: string;
  date: string;
  orderId?: string;
}

export interface UserRewards {
  points: number;
  lifetimePoints: number;
  tier: 'Bronze Member' | 'Silver Patron' | 'Gold Royal Club';
  history: RewardTransaction[];
}

export interface TrackingEvent {
  status: string;
  time: string;
  location?: string;
  done: boolean;
  current: boolean;
  note: string;
}

export interface OrderItemSummary {
  name: string;
  image: string;
  quantity: number;
  size?: string;
  price: number;
}

export interface OrderStatusRecord {
  id: string;
  date: string;
  status: 'Processing' | 'Quality Inspected' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  statusDescription: string;
  estimatedDelivery: string;
  carrier: string;
  awb: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  giftWrapped?: boolean;
  giftMessage?: string;
  items: OrderItemSummary[];
  timeline: TrackingEvent[];
}


