export interface UsersRequest {
  id?: number;
  idUser: string;
  user1: number;
  user2: number;
  estado: number;
  nick:string;
  email: string;
  password: string;
  rol: number;
  rememberToken?: string;
  created_at?: string;
  updated_at?: string;
}