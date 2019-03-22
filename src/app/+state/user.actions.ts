import { User } from '../model/user.model';

export class AddUser {
    static readonly type = '[users] User Add ';
    constructor(public user: User) { }
}


export class LoadUsers {
    static readonly type = '[users] Load Users ';
    constructor() { }
}

export class EditUser {
    static readonly type = '[users]  User Edit ';
    constructor(public user: User) { }
}

export class DeleteUser {
    static readonly type = '[users]  User delete ';
    constructor(public userId: number) { }
}
