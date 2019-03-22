import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Store } from '@ngxs/store';
import { AddUser } from '../+state/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private store: Store, private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  addForm: FormGroup;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [''],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

  }

  onSubmit() {
  this.addForm.controls['id'].setValue((Math.floor(Math.random() * (100 - 4)) + 4).toString());
   this.store.dispatch(new AddUser(this.addForm.value)).subscribe(() => {
    this.router.navigate(['list-user']);
   });
  }

}
