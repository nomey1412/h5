/**
 * Created by huozhenguang on 2018/1/9.
 */
import React from 'react';
import { Carousel } from 'antd-mobile';

class Banner extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,

    }
    render() {
        if(this.props.bannerList.length > 0){
            return (
                <Carousel
                    autoplay={true}
                    infinite
                    selectedIndex={0}
                    //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    //afterChange={index => console.log('slide to', index)}
                    dots={false}
                >
                    {this.props.bannerList.map(val => (
                        <a
                            key={val}
                            href= {val.jumpUrl ? val.jumpUrl : 'javascript:void(0);'}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.bannerUrl}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
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
        }else {
            return "";
        }
    }
}

export default Banner;