import React from 'react';
import './GcouponList.less';
import  styles from './couponList.css';
class couponFF extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.dispatch({
            type:'couponList/changeConHistory',
            payload:{}
        });
    }


    render() {
        return (
            <div className={styles.tipsStyle} onClick={this.handleClick}>查看历史优惠券> </div>
        )
    }
}
export default couponFF;