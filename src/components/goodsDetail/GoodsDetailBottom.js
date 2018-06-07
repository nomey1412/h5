/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

class GoodsDetailBottom extends React.Component{

    state = {

    }
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(this.props.attribute){ // 商品类型
            this.props.dispatch({
                type:'goodsDetail/queryNext',
                payload:{
                    goodsId:this.props.id,
                    goodsType:this.props.attribute
                }
            });
        }else if(this.props.goodsType){
            this.props.dispatch({
                type:'confirmOrder/queryNextConfirm',
                payload:{
                    goodsType:this.props.goodsType,
                    goodsNum:this.props.totalNum + 1, // 真实物品 是 1 虚拟物品是实际数量
                    totalPrice:this.props.totalPrice,
                    freight:this.props.freight,
                    addressId:this.props.addressId
                }
            });
        }else{
            console.log('wwwwwwwww');
        }
    }

    render(){
        if(this.props.attribute || this.props.goodsType){
            return (
                <div style={{position:'fixed',bottom:'0',left:'0',background:'#fff',height:'60px',width:'100%',fontSize:'16px'}}>
                    <span style={{width:'60%',textAlign:'center',fontWeight:'bold',float:'left',height:'60px',lineHeight:'60px',background:'#fff',color:'#000'
                    }}>{this.props.goodsType ? '应付：¥'+this.props.totalPrice/100+'.00' : '信用0元购'}</span>
                    <span style={{ background:'#ff5353',width:'40%',display:'block',float:'left',height:'60px',lineHeight:'60px',textAlign:'center',color:'#fff'}} onClick={this.handleClick}>{this.props.goodsType ? '去付款' : '立即购买'}</span>

                </div>
            );
        }else{
            return "";
        }
    }
}

export default GoodsDetailBottom;