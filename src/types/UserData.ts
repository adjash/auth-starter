export interface UserDataSignUpSchema {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserDataSignInSchema {
  email: string;
  password: string;
}
