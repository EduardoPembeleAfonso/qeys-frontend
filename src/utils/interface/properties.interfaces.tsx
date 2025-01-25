import IUser from "./user.interfaces";

export default interface IProperties {
  id: string;
  address: string;
  title: string;
  description: string;
  areaProperty: string;
  isForSale: boolean;
  price: string;
  photo: string;
  coordinates: string;
  numberBedrooms: string;
  numberBathrooms: string;
  likes: string;
  userId: string;
  user: IUser
  createdAt: Date;
  updatedAt: Date;
}
