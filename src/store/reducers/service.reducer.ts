import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Estado inicial para selectedService
const initialState: {selectedService: string | null} = {
  selectedService: null,
};

// Criação do slice
const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<string>) => {
      state.selectedService = action.payload;
    },
    resetSelectedService: state => {
      state.selectedService = null;
    },
  },
});

export const {setSelectedService, resetSelectedService} = serviceSlice.actions;

export default serviceSlice.reducer;
