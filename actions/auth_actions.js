import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
} from './types';

const doFacebookLogin = async (dispatch) => {
  try {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('349304795490673', {
      permissions: ['public_profile'],
    });

    if (type === 'cancel') {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({
      type: FACEBOOK_LOGIN_SUCCESS,
      payload: token,
    });

    return true;
  } catch (err) {
    console.error('Error while doing Facebook login:', err);
    return false;
  }
};

export const facebookLogin = () => async (dispatch) => {
  try {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      // dispatch an action saying FB login is done
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: token,
      });
    } else {
      // Start up FB Login process
      doFacebookLogin(dispatch);
    }
  } catch (err) {
    console.error('Error while getting token:', err);
  }
};
