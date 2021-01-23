import { UserProfile } from '../types/shared.types';
import { logger } from '../utils/index.util';

export default class User {
  private userInfo: UserProfile;

  constructor(userInfo: UserProfile) {
    this.userInfo = userInfo;
  }

  getUserInfo = () => {
    logger(`email: ${this.userInfo.email}`);
    return this;
  };
}
