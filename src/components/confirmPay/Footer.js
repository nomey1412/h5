/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';

import {Card, List, Checkbox, Flex} from 'antd-mobile';
import styles from './confirmPay.less';
import ResultButtonComponent from '../confirmPayResult/ResultButton';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
class Footer extends React.Component {
    state = {}

    render() {
        return (
            <div className="tsd_footer">
                <CheckboxItem key={0.1} style={{background:'transparent'}}>{`本人已同意 《借款协议》 《购物协议》`}
                </CheckboxItem>
                <div style={{width:'80%',margin:'0 10%'}}>
                    <ResultButtonComponent  />
                </div>
                {/*共用组件*/}
        </div>);
    }
}

export default Footer;