import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {User} from "../model/user.model";
import { Store } from '@ngxs/store';
import { LoadUsers, DeleteUser } from '../+state/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users$: Observable<User[]>;
  constructor(private store: Store,private router: Router, private userService: UserService) { 
  }

  ngOnInit() { 
    this.users$ = this.store.select(state => state.users.users);
  }

  deleteUser(user: User): void {
    this.store.dispatch(new DeleteUser(parseInt(user.id.toString())));
  }

  editUser(user: User): void {
    this.router.navigate(['/edit-user', user.id]);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
}
