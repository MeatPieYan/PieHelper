import React, { Component as C } from 'react';

class PieComponent extends C {
  static loadInitData(store, rootSaga, action) {
    const promise = store.runSaga(rootSaga).done;
    store.dispatch(action());
    return promise;
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
