/**
 * Created by fengxiangfei on 2018/1/23.
 */

import React from 'react';
import '../GcouponList.less';
import styles from '../couponList.css';
class House extends React.Component {
    render() {
        return (
            <div className="tsd_house"><img src="./src/assets/coupon/house.png" alt=""/>
                < div style={{marginTop: '20px', color: '#ccc', fontSize: '18px'}}> 您还没有可用的优惠券哦～</div>
            </div>

        )
    }

}

export default House;