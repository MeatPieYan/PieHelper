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
    const { systemInfo: { authInfo }, common: { mode, modeData, env }, page, dropdown, coupleKey } = state;
    const defaultPageData = {
      data: {
        extraInfo: {},
        value: []
      },
      queryObj: {
        pageNum: 1,
        pageSize: 10,
        param: {},
        extraInfo: {}
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 0
      }, 
      uiParams: {}
    };
    const pageData = page[moduleName] || defaultPageData;
    const { 
      data = defaultPageData.data, 
      queryObj = defaultPageData.queryObj, 
      pagination = defaultPageData.pagination,
      uiParams = defaultPageData.uiParams
    } = pageData;


    return {
      moduleData: data.value,
      extraInfo: data.extraInfo,
      queryObj,
      editData: modeData,
      pagination,
      mode,
      env,
      visible:!!mode,
      authInfo,
      dropdown,
      coupleKey,
      uiParams
    };
  };

  const connectComp = connect(phoenixStateSelector)(PhoenixConnector);

  const result = connect(mapStateToProps, mapDispatchToProps)(connectComp);

  // add WrappedComponent's moduleName to exports
  result.moduleName = moduleName;

  return result;
};

export default phoenixConnect;
