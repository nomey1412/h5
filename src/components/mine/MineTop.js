/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

class MineTop extends React.Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {}

    handleClick(e){
        if(!window.localStorage.getItem('mobile')){ // 跳转登陆页面
            this.props.dispatch({
                type:'mine/changeLogin',
                payload:{}
            });
        }
    }
    render(){
        return (
            <div style={{ height:'110px',background:'#28272F',overflow:'hidden'}} onClick={this.handleClick}>
                <p style={{margin:'20px 14px',overflow:'hidden'}}><span style={{display:'block',float:'left',width:'20%',marginRight:'10px'}}><img style={{ width:'100%'}} src="./src/assets/public/ic_me_user.png"/></span><span style={{ color:'#FFFFFF',display:'block',float:'left',fontSize:'18px',marginTop:'33px'}}>
                    { window.localStorage.getItem('mobile') ?
                        window.localStorage.getItem('mobile').substr(0,3)+'****'+window.localStorage.getItem('mobile').substr(-4) : '未登陆'
                    }
                </span></p>


            </div>
        );
    }
}

export default MineTop;