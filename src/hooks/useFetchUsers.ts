import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, createContext, useContext } from 'react';
import { ApiClient, User } from '../api/mocks/fetchUsers';

const UsersDataContext = createContext(null);

const EXP_TIME: string = 'expTime';
const USER_DATA: string = 'userData';
const CACHE_TIMEOUT: number = 60 * 60 * 1000; // 1 hour

const setExpirationTime = async (value: string) => {
  try {
    console.log('1setExpirationTime');
    await AsyncStorage.setItem(EXP_TIME, value);
  } catch (e) {
    // saving error
  }
};

const getExpirationTime = async () => {
  try {
    console.log('2getExpirationTime');

    const value = await AsyncStorage.getItem(EXP_TIME);
    if (value !== null) { // value previously stored
      return parseFloat(value);
    }
    return Date.now(); // if null return time now to treat data expired
  } catch (e) {
    return Date.now();
  }
};

const setUserData = async (data: User[]) => {
  try {
    console.log('3setUserData');

    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(USER_DATA, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getUserData = async () => {
  try {
    console.log('4getUserData');

    const jsonValue = await AsyncStorage.getItem(USER_DATA);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const fetchUsersData = async () => {
  try {
    console.log('5fetchUsersData');

    const apiResponse: User[] = await ApiClient.fetchUsers();
    return apiResponse;
  } catch (err) {
    // error retrieving user data
  }
};

const getIsDataExpired = (expTime: number): boolean => {
  return Date.now() >= expTime;
}

const fetchUserDataWithCache = async () => {
  const expTime = await getExpirationTime();
  const userData = await getUserData();

  const isDataExpired = getIsDataExpired(expTime);

  if (!userData || isDataExpired) {
    const newUserData = await fetchUsersData();
    if (newUserData) {
      await setUserData(newUserData);
      const expTime = Date.now() + CACHE_TIMEOUT;
      await setExpirationTime(expTime.toString())
    }
    console.log('return NEW UserData');
    return newUserData;
  } else {
    console.log('return CACHED UserData');
    return userData;
  }
}

export const useFetchUsers = () => {
  const [data, setData] = useState<User[]>();

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      // get the data from the api or cache
      const data = await fetchUserDataWithCache();
      if (isSubscribed) {
        setData(data);
      }
    }

    fetchData().catch(console.error);

    return () => { isSubscribed = false };
  }, []);

  return { data };
};
