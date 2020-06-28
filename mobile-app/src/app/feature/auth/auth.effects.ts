import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userSelected } from './redux/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router
  ) {}

  userSelectedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSelected),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ), { dispatch: false }
  );
}
