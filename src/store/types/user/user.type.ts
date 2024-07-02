export interface User {
  id: string;
  username: string;
  isLoggedIn: boolean;
  type: 'USER' | 'BARBER' | 'STYLIST';
}

export interface UserState {
  user: User;
}
