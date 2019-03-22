import { User } from '../model/user.model';

export interface UserStateModel {
    users: User[];
    errorMessage: string;
  }
