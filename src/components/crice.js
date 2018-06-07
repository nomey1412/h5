import React from 'react';
class crice extends React.Component {


    render() {
        return (<div>
            <span>{this.props.coupon_type_name}</span>
            <img className="showStyle" src="./src/assets/coupon/crice.png"
                 alt=""/>
        </div>);
    }

}

export default crice;