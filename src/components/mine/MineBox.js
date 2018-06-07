/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

class MineBox extends React.Component{

    state = {}
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(argv,e){
        this.props.dispatch({
            type: 'mine/queryNext',
            payload: {
                type:argv // 1 白条消费账单 2 我的订单
            }
        });
    }

    render(){
        return(
            <div style={{ height:'100px',width:'100%',overflow:'hidden',background:'#fff'}}>
                <div style={{ float:'left',width:'49%',textAlign:'center',marginTop:'15px',borderRight:'1px solid #ccc'}} onClick={this.handleClick.bind(this,1)}>
                    <span style={{display:'block'}}><img style={{width:'25%'}} src="./src/assets/public/ic_me_zhangdan.png"/></span>
                    <span style={{display:'block',fontSize:'14px',color:'#333333'}}>白条消费账单</span>
                    <span style={{display:'block',color:'#FF0000'}}>{this.props.iousBills != 0 ? "待还"+`${this.props.iousBills / 100}`+".00元" : ""}</span>
                </div>
                <div style={{ float:'left',width:'50%',textAlign:'center',marginTop:'15px'}} onClick={this.handleClick.bind(this,2)}>
                        <span style={{display:'block'}}><img  style={{width:'25%'}} src="./src/assets/public/ic_me_dingdan.png"/></span>
                        <span style={{display:'block',fontSize:'14px',color:'#333333'}}>我的订单</span>
                </div>
            </div>
        );
    }
}

export default MineBox;