import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SignIn, SignOut, SignInWithFacebook, SignUp } from './auth.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export class AuthStateModel {
  authToken?: string;
  loggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedIn: false
  }
})
export class AuthState {
  constructor(private authService: AuthService) {}

  @Action(SignIn)
  signIn({ patchState }: StateContext<AuthStateModel>, { payload }: SignIn): Observable<any> {
    return this.authService
      .signIn(payload)
      .pipe(
        tap((authToken: string) => patchState({ authToken, loggedIn: true }))
      );
  }

  @Action(SignInWithFacebook)
  signInWithFacebook({ patchState }: StateContext<AuthStateModel>) {
    return this.authService
      .signInWithFacebook()
      .pipe(
        tap((authToken: string) => patchState({ authToken, loggedIn: true }))
      )
  }

  @Action(SignUp)
  signUp({ patchState }: StateContext<AuthStateModel>, { payload }: SignUp): Observable<any> {
    return this.authService
      .signUp(payload)
      .pipe(
        tap((authToken: string) => patchState({ authToken, loggedIn: true }))
      )
  }

  @Action(SignOut)
  signOut({ setState, getState }: StateContext<AuthStateModel>) {
    return this.authService
      .logOut()
      .pipe(tap(() => setState({ loggedIn: false })));
  }
}
