/**
 * Created by huozhenguang on 2018/1/16.
 */
import React from 'react';
import {Picker, List, WhiteSpace, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import {district, provinceLite} from 'antd-mobile-demo-data';
import './Adress.less'
import {  Toast } from 'antd-mobile';


// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{backgroundColor: '#fff', paddingLeft: 15}}
    >
        <div className="test" style={{display: 'flex', height: '45px', lineHeight: '45px'}}>
            <div style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>{props.children}</div>
            <div style={{textAlign: 'right', color: '#888', marginRight: 15}}>{props.extra}</div>
        </div>
    </div>
);


class Test extends React.Component {
    state = {
        data: [],
        cols: 3,
        pickerValue: [],
        asyncValue: [],
        detailAddress:'',
        val:[]
    };
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        if(this.state.asyncValue.length == 0){
            Toast.info('请输入详细地址');
            return;
        }
        if(!this.state.asyncValue[0] || !this.state.asyncValue[1] || !this.state.asyncValue[2]){
            Toast.info('请选择收获地址');
            return;
        }

        this.props.dispatch({
            type:'address/saveAddress',
            payload:{
                provinceId:this.state.asyncValue[0],
                cityId:this.state.asyncValue[1],
                countryId:this.state.asyncValue[2],
                detailAddress:this.state.detailAddress
            }
        });
    }
    onChange = (value) =>{
        this.setState({
            detailAddress:value
        });
    };
    onPickerChange = (val) => {
        this.props.dispatch({
            type: 'address/city',
            payload: {
                provinceId: val[0],
                cityId: val[1] ? val[1] : 0,
                data: this.props.data
            }
        });

        let colNum;
        const d = [...this.props.data];
        const asyncValue = [...val];
        colNum = 3;
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
            val
        });
    };

    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }

    render() {
        const {getFieldProps} = this.props.form;
        return (<div>
            <WhiteSpace size="lg"/>
            <List style={{backgroundColor: 'white'}} className="picker-list">
                <Picker
                    extra="省——市——区"
                    data={this.props.data} //刚开始的数据源
                    cols={this.state.cols}
                    value={this.state.asyncValue}
                    onChange={v => this.setState({ asyncValue: v })}
                    onPickerChange={this.onPickerChange}
                   // onOk={v => console.log(v)}
                >
                    <List.Item arrow="horizontal" onClick={this.onClick}>收货地址</List.Item>
                </Picker>
                <div className="am-list-item am-list-item-middle padding-top-0" style={{display: 'block'}}>
                    <InputItem
                        placeholder="请输入街道路及门牌号"
                        onChange={this.onChange}
                    ></InputItem>
                </div>

            </List>
            <WhiteSpace size="lg"/>
            <Button style={{margin:'0 20px'}} type="warning" onClick={this.handleClick}>确认</Button><WhiteSpace />
        </div>);
    }
}

const TestWrapper = createForm()(Test);

export default TestWrapper;