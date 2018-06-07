/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import {Button, WhiteSpace, WingBlank, List} from 'antd-mobile';

import styles from './ResultButton.less';

class ReturnHome extends React.Component {
    state = {}

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.dispatch({
            type: 'confirmPayResult/changeHome',
            payload: {}
        });
    }

    render() {
        return (
            <div style={{width: '80%', margin: '0 10%'}}>
                <List style={{margin: '30px 0'}}>
                    <Button type="warning" style={{
                        background: "transparent",
                        border: '1px solid #ff5353',
                        color: '#ff5353',
                        borderRadius: '4px'
                    }} onClick={this.handleClick}>返回商城首页</Button>

                </List>
            </div>
        );
    }
}
export default ReturnHome;