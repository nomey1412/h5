/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import GoodsDetailComponent from '../components/confirmOrder/Detail';
import ResultButtonComponent from '../components/confirmPayResult/ResultButton';
import ReturnHome from '../components/confirmPayResult/ReturnHome';
import { connect } from 'dva';

function ConfirmPayResultPage({ location, dispatch, confirmPayResult, layout , loading }) {
    return (
        <div className="tsd_confirm" style={{paddingTop:'20px',overflow:'hidden'}}>
            <GoodsDetailComponent {...confirmPayResult} dispatch={dispatch} location={location} />
            <ResultButtonComponent {...confirmPayResult} dispatch={dispatch} location={location} />
            <ReturnHome {...confirmPayResult} dispatch={dispatch} location={location} />
        </div>
    );
}


function mapStateToProps({ confirmPayResult, layout ,loading}) {
    return { confirmPayResult, layout, loading};
}

export default connect(mapStateToProps)(ConfirmPayResultPage);