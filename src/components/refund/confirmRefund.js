/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {List, Button, InputItem, Checkbox, Toast, Flex, Modal} from 'antd-mobile';
import React, {Component} from 'react';
import styles from './refund.css';
import './Grefund.less';

const AgreeItem = Checkbox.AgreeItem;
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;

class ConfirmRefund extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    clock = '';
    state = {
        verifyText: '更换银行卡',
        second: 60,
        disable: false,
        checkStatus: true, // 未选中
        modal1: false
    };

    onChange = (value) => {
        this.setState({
            value,
        });
    }

    showModal = key => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onHandleSubmit = key => (orderId, consumeAmount, consumeBlank, consumeBlankCard) => {
        if (!this.state.checkStatus) {
            Toast.info('请阅读相关协议');
            return;
        }
        this.props.dispatch({
            type: 'confirmRefund/queryNext',
            payload: {
                verifCode: this.state.value,
                orderId: orderId,
                consumeAmount: consumeAmount,
                consumeBlank: consumeBlank,
                consumeBlankCard: consumeBlankCard
            }
        });
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

    handleClick(e) { // 跳转银行卡页面
        this.props.dispatch({
            type:'confirmRefund/JumpToAddBank',
            payload:{
                type : 2 // 更换银行卡
            }
        });
    }

    render() {
        if (this.props.amount) {
            return (
                <div>
                    <div className="tsd_confirm_refund">
                        <div className={styles.headerDiv}/>
                        <div className={styles.refundDiv}>
                            <p className={styles.refundMoney}>{this.props.amount / 100}.00</p>
                            <p className={styles.tips}>退款金额(元)</p>
                        </div>
                        <div className={styles.headerDiv}/>
                        <List>
                            <Item extra={this.props.bankName}>开户银行</Item>
                            <Item extra={this.props.cardNum}>银行卡号</Item>

                            <Button type='' className={styles.verifyCss}
                                    onClick={this.handleClick}>{this.state.verifyText}</Button>
                        </List>
                    </div>
                    <div className="tsd_confirm_refund_footer">
                        <Flex>
                            <Flex.Item>
                                <AgreeItem data-seed="logId" onChange={this.handleChange}
                                           checked={this.state.checkStatus}>
                                    本人已同意<a style={{color: "#feaa3e"}} href={this.props.moneyUrl}>《借款协议》</a>
                                    {/*<a style={{color:"#feaa3e"}} href={this.props.shopUrl}>《购物协议》</a>*/}
                                    {/*<a style={{color:"#feaa3e"}} onClick={this.handleShopClick}>《购物协议》</a>*/}
                                </AgreeItem>
                            </Flex.Item>
                        </Flex>
                        <List>
                            <p className={styles.tips2}>退款时，按照协议收取违约金</p>
                            <Button type='warning' onClick={this.showModal('modal1')}>确认退款</Button>
                        </List>
                    </div>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={true}
                        onClose={this.onClose('modal1')}
                        title=""
                        footer={[{
                            text: '确定', onPress: () => {
                                this.onClose('modal1')();
                                this.onHandleSubmit('modal1')(this.props.orderId, this.props.amount, this.props.bankName, this.props.cardNum);
                            }
                        }]}
                        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div style={{height: 60, overflow: 'scroll', textAlign: 'center'}}>
                            商家将根据相关协议依法扣除{this.props.wastageMoney / 100}元的商品损耗费<br />
                        </div>
                    </Modal>

                </div>
            );
        } else {
            return "";
        }

    }
}
export default ConfirmRefund;
