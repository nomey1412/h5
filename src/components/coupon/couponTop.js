import React from 'react';
import './GcouponList.less';
import styles from './couponList.css';
class CouponTop extends React.Component {
    render() {
        if(this.props.unavailable_list.length > 0) {
            return (
                <div className={styles.couponContentTips2}>----------以下优惠券不满足使用条件---------</div>
            )
        }else{
            return "";
        }
    }

}

export default CouponTop;