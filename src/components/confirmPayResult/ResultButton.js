/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import {Modal, Button, WhiteSpace, WingBlank, Toast,List} from 'antd-mobile';
import styles from './ResultButton.less';

const alert = Modal.alert;

/*
 * 此组件 为公共组件
 * */
class ResultButton extends React.Component {
    state = {}

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (this.props.orderPayStatus) { //跳转申请退款
            this.props.dispatch({
                type: 'confirmPayResult/changeToRefund',
                payload: {}

            });
        } else {
            this.props.dispatch({
                type: 'confirmPay/queryNext',
                payload: {
                    verifyCode: this.props.verifyCode
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

    queryCancelOrder = () => {
        this.props.dispatch({
            type:'confirmPayResult/cancelOrder',
            payload:{
                order_id:window.localStorage.getItem('orderId')
            }
        });
    }

    render() {
        let button;
        if(this.props.orderPayStatus && this.props.isDivlog){ // 支付成功 并且 有卡
            button = (
                <Button type="warning"
                        onClick={this.handleClick}>申请退款</Button>
            );
        }else if(this.props.orderPayStatus && !this.props.isDivlog){ // 支付成功并且 无卡
            button = (
                <Button type="warning"
                        onClick={() => alert('', '您还没有绑定银行卡，请先绑定银行卡后在进行退款', [
                            { text: '取消', onPress: () => console.log('cancel') },
                            {
                                text: '确定',
                                onPress: () => this.queryAddBank(),
                            },
                        ])}>申请退款</Button>
            );
        }else{
            button = (
                <Button type="warning"
                        onClick={this.handleClick}>确认付款</Button> // 此处修改 文案 不确定是否影响别处
            );
        }
        return (
            <div style={{width: '80%', margin: '0 10%'}}>
                <List style={{margin: '20px 0 5px 0'}}>
                    {button}
                    <List.Item.Brief style={{marginTop: '10px',fontSize:'13px'}}>
                        {this.props.orderPayDes}
                    </List.Item.Brief>
                    { this.props.isShow ? <Button style={{color:'#e94f4f',background:'transparent',border:'1px solid #e94f4f',marginTop:'30px'}}  onClick={() => alert('', '确认取消订单吗？', [
                        { text: '取消' },
                        {
                            text: '确定',
                            onPress: () => this.queryCancelOrder(),
                        },
                    ])}>取消订单</Button> : ""}

                </List>
            </div>

        );
    }
}

export default ResultButton;