import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript',
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    const zipcode = await reverseGeocode(region);
    const url = buildJobsUrl(zipcode);
    const data = await (await fetch(url, { method: 'GET' })).json();
    // fetch(url, { method: 'GET' })
    //   .then(res => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    dispatch({
      type: FETCH_JOBS,
      payload: data,
    });
    callback();
  } catch (err) {
    console.error(err);
  }
};

export const likeJob = job => {
  return {
    type: LIKE_JOB,
    payload: job,
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
