/**
 * Created by huozhenguang on 2018/1/24.
 */
import React from 'react';
import {connect} from 'dva';

import CouponCenter from '../../components/coupon/couponCenter';
import CouponTop from '../../components/coupon/couponTop';
import CouponListLayout from '../../components/coupon/couponList';
import CouponFooterLayout from '../../components/coupon/couponFooter';
import Coupon from '../../components/coupon/couponFF';

function couponListRoute({ location, dispatch, conHistory, layout , loading }) {
    return (
        <div className="tsd_coupon_list">
            <CouponCenter {...conHistory} dispatch={dispatch} location={location} />
            <CouponListLayout {...conHistory} dispatch={dispatch} location={location}/>
            {/*<CouponTop {...couponList} dispatch={dispatch} location={location} />*/}
            {/*<CouponFooterLayout {...couponList} dispatch={dispatch} location={location} />*/}
            <Coupon {...conHistory} dispatch={dispatch} location={location}/>
        </div>
    );
}
CouponListLayout.propTypes = {};


function mapStateToProps({ conHistory, layout ,loading}) {
    return { conHistory, layout, loading};
}
export default connect(mapStateToProps)(couponListRoute);