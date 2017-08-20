import { FACEBOOK_LOGIN_SUCEES, FACEBOOK_LOGIN_FAIL } from '../actions/types';

const INITIAL_STATE = {
  token: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCEES:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    default:
      return state;
  }
}
