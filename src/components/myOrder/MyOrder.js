/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import styles from './myOrder.less';
import {Button, List,Toast,Modal} from 'antd-mobile';

const alert = Modal.alert;

class MyOrder extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {}

    handleClick(arg, orderId, e) {
        if (arg === 1) { // 去付款按钮
            this.props.dispatch({
                type: 'mine/queryPay',
                payload: {
                    orderId: orderId
                }
            });
        } else if (arg === 2) { //退款按钮
            this.props.dispatch({
                type: 'mine/queryBack',
                payload: {
                    orderId: orderId
                }
            });
        } else if (arg === 3) { //再次购买
            this.props.dispatch({
                type: 'mine/queryBuy',
                payload: {
                    orderId: orderId
                }
            });
        } else if( arg === 4) { // 重新退款
            this.props.dispatch({
                type:'mine/queryReback',
                payload:{
                    orderId:orderId
                }
            });
        }
    }


    queryAddBank = () =>{
        this.props.dispatch({
            type:'bankCard/JumpAddBand',
            payload:{
                type:1 // 1 增加银行卡
            }
        });
    }

    render() {
        if (this.props.orderList.length > 0) {
            return this.props.orderList.map(item => {
                let content;
                switch (parseInt(item.orderSatus)) {
                    case 0:
                        content = (
                            <Button type="warning" style={{
                                float: 'right',
                                height: '40px',
                                lineHeight: '40px',
                                paddingLeft: '22px',
                                paddingRight: '22px'
                            }} className="am-button-borderfix" onClick={this.handleClick.bind(this, 1, item.orderId)}>
                                去付款
                            </Button>
                        );
                        break;
                    case 1:
                        if(this.props.isDivlog){

                        }
                        content =  (
                            this.props.isDivlog ?
                                <div style={{
                                float: 'right',
                                height: '36px',
                                lineHeight: '36px',
                                paddingLeft: '22px',
                                paddingRight: '22px',
                                background: '#ff5353',
                                borderRadius: '4px',
                                color: '#fff',
                                fontSize: '14px'
                            }} className="am-button-borderfix" onClick={this.handleClick.bind(this, 2, item.orderId)}>
                                退款
                            </div> : <div style={{
                            float: 'right',
                            height: '36px',
                            lineHeight: '36px',
                            paddingLeft: '22px',
                            paddingRight: '22px',
                            background: '#ff5353',
                            borderRadius: '4px',
                            color: '#fff',
                            fontSize: '14px'
                        }} className="am-button-borderfix" onClick={() => alert('', '您还没没有绑定银行卡，请先绑定银行卡后在进行退款', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                {
                                    text: '确定',
                                    onPress: () => this.queryAddBank(),
                                },
                            ])}>
                            退款
                        </div>
                        );
                        break;
                    case 2:
                        content = (
                            <span className="price_span">
                                退款中
                            </span>
                        );
                        break;
                    case 3:
                        content = (
                            <span className="price_span">
                                退款成功
                            </span>
                        );
                        break;
                    case 4:
                        content = (
                            <Button type="warning"  style={{
                                float: 'right',
                                height: '40px',
                                lineHeight: '40px',
                                paddingLeft: '22px',
                                paddingRight: '22px',
                                fontSize: '14px'
                            }} className="am-button-borderfix" onClick={this.handleClick.bind(this, 4, item.orderId)}>
                                重新退款
                            </Button>
                        );
                        break;
                    case 10:
                        content = (
                            <span className="price_span">
                                订单取消
                            </span>
                        );
                        break;
                    case 20:
                        content = (
                            <Button type="warning"  style={{
                                float: 'right',
                                height: '40px',
                                lineHeight: '40px',
                                paddingLeft: '22px',
                                paddingRight: '22px',
                                fontSize: '14px'
                            }} className="am-button-borderfix" onClick={this.handleClick.bind(this, 3, item.orderId)}>
                                再次购买
                            </Button>
                        );
                }
                return (
                    <div className={styles.tsd_myorder} key={item.orderId}>
                        <div className={`${styles.p_style}`}>
                                     <span className={`${styles.center} ${styles.span_left}`}>< img
                                         className={item.goodsImage} style={{
                                         width: '46%',
                                         border: '1px solid #c8c8c8',
                                         padding: '10px'
                                     }} src={item.goodsImage}/></span>
                            <span className={styles.span_right}>
                         <a>{item.goodsDesc}</a >
                         <b className="price">¥{item.price / 100}.00
                             {content}
                         </b>
                     </span>
                        </div>
                    </div>
                );
            });
        } else {
            return "";
        }
    }
}

export default MyOrder;