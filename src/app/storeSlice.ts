import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IProduct {
  id : number,
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
  rating : {
    rate : number,
    count : number,
  },
}

export interface IState {
  products : IProduct[],
  product : null | IProduct,
  productId : number | null,
  categories : string[],
  category : null | string,
  modal : boolean,
  loading : boolean,
  error : null | string,
};

const initialState : IState = {
  products : [],
  product : null,
  productId : null,
  categories : [],
  category : null,
  modal : false,
  loading : false,
  error : null,
};

export const getAllProducts = createAsyncThunk<IProduct[], undefined, {rejectValue: string}>(
  "store/getAllProducts",
  async (_,{rejectWithValue}) => {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      return rejectWithValue('Server error!');
    } 

    return response.json();
  }
);

export const getSingleProduct = createAsyncThunk<IProduct, number | string, {rejectValue: string}>(
  "store/getSingleProduct",
  async (id : number | string,{rejectWithValue}) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) {
      return rejectWithValue('Server error!');
    } 

    return response.json();
  }
);

export const getAllCategories = createAsyncThunk<string[], undefined, {rejectValue: string}>(
  "store/getAllCategories",
  async (_,{rejectWithValue}) => {
    const response = await fetch('https://fakestoreapi.com/products/categories');

    if (!response.ok) {
      return rejectWithValue('Server error!');
    } 

    return response.json();
  }
);

export const getSpecificCategory = createAsyncThunk<IProduct[], string, {rejectValue: string}>(
  "store/getSpecificCategory",
  async (category : string, {rejectWithValue}) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);

    if (!response.ok) {
      return rejectWithValue('Server error!');
    } 
    
    return response.json();
  }
);


export const storeSlice = createSlice({
  name : "store",
  initialState,
  reducers : {
    getCategory(state, action) {
      if (state.category === null) {
        state.category = action.payload.category;
      } else {
        state.category = null;
      } 
    },
    toggleModal(state) {
      state.modal = !state.modal;
    },
    getProductId(state, action) {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
    .addCase(getSpecificCategory.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    .addCase(getSingleProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(getSingleProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    })
  }
});

export const {getCategory, toggleModal, getProductId} = storeSlice.actions;

export default storeSlice.reducer;