/**
 * Created by huozhenguang on 2018/1/13.
 */
import React from 'react';
import styles from './confirmOrder.less';

class Detail extends React.Component {
    state = {}

    render() {
        if (this.props.goodsType) {
            return (
                <div className={styles.tsd_side}>
                    <div className="p_style1">
                        <span className={`${styles.center} ${styles.span_left}`}><img className={styles.Img} style={{
                            width: '70%',
                            padding: '10px'
                        }} src={this.props.goodsImage}/></span>
                        <span className={styles.span_right}>
                        <a>{this.props.goodsDesc}</a>
                         <b className={styles.price}>¥{this.props.price / 100}.00</b>
                    </span>
                    </div>
                </div>
            );
        } else if (this.props.orderPayStatus) {
            return (
                <div>
                    <div className="p_style1"
                         style={{borderTop: '1px solid #c8c8c8'}}><img
                        className={styles.tips_img} src="./src/assets/public/icon_prompt.png" alt=""/>
                        <span style={{ fontSize:'13px'}}>您可以在当前页面或我的页面点击我的订单申请退款</span>
                    </div>
                    <div className="p_style1">
                    <span className={`${styles.center} ${styles.span_left}`}>< img className={styles.Img} style={{
                        width: '46%',
                        border: '1px solid #c8c8c8',
                        padding: '10px'
                    }} src={this.props.goodsImage}/></span>
                        <span className={styles.span_right}>
                        <a>{this.props.goodsDesc}</a >
                        <b className={styles.price}>¥{this.props.price / 100}.00 <span
                            className={styles.tips_success}>{this.props.orderPayStatus}</span></b>

                    </span>

                    </div>
                    <div className="p_style1"
                         style={{textAlign: 'right', color: '#ff0000'}}>{this.props.logisticStatus}</div>


                </div>

            );
        } else {
            return "";
        }

    }
}

export default Detail;