import {Product ,User} from './types'
export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user?: User;
  message?: string;
};  

export type ProductResponse = {
  success: boolean;
  products?: Product[];
};

export type CustomError = {
  statusCode: number;
  data: {
    message: string;
    success: boolean;
  };
  }

