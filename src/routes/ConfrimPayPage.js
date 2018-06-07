/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import {connect} from 'dva';
import TopComponent from '../components/confirmPay/Top';
import BodyComponent from '../components/confirmPay/Body';
import FooterComponent from '../components/confirmPayResult/ResultButton';

function ConfirmPayPage({location, dispatch, confirmPay, layout, loading}) {
    return (
        <div className="tsd_footer" style={{paddingTop: '10px'}}>
            <TopComponent {...confirmPay} dispatch={dispatch} location={location}/>
            <BodyComponent {...confirmPay} dispatch={dispatch} location={location}/>
            <FooterComponent {...confirmPay} dispatch={dispatch} location={location}/>
        </div>
    );
}


function mapStateToProps({confirmPay, layout, loading}) {
    return {confirmPay, layout, loading};
}
export default connect(mapStateToProps)(ConfirmPayPage);