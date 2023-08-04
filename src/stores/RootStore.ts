import userStore, { UserStore } from './UserStore';

class RootStore {
  constructor() {
    this.userStore = userStore;
  }

  userStore: UserStore;
}

export default new RootStore();
