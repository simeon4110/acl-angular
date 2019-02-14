export class UserModel {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  requiredSonnets: number;
  canConfirm: boolean;
  authorities: string[];
}
