export type OrderItemTypes = {
  name: string;
  price: number;
  quantity: number;
  photo: string;
  _id: string;
};

export type OrderType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  orderItems: OrderItemTypes[];
  pincode: string;
  _id: string;
  state: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  discount: number;
  tax: number;
  shippingCharge: number;
  subTotal: number;
  country: string;
};
