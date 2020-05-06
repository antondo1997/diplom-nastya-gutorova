export interface UserSignIn {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export type StateTypes = 'agreed' | 'inAgreement' | 'rejected';

export interface Post {
  id?: string;
  link: string;
  state: string;
  deadline: Date;
  comment: string;
}

export const states: { en: StateTypes, ru: string }[] = [
  {en: 'agreed', ru: 'согласовано'},
  {en: 'inAgreement', ru: 'на согласовании'},
  {en: 'rejected', ru: 'отключено'}
];
