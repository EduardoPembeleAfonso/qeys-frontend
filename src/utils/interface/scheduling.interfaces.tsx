import IProperties from "./properties.interfaces";

export default interface IScheduling {
  id: string;
  date: string;
  time: string;
  contact: string;
  isActive: boolean;
  description: string;
  userId: string;
  propertiesId: string;
  properties: IProperties;
  createdAt: Date;
  updatedAt: Date;
}
