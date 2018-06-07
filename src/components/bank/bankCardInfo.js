/**
 * Created by fengxiangfei on 2018/2/6.
 */

import React from 'react';
import {connect} from 'dva';

import { List,Card, WingBlank,Modal, Button, WhiteSpace, Toast } from 'antd-mobile';
import './bank.less';
const Item = List.Item;

const Brief = Item.Brief;
var Height ={
    height:'70px',
    color:'#666'
}

const alert = Modal.alert;

class BankCardInfo extends React.Component{

    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleCancelBank = this.handleCancelBank.bind(this);
    }

    handleClick(e){
        this.props.dispatch({
            type:'bankCard/JumpAddBand',
            payload:{
                type:1 // 1 增加银行卡
            }
        });
    }
    handleCancelBank = (card_id) =>{
        this.props.dispatch({
            type:'bankCard/cancelBank',
            payload:{
                card_id:card_id
            }
        });
    }

    render(){
        if(!this.props.card_id){
            return (
                <div className="tsd_bank_info" style={{ padding: '15px' }} onClick={this.handleClick.bind(this)}>
                    <List className="my-list">
                        <Item style={Height} extra={''}><img src="/src/assets/public/Addto@2x.png" style={{verticalAlign:'top',marginRight:'10px'}} />添加银行卡</Item>
                    </List>
                </div>
            );
        }else{
            return (
                <div className="tsd_bank_info" style={{ padding: '15px' }}>
                    <Card style={{ marginTop: '10px' }}>
                        <Card.Header
                            title={<span style={{fontSize:'16px'}}>{this.props.card_name}</span>}
                            thumb={this.props.card_logo}
                            extra={<span style={{padding:'3px 10px',border:'1px solid #ddd',borderRadius:"10px",fontSize:'12px'}} onClick={() => alert('', '您确定解除绑定尾号为'+this.props.card_num.substr(-4)+'的银行卡吗', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                {
                                    text: '确定',
                                    onPress: () => this.handleCancelBank(this.props.card_id),
                                },
                            ])}>解除绑定</span>}
                        />
                        <Card.Body>
                            <div style={{textAlign:'right',fontSize:'26px',fontWeight:'bold'}}>**** **** **** {this.props.card_num.substr(-4)} </div>
                        </Card.Body>

                    </Card>

                </div>
            );
        }
    }
}
export default BankCardInfo;

