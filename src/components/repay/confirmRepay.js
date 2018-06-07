/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {List} from 'antd-mobile';
import React, {Component} from 'react';
import styles from './ConfirmRepay.less';
import './GConfirmRepay.less'
import Btn from '../doubt'


const Item = List.Item;

class confirmRepay extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        mobile: '',
        password: '',
        verify: '',
    };


    handleSubmit(e) {
        console.log('111');
    }

    render() {
        return (
            <div className="tsd_own_style">
                {/*<div className={styles.repayClass}></div>*/}
                <List>
                    <Item
                        extra={<Btn consume_amount={this.props.consume_amount} dialog_list={this.props.dialog_list}/>}>应还款总金额</Item>
                    <Item extra={this.props.bank_name}>还款账户银行</Item>
                    <Item extra={this.props.bank_card_num}>还款卡号</Item>
                </List>

            </div>
        );
    }
}
export default confirmRepay;
