import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import './GcouponList.less';
import styles from './couponList.css';
import Crice from '../crice'
class CouponFooterLayout extends React.Component {
    render() {
        return (
            <div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg"/>
                    <Card>
                        <Card.Header title="新手免息券"  extra={<Crice/>}/>
                        <Card.Footer content="非逾期用户可用" extra={<div>满500元可用</div>}/>
                        <Card.Body>
                            <div>有效期:2017-11-21至2017-11-20</div>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size="lg"/>

                </WingBlank>
            </div>

        )
    }

}

export default CouponFooterLayout;