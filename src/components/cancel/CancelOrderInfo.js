/**
 * Created by huozhenguang on 2018/1/16.
 */
import React from 'react';
import {Button,WhiteSpace} from 'antd-mobile';



class CancelOrderInfo extends React.Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		this.props.dispatch({
			type:"confirmOrder/JumpToHome",
			payload:{}
		});
	}

    render() {
    
        return ( 
        	<div style={{paddingTop:'20px'}}>
        	 <WhiteSpace />
        	 <div style={{background:'#fff',textAlign:'center'}}>
        	 	<p><img src="/src/assets/public/yes@2x.png" style={{width:'30%',margin:'40px'}}/></p>
        	 	<p style={{fontSize: '24px', color: '#ff0000',padding: '0',margin: '0'}}>订单已取消</p>
        	 	<p style={{margin:'15px',height:'1px',borderBottom: '1px dashed #ddd',}}></p>
        	 	<p style={{padding:'30px',lineHeight:'24px',textAlign:'center'}}>订单金额已返回至您的白条额度，请在【我的】--【我的白条】进行查看。</p>
        	 	<Button style={{margin:'15px'}} type="warning" onClick={this.handleClick}>重新购买商品</Button>
			 </div>
          		
            
        </div>
        );
    }
}


export default CancelOrderInfo;