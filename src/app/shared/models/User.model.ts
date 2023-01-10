import {Planning} from "./Planning.model";

export interface User {
  userId?: string;
  userName: string;
  userFirstname: string;
  userEmail:string;
  userPicture:string;
  isActive?: boolean;
  roleId?: number;
  token?: string;
  planningsByUserId:Planning[],
  userCity: string;
}
