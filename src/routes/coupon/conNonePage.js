import React from 'react';
import {connect} from 'dva';
import NoneBottom from '../../components/coupon/couponFF'
import NoneTop from '../../components/coupon/couponCenter'
import NoneCenter from '../../components/coupon/none/house'


function conNone() {
    return (
        <div className="tsd_con_none">
            <NoneTop/>
            <NoneCenter/>
            <NoneBottom/>
        </div>
    );
}
conNone.propTypes = {};

export default connect()(conNone)
