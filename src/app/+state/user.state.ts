import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { UserStateModel } from './user.model';
import { AddUser, LoadUsers, EditUser, DeleteUser } from './user.actions';
import { UserService } from '../service/user.service';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, first } from 'rxjs/operators';
import { User } from '../model/user.model';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: null,
    errorMessage: null
  }
})

export class UsersState implements NgxsOnInit {

  constructor(private userService: UserService) {
  }

  ngxsOnInit(context?: StateContext<any>) {
    context.dispatch(new LoadUsers());
  }

  @Action(AddUser)
  add(context: StateContext<UserStateModel>, action: AddUser): Observable<Object> {
    const state = context.getState();
    return this.userService.createUser(action.user).pipe(tap(() => {
      context.patchState({
        users: [...state.users, action.user]
      });
      context.dispatch(new LoadUsers());
    }),
      catchError((error) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        context.patchState({ errorMessage: errorMessage });
        return throwError(errorMessage);
      }));
  }

  @Action(LoadUsers)
  loadUsers(context: StateContext<UserStateModel>, action: LoadUsers): Observable<User[]> {
    const state = context.getState();
    return this.userService.getUsers().pipe(
      tap((users: User[]) => {
        context.patchState({
          users: users
        });
      },
        catchError((error) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          context.patchState({ errorMessage: errorMessage });
          return throwError(errorMessage);
        }))
    );
  }

  @Action(EditUser)
  editUser(context: StateContext<UserStateModel>, action: EditUser): Observable<Object> {
    const state = context.getState();
    return this.userService.updateUser(action.user).pipe(first(), tap(() => {
      context.patchState({
        users: [...state.users, action.user]
      });
      context.dispatch(new LoadUsers());
    }), catchError((error) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      context.patchState({ errorMessage: errorMessage });
      return throwError(errorMessage);
    }));
  }

  @Action(DeleteUser)
  deleteUser(context: StateContext<UserStateModel>, action: DeleteUser): Observable<Object> {
    const state = context.getState();
    return this.userService.deleteUser(action.userId).pipe(tap(() => {
      context.dispatch(new LoadUsers());
    }),
      catchError((error) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        context.patchState({ errorMessage: errorMessage });
        return throwError(errorMessage);
      }));
  }


}
