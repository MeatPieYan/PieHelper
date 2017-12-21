import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PieComponent from './PieComponent';
import * as pieAction from './pieAction';

const pieConnect = options => (WrappedComponent) => {
  class PieConnector extends PieComponent {
    static loadInitialData(store) {
      if (WrappedComponent.loadInitialData instanceof Function) {
        return WrappedComponent.loadInitialData(store);
      }

      return null;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const connectComp = connect(
    null,
    dispatch => bindActionCreators(pieAction, dispatch)
  )(PieConnector);

  return connect(options)(connectComp);
};

export default pieConnect;
