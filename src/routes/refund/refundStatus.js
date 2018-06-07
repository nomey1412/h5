/**
 * Created by biyajuan on 2018/1/9.
 * 说明:登录路由入口文件
 */
import React from 'react';
import { connect } from 'dva';
import RefundLayout from "../../components/refund/refundStatus";
import RefundFooterLayout from "../../components/refund/refundFooter";
function RefundRoute({ location, dispatch, refundStatus, layout , loading }) {
    return (
        <div>
            <RefundLayout {...refundStatus} dispatch={dispatch} location={location}/>
            <RefundFooterLayout {...refundStatus} dispatch={dispatch} location={location}/>
        </div>
    );
}

RefundLayout.propTypes = {
};


function mapStateToProps({ refundStatus, layout ,loading}) {
    return { refundStatus, layout, loading};
}

export default connect(mapStateToProps)(RefundRoute);
