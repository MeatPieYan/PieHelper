import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PieComponent from './PieComponent';
import { getAction, getBroswerEnv } from './util';

const pieConnect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class PieConnector extends PieComponent {
    static loadInitialData(store, request) {
      if (WrappedComponent.loadInitialData instanceof Function) {
        return WrappedComponent.loadInitialData(store, request);
      }

      return null;
    }

    componentWillMount() {
      if (typeof window === 'undefined') {
        return;
      }

      const { 
        pageId, pageName,
        name, pageTitle
      } = WrappedComponent;
      document.title = pageTitle || document.title;

      if (!pageId && name !== 'App') {
        console.warn(`PieHelper warn: PageId of the container<${name}> is undefined, please set the pageId.\n`);
        console.warn(`PieHelper warn: If the component<${name}> is not a container, please think about whether the pieConnect is necessary or not.`);
        return;
      }

      this.props.loadEnv({
        pageId,
        pageName,
        client: getBroswerEnv()
      });
    }

    componentDidMount() {
      const { pageId, pageName } = WrappedComponent;

      if (!pageId) {
        return;
      }

      this.props.enterPage(pageId, pageName);
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
