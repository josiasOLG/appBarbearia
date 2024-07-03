export interface User {
  id: string;
  username: string;
  isLoggedIn: boolean;
  type: 'USER' | 'BARBER' | 'STYLIST';
  profileImage?: string;
  descricao?: string;
  image?: string;
  certificacoes?: string;
}

export interface UserState {
  user: User;
}
