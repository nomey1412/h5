/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

class GoodsDetailDescription extends React.Component{

    state = {}

    render(){
        return (
            <div style={{ height:"51px"}}>
                <p style={{ marginLeft:'15px',marginTop:'15px',fontSize:'15px',color:'#333333' }}>{this.props.name} {this.props.description}</p>
                <p style={{ color:'#FF0000',fontSize:'20px',marginLeft:'15px',marginTop:'20px',marginBottom:'32px'}}>¥{this.props.price / 100}.00</p>
            </div>
        );
    }
}

export default GoodsDetailDescription;