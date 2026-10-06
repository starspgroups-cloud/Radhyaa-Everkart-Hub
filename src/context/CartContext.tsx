import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  message: string;
  type: 'success' | 'info' | 'error';
  action?: ToastAction;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  subtotal: number;
  discount: number;
  couponCode: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrapped: boolean;
  setIsGiftWrapped: (val: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  giftWrappingFee: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toast: ToastData | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error', action?: ToastAction) => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 999;
export const GIFT_WRAPPING_SURCHARGE = 49;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('radhyaa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('radhyaa_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('radhyaa_coupon') || null;
    } catch {
      return null;
    }
  });

  const [isGiftWrapped, setIsGiftWrapped] = useState<boolean>(() => {
    try {
      return localStorage.getItem('radhyaa_gift_wrapped') === 'true';
    } catch {
      return false;
    }
  });

  const [giftMessage, setGiftMessage] = useState<string>(() => {
    try {
      return localStorage.getItem('radhyaa_gift_message') || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimerRef = useRef<any>(null);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_gift_wrapped', String(isGiftWrapped));
    } catch (e) {
      console.error(e);
    }
  }, [isGiftWrapped]);

  useEffect(() => {
    try {
      localStorage.setItem('radhyaa_gift_message', giftMessage);
    } catch (e) {
      console.error(e);
    }
  }, [giftMessage]);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success',
    action?: ToastAction
  ) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type, action });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, action ? 5500 : 3200);
  };

  const dismissToast = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast(null);
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: selectedSize || product.sizes?.[0], selectedColor: selectedColor || product.colors?.[0]?.name }];
      }
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize)));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode(null);
    setIsGiftWrapped(false);
    setGiftMessage('');
    localStorage.removeItem('radhyaa_coupon');
    localStorage.removeItem('radhyaa_gift_wrapped');
    localStorage.removeItem('radhyaa_gift_message');
  };

  const toggleWishlist = (productId: string, productName?: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const targetName = productName || PRODUCTS.find((p) => p.id === productId)?.name || 'Item';
        showToast(
          `Added "${targetName}" to your wishlist!`,
          'success',
          {
            label: 'Undo',
            onClick: () => {
              setWishlist((current) => current.filter((id) => id !== productId));
              showToast(`Removed "${targetName}" from your wishlist.`, 'info');
            },
          }
        );
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  if (couponCode === 'FESTIVE10') {
    discount = Math.round(subtotal * 0.1);
  } else if (couponCode === 'RADHYAA15' && subtotal >= 1499) {
    discount = Math.round(subtotal * 0.15);
  } else if (couponCode === 'SHAGUN50' && subtotal >= 499) {
    discount = 50;
  }

  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'FESTIVE10') {
      setCouponCode('FESTIVE10');
      localStorage.setItem('radhyaa_coupon', 'FESTIVE10');
      showToast('Coupon FESTIVE10 applied! 10% instant festive discount added.');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleaned === 'RADHYAA15') {
      if (subtotal < 1499) {
        return { success: false, message: 'RADHYAA15 requires minimum cart value of ₹1,499' };
      }
      setCouponCode('RADHYAA15');
      localStorage.setItem('radhyaa_coupon', 'RADHYAA15');
      showToast('Coupon RADHYAA15 applied! 15% VIP discount added.');
      return { success: true, message: '15% VIP discount applied!' };
    }
    if (cleaned === 'SHAGUN50') {
      setCouponCode('SHAGUN50');
      localStorage.setItem('radhyaa_coupon', 'SHAGUN50');
      showToast('Coupon SHAGUN50 applied! ₹50 off.');
      return { success: true, message: '₹50 flat discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try FESTIVE10 or RADHYAA15' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    localStorage.removeItem('radhyaa_coupon');
    showToast('Coupon removed.', 'info');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const giftWrappingFee = isGiftWrapped ? GIFT_WRAPPING_SURCHARGE : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon,
        isGiftWrapped,
        setIsGiftWrapped,
        giftMessage,
        setGiftMessage,
        giftWrappingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        toast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
