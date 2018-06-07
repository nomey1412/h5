import React from 'react';
import {List, Button} from 'antd-mobile';
import  './White.less'


const Item = List.Item;
const Brief = Item.Brief;
class WhiteCenter extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    state = {
        disabled: false,
    }
    handleClick(e){
        this.props.dispatch({
            type:'white/repay',
            payload:{
                consumeId:this.props.consume_id
            }
        });
    }
    render() {
        if(this.props.consume_id){
            return (<div>
                <List style={{ backgroundColor: 'white'}}>
                    <List.Item
                        extra={<Button type="warning" size="small" inline onClick={this.handleClick}>立即还款</Button>}
                        multipleLine
                    >
                        消费{this.props.spendMoney / 100}.00元
                        <List.Item.Brief>
                            {this.props.spendDate}
                        </List.Item.Brief>
                    </List.Item>
                </List>
            </div>);
        }else{
            return "";
        }

    }

}

export default WhiteCenter;