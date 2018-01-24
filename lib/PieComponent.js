import React, { Component as C } from 'react';

class PieComponent extends C {
  static loadInitData(store, rootSaga, actionCreator) {
    const action = actionCreator();
    if (action.type) { // 兼容旧写法
      const promise = store.runSaga(rootSaga).done;
      store.dispatch(action);
      return promise;
    }

    if (action instanceof Function) {
      const promise = store.runSaga(rootSaga).done;
      store.dispatch(action());
      return promise;
    }

    console.error('PieComponent: actionCreator is not an action nor a function which return an action');
    return Promise.resolve();
  }

  render() {
    return (
      <div>
        Pie Component Render, please override this function;
      </div>
    );
  }
}

export default PieComponent;
