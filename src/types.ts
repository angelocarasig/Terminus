export type UserAuthToken = {
  token: string;
  permissions: string[];
};

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}
