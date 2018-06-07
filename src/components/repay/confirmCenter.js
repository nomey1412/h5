/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {List, WhiteSpace} from 'antd-mobile';
import React, {Component} from 'react';
import styles from './ConfirmRepay.css';
import './GConfirmRepay.less'
import Btn from '../doubt'


const Item = List.Item;

class confirmCenter extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        mobile: '',
        password: '',
        verify: '',
    };


    handleSubmit(e) {
        console.log('111');
    }

    handleClick(coupon_count,overdue_amount,e){
        if(coupon_count == 0 || typeof coupon_count === 'undefined'){
            return;
        }
        if(overdue_amount != 0){
            return;
        }
        this.props.dispatch({
            type:'confirmRepay/useCoupon',
            payload:{}
        });
    }

    render() {
        return (
            <div className="tsd_own_right">
                <WhiteSpace size="lg"/>
                <List onClick={this.handleClick.bind(this,this.props.coupon_count,this.props.overdue_amount)}>
                    <Item extra={parseInt(this.props.coupon_free_money) && this.props.overdue_amount == 0 ? '-'+this.props.coupon_free_money / 100+'元' :(parseInt(this.props.coupon_count) && this.props.overdue_amount == 0 ? '有'+this.props.coupon_count+'张券可用' : '暂无可用优惠券')} arrow="horizontal">使用优惠券</Item>
                </List>
            </div>
        );
    }
}
export default confirmCenter;
