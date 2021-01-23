export type KSizes =
  | '6'
  | '6.5'
  | '7'
  | '7.5'
  | '8'
  | '8.5'
  | '9'
  | '9.5'
  | '10'
  | '10.5'
  | '11'
  | '11.5';

export type Gender = 'm' | 'f';

export type UserProfile = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city?: string;
  state?: string;
  zipcode?: string;
  ccn?: string;
  ccExp?: string;
  ccCvc?: string;
};

export interface IData {
  userInfo: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    state: string;
    zipcode: string;
    ccn: string;
    ccExp: string;
    ccCvc: string;
  };
  appConfig: {
    preferredSize: KSizes;
    numConcurrentTasks: number;
    stopEarly: boolean;
    gender: Gender;
  };
}
