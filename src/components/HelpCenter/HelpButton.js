import React from 'react';
import {WhiteSpace, Button} from 'antd-mobile';
import './HelpCenter.less'


class HelpButton extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(url,e){
        window.location.href = url;
    }

    render() {
        console.log('-----helpCenter------');
        console.log(this.props);
        if(this.props.type === 1) {
            return (<div>
                <Button className="tsd-btn-bottom" type="warning" onClick={this.handleClick.bind(this,this.props.serviceUrl)}>没看明白？联系客服</Button>

            </div>)
        }else{
            return "";
        }
    }

}

export default HelpButton;
