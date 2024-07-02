import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState, User} from '../types/user/user.type';

const initialState: UserState = {
  user: {
    id: '',
    username: '',
    isLoggedIn: false,
    type: 'USER',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserType: (
      state,
      action: PayloadAction<'USER' | 'BARBER' | 'STYLIST'>,
    ) => {
      state.user.type = action.payload;
    },
    logout: state => {
      state.user = initialState.user;
    },
  },
});

export const {setUser, setUserType, logout} = userSlice.actions;

export default userSlice.reducer;
