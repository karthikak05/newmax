import { openDB } from 'idb';
import { create } from 'zustand';

// Initialize IndexedDB
const initDB = async () => {
  const db = await openDB('ecommerce-store', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'name' });
      }
    },
  });
  return db;
};

// IndexedDB operations wrapper
const CartStorage = {
  async getAllItems() {
    const db = await initDB();
    return await db.getAll('cart');
  },

  async addItem(item) {
    const db = await initDB();
    await db.put('cart', item);
  },

  async removeItem(name) {
    const db = await initDB();
    await db.delete('cart', name);
  },

  async clearAll() {
    const db = await initDB();
    await db.clear('cart');
  },

  async updateItem(item) {
    const db = await initDB();
    await db.put('cart', item);
  }
};

export const useCartStore = create((set, get) => ({
  cartItems: [],
  total: 0,
  totalQuantity: 0,
  isLoading: true,

  // Initialize store from IndexedDB
  initializeCart: async () => {
    // console.log("in");
    try {
      const items = await CartStorage.getAllItems();
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const totalQuantity = items.reduce((qty, item) => qty + item.quantity, 0);
      set({ cartItems: items, total, totalQuantity, isLoading: false });
    } catch (error) {
      console.error('Failed to initialize cart:', error);
      set({ isLoading: false });
    }
  },

  calculateTotal: (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  calculateTotalQuantity: (cartItems) => {
    return cartItems.reduce((qty, item) => qty + item.quantity, 0);
  },

  setTotalManually: () => set((state) => ({
    total: state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalQuantity: state.cartItems.reduce((qty, item) => qty + item.quantity, 0),
  })),

  add: async (item) => {
    try {
      const state = get();
      const existingItem = state.cartItems.find((i) => i.name === item.name);
      let updatedCartItems;

      if (existingItem) {
        const updatedItem = { 
          ...existingItem, 
          quantity: existingItem.quantity + 1 
        };
        await CartStorage.updateItem(updatedItem);
        updatedCartItems = state.cartItems.map((i) =>
          i.name === item.name ? updatedItem : i
        );
      } else {
        const newItem = { ...item, quantity: 1 };
        await CartStorage.addItem(newItem);
        updatedCartItems = [...state.cartItems, newItem];
      }

      const newTotal = state.calculateTotal(updatedCartItems);
      const newTotalQuantity = state.calculateTotalQuantity(updatedCartItems);
      set({ cartItems: updatedCartItems, total: newTotal, totalQuantity: newTotalQuantity });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  },
  
  removeItem: async (name) => {
    try {
      const state = get();
      const updatedCartItems = state.cartItems.filter((item) => item.name !== name);
      
      await CartStorage.removeItem(name); // Remove item from IndexedDB

      const newTotal = state.calculateTotal(updatedCartItems);
      const newTotalQuantity = state.calculateTotalQuantity(updatedCartItems);

      set({ cartItems: updatedCartItems, total: newTotal, totalQuantity: newTotalQuantity });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },

  remove: async (name) => {
    try {
      const state = get();
      const itemToRemove = state.cartItems.find((item) => item.name === name);
  
      if (itemToRemove) {
        let updatedCartItems;
  
        if (itemToRemove.quantity > 1) {
          const updatedItem = { ...itemToRemove, quantity: itemToRemove.quantity - 1 };
          await CartStorage.updateItem(updatedItem);
  
          updatedCartItems = state.cartItems.map((item) =>
            item.name === name ? updatedItem : item
          );
        } else {
          // Remove the item entirely if quantity is 1
          updatedCartItems = state.cartItems.filter((item) => item.name !== name);
          await CartStorage.removeItem(name);
        }
  
        // Recalculate totals without changing the order
        const newTotal = state.calculateTotal(updatedCartItems);
        const newTotalQuantity = state.calculateTotalQuantity(updatedCartItems);
  
        // Update state with the new cart items and totals
        set({ cartItems: updatedCartItems, total: newTotal, totalQuantity: newTotalQuantity });
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  },
  

  clearCart: async () => {
    try {
      await CartStorage.clearAll();
      set({ cartItems: [], total: 0, totalQuantity: 0 });
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  },

  updateQuantity: async (name, quantity) => {
    try {
      const state = get();
      const updatedCartItems = state.cartItems.map((item) => {
        return item.name === name ? { ...item, quantity } : item;
      });
  
      const itemToUpdate = updatedCartItems.find((item) => item.name === name);
      if (itemToUpdate) {
        await CartStorage.updateItem(itemToUpdate);
      }
  
      const newTotal = state.calculateTotal(updatedCartItems);
      const newTotalQuantity = state.calculateTotalQuantity(updatedCartItems);
  
      set({ cartItems: updatedCartItems, total: newTotal, totalQuantity: newTotalQuantity });
    } catch (error) {
      console.error('Failed to update item quantity:', error);
    }
  },  

  getTotalQuantity: () => {
    const state = get();
    return state.totalQuantity;
  },
}));


if (typeof window !== 'undefined') {
  useCartStore.getState().initializeCart();
}