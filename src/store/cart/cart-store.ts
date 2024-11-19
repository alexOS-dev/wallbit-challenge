import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartProduct } from '@/interfaces';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  getSummary: () => {
    totalItems: number;
    totalPrice: number;
  };

  addProduct: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;

  cartDate: string;

  getCartDate: () => string;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      cartDate: new Date().toISOString(),

      getCartDate: () => {
        const { cartDate } = get();

        return cartDate;
      },

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummary: () => {
        const { cart } = get();

        return {
          totalItems: cart.reduce((total, item) => total + item.quantity, 0),
          totalPrice: cart.reduce(
            (total, product) => total + product.price * product.quantity,
            0
          ),
        };
      },

      addProduct: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.find((item) => item.id === product.id);

        if (!productInCart) {
          set({
            cart: [...cart, { ...product }],
          });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProduct = cart.filter(
          (item) => item.id !== product.id
        );

        set({ cart: updatedCartProduct });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'cart',
    }
  )
);
