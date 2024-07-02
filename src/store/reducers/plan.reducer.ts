import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Estado inicial para selectedPlanId
const initialState: {selectedPlanId: any} = {
  selectedPlanId: null,
};

// Criação do slice
const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setSelectedPlanId: (state, action: PayloadAction<any>) => {
      state.selectedPlanId = action.payload;
    },
    resetSelectedPlanId: state => {
      state.selectedPlanId = null;
    },
  },
});

export const {setSelectedPlanId, resetSelectedPlanId} = planSlice.actions;

export default planSlice.reducer;
