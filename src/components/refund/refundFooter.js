/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import { List, Button } from 'antd-mobile';
import React, { Component } from 'react';
import styles from './refund.css';
import './Grefund.less'


const Item = List.Item;

class RefundFooter extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        mobile: '',
        password: '',
        verify: '',
    };



    handleSubmit(arg,e) {
        if(arg === 1){ // 我知道了 按钮
            this.props.dispatch({
                type:'confirmPayResult/changeHome',
                payload:{}
            });
        }else if(arg === 2){ // 再次申请退款按钮
            this.props.dispatch({
                type:'refundStatus/changeConfirmBack',
                payload:{}
            });
        }else{

        }
        switch (arg){
            case 1: // 我知道了
                this.props.dispatch({
                    type:'confirmPayResult/changeHome',
                    payload:{}
                });
                break;
            case 2: // 再次申请退款
                this.props.dispatch({
                    type:'refundStatus/changeConfirmBack',
                    payload:{}
                });
                break;
            case 7:
                this.props.dispatch({
                    type:'refundStatus/confirmBackSuccess',
                    payload:{}
                });
                break;
            case 12:
                this.props.dispatch({
                    type:'refundStatus/confirmBackFail',
                    payload:{}
                });
                break;
            case 13: // 戳我刷新按钮
                window.location.reload();
                break;
            default:
                console.log('00000000');
                break;
        }
    }



    render(){
        if(this.props.consume_status_list.length > 0){
            let content;
            switch (parseInt(this.props.consume_status)){
                case 3: // 退款成功
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,1)}>我知道了</Button>);
                    break;
                case 4:// 退款失败
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,2)}>再次申请退款</Button>);
                    break;
                case 2: //退款中
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,13)}>戳我刷新</Button>);
                    break;
                case 7: // 还款成功
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,7)}>再次购物</Button>);
                    break;
                case 12: // 还款失败
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,12)}>重新还款</Button>);
                    break;
                case 8: // 还款中
                    content = ( <Button type='warning' onClick={this.handleSubmit.bind(this,13)}>戳我刷新</Button>);
                    break;
            }
            return (
                <div className="tsd_refund_status">
                    <div className={styles.headerDiv}/>
                    <List>
                        {/*<Button type='warning' onClick={this.handleSubmit.bind(this)}>再次申请退款</Button>*/}
                        {content}
                    </List>
                </div>
            );
        }else{
            return "";
        }

    }
}
export default RefundFooter;
