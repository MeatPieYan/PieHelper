export const activityAction = () => ({ type: 'ACTION_TEST_ACT' });
export const activityAction = data => ({ type: 'ACTION_SAGA_ACT', payload: { text: data } });
