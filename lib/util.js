/* eslint-env browser */

import { deviceType } from 'tac-ua';

import * as pieAction from './pie/pieAction';
import * as activityAction from './activity/activityAction';
import * as productAction from './product/productAction';

/**
 *
 * @param {String} projectType
 * According to projectType, chose the common action.
 */
const getAction = (projectType) => {
  let commonAction = pieAction;

  switch (projectType) {
    case 'phoenix': commonAction = pieAction; break;
    case 'product': commonAction = productAction; break;
    case 'activity': commonAction = activityAction; break;
    default: commonAction = pieAction; break;
  }
  return commonAction;
};

const parsrObj = (str = '', splitter = '&') => {
  return str.split(splitter).reduce((result, value) => {
    const parts = value.split('=');
    if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return result;
  }, {});
};

const getBroswerEnv = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  const { href, search } = window.location;
  return {
    ...deviceType(navigator.userAgent),
    url: href,
    search,
    query: {
      ...parsrObj(search.substring(1))
    }
  };
};

export default {
  getAction,
  getBroswerEnv,
  parsrObj
};
