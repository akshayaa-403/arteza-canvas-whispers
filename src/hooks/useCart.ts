
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image_url: string;
  size_category?: string;
  technique?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // Wishlist actions
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      
      addToCart: (item) => {
        const { items } = get();
        const existingItem = items.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          set({
            items: items.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          });
          toast.success('Quantity updated in cart');
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }]
          });
          toast.success('Added to cart');
        }
      },
      
      removeFromCart: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }));
        toast.success('Removed from cart');
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },
      
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
      
      addToWishlist: (id) => {
        set(state => ({
          wishlist: [...state.wishlist, id]
        }));
        toast.success('Added to wishlist');
      },
      
      removeFromWishlist: (id) => {
        set(state => ({
          wishlist: state.wishlist.filter(itemId => itemId !== id)
        }));
        toast.success('Removed from wishlist');
      },
      
      isInWishlist: (id) => {
        const { wishlist } = get();
        return wishlist.includes(id);
      },
      
      toggleWishlist: (id) => {
        const { wishlist, addToWishlist, removeFromWishlist } = get();
        if (wishlist.includes(id)) {
          removeFromWishlist(id);
        } else {
          addToWishlist(id);
        }
      }
    }),
    {
      name: 'arteza-cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
