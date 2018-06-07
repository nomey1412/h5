import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import '../GcouponList.less';
import styles from '../couponList.css';
class couponHistoryCenter extends React.Component {
    render() {
        if (this.props.available_list.length > 0) {
            return (
                <div>
                    {
                        this.props.available_list.map((item, i) => {
                            return (
                                <div className={ item.status == 1 ? "tsd_yz_red" : "tsd_yz"} key={i}>
                                    <WingBlank size="lg">
                                        <WhiteSpace size="lg"/>
                                        <Card>
                                            <Card.Header title={item.coupon_type_name} extra={item.coupon_name}/>
                                            <Card.Footer content={item.coupon_description}
                                                         extra={<div>{item.free_money_str}</div>}/>
                                            <Card.Body>
                                                <div>{item.validity_time}</div>
                                            </Card.Body>
                                        </Card>
                                        <WhiteSpace size="lg"/>

                                    </WingBlank>
                                </div>
                            );
                        })
                    }

                </div>

            )
        } else {
            return (
                <div style={{paddingTop: '40%'}}>
                    <img src="./src/assets/coupon/house.png" alt="" style={{"display": "block", "margin": "0 auto"}}/>
                    < div style={{marginTop: '20px', color: '#ccc', fontSize: '18px',textAlign:"center"}}> 暂无可用优惠券</div>
                </div>

            );
        }
    }

}

export default couponHistoryCenter;