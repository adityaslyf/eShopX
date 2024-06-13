export interface NewUserRequestBody {
  _id: string;
  name: string;
  photo: string;
  role: "admin" | "user";
  email: string;
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //virtual schema
  age: number;
}
