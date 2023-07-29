import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { search_Tv } from "../api/tvApi";

export const searchTv = createAsyncThunk(
  "searchTv",
  async (searchValue: string, { rejectWithValue }) => {
    try {
      const res = await search_Tv(searchValue);
      return res.data?.results.slice(0, 8);
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);



interface TvState {
  searchedTv: Array<any> | null;
  loading: boolean;
  error: any;
  searchLoading: boolean;
}

const initialState: TvState = {
  searchedTv: null,
  loading: false,
  error: null,
  searchLoading: false,
};

const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    setSearchedTv: (state) => {
      state.searchedTv = null;
    },
    //   setUser: (state,action) =>{
    //     state.user = action.payload
    //   }
  },
  extraReducers(builder) {
    builder

      // Search TV
      .addCase(searchTv.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchTv.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchedTv = action.payload;
      })
      .addCase(searchTv.rejected, (state, action) => {
        //console.log(action);
        state.searchLoading = false;
        state.error = action.payload;
      });
  },
});

export default tvSlice.reducer;
export const { setSearchedTv } = tvSlice.actions;
