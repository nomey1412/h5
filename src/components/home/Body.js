/**
 * Created by huozhenguang on 2018/1/10.
 */
import React from 'react';
import {Grid} from 'antd-mobile';
import "../../components/address/Adress.less"


class Body extends React.Component {

    state = {}

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        this.props.dispatch({
            type: 'home/queryDetailNext',
            payload: {
                goods_id: e.goodsId
            }
        });
    }

    render() {
        if (this.props.goodsList.length > 0) {
            return (
                <div style={{marginTop: '8px',maxHeight:'450px',overflow:'scroll'}}>

                    <Grid data={this.props.goodsList}
                          itemStyle={{height: '180px', width: "50px"}}
                          onClick={this.handleClick}
                          activeStyle={false}
                          columnNum={2}
                          renderItem={dataItem => (
                              <div style={{padding: '15px'}}>
                                  <img src={dataItem.goodsUrl} style={{width: '110px'}} alt=""/>
                                  <div style={{color: '#888', marginTop: '12px'}}>
                                      <p style={{
                                          margin: 0,
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis"
                                      }}>{`${dataItem.name}`}{dataItem.description}</p>
                                      <span style={{
                                          display: 'block',
                                          marginTop: '5px',
                                          color: 'red'
                                      }}>¥{dataItem.price / 100}.00</span>
                                  </div>
                              </div>
                          )}
                    />
                </div>
            );
        } else {
            return "";
        }
    }
}

export default Body;