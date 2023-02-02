import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import collectionService from "./collectionService";

const initialState = {
  collections: [],
  isError: false,
  isLoadSuccess: false,
  isAddSuccess: false,
  isDeleteSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch Collections
export const fetchCollections = createAsyncThunk(
  "collections/fetch",
  async (thunkAPI) => {
    try {
      return await collectionService.fetchCollections();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToCollections = createAsyncThunk(
  "collections/add",
  async (project, thunkAPI) => {
    try {
      return await collectionService.addToCollections(project);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteFromCollections = createAsyncThunk(
  "collections/delete",
  async (project, thunkAPI) => {
    try {
      return await collectionService.deleteFromCollection(project);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isAddSuccess = false;
      state.isDeleteSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadSuccess = true;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add collections
      .addCase(addToCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddSuccess = true;
        state.collections = [action.payload, ...state.collections];
      })
      .addCase(addToCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Remove from collections
      .addCase(deleteFromCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleteSuccess = true;
        state.collections = state.collections.filter(
          (el) => el._id !== action.payload
        );
      })
      .addCase(deleteFromCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = collectionSlice.actions;
export default collectionSlice.reducer;
