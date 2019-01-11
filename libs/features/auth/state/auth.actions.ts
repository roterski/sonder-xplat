export class SignIn {
  static readonly type = '[Auth] Sign In';
  constructor(public payload: { email: string; password: string }) {}
}

export class SignInWithFacebook {
  static readonly type = '[Auth] Sign In With Facebook';
}

export class SignUp {
  static readonly type = '[Auth] Sign Up';
  constructor(public payload: { email: string; password: string }) {}
}

export class SignOut {
  static readonly type = '[Auth] Sign Out';
}
