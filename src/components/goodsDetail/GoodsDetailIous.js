/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';

class GoodsDetailIous extends React.Component{

    state = {}

    render(){
        return (
            <div style={{ marginTop:'40px'}}>
                <p style={{padding:'10px',background:'#fff',lineHeight:'30px'}}><span style={{color:'#ccc',paddingRight:'5px'}}>白条</span>{this.props.iousDesc}</p>
            </div>
        );
    }
}

export default GoodsDetailIous;