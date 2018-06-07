/**
 * Created by biyajuan on 2018/1/9.
 * 说明:登录路由入口文件
 */
import React from 'react';
import { connect } from 'dva';
import ConfirmRefundLayout from "../../components/refund/confirmRefund";
function confirmRefundRoute({ location, dispatch, confirmRefund, layout , loading }) {
    return (
        <ConfirmRefundLayout {...confirmRefund} dispatch={dispatch} location={location}/>
    );
}

ConfirmRefundLayout.propTypes = {
};

function mapStateToProps({ confirmRefund, layout ,loading}) {
    return { confirmRefund, layout, loading};
}

export default connect(mapStateToProps)(confirmRefundRoute);
