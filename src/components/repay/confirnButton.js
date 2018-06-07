/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {List, WhiteSpace,Button} from 'antd-mobile';
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

    handleClick(overdue_amount,consume_id,id,repay_date,consume_amount,e){
        this.props.dispatch({
            type:'confirmRepay/sureRepay',
            payload:{
                overdue_amount:overdue_amount,
                consume_id:consume_id,
                id:id,
                repay_date:repay_date,
                consume_amount:consume_amount
            }
        });
    }
    render() {
        return (
            <Button style={{margin:'20px'}} type="warning" onClick={this.handleClick.bind(
                this,
                this.props.overdue_amount,
                this.props.consume_id,
                this.props.id,
                this.props.repay_date,
                this.props.consume_amount

            )}>确认</Button>
        );
    }
}
export default confirmCenter;
