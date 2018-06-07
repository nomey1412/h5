/**
 * Created by huozhenguang on 2018/1/11.
 */
import React from 'react';
import { Carousel } from 'antd-mobile';

class GoodsDetailCarousel extends React.Component{

    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
    }
    render(){
        if(this.props.imageList.length > 0){
            return (
                <Carousel
                    autoplay={false}
                    infinite
                    selectedIndex={0}
                >
                    {this.props.imageList.map(val => (
                        <a
                            key={val}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' ,height:'300px'}}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            );
        }else{
            return "";
        }

    }
}

export default GoodsDetailCarousel;
