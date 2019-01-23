export class UserModel {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  requiredSonnets: number;
  canConfirm: boolean;
  accessToken: string;
  refreshToken: string;
  authorities: string[];
}
