/**
 * Created by fengxiangfei on 2018/1/23.
 */
import React from 'react';
import {connect} from 'dva';
import ConHistoryTop from '../../components/coupon/couponHistory/couponHistoryTop'
import CcouponHistoryCenter from '../../components/coupon/couponHistory/couponHistoryCenter'

function conHistory({ location, dispatch, conHistory, layout , loading }) {
    return (
        <div className="tsd_con_Horty">
            {/*<ConHistoryTop {...conHistory} dispatch={dispatch} location={location}/>*/}
            <CcouponHistoryCenter {...conHistory} dispatch={dispatch} location={location}/>
        </div>
    );
}
conHistory.propTypes = {};


function mapStateToProps({ conHistory, layout ,loading}) {
    return { conHistory, layout, loading};
}
export default connect(mapStateToProps)(conHistory)

