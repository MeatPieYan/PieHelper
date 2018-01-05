import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PieComponent from './PieComponent';
import * as pieAction from './pieAction';

const pieConnect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
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
  )(withRouter(PieConnector));

  return connect(mapStateToProps,mapDispatchToProps)(connectComp);
};

export default pieConnect;
