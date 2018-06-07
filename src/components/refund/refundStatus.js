/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {List, Button} from 'antd-mobile';
import React, {Component} from 'react';
import styles from './refund.css';
import './Grefund.less'
import {Steps, WingBlank, WhiteSpace} from 'antd-mobile';


const Step = Steps.Step;
const Item = List.Item;


class RefundStatus extends React.Component {
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

        if (this.props.consume_status_list.length > 0) {
            return this.props.consume_status_list.map((item, i) => {
                return (

                    <div className="tsd_refund_status" key={i}>

                        <div className={styles.headerDiv}/>
                        <List  className="my-list">
                        {/*<div className={styles.headerDiv2}/>*/}
                        { i != 0   ?( i == this.props.consume_status_list.length -1 ? <Item  extra={item.consume_status_time} multipleLine align="top"
                        thumb="./src/assets/refund/ic_time_line_current.png" wrap>
                        <span className={styles.titleTips}>{item.consume_status_title}</span><br/>
                        {item.consume_status_description}
                        </Item>  :  <Item  extra={item.consume_status_time} multipleLine align="top"
                        thumb="./src/assets/refund/ic_time_line_line.png" style={{marginLeft:'17px'}} wrap>

                        <span className={styles.titleTips}>{item.consume_status_title}</span><br/>
                        {item.consume_status_description}
                        </Item> ):  <Item extra={item.consume_status_time} multipleLine align="top"
                        thumb="./src/assets/refund/ic_time_line_old.png" wrap>
                        <span/>
                        <span className={styles.titleTips2}>{item.consume_status_title}</span><br/>
                        {item.consume_status_description}
                        </Item>}
                        </List>
                    </div>
                );
            });
        } else {
            return "";
        }
    }
}
export default RefundStatus;
