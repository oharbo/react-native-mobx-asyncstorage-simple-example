import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores";

const HomeScreen: React.FC = () => {
  const { userStore } = useStores();

  console.log('HomeScreen.userStore', userStore);

  useEffect(() => {
    console.log('HomeScreen.useEffect userStore.fetchUsers');
    userStore.fetchUsers();
  }, [userStore]);

  if (userStore.loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Welcome to the User Table</Text>
    </View>
  );
};

export default observer(HomeScreen);
