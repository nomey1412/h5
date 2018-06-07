/**
 * Created by huozhenguang on 2018/1/13.
 */
import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
class Address extends React.Component {
    state = {}

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch({
            type: 'confirmOrder/changeAddress',
            payload: {}
        });
    }

    render() {
        if (this.props.goodsType && this.props.goodsType == 1) { // 1 实物
            return (
                <div>
                {this.props.address ? <div className="tsd_add" onClick={this.handleClick}>
                    <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title={`${this.props.address} ${this.props.addressDetail}`} //${this.props.addressDetail} 详细地址
                            extra={<span><img src="./src/assets/public/ic_arraw_right2.png"/></span>
                            }
                        />
                    </Card>
                </div> :
                    <div onClick={this.handleClick}>
                <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title= {<span style={{marginTop:'5px',marginRight:'10px'}}><img src="./src/assets/public/address_icon.png"/>请输入收货地址</span>}
                            extra={<span><img src="./src/assets/public/ic_arraw_right2.png"/></span>
                            }
                        />
                    </Card>
                    </div>
            }
                </div>

            );
        } else {
            return "";
        }
    }
}

export default Address;