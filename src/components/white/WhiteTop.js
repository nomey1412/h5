import React from 'react';
import  './White.less';
import { Modal, List, Button, Card,WhiteSpace, WingBlank } from 'antd-mobile';

class WhiteTop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal1: false,
            modal2: false,
        };
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    render() {
        if(this.props.consume_id){
            return (<div>
                <div>
                    <WhiteSpace size="lg"/>
                    <Card full>
                        <Card.Body>
                            <div className="tsd_white_float">
                                {this.props.overdueDays != 0 ? <p className="red">
                                    <span className="font-size-24">{this.props.overdueDays}</span>天
                                </p>:<p style={{marginTop:'0px'}}>
                                    <span className="font-size-24">{this.props.iousRepayMonth}</span>月
                                    <span className="font-size-24">{this.props.iousRepayDay}</span>日
                                </p>}
                                {this.props.overdueDays != 0 ? "逾期天数" :"还款日期" }

                            </div>
                            <div className="tsd_white_float">
                                <p style={{marginTop:'0px'}}  className={ this.props.overdueDays != 0 ? "red" : ""}>
                                    <span className="font-size-24">{this.props.iousBills / 100}</span>元
                                </p>
                                <p>应还款总金额 <span className="question" onClick={this.showModal('modal1')}>
                                    <img src="./src/assets/white/ic_danger_money.png" alt=""/></span>
                                </p>
                            </div>
                        </Card.Body>

                    </Card>
                </div>
                    {/*弹出模态框*/}
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('modal1')}
                        title=""
                        footer={[{ text: '确定', onPress: () => { this.onClose('modal1')(); } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div style={{ height: 100 }}>
                            {
                                this.props.dialog_list.map((item , i) =>{
                                    return (
                                        <div style={{margin:'15px 0'}} key={i}>
                                            <span style={{ display:'block'}}>{item.title}&nbsp;{`:`}&nbsp;{item.value}</span>
                                        </div>
                                    );

                                })
                            }
                        </div>
                    </Modal>
            </div>);
        }else {
            return "";
        }

    }

}

export default WhiteTop;

//className="red"