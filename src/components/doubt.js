import React from 'react';
import { Modal } from 'antd-mobile';


class doubt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false,
        };
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
            second:false
        });
    }

    render() {
        return (<div>
                <div onClick={this.showModal('modal1')}>
                    <span>{this.props.consume_amount / 100}元</span>
                 <img src="./src/assets/white/ic_danger_money.png"
                     alt=""/>
                </div>
            <div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title=""
                    footer={[{ text: '确定', onPress: () => { this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 100}}>
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
            </div>
        </div>);
    }

}

export default doubt;