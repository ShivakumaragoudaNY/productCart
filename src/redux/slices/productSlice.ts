import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProductState {
  products: object[] | null;
  cartItems: object[];
}

const initialState: ProductState = {
  products: null,
  cartItems: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<object[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        item => item.productId === newItem.productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({...newItem, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.productId !== action.payload,
      );
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.productId === action.payload,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.productId === action.payload,
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          item => item.productId !== action.payload,
        );
      }
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = productSlice.actions;
export default productSlice.reducer;

export const selectItemQuantity = productId => state => {
  const item = state.productSlice?.cartItems.find(
    cartItem => cartItem.productId === productId,
  );
  return item ? item.quantity : 0;
};
