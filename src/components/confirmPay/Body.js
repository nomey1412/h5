/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';

import styles from './confirmPay.less';
import {Card, InputItem,Flex,List,Button,Toast,Checkbox} from 'antd-mobile';

const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;



class Body extends React.Component {
    state = {
        verifyText:'获取验证码',
        second:60,
        disable:false,
        checkStatus:true
    }
    clock = '';
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    dropSecond = () =>{
        let newSecond = 0;
        newSecond = this.state.second -1;
        if(newSecond > 0){
            this.setState({
                verifyText:newSecond+'s',
                disable:true,
                second:newSecond
            });
        }else{
            clearInterval(this.clock);
            this.setState({
                verifyText:'重新获取',
                disable:false,
                second:60
            });
        }
    };

    handleClick(e){ //获取验证码
        if(!this.state.disable) { // 可以点击
            this.setState({
                disable:false
            });
            this.clock = setInterval(this.dropSecond, 1000);
            this.props.dispatch({
                type: 'confirmPay/sendVerifyCode',
                payload: {
                    type: 11, // 付款确认验证码类型
                }
            });
        }
    }

    handleChange(e) {
        if (this.state.checkStatus) {
            this.setState({
                checkStatus: false
            });
        } else {
            this.setState({
                checkStatus: true
            });
        }
    }

    onChange = (value) => {
        this.props.dispatch({
            type:'confirmPay/getVerifyCode',
            payload:{
                verifyCode:value
            }
        });
    }
    render() {
        return (
            <div className="tsd_confirmpay_body">
                <div style={{overflow: 'hidden'}}>
                    <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title={<span className={styles.p_span} style={{margin: '0 10px'}}>支付方式 <i style={{fontStyle:'normal',marginLeft:'20px',color:'#666'}}>西瓜白条</i></span>}
                            extra=""
                        />
                    </Card>
                </div>
                <div>
                    <InputItem placeholder="请输入验证码" onChange={this.onChange}  extra={<span style={{
                        color: '#ff5b05',
                        borderLeft: '1px solid #ccc',
                        paddingLeft: '10px'
                    }} onClick={this.handleClick}>{this.state.verifyText}</span>}><span style={{margin: '0 10px'}}>验证码：</span></InputItem>
                </div>
                <div className="tsd_confirm_refund_footer">
                    <Flex>
                        <Flex.Item>
                            <AgreeItem data-seed="logId" onChange={this.handleChange}
                                       checked={this.state.checkStatus}>
                                本人已同意<a style={{color: "#feaa3e"}} href={this.props.moneyUrl}>《借款协议》</a>
                                {/*<a style={{color:"#feaa3e"}} onClick={this.handleShopClick}>《购物协议》</a>*/}
                            </AgreeItem>


                        </Flex.Item>

                    </Flex>

                </div>


            </div>
        );
    }
}

export default Body;