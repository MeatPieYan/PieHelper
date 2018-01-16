
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
  }
  return commonAction;
}

export default {
  getAction
};
