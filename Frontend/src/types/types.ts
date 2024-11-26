export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    dob: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Product {
    _id: string;
    name: string;
    photo: string;
    price: number;
    stock: number;
    category: string;
  }
  