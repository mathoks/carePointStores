import { deleteItemm } from "@/app/utills/utills";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: false,
  completed: true,
  deleted: false,
  id: null,
  loading: false,
  completed: false,
  progressValue_1: null,
  progressValue_2: null,
  data: [],
  subTotal: 0,
  currentVariant: 0,
  isInCart: {},
  curVariant: {},
  modalOpen: false,
  isSuccessMessage: "",
  isErrorMessage: "",
  isLoadingCart: true,
};
const cartSliceReducer = createSlice({
  initialState,
  name: "userCart",
  reducers: {
    setIsLoadingCart: (state, action) => {
      state.isLoadingCart = action.payload;
    },

    setIsSuccessMessage: (state, action) => {
      state.isSuccessMessage = action.payload;
    },

    setIsErrorMessage: (state, action) => {
      state.isErrorMessage = action.payload;
    },

    setIsComplete: (state, action) => {
      state.completed = action.payload;
    },

    setProgress: () => {
      state.progress = [...action.payload];
    },
    updateCartItemWothId: (state, action) => {
      const { itemId, cartItemId } = action.payload;
      const itemIndex = state.data.findIndex(
        (item) => item.ProductID === itemId || item.variant_id === itemId
      );
      if (itemIndex !== -1) {
        state.data[itemIndex].CartItemID = cartItemId;
      }
    },
    addToCart: (state, action) => {
      if (Array.isArray(action.payload)) {
      
        state.data = [...action.payload];
        const inCart = state.data.reduce((acc, product) => {
          const key = product.CartItemID;
          acc[key] = true;
          return acc;
        }, {});
        state.isInCart = inCart;
      } else {
        state.data = [...state.data, action.payload];
        const key = action.payload.CartItemID;
        state.isInCart = { ...state.isInCart, [key]: true };
      }

      const Total = state.data.reduce((a, b) => a + b.Price * b.Quantity, 0);
      state.subTotal = Total;
    },

    setActiveVariant: (state, action) => {
      // state.curVariant = [...action.payload];
      state.curVariant = { ...state.curVariant, ...action.payload };
      state.currentVariant = 0;
    },

    setModalOpen: (state) => {
      state.modalOpen = state.modalOpen === false ? true : false;
      state.curVariant = {};
      state.currentVariant = 0;
    },

    setInCart: (state, action) => {
      const { prodId, boolean } = action.payload;
      state.isInCart = { ...state.isInCart, [prodId]: boolean };
    },

    deleteItem: (state, action) => {
      deleteItemm(state.data, action.payload);
      state.prompt = true;
    },

    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCurrentVar: (state, action) => {
      state.currentVariant = action.payload;
    },

    setPrompt: (state, action) => {
      state.prompt = action.payload.action;
      state.id = action.payload.id;
      state.completed = false;
    },

    setIsCompletePrompt: (state, action) => {
      if (action.payload === "yes") {
        return {
          ...state,
          deleted: true,
          completed: true,
          isSuccessMessage: "item removed successfully",
          id: null,
          prompt: false,
        };
      }
      return { ...state, completed: "true", id: null, prompt: false };
    },

    Increament: (state, data) => {
      const Item = state.data.find(
        (item) => item.CartItemID === data.payload.id
      );
      if (data.payload.operation === "add") {
        Item.Quantity++;
      } else if (data.payload.operation === "minus") {
        if (Item?.Quantity > 1) {
          Item.Quantity--;
        } else if (Item?.Quantity === 0) {
          const filtered = state.data.filter(
            (item) => item.CartItemID !== data.payload.id
          );
          const newObject = Object.fromEntries(
            Object.entries(state.isInCart).filter(
              ([key]) => key !== data.payload.id
            )
          );
          const Total = filtered.reduce((a, b) => a + b.Price * b.Quantity, 0);

          return {
            ...state,
            isInCart: { ...newObject },
            data: filtered,
            subTotal: Total,
          };
        } else {
        }
      }

      const Total = state.data.reduce((a, b) => a + b.Price * b.Quantity, 0);
      state.subTotal = Total;
    },

    setTotal: (state, action) => {
      state.subTotal = action.payload;
    },
  },
});

export const {
  setIsLoadingCart,
  addToCart,
  setTotal,
  setActiveVariant,
  setModalOpen,
  deleteItem,
  setInCart,
  setIsComplete,
  updateCartItemWothId,
  Increament,
  setIsLoading,
  setIsCompletePrompt,
  setPrompt,
  setCurrentVar,
  setIsSuccessMessage,
  setIsErrorMessage,
} = cartSliceReducer.actions;
export default cartSliceReducer.reducer;
