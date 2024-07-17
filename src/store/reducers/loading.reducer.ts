import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    message: '',
  },
  reducers: {
    showLoading(state, action) {
      state.isLoading = true;
      state.message = action.payload;
    },
    hideLoading(state) {
      state.isLoading = false;
      state.message = '';
    },
  },
});

export const {showLoading, hideLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
