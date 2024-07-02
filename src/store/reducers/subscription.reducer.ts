import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SubscriptionState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  isActive: false,
  isLoading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptionStatus: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setSubscriptionLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSubscriptionError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSubscriptionStatus,
  setSubscriptionLoading,
  setSubscriptionError,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
