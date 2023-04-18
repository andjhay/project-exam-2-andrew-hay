import { create } from "zustand";
import { useEffect } from "react";
import useApi from "../useApi";
import { url } from "../../shared/url";

const useCartStore = create((set) => ({
  cart: [],
  fullCart: [],
  addToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
  removeFromCart: (index) => set((state) => ({ cart: state.cart.slice(0, index).concat(state.cart.slice(index + 1)) })),
  setFullCart: (cartItemData) => set(() => ({ fullCart: cartItemData })),
  clearCart: () => set({ cart: [] }),
}));

function useCart() {
  const { data } = useApi(url);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);
  const fullCart = useCartStore((state) => state.fullCart);
  const setFullCart = useCartStore((state) => state.setFullCart);
  const clearCart = useCartStore((state) => state.clearCart);

  function addToCartOnClick(id) {
    addToCart(id);
  }

  function removeFromCartOnClick(id) {
    const productIndex = cart.findIndex((product) => product === id);
    removeFromCart(productIndex);
  }

  // Sorts cart into new array where objects have a quantity stored to them
  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }
    let cartItemData = [];
    cart.sort().forEach((cartItem) => {
      const product = data.find((product) => product.id === cartItem);
      const cartItemIndex = cartItemData.findIndex((item) => item.id === product.id);
      if (cartItemIndex !== -1) {
        cartItemData[cartItemIndex].quantity += 1;
      } else {
        cartItemData.push({ ...product, quantity: 1 });
      }
    });

    setFullCart(cartItemData);
  }, [cart, data, setFullCart]);

  return { cart, fullCart, addToCartOnClick, removeFromCartOnClick, clearCart };
}

export default useCart;
