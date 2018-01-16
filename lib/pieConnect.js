import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PieComponent from './PieComponent';
import { getAction } from './util';

const pieConnect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
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
  let { projectType } = WrappedComponent;

  let commonAction = getAction(projectType);

  const connectComp = connect(
    null,
    dispatch => bindActionCreators(commonAction, dispatch)
  )(withRouter(PieConnector));

  return connect(mapStateToProps,mapDispatchToProps)(connectComp);
};

export default pieConnect;
