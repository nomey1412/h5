/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

var lineStyle = {
    padding: '0px 0px 0px 10px',
    display: 'block',
    float: 'left'
}
var imgStyle = {
    verticalAlign: 'middle',
    float: 'right',
    padding: '15px',
    width: '13px',
    // marginTop: '5px'
}
var pStyle = {
    margin: '0',
    height: '50px',
    lineHeight: '50px',
    fontSize: '14px',
    background: '#fff',
    borderBottom: '1px solid #ccc',
    overflow:'hidden',
    width:'100%'

}

class MineBody extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {}

    handleClick(argv, e) { // 2 一件重复购买 3 优惠券 4 退出
        this.props.dispatch({
            type: 'mine/queryJump',
            payload: {
                type: argv
            }
        });
    }

    render() {
        return (
            <div style={{height: '382px', marginTop: '10px', "overflow": 'scroll'}}>
                <p style={pStyle}>
                    <span style={lineStyle}><img style={{verticalAlign: 'middle', width: '66%'}}
                                                 src="./src/assets/public/baitiao@2x.png"/></span>
                    <span style={lineStyle}>我的白条</span>
                    <span style={{
                        color: 'red',
                        float: 'right',
                        fontSize: '14px',
                        margin: '0 27px 0 0'
                    }}>{this.props.mineIous / 100}元可用</span>
                </p>
                <p style={pStyle} onClick={this.handleClick.bind(this,6)}>
                    <span style={lineStyle}><img style={{verticalAlign: 'middle', width: '66%'}}
                                                 src="./src/assets/public/card@2x.png"/></span>
                    <span style={lineStyle}>我的银行卡</span>

                    <span><img style={imgStyle} src="./src/assets/public/ic_arraw_right2.png"/></span>
                </p>
                <p style={{
                    height: '50px',
                    lineHeight: '50px',
                    fontSize: '14px',
                    background: '#fff',
                    borderBottom: '0 none',
                    textAlign: 'center',
                    marginTop:'0px',
                    marginBottom:'0px'
                }} onClick={this.handleClick.bind(this, 2)}>
                    <span style={lineStyle}><img style={{verticalAlign: 'middle',width: '66%'}}
                                                 src="./src/assets/public/Button@2x.png"/></span>
                    <span style={lineStyle} >一键重复购买</span>
                    <span><img style={imgStyle} src="./src/assets/public/ic_arraw_right2.png"/></span>
                </p>
                 <p style={{marginTop:'10px',height: '50px',marginBottom:'0px',
    lineHeight: '50px',
    fontSize: '14px',
    background: '#fff',
    borderBottom: '1px solid #ccc',
    overflow:'hidden',
    width:'100%'}} onClick={this.handleClick.bind(this, 3)}>
                    <span style={lineStyle}><img style={{verticalAlign: 'middle',width: '66%'}}
                                                 src="./src/assets/public/juan@2x.png"/></span>
                    <span style={lineStyle} >认证项</span>
                    <span style={{float: 'right', lineHeight: '61px', color: '#ff0000'}}>{this.props.couponsNum}张<img
                        style={imgStyle} src="./src/assets/public/ic_arraw_right2.png"/></span>
                </p>
                  <p style={{
                    height: '50px',
                    lineHeight: '50px',
                    fontSize: '14px',
                    background: '#fff',
                    borderBottom: '0 none',
                    textAlign: 'center',
                    marginTop:'0px',
                    marginBottom:'0px'
                }} onClick={this.handleClick.bind(this, 5)}>
                    <span style={lineStyle}><img style={{verticalAlign: 'middle',width: '66%'}}
                                                 src="./src/assets/public/phone@2x.png"/></span>
                    <span style={lineStyle} >帮助中心</span>
                    <span style={{float: 'right', lineHeight: '61px', color: '#ff0000'}}><img
                        style={imgStyle} src="./src/assets/public/ic_arraw_right2.png"/></span>
                </p>

             



                <p style={{
                    height: '50px',
                    lineHeight: '50px',
                    fontSize: '14px',
                    background: '#fff',
                    borderBottom: '0 none',
                    textAlign: 'center'
                }} onClick={this.handleClick.bind(this, 4)}>

                    <span style={{fontSize: '14px', color: '#333333', lineHeight: '50px'}}>退出登录</span>
                </p>

            </div>
        );
    }
}

export default MineBody;