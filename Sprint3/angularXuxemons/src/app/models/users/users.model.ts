export interface Users {
  id?: number;
  idUser: string;
  nick:string;
  email: string;
  password: string;
  rol: number;
  rememberToken?: string;
  created_at?: string;
  updated_at?: string;
}