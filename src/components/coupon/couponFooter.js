import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import './GcouponList.less';
import styles from './couponList.css';
class CouponListLayout extends React.Component {
    render() {
        return (
            <div className="tsd_coupon_footer">
                {
                    this.props.unavailable_list.map(( item,i) => {
                        return (
                            <div key={i}>
                            <WingBlank size="lg">
                                <WhiteSpace size="lg"/>
                                <Card>
                                    <Card.Header title={item.coupon_name} extra={<span>{item.coupon_type_name}</span>}/>
                                    <Card.Footer content={item.coupon_description} extra={<div>{item.free_money_str}</div>}/>
                                    <Card.Body>
                                        <div>{item.validity_time}</div>
                                    </Card.Body>
                                </Card>
                            </WingBlank>
                            </div>
                        );
                    })
                }
            </div>

        )
    }

}

export default CouponListLayout;