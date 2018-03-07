import React from 'react';
import { connect } from 'react-redux';
import PieComponent from './PieComponent';

const phoenixConnect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class PhoenixConnector extends PieComponent {
    static loadInitialData(store, request) {
      if (WrappedComponent.loadInitialData instanceof Function) {
        return WrappedComponent.loadInitialData(store, request);
      }
      return null;
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const { moduleName } = WrappedComponent;

  const phoenixStateSelector = (state) => {
    if (!moduleName) return {};
    const { systemInfo: { authInfo }, common: { mode }, page } = state;
    const defaultPageData = {
      data: {
        value: [],
        queryObj: {
          pageNum: 1,
          pageSize: 10
        },
        pagination: {
          pageNum: 1,
          pageSize: 10,
          totalCount: 0
        }
      }
    };
    const pageData = page[moduleName] || defaultPageData;
    const { data, queryObj, pagination } = pageData;

    return {
      moduleData: data.value,
      extroInfo: data.extroInfo,
      queryObj,
      pagination,
      mode,
      authInfo
    };
  };

  const connectComp = connect(phoenixStateSelector)(PhoenixConnector);

  const result = connect(mapStateToProps, mapDispatchToProps)(connectComp);

  // add WrappedComponent's moduleName to exports
  result.moduleName = moduleName;

  return result;
};

export default phoenixConnect;
