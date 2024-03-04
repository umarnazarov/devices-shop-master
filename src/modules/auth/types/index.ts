export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface ILoginForm {
  username: string;
  password: string;
}
