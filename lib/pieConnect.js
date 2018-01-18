import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PieComponent from './PieComponent';
import { getAction, getBroswerEnv } from './util';

const pieConnect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class PieConnector extends PieComponent {
    static loadInitialData(store) {
      if (WrappedComponent.loadInitialData instanceof Function) {
        return WrappedComponent.loadInitialData(store);
      }

      return null;
    }

    componentWillMount() {
      const { pageId, pageName } = WrappedComponent;

      if (!pageId) {
        console.error('pageId of the container is undefined, please set the pageId.\n ');
        console.error('If the component which you use pieConnect is not a container, please think about whether the pieConnect is necessary or not.');
        return;
      }

      this.props.loadEnv({
        pageId,
        pageName,
        client: getBroswerEnv()
      });
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const { projectType } = WrappedComponent;

  const commonAction = getAction(projectType);

  const connectComp = connect(
    null,
    dispatch => bindActionCreators(commonAction, dispatch)
  )(withRouter(PieConnector));

  return connect(mapStateToProps, mapDispatchToProps)(connectComp);
};

export default pieConnect;
