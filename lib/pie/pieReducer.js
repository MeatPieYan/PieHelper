import { GLOBAL_LOAD_ENV } from './pieAction';
import { getBroswerEnv } from '../util';

const defaultClientData = getBroswerEnv();

const env = (state = { pageId: '' }, action) => {
  switch (action.type) {
    case GLOBAL_LOAD_ENV:
      return {
        ...state,
        ...action.payload
      };
    default:
      if (typeof state.client === 'object') {
        return state;
      }
      return {
        ...state,
        client: defaultClientData
      };
  }
};

export default {
  env
};
