import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  if (previousToken) {
    return true;
  }
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  if (status !== 'granted') {
    return false;
  }

  let token = await Notifications.getExpoPushTokenAsync();
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  // await fetch(PUSH_ENDPOINT, { method: 'POST' });
  // try {
  //   let response = await fetch(PUSH_ENDPOINT, {
  //     method: 'post',
  //     body: JSON.stringify({ token: { token } }),
  //   });
  // } catch (err) {
  //   console.error(err);
  // }

  AsyncStorage.setItem('pushtoken', token);
  return true;
};
