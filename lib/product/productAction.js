export const productAction = () => ({ type: 'ACTION_TEST_PROD' });
export const productAction = data => ({ type: 'ACTION_SAGA_PROD', payload: { text: data } });
