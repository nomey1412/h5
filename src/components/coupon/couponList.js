import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import './GcouponList.less';
import styles from './couponList.css';
import Crice from '../crice'
class CouponFooterLayout extends React.Component {
    state={}
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(coupon_id,e){
        let pathname = this.props.location.pathname;
        if(pathname.replace('/','') != 'myCoupon'){
            this.props.dispatch({
                type:'couponList/changeCoupon',
                payload:{
                    couponId:coupon_id
                }
            });
        }
    }
    render() {
        if(this.props.available_list.length > 0){
            return (
                    <div>
                        {
                            this.props.available_list.map(( item , i) => {
                                return (
                                    <div key={i}>
                                        <WingBlank size="lg">
                                            <WhiteSpace size="lg"/>
                                            <Card onClick={this.handleClick.bind(this,item.coupon_id)}>
                                                <Card.Header title={item.coupon_name} extra={item.coupon_type_name}/>
                                                <Card.Footer content={item.coupon_description} extra={<div>{item.free_money_str}</div>}/>
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
        }else{
            return (
                <div className="tsd_house_iconSize"><img src="./src/assets/coupon/house.png" alt=""/>
                    < div style={{marginTop: '20px', color: '#ccc', fontSize: '18px'}}> 您还没有可用的优惠券哦～</div>
                </div>

            )
        }
    }

}
//Crice
export default CouponFooterLayout;