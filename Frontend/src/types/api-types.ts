import {Product ,User} from './types'
export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user?: User;
};  

export type ProductResponse = {
  success: boolean;
  products?: Product[];
};

