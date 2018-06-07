/**
 * Created by huozhenguang on 2018/1/11.
 */
import React from 'react';
import GoodsDetailCarouselComponent from '../components/goodsDetail/GoodsDetailCarousel';
import GoodsDetailDescriptionComponent from '../components/goodsDetail/GoodsDetailDescription';
import GoodsDetailIousComponent from '../components/goodsDetail/GoodsDetailIous';
import GoodsDetailBottomComponent from '../components/goodsDetail/GoodsDetailBottom';
import { connect } from 'dva';

function GoodsDetailPage({ location, dispatch, goodsDetail, layout , loading }){
    return (
        <div>
            <GoodsDetailCarouselComponent {...goodsDetail} dispatch={dispatch} location={location}/>
            <GoodsDetailDescriptionComponent {...goodsDetail} dispatch={dispatch} location={location}/>
            <GoodsDetailIousComponent {...goodsDetail} dispatch={dispatch} location={location}/>
            <GoodsDetailBottomComponent {...goodsDetail} dispatch={dispatch} location={location} />
        </div>
    );
}
function mapStateToProps({ goodsDetail, layout ,loading}) {
    return { goodsDetail, layout, loading};
}

export default connect(mapStateToProps)(GoodsDetailPage);
