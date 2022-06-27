import {User as UserData} from './users.model';

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  name?: string;
  token: any;
  user: Array<UserData> | any;
  permissions: any;
  employee: any;
}
