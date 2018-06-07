/**
 * Created by fengxiangfei on 2018/1/22.
 */

import React from 'react';
import {connect} from 'dva';
import CancelOrderInfo from '../components/cancel/CancelOrderInfo'

function CancelOrder({ location, dispatch, confirmOrder, layout , loading }) {
    return (
        <div className="cancelOrder">
            <CancelOrderInfo {...confirmOrder} dispatch={dispatch} location={location} />
        </div>
    );
}
CancelOrder.propTypes = {};


function mapStateToProps({ confirmOrder, layout ,loading}) {
    return { confirmOrder, layout, loading};
}
export default connect(mapStateToProps)(CancelOrder);