import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditUser } from '../+state/user.actions';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string;
  editForm: FormGroup;
  constructor(private store: Store, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.route.params.subscribe(param => {
      this.userId = param['id'];
      if (!this.userId) {
        alert('Invalid action.');
        this.router.navigate(['list-user']);
        return;
      }
      if (this.store.selectSnapshot(state => state.users.users)) {
        console.log(this.store.selectSnapshot(state => state.users.users));
        this.editForm.setValue(this.store.selectSnapshot(state => state.users.users).filter(ele => ele.id === this.userId)[0]);
      }
    });
  }

  onSubmit() {
    this.store.dispatch(new EditUser(this.editForm.value)).subscribe(() => {
      this.router.navigate(['list-user']);
    });
  }

}
