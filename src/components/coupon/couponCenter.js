import React from 'react';
import './GcouponList.less';
import styles from './couponList.css';
class CouponCenter extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.dispatch({
            type:'couponList/changeRule',
            payload:{}
        });
    }

    render() {
        return (
            <div className={styles.couponContentTips} onClick={this.handleClick}>查看使用规则</div>
        )
    }

}

export default CouponCenter;