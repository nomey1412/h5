/**
 * Created by huozhenguang on 2018/1/13.
 */
import React from 'react';
import styles from './confirmOrder.less';
import {Card} from 'antd-mobile';

class Body extends React.Component {
    state = {
       // minNum: 1
    }

    constructor() {
        super();
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleMinusClick = this.handleMinusClick.bind(this);

    }

    handleAddClick(totalNum,e) {
        this.props.dispatch({
            type: 'confirmOrder/add',
            payload: {
                minNum: parseInt(totalNum) + 1
            }
        });
    }

    handleMinusClick(totalNum,e) {
        this.props.dispatch({
            type: 'confirmOrder/minus',
            payload: {
                minNum: parseInt(totalNum) - 1
            },
        });
    }

    render() {
        // if (this.props.goodsType && this.props.goodsType == 1) { //1 实物 2 虚拟商品
        return (
            <div>
                {this.props.goodsType && this.props.goodsType == 2 ? <div style={{overflow: 'hidden'}} className={styles.margin_left_0}>
                    <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title="购买数量"
                            extra={<span className={styles.p_span} style={{float: 'right'}}> <a
                                className={styles.a_style} onClick={this.handleMinusClick.bind(this,this.props.totalNum)}><img
                                className={styles.sub_img}
                                src="./src/assets/public/less.png"
                                alt=""/></a> <a className={styles.a_style}>{this.props.totalNum}</a><a
                                className={styles.a_style} onClick={this.handleAddClick.bind(this,this.props.totalNum)}><img
                                className={styles.sub_img}
                                src="./src/assets/public/more.png"
                                alt=""/></a>
                     </span>}
                        />
                    </Card>

                </div>: ""}

                <div>
                    <Card full style={{
                        marginTop: '20px',
                        borderTop: '0.5px solid #ddd',
                        borderBottom: "0.5px solid #ddd"
                    }}>
                        <Card.Header
                            title={<span className={styles.p_span} style={{paddingLeft: '0px'}}>优惠券：暂无可用</span>}
                            extra={<span></span>}
                        />
                    </Card>
                </div>
                <div>
                    <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title="商品合计"
                            extra={<span className={styles.p_span} //this.state.minNum === 0 ? this.props.price / 100 : this.props.price / 100 * this.props.goodsMaxNum
                                         style={{
                                             color: '#ff0000',
                                             float: 'right'
                                         }}>¥{this.props.totalPrice / 100}.00
                            </span>}
                        />
                    </Card>
                </div>
                <div>
                    <Card full>
                        <Card.Header
                            title="运费"
                            extra={<span className={styles.p_span}
                                         style={{float: 'right'}}>¥{this.props.freight}.00</span>}
                        />
                    </Card>
                </div>
                <div>
                    <Card full style={{marginTop: '20px'}}>
                        <Card.Header
                            title={<div>
                                <p style={{float: "left"}}> 支付方式 </p>
                                <p style={{float: "left", paddingLeft: '20px', color: '#666'}}>白条支付</p>
                            </div>}
                            extra=""
                        />
                    </Card>
                </div>
                  <div>
                    <Card full>
                        <Card.Header
                            title={<div>
                                <p style={{float: "left"}}> 剩余白条额度 </p>
                                <p style={{float: "left", paddingLeft: '20px', color: '#ff0000'}}>¥{(this.props.mineIous - this.props.totalPrice) / 100}.00</p>
                            </div>}
                            extra=""
                        />
                    </Card>
                </div>

            </div>)
        // }
    }


}

export default Body;