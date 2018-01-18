import { GLOBAL_LOAD_ENV } from './pieAction';

const env = (state = { pageId: '', client: {} }, action) => {
  switch (action.type) {
    case GLOBAL_LOAD_ENV:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default {
  env
};
