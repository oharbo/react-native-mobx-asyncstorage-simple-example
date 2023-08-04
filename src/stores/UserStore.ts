import { observable, action, runInAction, IObservableArray } from 'mobx';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, HttpClient } from "../api/HttpClient";

const USER_DATA: string = 'userData';
const CACHE_TIMEOUT: number = 60 * 60 * 1000; // 1 hour
export class UserStore {
  @observable
  users: User[] = observable.array<User>([], { deep: false });

  @observable
  loading: boolean = false;

  @observable
  error: string | null = null;

  @action
  async fetchUsers() {
    this.loading = true;
    this.error = null;
    try {
      const cachedUsers = await AsyncStorage.getItem("@UserCache");
      if (cachedUsers) {
        this.loading = true;
        this.error = null;

        runInAction(() => {
          // i.e. this.users.replace(JSON.parse(cachedUsers));
          (this.users as IObservableArray<User>).replace(JSON.parse(cachedUsers));
          this.loading = false;
        })
        console.log('UserStore. cachedUsers', this.users);
      } else {
        const fetchedUsers = await HttpClient.fetchUsers();
        console.log('UserStore. fetchedUsers', fetchedUsers);
        runInAction(() => {
          // i.e. this.users.replace(fetchedUsers);
          (this.users as IObservableArray<User>).replace(fetchedUsers);
          this.loading = false;
        })
        await AsyncStorage.setItem("@UserCache", JSON.stringify(fetchedUsers));
      }
    } catch (error) {
      runInAction(() => {
        this.error = "Error fetching users.";
      });
    } finally {
      this.loading = false;
    }
  }
}

const userStore = new UserStore();
export default userStore;
