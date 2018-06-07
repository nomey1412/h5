/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import {Card} from 'antd-mobile';
import styles from './confirmPay.less';

class Top extends React.Component {
    constructor() {
        super();
        this.state = {
            today: 12,
            money: 5.6,
        }
    }


    render() {
        if(this.props.orderId > 0){
            return (

                <div style={{background: '#fff', textAlign: 'center'}}>
                    <h1 style={{paddingTop: '35px'}}>{this.props.totalMoney /100}.00</h1>
                    <p>付款金额（元）</p>
                    <Card full>

                        <Card.Footer content={`账单周期（天）${this.props.orderTime}`}
                                     extra={`代收利息（元）${this.props.orderInterest / 100}`}/>
                    </Card>

                </div>

            );
        }else {
            return "";
        }

    }
}

export default Top;