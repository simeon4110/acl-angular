export class UserModel {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  requiredSonnets: number;
  canConfirm: boolean;
  privileges: [{
    id: number,
    name: string
  }];
}
