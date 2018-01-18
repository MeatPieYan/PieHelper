export const testAction = () => ({ type: 'ACTION_TEST_COM' });
export const sagaAction = data => ({ type: 'ACTION_SAGA_COM', payload: { text: data } });

export const GLOBAL_LOAD_ENV = '@@GLOBAL_LOAD_ENV';
export const GLOBAL_INIT_PIE_CONNECT = '@@GLOBAL_INIT_PIE_CONNECT';
export const GLOBAL_ENTER_PAGE = '@@GLOBAL_ENTER_PAGE';

export const loadEnv = env => ({ type: GLOBAL_LOAD_ENV, payload: env });
export const initPieConnect = env => ({ type: GLOBAL_INIT_PIE_CONNECT, payload: env });
export const enterPage = (pageId, pageName) => ({ type: GLOBAL_ENTER_PAGE, payload: { pageId, pageName } });
