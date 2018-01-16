export const productAction = () => ({ type: 'ACTION_TEST_PROD' });
export const productSaga = data => ({ type: 'ACTION_SAGA_PROD', payload: { text: data } });
