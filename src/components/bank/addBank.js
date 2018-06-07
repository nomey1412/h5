/**
 * Created by fengxiangfei on 2018/2/6.
 */

import React from 'react';
import {connect} from 'dva';
import { Toast } from 'antd-mobile';


import {List, Card, WingBlank, WhiteSpace, Picker, InputItem, Button} from 'antd-mobile';
import './bank.less';

import {createForm} from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import {district, provinceLite} from 'antd-mobile-demo-data';
import './bank.less';

const Item = List.Item;
const Brief = Item.Brief;
var Height = {
    height: '70px',
    color: '#666'
}
var maegin_left_50 = {
    padding: '0 15px'
}


const typeProps = {
    mobile: 'mobile',
    verify: 'verify',
    card_num: 'card_num',
    username:'username'
};
function failToast(msg) {
    Toast.fail(msg, 1);
}

function checkMobile(mobile) {
    const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!mobile || mobile.length < 11 || !(re.test(mobile.replace(/\s/g, '')))) {
        failToast('请输入正确的手机号');
        return false;
    } else {
        return true;
    }
}

function checkUserName(username) {
    if(username.length < 2){
        failToast('请输入正确的持卡人姓名');
        return false;
    }else{
        return true;
    }
}

function checkBank(bank_id) {
    if(bank_id === ''){
        failToast('请选择开户银行');
        return false;
    }else{
        return true;
    }
}

function checkArea(province_id,city_id,country_id) {
    if(province_id === 0
        || city_id === 0
        || country_id === 0
        || typeof province_id =='undefined'
        || typeof city_id === 'undefined'
        || typeof country_id === 'undefined'){
        failToast('请选择省市区');
        return false;
    }else{
        return true;
    }
}

function checkCardNum(card_num) {
    if(card_num === ''){
        failToast('请填写正确的银行卡号');
        return false;
    }else{
        return true;
    }
}

function checkVerify(code) {
    if(code === '' || code.length != 6){
        failToast('请输入正确的验证码');
        return false;
    }else {
        return true;
    }
}
class bankCardInfo extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleVerifyClick = this.handleVerifyClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        verifyText: '获取验证码',
        second: 60,
        disable: false,
        checkStatus: true,
        bank_id: '',
        pickerValue1: [],
        pickerValue: [],
        cols:3,
        asyncValue: [],
        province_id:0,
        city_id:0,
        country_id:0,
        card_num:'',
        mobile:'',
        verify:'',
        username:'',
        visible:false
    }


    onPickerChange = (val) => {
        this.props.dispatch({
            type: 'addBank/city',
            payload: {
                provinceId: val[0],
                cityId: val[1] ? val[1] : 0,
                data: this.props.data
            }
        });

        let colNum;
        const d = [...this.props.data];
        const asyncValue = [...val];
        colNum = 3;
        this.setState({
            data:d,
            cols: colNum,
            asyncValue,
        });

    };

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

    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        //return treeChildren.map(v => v.label).join(',');
        return 123;
    }

    handleChange(type, e) {
        if (type === 'mobile') {
            this.setState({mobile: e});
        }
        if (type === 'card_num') {
            this.setState({card_num: e});
        }
        if (type === 'verify') {
            this.setState({verify: e});
        }
        if(type === 'username'){
            this.setState({username:e});
        }
        //console.log(this.state);
    }

    handleVerifyClick(e){
        if(!checkUserName(this.state.username))return;
        if(!checkBank(this.state.bank_id))return;
        if(!checkArea(this.state.asyncValue[0],this.state.asyncValue[1],this.state.asyncValue[2]))return;
        if(!checkCardNum(this.state.card_num))return;
        if(!checkMobile(this.state.mobile))return;
        if(!this.state.disable) { // 可以点击
            this.setState({
                disable:false
            });
            this.clock = setInterval(this.dropSecond, 1000);
            this.props.dispatch({
                type: 'addBank/bindCardSendSms',
                payload: {
                    card_user_name: this.state.username, // 持卡人
                    bank_id:this.state.bank_id, // 银行卡ID
                    card_num:this.state.card_num, // 卡号
                    reserved_mobile:this.state.mobile // 手机号
                }
            });
        }
    }

    handleClick(e) {
        if(!checkUserName(this.state.username))return;
        if(!checkBank(this.state.bank_id))return;
        if(!checkArea(this.state.province_id,this.state.city_id,this.state.country_id))return;
        if(!checkCardNum(this.state.card_num))return;
        if(!checkMobile(this.state.mobile))return;
        if(!checkVerify(this.state.verify))return;
        this.props.dispatch({
            type:'addBank/saveBankCard',
            payload:{
                card_user_name: this.state.username, // 持卡人
                bank_id:this.state.bank_id, // 银行卡ID
                card_num:this.state.card_num, // 卡号
                reserved_mobile:this.state.mobile, // 手机号
                province_id:this.state.province_id,
                city_id:this.state.city_id,
                verify_code:this.state.verify,
                bind_type:1 // 添加银行卡
            }
        });
    }

    render() {
        return (
            <div>
                <div className="inputStyle">

                    <InputItem clear onChange={this.handleChange.bind(this,typeProps.username)}>持卡人</InputItem>
                </div>

                <List style={{backgroundColor: 'white'}} className="picker-list">

                    <Picker extra="请选择银行卡所属银行" data={this.props.bank_list}
                            title=""
                            cols={1}
                            value={this.state.pickerValue1}
                            onOk={e => this.setState({bank_id: e[0]})}
                            onChange={v => this.setState({pickerValue1: v})}
                    >
                        <List.Item arrow="down">开户银行</List.Item>
                    </Picker>
                    <Picker extra="请选择开户行所在省市" data={this.props.data}
                            title=""
                            visible={this.state.visible}
                            value={this.state.asyncValue}
                            onChange={v => this.setState({ asyncValue: v })}
                            onOk={e => this.setState({province_id:e[0],city_id:e[1],country_id:e[2],visible:false})}
                            cols={this.state.cols}
                            onPickerChange={this.onPickerChange}
                    >
                        <List.Item arrow="down"
                                   extra={this.getSel()}
                                   onClick={() => this.setState({ visible: true })}
                        >
                            开户行省／市
                        </List.Item>
                    </Picker>


                </List>
                <div className="inputStyle">

                    <InputItem clear placeholder="请输入您的银行卡号" onChange={this.handleChange.bind(this,typeProps.card_num)}>银行卡号</InputItem>
                </div>
                <div className="inputStyle">

                    <InputItem clear placeholder="请输入手机号" onChange={this.handleChange.bind(this,typeProps.mobile)}>手机号</InputItem>
                </div>


                <div className="inputStyle">

                    <InputItem placeholder="请输入验证码" onChange={this.handleChange.bind(this,typeProps.verify)} extra={<span style={{
                        color: '#ff5b05',
                        borderLeft: '1px solid #ccc',
                        paddingLeft: '10px'
                    }} onClick={this.handleVerifyClick}>{this.state.verifyText}</span>}><span >验证码</span></InputItem>


                </div>
                <Button style={{margin: '15px'}} type="warning" onClick={this.handleClick.bind(this)}>提交</Button>


            </div>
        );
    }

}


bankCardInfo.propTypes = {};


export default bankCardInfo;

