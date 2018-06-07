import React from 'react';
import {List, Button} from 'antd-mobile';
import  './White.less'


const Item = List.Item;
const Brief = Item.Brief;
class WhiteBottom extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        if (this.props.orderHistory.length > 0) {
            return (<div>
                <List renderHeader={() => '历史账单'}>
                    {
                        this.props.orderHistory.map((item, i) => {
                            let orderStatus;
                            switch (parseInt(item.orderStatus)){
                                case 0:
                                    orderStatus = "没有审核";
                                    break;
                                case 1:
                                    orderStatus = "没有审核";
                                    break;
                                case 2:
                                    orderStatus = "审核通过";
                                    break;
                                case 3:
                                    orderStatus = "放款成功";
                                    break;
                                case 4:
                                    orderStatus = "人工拒绝";
                                    break;
                                case 5:
                                    orderStatus = "放款失败";
                                    break;
                                case 6:
                                    orderStatus = "放款中";
                                    break;
                                case 7:
                                    orderStatus = "已结清";
                                    break;
                                case 8:
                                    orderStatus = "提交还款";
                                    break;
                                case 9:
                                    orderStatus = "决策执行失败";
                                    break;
                                case 10:
                                    orderStatus = "订单取消";
                                    break;
                                case 11:
                                    orderStatus = "老订单审核通过";
                                    break;
                                case 12:
                                    orderStatus = "还款失败";
                                    break;
                                default:
                                    orderStatus = "";
                                    break;
                            }
                            return (
                                <div key={i}>
                                <List.Item
                                    extra={orderStatus}
                                    multipleLine
                                >
                                    消费{item.spendMoney/100}.00元
                                    <List.Item.Brief>
                                        {item.spendDate}
                                    </List.Item.Brief>
                                </List.Item>
                                </div>
                            );
                        })

                    }

                </List>
            </div>);
        }else{
            return "";
        }
    }

}

export default WhiteBottom;